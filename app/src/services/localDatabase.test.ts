import { afterEach, describe, expect, it } from 'vitest'
import {
  LOCAL_DATABASE_VERSION,
  LOCAL_STORE_NAMES,
  countOutboxCommands,
  deleteLocalDatabase,
  enqueueLocalCommand,
  listOutboxCommands,
  openLocalDatabase,
  syncStatusLabel,
} from './localDatabase'
import { DEMO_BUSINESS_ID, DEMO_USER_ID, getDemoIdentity } from './demoIdentity'

const identity = {
  businessId: '10000000-0000-4000-8000-000000000001',
  userId: '20000000-0000-4000-8000-000000000001',
  deviceId: '30000000-0000-4000-8000-000000000001',
}

afterEach(async () => {
  await deleteLocalDatabase()
})

describe('banco local', () => {
  it('cria o esquema IndexedDB v1 com os armazenamentos obrigatórios', async () => {
    const database = await openLocalDatabase()

    expect(database.version).toBe(LOCAL_DATABASE_VERSION)
    expect(Array.from(database.objectStoreNames)).toEqual(expect.arrayContaining([...LOCAL_STORE_NAMES]))
    database.close()
  })

  it('enfileira comandos com UUID, estado inicial e sequência crescente', async () => {
    const first = await enqueueLocalCommand({
      ...identity,
      commandType: 'purchase.confirm',
      occurredAt: '2026-09-01T12:00:00.000Z',
      payload: { product_id: 'caneca', quantity: 12 },
    })
    const second = await enqueueLocalCommand({
      ...identity,
      commandType: 'transfer.confirm',
      occurredAt: '2026-09-01T12:01:00.000Z',
      payload: { product_id: 'vela', quantity: 2 },
      dependencies: [first.command_id],
    })

    expect(first.command_id).toMatch(/^[0-9a-f-]{36}$/)
    expect(first.device_sequence).toBe(1)
    expect(first.status).toBe('queued')
    expect(first.payload_version).toBe(1)
    expect(second.device_sequence).toBe(2)
    expect(second.dependencies).toEqual([first.command_id])
    expect(await countOutboxCommands()).toBe(2)
    expect((await listOutboxCommands()).map((command) => command.command_id)).toEqual([
      first.command_id,
      second.command_id,
    ])
  })

  it('mantém sequência independente por aparelho e os textos visíveis aprovados', async () => {
    const firstDevice = await enqueueLocalCommand({
      ...identity,
      commandType: 'sale.confirm',
      occurredAt: '2026-09-01T12:00:00.000Z',
      payload: { channel: 'direct' },
    })
    const secondDevice = await enqueueLocalCommand({
      ...identity,
      deviceId: '30000000-0000-4000-8000-000000000002',
      commandType: 'sale.confirm',
      occurredAt: '2026-09-01T12:00:00.000Z',
      payload: { channel: 'partner' },
    })

    expect(firstDevice.device_sequence).toBe(1)
    expect(secondDevice.device_sequence).toBe(1)
    expect(syncStatusLabel('queued')).toBe('Salvo neste aparelho')
    expect(syncStatusLabel('conflict')).toBe('Precisa revisar')
    expect(syncStatusLabel('rejected')).toBe('Não foi enviado')
  })

  it('reutiliza a identidade do aparelho no modo demonstração', async () => {
    const first = await getDemoIdentity()
    const second = await getDemoIdentity()

    expect(first.businessId).toBe(DEMO_BUSINESS_ID)
    expect(first.userId).toBe(DEMO_USER_ID)
    expect(first.deviceId).toBe(second.deviceId)
    expect(first.deviceId).toMatch(/^[0-9a-f-]{36}$/)
    expect(first.mode).toBe('demo')
  })
})
