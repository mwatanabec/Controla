export type AuthSession = {
  businessCode: string
  businessId: string
  businessName: string
  userId: string
  username: string
  mode: 'demo'
}

export type LoginCredentials = {
  businessCode: string
  username: string
  password: string
}
