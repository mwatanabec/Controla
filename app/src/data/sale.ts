import type { SaleDraft } from '../types/sale'

export const productSalePrices: Record<string, string> = {
  caneca: '39,90',
  kit: '74,90',
  vela: '29,90',
}

export const initialSaleDraft: SaleDraft = {
  channel: 'partner',
  partnerId: 'salao',
  productId: 'caneca',
  quantity: '3',
  unitPrice: productSalePrices.caneca,
  date: '2026-09-01',
}
