import { describe, expect, it } from 'vitest'
import { stockProducts } from '../data/stock'
import type { LocalOutboxCommand, SyncCommandType } from '../types/sync'
import { projectStockProducts } from './stockProjection'

function command(
  sequence: number,
  commandType: SyncCommandType,
  payload: Record<string, unknown>,
): LocalOutboxCommand {
  return {
    command_id: crypto.randomUUID(),
    business_id: crypto.randomUUID(),
    user_id: crypto.randomUUID(),
    device_id: crypto.randomUUID(),
    device_sequence: sequence,
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

describe('projeção local de estoque', () => {
  it('aplica os movimentos físicos pendentes em ordem sem alterar a base', () => {
    const result = projectStockProducts(stockProducts, [
      command(1, 'purchase.confirm', { product_name: 'Caneca Flores', quantity: 5 }),
      command(2, 'transfer.confirm', {
        transfer_type: 'send_to_partner',
        product_name: 'Caneca Flores',
        partner_name: 'Loja da Ana',
        quantity: 2,
      }),
      command(3, 'sale.confirm', {
        sale_channel: 'partner',
        partner_name: 'Salão Bella',
        items: [{ product_name: 'Caneca Flores', quantity: 3 }],
      }),
      command(4, 'transfer.confirm', {
        transfer_type: 'return_from_partner',
        product_name: 'Caneca Flores',
        partner_name: 'Salão Bella',
        quantity: 1,
      }),
      command(5, 'sale.confirm', {
        sale_channel: 'direct',
        items: [{ product_name: 'Caneca Flores', quantity: 1 }],
      }),
    ])

    const caneca = result.products.find((product) => product.id === 'caneca')
    expect(result.appliedCommandCount).toBe(5)
    expect(caneca?.ownQuantity).toBe(5)
    expect(caneca?.partners).toEqual([
      { name: 'Salão Bella', quantity: 0 },
      { name: 'Loja da Ana', quantity: 3 },
    ])
    expect(caneca?.status).toBe('ok')
    expect(stockProducts[0].ownQuantity).toBe(2)
    expect(stockProducts[0].partners[0].quantity).toBe(4)
  })

  it('ignora comandos financeiros e comandos rejeitados', () => {
    const rejectedPurchase = command(1, 'purchase.confirm', { product_name: 'Caneca Flores', quantity: 10 })
    rejectedPurchase.status = 'rejected'

    const result = projectStockProducts(stockProducts, [
      rejectedPurchase,
      command(2, 'settlement.payment', { amount_cents: 2500 }),
    ])

    expect(result.appliedCommandCount).toBe(0)
    expect(result.products).toEqual(stockProducts)
    expect(result.products).not.toBe(stockProducts)
  })
})
