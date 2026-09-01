export type SyncCommandType =
  | 'catalog.create'
  | 'catalog.update'
  | 'catalog.archive'
  | 'purchase.confirm'
  | 'transfer.confirm'
  | 'sale.confirm'
  | 'inventory_event.confirm'
  | 'settlement.open'
  | 'settlement.payment'
  | 'settlement.adjustment'
  | 'operation.reverse'

export type SyncCommandStatus =
  | 'queued'
  | 'waiting_connection'
  | 'waiting_dependency'
  | 'syncing'
  | 'retry_wait'
  | 'failed_transient'
  | 'accepted'
  | 'conflict'
  | 'rejected'

export type SyncCommandEnvelope = {
  command_id: string
  business_id: string
  user_id: string
  device_id: string
  device_sequence: number
  command_type: SyncCommandType
  payload_version: 1
  occurred_at: string
  created_local_at: string
  base_versions: Record<string, number>
  dependencies: string[]
  payload: Record<string, unknown>
}

export type LocalOutboxCommand = SyncCommandEnvelope & {
  status: SyncCommandStatus
  attempt_count: number
  last_attempt_at?: string
  next_attempt_at?: string
  last_error?: string
}

export type EnqueueCommandInput = {
  businessId: string
  userId: string
  deviceId: string
  commandType: SyncCommandType
  occurredAt: string
  payload: Record<string, unknown>
  baseVersions?: Record<string, number>
  dependencies?: string[]
}
