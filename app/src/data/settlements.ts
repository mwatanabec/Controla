import type { Settlement } from '../types/settlement'

export const settlements: Settlement[] = [
  {
    id: 'salao',
    partnerName: 'Salão Bella',
    status: 'partial',
    statusLabel: 'Pagamento parcial',
    saleLabel: 'Venda: 3 Canecas Flores',
    detailLabel: 'Venda pendente: 3 Canecas Flores',
    summaryAmounts: [
      { label: 'Valor acordado', value: 'R$ 110,00' },
      { label: 'Já pago', value: 'R$ 60,00' },
    ],
    amounts: [
      { label: 'Valor calculado', value: 'R$ 119,70' },
      { label: 'Valor acordado', value: 'R$ 110,00' },
      { label: 'Já pago', value: 'R$ 60,00' },
      { label: 'Falta acertar', value: 'R$ 50,00' },
    ],
    actionLabel: 'Registrar acerto parcial',
    actionTone: 'primary',
  },
  {
    id: 'loja',
    partnerName: 'Loja da Ana',
    status: 'open',
    statusLabel: 'Pagamento em aberto',
    saleLabel: 'Venda: 2 Velas Baunilha',
    detailLabel: '2 Velas Baunilha aguardando acerto',
    summaryAmounts: [
      { label: 'Valor acordado', value: 'R$ 59,80' },
      { label: 'Já pago', value: 'R$ 0,00' },
    ],
    amounts: [
      { label: 'Valor calculado', value: 'R$ 59,80' },
      { label: 'Valor acordado', value: 'R$ 59,80' },
      { label: 'Já pago', value: 'R$ 0,00' },
      { label: 'Falta acertar', value: 'R$ 59,80' },
    ],
    actionLabel: 'Registrar pagamento total',
    actionTone: 'secondary',
  },
]
