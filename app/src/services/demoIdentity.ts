import { getOrCreateLocalMetaValue } from './localDatabase'

export const DEMO_BUSINESS_ID = '11111111-1111-4111-8111-111111111111'
export const DEMO_USER_ID = '22222222-2222-4222-8222-222222222222'
export const DEMO_OWN_LOCATION_ID = '33333333-3333-4333-8333-333333333333'

export const demoProductIds: Record<string, string> = {
  caneca: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1',
  kit: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa2',
  vela: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa3',
}

export const demoPartnerIds: Record<string, string> = {
  salao: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb1',
  loja: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb2',
}

export const demoPartnerLocationIds: Record<string, string> = {
  salao: 'cccccccc-cccc-4ccc-8ccc-ccccccccccc1',
  loja: 'cccccccc-cccc-4ccc-8ccc-ccccccccccc2',
}

export const demoSettlementIds: Record<string, string> = {
  salao: 'dddddddd-dddd-4ddd-8ddd-ddddddddddd1',
  loja: 'dddddddd-dddd-4ddd-8ddd-ddddddddddd2',
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
