import type { LowStockProduct, PartnerPendingItem, RecentActivity, SummaryItem } from '../types/home'

export const businessName = 'Anona Presentes'

export const summary: SummaryItem[] = [
  { value: 3, label: 'produtos acabando' },
  { value: 4, label: 'envios abertos' },
  { value: 2, label: 'acertos pendentes' },
]

export const lowStockProducts: LowStockProduct[] = [
  {
    id: 'caneca-flores',
    name: 'Caneca Flores',
    detail: '2 em estoque · mínimo 5',
    status: 'Abaixo do mínimo',
  },
  {
    id: 'kit-presente-lavanda',
    name: 'Kit Presente Lavanda',
    detail: '0 em estoque · mínimo 3',
    status: 'Sem estoque próprio',
  },
]

export const partnerPendingItems: PartnerPendingItem[] = [
  { id: 'salao-bella', name: 'Salão Bella', detail: '1 venda para acertar' },
  { id: 'loja-da-ana', name: 'Loja da Ana', detail: 'Sem atualização há 12 dias' },
]

export const recentActivities: RecentActivity[] = [
  {
    id: 'compra-canecas',
    abbreviation: 'CO',
    title: 'Compra registrada',
    detail: '12 Canecas Flores · Hoje',
  },
  {
    id: 'envio-salao-bella',
    abbreviation: 'EN',
    title: 'Envio para Salão Bella',
    detail: '6 Kits Presente · Ontem',
  },
]
