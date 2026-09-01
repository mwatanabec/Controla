export type SaleChannel = 'partner' | 'direct'

export type SaleDraft = {
  channel: SaleChannel
  partnerId: string
  productId: string
  quantity: string
  unitPrice: string
  date: string
}

export type SaleResult = {
  commandId: string
  syncStatus: 'queued'
  channel: SaleChannel
  originName: string
  partnerName?: string
  productName: string
  quantity: number
  unitPrice: number
  total: number
  date: string
  previousQuantity: number
  nextQuantity: number
}
