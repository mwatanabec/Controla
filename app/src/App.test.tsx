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

  it('mantém as ações ainda não implementadas como preparação dos próximos fluxos', () => {
    openStock()

    fireEvent.click(screen.getByRole('button', { name: 'Ações de Caneca Flores' }))
    fireEvent.click(screen.getByRole('menuitem', { name: 'Editar produto' }))

    expect(screen.getByRole('status')).toHaveTextContent(
      'Editar produto ficará disponível no lote do fluxo correspondente.',
    )
  })

  it('abre o formulário de compra pelo menu do produto', () => {
    openStock()

    fireEvent.click(screen.getByRole('button', { name: 'Ações de Caneca Flores' }))
    fireEvent.click(screen.getByRole('menuitem', { name: 'Registrar compra' }))

    expect(screen.getByRole('heading', { name: 'Registrar compra' })).toBeInTheDocument()
  })
})

describe('Pontos Parceiros', () => {
  function openPartners() {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Parceiros' }))
  }

  it('abre também pelas pendências da Home', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: 'Ver pendência de Salão Bella' }))

    expect(screen.getByRole('heading', { name: 'Pontos Parceiros' })).toBeInTheDocument()
  })

  it('abre pela navegação principal e mostra os dados do ponto', () => {
    openPartners()

    expect(screen.getByRole('heading', { name: 'Pontos Parceiros' })).toBeInTheDocument()
    expect(screen.getByText('2 Pontos Parceiros')).toBeInTheDocument()
    expect(screen.getByText('Responsável: Carla')).toBeInTheDocument()
    expect(screen.getByText('R$ 119,70')).toBeInTheDocument()
  })

  it('filtra e busca Pontos Parceiros', () => {
    openPartners()

    fireEvent.click(screen.getByRole('button', { name: 'Sem atualização' }))
    expect(screen.getByText('1 Ponto Parceiro')).toBeInTheDocument()
    expect(screen.getByText('Loja da Ana')).toBeInTheDocument()
    expect(screen.queryByText('Salão Bella')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Todos' }))
    fireEvent.change(screen.getByRole('searchbox', { name: 'Buscar Ponto Parceiro' }), {
      target: { value: 'bella' },
    })
    expect(screen.getByText('Salão Bella')).toBeInTheDocument()
    expect(screen.queryByText('Loja da Ana')).not.toBeInTheDocument()
  })

  it('abre a folha de mercadorias e situação do ponto', () => {
    openPartners()

    fireEvent.click(screen.getAllByRole('button', { name: 'Ver detalhes' })[0])

    const dialog = screen.getByRole('dialog', { name: 'Salão Bella' })
    expect(dialog).toHaveTextContent('Caneca Flores no parceiro')
    expect(dialog).toHaveTextContent('4 unidades')
    expect(dialog).toHaveTextContent('Valor a conferir')

    fireEvent.click(screen.getByRole('button', { name: 'Fechar detalhe' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('alterna para os detalhes sem misturar venda, envio e devolução', () => {
    openPartners()

    fireEvent.click(screen.getByRole('button', { name: 'Detalhes' }))

    expect(screen.getByRole('button', { name: 'Registrar venda' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Registrar devolução' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Registrar novo envio' })).toBeInTheDocument()
  })

  it('mantém as ações ainda não implementadas como preparação dos próximos fluxos', () => {
    openPartners()

    fireEvent.click(screen.getByRole('button', { name: 'Ações de Salão Bella' }))
    fireEvent.click(screen.getByRole('menuitem', { name: 'Editar parceiro' }))

    expect(screen.getByRole('status')).toHaveTextContent(
      'Editar parceiro ficará disponível no lote do fluxo correspondente.',
    )
  })
})

describe('Acertos', () => {
  function openSettlements() {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Acertos' }))
  }

  it('abre pela navegação principal e preserva os valores do acerto', () => {
    openSettlements()

    expect(screen.getByRole('heading', { name: 'Acertos' })).toBeInTheDocument()
    expect(screen.getByText('2 acertos')).toBeInTheDocument()
    expect(screen.getByText('Pagamento parcial')).toBeInTheDocument()
    expect(screen.getByText('R$ 110,00')).toBeInTheDocument()
    expect(screen.getByText('R$ 60,00')).toBeInTheDocument()
  })

  it('filtra e busca acertos pelo parceiro', () => {
    openSettlements()

    fireEvent.click(screen.getByRole('button', { name: 'Parcial' }))
    expect(screen.getByText('1 acerto')).toBeInTheDocument()
    expect(screen.getByText('Salão Bella')).toBeInTheDocument()
    expect(screen.queryByText('Loja da Ana')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Pagos' }))
    expect(screen.getByText('0 acertos')).toBeInTheDocument()
    expect(screen.getByText('Nenhum acerto encontrado.')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Todos' }))
    fireEvent.change(screen.getByRole('searchbox', { name: 'Buscar acerto por parceiro' }), {
      target: { value: 'ana' },
    })
    expect(screen.getByText('Loja da Ana')).toBeInTheDocument()
    expect(screen.queryByText('Salão Bella')).not.toBeInTheDocument()
  })

  it('abre o resumo completo em uma folha de detalhe', () => {
    openSettlements()

    fireEvent.click(screen.getAllByRole('button', { name: 'Ver detalhes' })[0])

    const dialog = screen.getByRole('dialog', { name: 'Salão Bella' })
    expect(dialog).toHaveTextContent('Valor calculado')
    expect(dialog).toHaveTextContent('R$ 119,70')
    expect(dialog).toHaveTextContent('Falta acertar')
    expect(dialog).toHaveTextContent('R$ 50,00')

    fireEvent.click(screen.getByRole('button', { name: 'Fechar detalhe' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('alterna para os detalhes e mantém as formas de pagamento separadas', () => {
    openSettlements()

    fireEvent.click(screen.getByRole('button', { name: 'Detalhes' }))

    expect(screen.getByText('Venda pendente: 3 Canecas Flores')).toBeInTheDocument()
    expect(screen.getAllByText('Valor calculado')).toHaveLength(2)
    expect(screen.getByRole('button', { name: 'Registrar acerto parcial' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Registrar pagamento total' })).toBeInTheDocument()
  })

  it('mantém pagamento e histórico como ações preparatórias', () => {
    openSettlements()

    fireEvent.click(screen.getByRole('button', { name: 'Ações do acerto de Salão Bella' }))
    fireEvent.click(screen.getByRole('menuitem', { name: 'Ver histórico' }))

    expect(screen.getByRole('status')).toHaveTextContent(
      'Ver histórico ficará disponível no lote do fluxo correspondente.',
    )
  })
})

describe('Registrar compra', () => {
  function openPurchase() {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Abrir ações de registro' }))
    fireEvent.click(screen.getByRole('menuitem', { name: 'Compra' }))
  }

  it('abre pelo menu Registrar com os dados mockados preenchidos', () => {
    openPurchase()

    expect(screen.getByRole('heading', { name: 'Registrar compra' })).toBeInTheDocument()
    expect(screen.getByLabelText('Produto')).toHaveValue('caneca')
    expect(screen.getByLabelText('Fornecedor')).toHaveValue('Atacado Jardim')
    expect(screen.getByLabelText('Quantidade')).toHaveValue(12)
    expect(screen.getByLabelText('Custo unitário')).toHaveValue('18,00')
    expect(screen.getByText('Estoque próprio')).toBeInTheDocument()
  })

  it('recalcula o efeito esperado quando a quantidade muda', () => {
    openPurchase()

    fireEvent.change(screen.getByLabelText('Quantidade'), { target: { value: '5' } })

    expect(screen.getByText(/Aumenta o estoque próprio de Caneca Flores/)).toHaveTextContent(
      'de 2 para 7 unidades',
    )
  })

  it('valida os campos obrigatórios antes da simulação', () => {
    openPurchase()

    fireEvent.change(screen.getByLabelText('Fornecedor'), { target: { value: '' } })
    fireEvent.click(screen.getByRole('button', { name: 'Salvar simulação' }))

    expect(screen.getByRole('alert')).toHaveTextContent('Informe o fornecedor da compra.')
    expect(screen.getByRole('heading', { name: 'Registrar compra' })).toBeInTheDocument()
  })

  it('confirma a simulação sem apresentar o dado como persistido', () => {
    openPurchase()

    fireEvent.click(screen.getByRole('button', { name: 'Salvar simulação' }))

    expect(screen.getByRole('heading', { name: 'Compra simulada' })).toBeInTheDocument()
    expect(screen.getByText('A conferência foi concluída. Nenhum dado foi salvo no banco.')).toBeInTheDocument()
    expect(screen.getByText(/Aumentaria o estoque próprio de Caneca Flores/)).toHaveTextContent(
      'de 2 para 14 unidades',
    )

    fireEvent.click(screen.getByRole('button', { name: 'Repetir esta compra' }))
    expect(screen.getByRole('heading', { name: 'Registrar compra' })).toBeInTheDocument()
  })
})

describe('Registrar envio', () => {
  function openShipping() {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Abrir ações de registro' }))
    fireEvent.click(screen.getByRole('menuitem', { name: 'Envio' }))
  }

  it('abre pelo menu Registrar com origem, destino e dados mockados', () => {
    openShipping()

    expect(screen.getByRole('heading', { name: 'Registrar envio' })).toBeInTheDocument()
    expect(screen.getByLabelText('Ponto Parceiro')).toHaveValue('loja')
    expect(screen.getByLabelText('Produto')).toHaveValue('vela')
    expect(screen.getByLabelText('Quantidade')).toHaveValue(2)
    expect(screen.getByLabelText('Trajeto da mercadoria')).toHaveTextContent('Estoque próprio')
    expect(screen.getByLabelText('Trajeto da mercadoria')).toHaveTextContent('Loja da Ana')
  })

  it('calcula a saída do estoque próprio e a entrada no parceiro', () => {
    openShipping()

    expect(screen.getByText(/O estoque próprio passaria/)).toHaveTextContent(
      'de 4 para 2 unidades, e o estoque no Loja da Ana passaria de 2 para 4 unidades.',
    )
    expect(screen.getByText('Envio não é venda. A mercadoria continua sob acompanhamento.')).toBeInTheDocument()
  })

  it('rejeita a simulação quando o estoque próprio é insuficiente', () => {
    openShipping()

    fireEvent.change(screen.getByLabelText('Produto'), { target: { value: 'kit' } })
    fireEvent.change(screen.getByLabelText('Quantidade'), { target: { value: '1' } })
    fireEvent.click(screen.getByRole('button', { name: 'Salvar simulação' }))

    expect(screen.getByRole('alert')).toHaveTextContent('Estoque insuficiente. Há 0 unidades no estoque próprio.')
    expect(screen.getByRole('heading', { name: 'Registrar envio' })).toBeInTheDocument()
  })

  it('abre pelas ações do parceiro com o destino correspondente', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Parceiros' }))
    fireEvent.click(screen.getByRole('button', { name: 'Ações de Salão Bella' }))
    fireEvent.click(screen.getByRole('menuitem', { name: 'Registrar envio' }))

    expect(screen.getByRole('heading', { name: 'Registrar envio' })).toBeInTheDocument()
    expect(screen.getByLabelText('Ponto Parceiro')).toHaveValue('salao')
    expect(screen.getByLabelText('Trajeto da mercadoria')).toHaveTextContent('Salão Bella')
  })

  it('confirma o envio como simulação sem transformá-lo em venda', () => {
    openShipping()

    fireEvent.click(screen.getByRole('button', { name: 'Salvar simulação' }))

    expect(screen.getByRole('heading', { name: 'Envio simulado' })).toBeInTheDocument()
    expect(screen.getByText('A conferência foi concluída. Nenhum dado foi salvo no banco.')).toBeInTheDocument()
    expect(screen.getByText(/O estoque próprio de Vela Baunilha passaria/)).toHaveTextContent(
      'de 4 para 2 unidades',
    )
    expect(
      screen.getByText('Envio não é venda. A mercadoria continua sendo acompanhada no Ponto Parceiro.'),
    ).toBeInTheDocument()
  })
})
