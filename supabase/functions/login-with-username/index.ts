import { createClient } from 'npm:@supabase/supabase-js@2'

type LoginRequest = {
  business_code?: unknown
  username?: unknown
  password?: unknown
}

const minimumFailureDurationMs = 350
const businessCodePattern = /^[a-z0-9][a-z0-9.-]{2,31}$/

function normalize(value: unknown) {
  return typeof value === 'string' ? value.trim().toLocaleLowerCase('pt-BR') : ''
}

function responseHeaders(origin: string) {
  return {
    'Access-Control-Allow-Headers': 'apikey, content-type, x-client-info',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Origin': origin,
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json',
    Vary: 'Origin',
  }
}

function configuredOrigins() {
  return (Deno.env.get('ALLOWED_ORIGINS') ?? 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
}

async function waitForMinimumFailureDuration(startedAt: number) {
  const remaining = minimumFailureDurationMs - (Date.now() - startedAt)
  if (remaining > 0) await new Promise((resolve) => setTimeout(resolve, remaining))
}

Deno.serve(async (request) => {
  const startedAt = Date.now()
  const origin = request.headers.get('origin') ?? ''
  const allowedOrigin = configuredOrigins().includes(origin) ? origin : ''
  const headers = responseHeaders(allowedOrigin)

  if (!allowedOrigin) {
    return new Response(JSON.stringify({ code: 'request_not_allowed' }), { status: 403, headers })
  }

  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers })
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ code: 'method_not_allowed' }), { status: 405, headers })
  }

  try {
    const body = (await request.json()) as LoginRequest
    const businessCode = normalize(body.business_code)
    const username = normalize(body.username)
    const password = typeof body.password === 'string' ? body.password : ''

    if (
      !businessCodePattern.test(businessCode) ||
      username.length < 3 ||
      username.length > 64 ||
      password.length < 1 ||
      password.length > 256
    ) {
      await waitForMinimumFailureDuration(startedAt)
      return new Response(JSON.stringify({ code: 'invalid_credentials' }), { status: 401, headers })
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const publishableKey = Deno.env.get('SUPABASE_PUBLISHABLE_KEY') ?? Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    const secretKey = Deno.env.get('SUPABASE_SECRET_KEY') ?? Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''

    if (!supabaseUrl || !publishableKey || !secretKey) throw new Error('missing_auth_configuration')

    const admin = createClient(supabaseUrl, secretKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })

    const { data: business, error: businessError } = await admin
      .from('businesses')
      .select('id')
      .eq('login_code', businessCode)
      .eq('status', 'active')
      .maybeSingle()

    if (businessError) throw businessError

    let membership: { user_id: string } | null = null
    if (business) {
      const { data, error } = await admin
          .from('business_memberships')
          .select('user_id')
          .eq('business_id', business.id)
          .eq('username_normalized', username)
          .eq('status', 'active')
          .maybeSingle()
      if (error) throw error
      membership = data
    }

    let profile: { user_id: string } | null = null
    if (membership) {
      const { data, error } = await admin
        .from('profiles')
        .select('user_id')
        .eq('user_id', membership.user_id)
        .eq('status', 'active')
        .maybeSingle()
      if (error) throw error
      profile = data
    }

    const { data: authUser } = profile
      ? await admin.auth.admin.getUserById(profile.user_id)
      : { data: { user: null } }
    const email = authUser.user?.email

    if (!email || !authUser.user?.email_confirmed_at) {
      await waitForMinimumFailureDuration(startedAt)
      return new Response(JSON.stringify({ code: 'invalid_credentials' }), { status: 401, headers })
    }

    const authClient = createClient(supabaseUrl, publishableKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
    const { data, error } = await authClient.auth.signInWithPassword({ email, password })

    if (error || !data.session) {
      await waitForMinimumFailureDuration(startedAt)
      return new Response(JSON.stringify({ code: 'invalid_credentials' }), { status: 401, headers })
    }

    return new Response(
      JSON.stringify({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        expires_in: data.session.expires_in,
        expires_at: data.session.expires_at,
        token_type: data.session.token_type,
      }),
      { status: 200, headers },
    )
  } catch {
    await waitForMinimumFailureDuration(startedAt)
    return new Response(JSON.stringify({ code: 'login_unavailable' }), { status: 503, headers })
  }
})
