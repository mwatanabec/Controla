export type PurchaseDraft = {
  productId: string
  supplier: string
  quantity: string
  unitCost: string
  date: string
}

export type PurchaseResult = {
  commandId: string
  syncStatus: 'queued'
  productName: string
  supplier: string
  quantity: number
  unitCost: number
  date: string
  previousQuantity: number
  nextQuantity: number
}
