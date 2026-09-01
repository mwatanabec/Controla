import { getOrCreateLocalMetaValue } from './localDatabase'

export const DEMO_BUSINESS_ID = '11111111-1111-4111-8111-111111111111'
export const DEMO_USER_ID = '22222222-2222-4222-8222-222222222222'

export const demoProductIds: Record<string, string> = {
  caneca: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1',
  kit: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa2',
  vela: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa3',
}

export async function getDemoIdentity() {
  const deviceId = await getOrCreateLocalMetaValue('demo:device_id', () => crypto.randomUUID())

  return {
    businessId: DEMO_BUSINESS_ID,
    userId: DEMO_USER_ID,
    deviceId,
    mode: 'demo' as const,
  }
}
