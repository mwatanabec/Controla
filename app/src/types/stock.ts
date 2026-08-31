export type StockStatus = 'low' | 'out' | 'ok'

export type PartnerStock = {
  name: string
  quantity: number
}

export type StockProduct = {
  id: string
  name: string
  abbreviation: string
  photoTone: 'peach' | 'lavender' | 'vanilla'
  status: StockStatus
  statusLabel: string
  ownQuantity: number
  minimumQuantity: number
  partners: PartnerStock[]
  detailMessage: string
}

export type StockFilter = 'all' | 'low' | 'partners' | 'out'
export type StockView = 'list' | 'details'
