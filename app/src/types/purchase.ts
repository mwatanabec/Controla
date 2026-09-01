export type PurchaseDraft = {
  productId: string
  supplier: string
  quantity: string
  unitCost: string
  date: string
}

export type PurchaseResult = {
  productName: string
  supplier: string
  quantity: number
  unitCost: number
  date: string
  previousQuantity: number
  nextQuantity: number
}
