import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'

afterEach(() => {
  window.history.replaceState(null, '', '/')
})

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

describe('Estoque', () => {
  function openStock() {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Estoque' }))
  }

  it('abre pela navegação principal e preserva os saldos por localização', () => {
    openStock()

    expect(screen.getByRole('heading', { name: 'Estoque' })).toBeInTheDocument()
    expect(screen.getByText('3 produtos')).toBeInTheDocument()
    expect(screen.getByText('Caneca Flores')).toBeInTheDocument()
    expect(screen.getAllByText('Meu estoque')).not.toHaveLength(0)
  })

  it('filtra e busca produtos sem misturar os estados', () => {
    openStock()

    fireEvent.click(screen.getByRole('button', { name: 'Sem estoque' }))
    expect(screen.getByText('1 produto')).toBeInTheDocument()
    expect(screen.getByText('Kit Presente Lavanda')).toBeInTheDocument()
    expect(screen.queryByText('Caneca Flores')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Todos' }))
    fireEvent.change(screen.getByRole('searchbox', { name: 'Buscar produto no estoque' }), {
      target: { value: 'vela' },
    })
    expect(screen.getByText('Vela Baunilha')).toBeInTheDocument()
    expect(screen.queryByText('Kit Presente Lavanda')).not.toBeInTheDocument()
  })

  it('mostra a distribuição do produto em uma folha de detalhe', () => {
    openStock()

    fireEvent.click(
      screen.getByRole('button', { name: 'Ver estoque de Caneca Flores nos Pontos Parceiros' }),
    )

    const dialog = screen.getByRole('dialog', { name: 'Caneca Flores' })
    expect(dialog).toHaveTextContent('5 unidades em Pontos Parceiros')
    expect(dialog).toHaveTextContent('Salão Bella')
    expect(dialog).toHaveTextContent('7 unidades')

    fireEvent.click(screen.getByRole('button', { name: 'Fechar detalhe' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('alterna para a visão detalhada', () => {
    openStock()

    fireEvent.click(screen.getByRole('button', { name: 'Detalhes' }))

    expect(screen.getByText('Precisa comprar: estoque próprio abaixo do mínimo 5.')).toBeInTheDocument()
    expect(screen.getByText('Saldo distribuído visível sem misturar os locais.')).toBeInTheDocument()
  })

  it('mantém as ações do produto apenas como preparação dos próximos fluxos', () => {
    openStock()

    fireEvent.click(screen.getByRole('button', { name: 'Ações de Caneca Flores' }))
    fireEvent.click(screen.getByRole('menuitem', { name: 'Registrar compra' }))

    expect(screen.getByRole('status')).toHaveTextContent(
      'Registrar compra ficará disponível no lote do fluxo correspondente.',
    )
  })
})
