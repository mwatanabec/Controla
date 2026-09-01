import { useState, type FormEvent } from 'react'
import { authenticateDemo, demoLoginCredentials } from '../services/authSession'
import type { AuthSession, LoginCredentials } from '../types/auth'

type LoginPageProps = {
  onAuthenticated: (session: AuthSession) => void
}

const initialCredentials: LoginCredentials = {
  businessCode: '',
  username: '',
  password: '',
}

export function LoginPage({ onAuthenticated }: LoginPageProps) {
  const [credentials, setCredentials] = useState(initialCredentials)
  const [error, setError] = useState('')

  function update(field: keyof LoginCredentials, value: string) {
    setCredentials((current) => ({ ...current, [field]: value }))
    setError('')
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const session = authenticateDemo(credentials)

    if (!session) {
      setError('Empresa, usuário ou senha não conferem.')
      return
    }

    onAuthenticated(session)
  }

  return (
    <main className="acesso">
      <section className="acesso-apresentacao">
        <div className="marca marca-acesso">
          <span className="marca-simbolo" aria-hidden="true">
            C
          </span>
          <span>Controla</span>
        </div>
        <p className="etiqueta-acesso">Caderneta inteligente</p>
        <h1>Entre no seu negócio</h1>
        <p>Informe a empresa e o seu usuário para abrir o controle certo.</p>
      </section>

      <form className="cartao formulario-acesso" onSubmit={submit} noValidate>
        <label className="campo-formulario">
          <span>Empresa</span>
          <input
            autoCapitalize="none"
            autoComplete="organization"
            autoFocus
            name="business"
            value={credentials.businessCode}
            onChange={(event) => update('businessCode', event.target.value)}
          />
        </label>

        <label className="campo-formulario">
          <span>Usuário</span>
          <input
            autoCapitalize="none"
            autoComplete="username"
            name="username"
            value={credentials.username}
            onChange={(event) => update('username', event.target.value)}
          />
        </label>

        <label className="campo-formulario">
          <span>Senha</span>
          <input
            autoComplete="current-password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={(event) => update('password', event.target.value)}
          />
        </label>

        {error ? (
          <p className="erro-formulario" role="alert">
            {error}
          </p>
        ) : null}

        <button className="botao-principal" type="submit">
          Entrar
        </button>
      </form>

      <aside className="acesso-demonstracao" aria-label="Acesso da demonstração local">
        <strong>Demonstração local</strong>
        <span>
          Empresa <b>{demoLoginCredentials.businessCode}</b> · usuário <b>{demoLoginCredentials.username}</b> · senha{' '}
          <b>{demoLoginCredentials.password}</b>
        </span>
        <small>Este acesso ainda não consulta o banco central.</small>
      </aside>
    </main>
  )
}
