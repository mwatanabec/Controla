export type ShippingDraft = {
  partnerId: string
  productId: string
  quantity: string
  date: string
}

export type ShippingResult = {
  partnerName: string
  productName: string
  quantity: number
  date: string
  previousOwnQuantity: number
  nextOwnQuantity: number
  previousPartnerQuantity: number
  nextPartnerQuantity: number
}
