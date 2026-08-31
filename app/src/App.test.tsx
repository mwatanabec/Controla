import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'

describe('Home', () => {
  it('mostra os dados mockados do negócio piloto', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Olá, Anona Presentes' })).toBeInTheDocument()
    expect(screen.getByText('Caneca Flores')).toBeInTheDocument()
    expect(screen.getByText('Salão Bella')).toBeInTheDocument()
  })

  it('abre as ações de registro aprovadas', () => {
    render(<App />)

    const registerButton = screen.getByRole('button', { name: 'Abrir ações de registro' })
    fireEvent.click(registerButton)

    expect(registerButton).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('menuitem', { name: 'Compra' })).toBeVisible()
    expect(screen.getByRole('menuitem', { name: 'Devolução' })).toBeVisible()
  })

  it('explica quando uma área pertence aos próximos lotes', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: 'Ver reposição' }))

    expect(screen.getByRole('status')).toHaveTextContent(
      'Este recurso será implementado nos próximos lotes: Reposição.',
    )
  })
})
