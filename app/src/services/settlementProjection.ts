import { settlementPaymentSources } from '../data/settlementPayment'
import { settlements } from '../data/settlements'
import { demoSettlementIds } from './demoIdentity'
import { listOutboxCommands } from './localDatabase'
import type { Settlement } from '../types/settlement'
import type { SettlementPaymentSource } from '../types/settlementPayment'
import type { LocalOutboxCommand, SyncCommandStatus } from '../types/sync'

const projectableStatuses = new Set<SyncCommandStatus>([
  'queued',
  'waiting_connection',
  'waiting_dependency',
  'syncing',
  'retry_wait',
  'failed_transient',
  'conflict',
])

const settlementKeyByDemoId = new Map(Object.entries(demoSettlementIds).map(([key, id]) => [id, key]))

function cents(value: unknown) {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0 ? value : null
}

function formatCents(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value / 100)
}

function paymentCommandsFor(settlementId: string, commands: LocalOutboxCommand[]) {
  return commands.filter((command) => {
    if (command.command_type !== 'settlement.payment' || !projectableStatuses.has(command.status)) return false
    const commandSettlementId = command.payload.settlement_id
    return typeof commandSettlementId === 'string' && settlementKeyByDemoId.get(commandSettlementId) === settlementId
  })
}

export function projectSettlementPaymentSources(
  baseSources: SettlementPaymentSource[],
  commands: LocalOutboxCommand[],
) {
  let appliedPaymentCount = 0
  const sources = baseSources.map((source) => {
    const paymentCommands = paymentCommandsFor(source.id, commands)
    if (paymentCommands.length === 0) return { ...source }

    appliedPaymentCount += paymentCommands.length
    const latestPayload = paymentCommands.at(-1)?.payload
    const calculatedCents = cents(latestPayload?.calculated_amount_cents) ?? Math.round(source.calculatedValue * 100)
    const agreedCents = cents(latestPayload?.agreed_amount_cents) ?? Math.round(source.agreedValue * 100)
    const paidCents =
      Math.round(source.paidValue * 100) +
      paymentCommands.reduce((total, command) => total + (cents(command.payload.amount_cents) ?? 0), 0)

    return {
      ...source,
      calculatedValue: calculatedCents / 100,
      agreedValue: agreedCents / 100,
      paidValue: paidCents / 100,
    }
  })

  return { sources, appliedPaymentCount }
}

export function projectSettlements(baseSettlements: Settlement[], commands: LocalOutboxCommand[]) {
  const sourceProjection = projectSettlementPaymentSources(settlementPaymentSources, commands)

  const projected = baseSettlements.map((settlement) => {
    const source = sourceProjection.sources.find((item) => item.id === settlement.id)
    if (!source) return { ...settlement }

    const paymentCommands = paymentCommandsFor(settlement.id, commands)
    if (paymentCommands.length === 0) {
      return {
        ...settlement,
        summaryAmounts: settlement.summaryAmounts.map((amount) => ({ ...amount })),
        amounts: settlement.amounts.map((amount) => ({ ...amount })),
      }
    }

    const calculatedCents = Math.round(source.calculatedValue * 100)
    const agreedCents = Math.round(source.agreedValue * 100)
    const paidCents = Math.round(source.paidValue * 100)
    const remainingCents = Math.max(0, agreedCents - paidCents)
    const status = remainingCents === 0 ? 'paid' : paidCents > 0 ? 'partial' : 'open'
    const statusLabel =
      status === 'paid' ? 'Pagamento total estimado' : status === 'partial' ? 'Pagamento parcial estimado' : 'Pagamento em aberto'

    return {
      ...settlement,
      status,
      statusLabel,
      summaryAmounts: [
        { label: 'Valor acordado', value: formatCents(agreedCents) },
        { label: 'Já pago estimado', value: formatCents(paidCents) },
      ],
      amounts: [
        { label: 'Valor calculado', value: formatCents(calculatedCents) },
        { label: 'Valor acordado', value: formatCents(agreedCents) },
        { label: 'Já pago estimado', value: formatCents(paidCents) },
        { label: 'Falta acertar estimado', value: formatCents(remainingCents) },
      ],
      actionLabel: status === 'paid' ? 'Ver histórico' : 'Registrar acerto parcial',
      actionTone: status === 'paid' ? 'secondary' : 'primary',
    } satisfies Settlement
  })

  return { settlements: projected, appliedPaymentCount: sourceProjection.appliedPaymentCount }
}

export async function loadProjectedSettlements() {
  return projectSettlements(settlements, await listOutboxCommands())
}

export async function loadProjectedSettlementPaymentSources() {
  return projectSettlementPaymentSources(settlementPaymentSources, await listOutboxCommands())
}
