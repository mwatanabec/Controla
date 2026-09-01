import { describe, expect, it } from 'vitest'
import { settlements } from '../data/settlements'
import { demoSettlementIds } from './demoIdentity'
import { projectSettlements } from './settlementProjection'
import type { LocalOutboxCommand } from '../types/sync'

function paymentCommand(amountCents: number): LocalOutboxCommand {
  return {
    command_id: crypto.randomUUID(),
    business_id: crypto.randomUUID(),
    user_id: crypto.randomUUID(),
    device_id: crypto.randomUUID(),
    device_sequence: 1,
    command_type: 'settlement.payment',
    payload_version: 1,
    occurred_at: '2026-09-01T12:00:00.000Z',
    created_local_at: '2026-09-01T12:00:00.000Z',
    base_versions: {},
    dependencies: [],
    payload: {
      settlement_id: demoSettlementIds.salao,
      calculated_amount_cents: 11970,
      agreed_amount_cents: 11000,
      amount_cents: amountCents,
    },
    status: 'queued',
    attempt_count: 0,
  }
}

describe('projeção local de Acertos', () => {
  it('soma o pagamento pendente e preserva valores separados', () => {
    const result = projectSettlements(settlements, [paymentCommand(2500)])
    const salao = result.settlements.find((settlement) => settlement.id === 'salao')

    expect(result.appliedPaymentCount).toBe(1)
    expect(salao?.status).toBe('partial')
    expect(salao?.statusLabel).toBe('Pagamento parcial estimado')
    expect(salao?.summaryAmounts).toContainEqual({ label: 'Já pago estimado', value: 'R$ 85,00' })
    expect(salao?.amounts).toContainEqual({ label: 'Falta acertar estimado', value: 'R$ 25,00' })
    expect(settlements[0].summaryAmounts).toContainEqual({ label: 'Já pago', value: 'R$ 60,00' })
  })

  it('marca como pago quando os pagamentos locais completam o valor acordado', () => {
    const result = projectSettlements(settlements, [paymentCommand(5000)])
    const salao = result.settlements.find((settlement) => settlement.id === 'salao')

    expect(salao?.status).toBe('paid')
    expect(salao?.statusLabel).toBe('Pagamento total estimado')
    expect(salao?.actionLabel).toBe('Ver histórico')
  })
})
