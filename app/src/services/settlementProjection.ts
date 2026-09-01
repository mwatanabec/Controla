import { settlementPaymentSources } from '../data/settlementPayment'
import { settlements } from '../data/settlements'
import { demoSettlementIds } from './demoIdentity'
import { listOutboxCommands } from './localDatabase'
import type { Settlement } from '../types/settlement'
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

export function projectSettlements(baseSettlements: Settlement[], commands: LocalOutboxCommand[]) {
  let appliedPaymentCount = 0

  const projected = baseSettlements.map((settlement) => {
    const source = settlementPaymentSources.find((item) => item.id === settlement.id)
    if (!source) return { ...settlement }

    const paymentCommands = commands.filter((command) => {
      if (command.command_type !== 'settlement.payment' || !projectableStatuses.has(command.status)) return false
      const settlementId = command.payload.settlement_id
      return typeof settlementId === 'string' && settlementKeyByDemoId.get(settlementId) === settlement.id
    })
    if (paymentCommands.length === 0) {
      return {
        ...settlement,
        summaryAmounts: settlement.summaryAmounts.map((amount) => ({ ...amount })),
        amounts: settlement.amounts.map((amount) => ({ ...amount })),
      }
    }

    appliedPaymentCount += paymentCommands.length
    const basePaidCents = Math.round(source.paidValue * 100)
    const calculatedCents =
      cents(paymentCommands.at(-1)?.payload.calculated_amount_cents) ?? Math.round(source.calculatedValue * 100)
    const agreedCents =
      cents(paymentCommands.at(-1)?.payload.agreed_amount_cents) ?? Math.round(source.agreedValue * 100)
    const addedPaidCents = paymentCommands.reduce(
      (total, command) => total + (cents(command.payload.amount_cents) ?? 0),
      0,
    )
    const paidCents = basePaidCents + addedPaidCents
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

  return { settlements: projected, appliedPaymentCount }
}

export async function loadProjectedSettlements() {
  return projectSettlements(settlements, await listOutboxCommands())
}
