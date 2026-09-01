import { DEMO_BUSINESS_ID, DEMO_USER_ID } from './demoIdentity'
import type { AuthSession, LoginCredentials } from '../types/auth'

const SESSION_KEY = 'maria-controla:demo-session'

export const demoLoginCredentials: LoginCredentials = {
  businessCode: 'anona',
  username: 'maria.maria',
  password: 'demonstracao',
}

const demoSession: AuthSession = {
  businessCode: demoLoginCredentials.businessCode,
  businessId: DEMO_BUSINESS_ID,
  businessName: 'Anona Presentes',
  userId: DEMO_USER_ID,
  username: demoLoginCredentials.username,
  mode: 'demo',
}

function normalizeIdentifier(value: string) {
  return value.trim().toLocaleLowerCase('pt-BR')
}

export function authenticateDemo(credentials: LoginCredentials): AuthSession | null {
  const matches =
    normalizeIdentifier(credentials.businessCode) === demoLoginCredentials.businessCode &&
    normalizeIdentifier(credentials.username) === demoLoginCredentials.username &&
    credentials.password === demoLoginCredentials.password

  if (!matches) return null

  saveAuthSession(demoSession)
  return demoSession
}

export function saveAuthSession(session: AuthSession) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function readAuthSession(): AuthSession | null {
  try {
    const stored = window.localStorage.getItem(SESSION_KEY)
    if (!stored) return null

    const session = JSON.parse(stored) as Partial<AuthSession>
    if (
      session.mode !== 'demo' ||
      session.businessCode !== demoSession.businessCode ||
      session.businessId !== demoSession.businessId ||
      session.userId !== demoSession.userId ||
      session.username !== demoSession.username
    ) {
      clearAuthSession()
      return null
    }

    return demoSession
  } catch {
    clearAuthSession()
    return null
  }
}

export function clearAuthSession() {
  window.localStorage.removeItem(SESSION_KEY)
}
