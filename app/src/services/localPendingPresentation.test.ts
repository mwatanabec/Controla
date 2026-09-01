import { describe, expect, it } from 'vitest'
import type { LocalOutboxCommand, SyncCommandType } from '../types/sync'
import { presentLocalPendingCommand } from './localPendingPresentation'

function command(commandType: SyncCommandType, payload: Record<string, unknown>): LocalOutboxCommand {
  return {
    command_id: crypto.randomUUID(),
    business_id: crypto.randomUUID(),
    user_id: crypto.randomUUID(),
    device_id: crypto.randomUUID(),
    device_sequence: 1,
    command_type: commandType,
    payload_version: 1,
    occurred_at: '2026-09-01T12:00:00.000Z',
    created_local_at: '2026-09-01T12:00:00.000Z',
    base_versions: {},
    dependencies: [],
    payload,
    status: 'queued',
    attempt_count: 0,
  }
}

describe('apresentação das pendências locais', () => {
  it('traduz operações físicas sem expor o envelope técnico', () => {
    expect(
      presentLocalPendingCommand(
        command('transfer.confirm', {
          transfer_type: 'send_to_partner',
          product_name: 'Vela Baunilha',
          partner_name: 'Loja da Ana',
          quantity: 2,
        }),
      ),
    ).toMatchObject({
      title: 'Envio registrado',
      detail: '2 unidades de Vela Baunilha para Loja da Ana',
      statusLabel: 'Salvo neste aparelho',
    })
  })

  it('mantém pagamento e venda em parceiro distintos', () => {
    const sale = presentLocalPendingCommand(
      command('sale.confirm', {
        sale_channel: 'partner',
        partner_name: 'Salão Bella',
        items: [{ product_name: 'Caneca Flores', quantity: 3 }],
      }),
    )
    const payment = presentLocalPendingCommand(
      command('settlement.payment', { partner_name: 'Salão Bella', amount_cents: 2500 }),
    )

    expect(sale).toMatchObject({
      title: 'Venda no parceiro registrada',
      detail: '3 unidades de Caneca Flores em Salão Bella',
    })
    expect(payment.title).toBe('Pagamento de Acerto registrado')
    expect(payment.detail).toMatch(/25,00 para Salão Bella/)
  })
})
