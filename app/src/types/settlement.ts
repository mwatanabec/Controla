export type SettlementStatus = 'open' | 'partial' | 'paid'

export type SettlementAmount = {
  label: string
  value: string
}

export type Settlement = {
  id: string
  partnerName: string
  status: SettlementStatus
  statusLabel: string
  saleLabel: string
  detailLabel: string
  summaryAmounts: SettlementAmount[]
  amounts: SettlementAmount[]
  actionLabel: string
  actionTone: 'primary' | 'secondary'
}

export type SettlementFilter = 'all' | SettlementStatus
export type SettlementView = 'list' | 'details'
