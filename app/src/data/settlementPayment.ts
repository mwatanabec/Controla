import type { SettlementPaymentSource } from '../types/settlementPayment'

export const settlementPaymentSources: SettlementPaymentSource[] = [
  {
    id: 'salao',
    partnerName: 'Salão Bella',
    saleLabel: '3 Canecas Flores',
    calculatedValue: 119.7,
    agreedValue: 110,
    paidValue: 60,
  },
  {
    id: 'loja',
    partnerName: 'Loja da Ana',
    saleLabel: '2 Velas Baunilha',
    calculatedValue: 59.8,
    agreedValue: 59.8,
    paidValue: 0,
  },
]
