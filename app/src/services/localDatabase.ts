import type { EnqueueCommandInput, LocalOutboxCommand, SyncCommandStatus } from '../types/sync'

export const LOCAL_DATABASE_NAME = 'maria-controla-local'
export const LOCAL_DATABASE_VERSION = 1

export const LOCAL_STORE_NAMES = [
  'local_meta',
  'catalog_cache',
  'operations_cache',
  'balances_cache',
  'outbox',
  'local_conflicts',
  'sync_history',
] as const

type LocalStoreName = (typeof LOCAL_STORE_NAMES)[number]

type LocalMetaRecord = {
  key: string
  value: unknown
  updated_at: string
}

const statusLabels: Record<SyncCommandStatus, string> = {
  queued: 'Salvo neste aparelho',
  waiting_connection: 'Aguardando internet',
  waiting_dependency: 'Aguardando outra operação',
  syncing: 'Sincronizando',
  retry_wait: 'Tentaremos novamente',
  failed_transient: 'Falha temporária',
  accepted: 'Sincronizado',
  conflict: 'Precisa revisar',
  rejected: 'Não foi enviado',
}

function getIndexedDb() {
  if (!globalThis.indexedDB) {
    throw new Error('Este navegador não oferece o armazenamento local necessário para continuar.')
  }
  return globalThis.indexedDB
}

function requestResult<T>(request: IDBRequest<T>) {
  return new Promise<T>((resolve, reject) => {
    request.addEventListener('success', () => resolve(request.result), { once: true })
    request.addEventListener('error', () => reject(request.error ?? new Error('Falha ao acessar o banco local.')), {
      once: true,
    })
  })
}

function transactionComplete(transaction: IDBTransaction) {
  return new Promise<void>((resolve, reject) => {
    transaction.addEventListener('complete', () => resolve(), { once: true })
    transaction.addEventListener(
      'abort',
      () => reject(transaction.error ?? new Error('A gravação local foi interrompida.')),
      { once: true },
    )
    transaction.addEventListener(
      'error',
      () => reject(transaction.error ?? new Error('Não foi possível concluir a gravação local.')),
      { once: true },
    )
  })
}

function createStore(database: IDBDatabase, name: LocalStoreName, options: IDBObjectStoreParameters) {
  if (!database.objectStoreNames.contains(name)) return database.createObjectStore(name, options)
  return null
}

export function syncStatusLabel(status: SyncCommandStatus) {
  return statusLabels[status]
}

export function openLocalDatabase() {
  const request = getIndexedDb().open(LOCAL_DATABASE_NAME, LOCAL_DATABASE_VERSION)

  request.addEventListener('upgradeneeded', () => {
    const database = request.result

    createStore(database, 'local_meta', { keyPath: 'key' })
    createStore(database, 'catalog_cache', { keyPath: 'id' })

    const operationsStore = createStore(database, 'operations_cache', { keyPath: 'id' })
    operationsStore?.createIndex('occurred_at', 'occurred_at')

    createStore(database, 'balances_cache', { keyPath: 'key' })

    const outboxStore = createStore(database, 'outbox', { keyPath: 'command_id' })
    outboxStore?.createIndex('status', 'status')
    outboxStore?.createIndex('device_sequence', 'device_sequence', { unique: false })
    outboxStore?.createIndex('created_local_at', 'created_local_at')

    const conflictsStore = createStore(database, 'local_conflicts', { keyPath: 'id' })
    conflictsStore?.createIndex('status', 'status')

    const historyStore = createStore(database, 'sync_history', { keyPath: 'command_id' })
    historyStore?.createIndex('created_at', 'created_at')
  })

  return requestResult(request)
}

export async function enqueueLocalCommand(input: EnqueueCommandInput) {
  const database = await openLocalDatabase()
  const transaction = database.transaction(['local_meta', 'outbox'], 'readwrite')
  const completion = transactionComplete(transaction)
  const metaStore = transaction.objectStore('local_meta')
  const sequenceKey = `${input.businessId}:${input.deviceId}:device_sequence`

  try {
    const currentSequenceRecord = (await requestResult(metaStore.get(sequenceKey))) as LocalMetaRecord | undefined
    const currentSequence = typeof currentSequenceRecord?.value === 'number' ? currentSequenceRecord.value : 0
    const deviceSequence = currentSequence + 1
    const createdLocalAt = new Date().toISOString()
    const command: LocalOutboxCommand = {
      command_id: crypto.randomUUID(),
      business_id: input.businessId,
      user_id: input.userId,
      device_id: input.deviceId,
      device_sequence: deviceSequence,
      command_type: input.commandType,
      payload_version: 1,
      occurred_at: input.occurredAt,
      created_local_at: createdLocalAt,
      base_versions: input.baseVersions ?? {},
      dependencies: input.dependencies ?? [],
      payload: input.payload,
      status: 'queued',
      attempt_count: 0,
    }

    metaStore.put({ key: sequenceKey, value: deviceSequence, updated_at: createdLocalAt } satisfies LocalMetaRecord)
    transaction.objectStore('outbox').add(command)
    await completion
    return command
  } finally {
    database.close()
  }
}

export async function getOrCreateLocalMetaValue<T>(key: string, createValue: () => T) {
  const database = await openLocalDatabase()
  const transaction = database.transaction('local_meta', 'readwrite')
  const completion = transactionComplete(transaction)
  const metaStore = transaction.objectStore('local_meta')

  try {
    const currentRecord = (await requestResult(metaStore.get(key))) as LocalMetaRecord | undefined
    if (currentRecord) {
      await completion
      return currentRecord.value as T
    }

    const value = createValue()
    metaStore.add({ key, value, updated_at: new Date().toISOString() } satisfies LocalMetaRecord)
    await completion
    return value
  } finally {
    database.close()
  }
}

export async function listOutboxCommands() {
  const database = await openLocalDatabase()
  const transaction = database.transaction('outbox', 'readonly')
  const completion = transactionComplete(transaction)

  try {
    const commands = (await requestResult(transaction.objectStore('outbox').getAll())) as LocalOutboxCommand[]
    await completion
    return commands.sort((left, right) => left.device_sequence - right.device_sequence)
  } finally {
    database.close()
  }
}

export async function countOutboxCommands() {
  const database = await openLocalDatabase()
  const transaction = database.transaction('outbox', 'readonly')
  const completion = transactionComplete(transaction)

  try {
    const count = await requestResult(transaction.objectStore('outbox').count())
    await completion
    return count
  } finally {
    database.close()
  }
}

export function deleteLocalDatabase() {
  return requestResult(getIndexedDb().deleteDatabase(LOCAL_DATABASE_NAME)).then(() => undefined)
}
