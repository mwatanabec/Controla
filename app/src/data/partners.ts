import type { Partner } from '../types/partner'

export const partners: Partner[] = [
  {
    id: 'salao',
    name: 'Salão Bella',
    status: 'pending',
    statusLabel: '1 venda para acertar',
    summaryLabel: 'Responsável: Carla',
    metrics: [
      { label: 'Mercadorias no ponto', value: '6 un.' },
      { label: 'Valor a conferir', value: 'R$ 119,70' },
    ],
    details: [
      { label: 'Caneca Flores no parceiro', value: '4 unidades' },
      { label: 'Kit Presente Lavanda', value: '2 unidades' },
      { label: 'Valor a conferir', value: 'R$ 119,70' },
    ],
    detailActions: ['Registrar venda', 'Registrar devolução'],
  },
  {
    id: 'loja',
    name: 'Loja da Ana',
    status: 'stale',
    statusLabel: 'Sem atualização há 12 dias',
    summaryLabel: 'Situação: conferir',
    metrics: [
      { label: 'Mercadorias no ponto', value: '3 un.' },
      { label: 'Última atualização', value: '12 dias' },
    ],
    details: [
      { label: 'Caneca Flores no parceiro', value: '1 unidade' },
      { label: 'Vela Baunilha no parceiro', value: '2 unidades' },
      { label: 'Situação', value: 'Conferir' },
    ],
    detailActions: ['Registrar novo envio'],
  },
]
