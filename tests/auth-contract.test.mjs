import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8')

test('modelo garante empresa e usuário únicos na combinação de login', async () => {
  const core = await read('supabase/migrations/20260825090000_core_schema.sql')

  assert.match(core, /login_code text not null unique/)
  assert.match(core, /username_normalized text generated always/)
  assert.match(core, /unique \(business_id,username_normalized\)/)
  assert.doesNotMatch(core, /create table public\.profiles[\s\S]*?username_normalized[\s\S]*?create table public\.plans/)
})

test('função de login mantém segredos no servidor e não enumera identidades', async () => {
  const [config, login] = await Promise.all([
    read('supabase/config.toml'),
    read('supabase/functions/login-with-username/index.ts'),
  ])

  assert.match(config, /\[functions\.login-with-username\][\s\S]*verify_jwt = false/)
  assert.match(login, /SUPABASE_SECRET_KEY/)
  assert.match(login, /auth\.admin\.getUserById/)
  assert.match(login, /signInWithPassword/)
  assert.match(login, /code: 'invalid_credentials'/)
  assert.match(login, /minimumFailureDurationMs/)
  assert.match(login, /Cache-Control': 'no-store'/)
  assert.doesNotMatch(login, /JSON\.stringify\(\{[^}]*email/s)
})
