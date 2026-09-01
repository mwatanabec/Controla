export type ReturnDraft = {
  partnerId: string
  productId: string
  quantity: string
  date: string
}

export type ReturnResult = {
  commandId: string
  syncStatus: 'queued'
  partnerName: string
  productName: string
  quantity: number
  date: string
  previousPartnerQuantity: number
  nextPartnerQuantity: number
  previousOwnQuantity: number
  nextOwnQuantity: number
}
