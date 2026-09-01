export type PaymentMode = 'partial' | 'total'

export type SettlementPaymentSource = {
  id: string
  partnerName: string
  saleLabel: string
  calculatedValue: number
  agreedValue: number
  paidValue: number
}

export type SettlementPaymentDraft = {
  settlementId: string
  mode: PaymentMode
  agreedValue: string
  paymentValue: string
  date: string
  justification: string
}

export type SettlementPaymentResult = {
  partnerName: string
  saleLabel: string
  mode: PaymentMode
  calculatedValue: number
  agreedValue: number
  previousPaidValue: number
  paymentValue: number
  nextPaidValue: number
  remainingValue: number
  date: string
  justification: string
}
