export type PartnerStatus = 'pending' | 'stale'

export type PartnerMetric = {
  label: string
  value: string
}

export type PartnerDetail = {
  label: string
  value: string
}

export type Partner = {
  id: string
  name: string
  status: PartnerStatus
  statusLabel: string
  summaryLabel: string
  metrics: PartnerMetric[]
  details: PartnerDetail[]
  detailActions: string[]
}

export type PartnerFilter = 'all' | 'pending' | 'stale'
export type PartnerView = 'list' | 'details'
