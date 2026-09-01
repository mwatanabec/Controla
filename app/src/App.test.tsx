import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import App from './App'
import { deleteLocalDatabase, listOutboxCommands } from './services/localDatabase'

afterEach(async () => {
  window.history.replaceState(null, '', '/')
  await deleteLocalDatabase()
})

async function waitForEstimatedStock() {
  await waitFor(() => expect(screen.getByRole('button', { name: 'Salvar neste aparelho' })).toBeEnabled())
}

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

  it('mostra como estimado o saldo de uma compra salva no aparelho', async () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Abrir ações de registro' }))
    fireEvent.click(screen.getByRole('menuitem', { name: 'Compra' }))
    fireEvent.click(screen.getByRole('button', { name: 'Salvar neste aparelho' }))
    await screen.findByRole('heading', { name: 'Compra salva na demonstração' })

    fireEvent.click(screen.getByRole('button', { name: 'Voltar para Início' }))
    fireEvent.click(screen.getByRole('button', { name: 'Estoque' }))

    expect(await screen.findByText('Saldo estimado inclui 1 movimentação salva neste aparelho.')).toBeInTheDocument()
    const canecaCard = screen.getByText('Caneca Flores').closest('article')
    expect(canecaCard).toHaveTextContent('Meu estoque estimado')
    expect(canecaCard).toHaveTextContent('14 un.')
    expect(canecaCard).toHaveTextContent('Estoque em dia')
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
    fireEvent.click(screen.getByRole('button', { name: 'Salvar neste aparelho' }))

    expect(screen.getByRole('alert')).toHaveTextContent('Informe o fornecedor da compra.')
    expect(screen.getByRole('heading', { name: 'Registrar compra' })).toBeInTheDocument()
  })

  it('salva a compra na outbox local sem apresentá-la como sincronizada', async () => {
    openPurchase()

    fireEvent.click(screen.getByRole('button', { name: 'Salvar neste aparelho' }))

    expect(await screen.findByRole('heading', { name: 'Compra salva na demonstração' })).toBeInTheDocument()
    expect(screen.getByText('Salvo neste aparelho')).toBeInTheDocument()
    expect(screen.getByText('Salvo neste aparelho. Ainda não foi enviada ao banco central.')).toBeInTheDocument()
    expect(screen.getByText(/Aumentaria o estoque próprio de Caneca Flores/)).toHaveTextContent(
      'de 2 para 14 unidades',
    )

    const commands = await listOutboxCommands()
    expect(commands).toHaveLength(1)
    expect(commands[0].command_type).toBe('purchase.confirm')
    expect(commands[0].payload).toMatchObject({
      product_name: 'Caneca Flores',
      supplier_name: 'Atacado Jardim',
      quantity: 12,
      unit_cost_cents: 1800,
      demo_mode: true,
    })

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

  it('rejeita o envio quando o estoque próprio é insuficiente', async () => {
    openShipping()

    fireEvent.change(screen.getByLabelText('Produto'), { target: { value: 'kit' } })
    fireEvent.change(screen.getByLabelText('Quantidade'), { target: { value: '1' } })
    await waitForEstimatedStock()
    fireEvent.click(screen.getByRole('button', { name: 'Salvar neste aparelho' }))

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

  it('salva o envio na outbox local sem transformá-lo em venda', async () => {
    openShipping()

    await waitForEstimatedStock()
    fireEvent.click(screen.getByRole('button', { name: 'Salvar neste aparelho' }))

    expect(await screen.findByRole('heading', { name: 'Envio salvo na demonstração' })).toBeInTheDocument()
    expect(screen.getByText('Salvo neste aparelho')).toBeInTheDocument()
    expect(screen.getByText('Salvo neste aparelho. Ainda não foi enviado ao banco central.')).toBeInTheDocument()
    expect(screen.getByText(/O estoque próprio de Vela Baunilha passaria/)).toHaveTextContent(
      'de 4 para 2 unidades',
    )
    expect(
      screen.getByText('Envio não é venda. A mercadoria continua sendo acompanhada no Ponto Parceiro.'),
    ).toBeInTheDocument()

    const commands = await listOutboxCommands()
    expect(commands).toHaveLength(1)
    expect(commands[0].command_type).toBe('transfer.confirm')
    expect(commands[0].payload).toMatchObject({
      transfer_type: 'send_to_partner',
      partner_name: 'Loja da Ana',
      product_name: 'Vela Baunilha',
      quantity: 2,
      demo_mode: true,
    })

    fireEvent.click(screen.getByRole('button', { name: 'Repetir este envio' }))
    await waitForEstimatedStock()
    expect(screen.getByText(/O estoque próprio passaria/)).toHaveTextContent('de 2 para 0 unidades')

    fireEvent.change(screen.getByLabelText('Quantidade'), { target: { value: '3' } })
    fireEvent.click(screen.getByRole('button', { name: 'Salvar neste aparelho' }))
    expect(screen.getByRole('alert')).toHaveTextContent('Estoque insuficiente. Há 2 unidades no estoque próprio.')
  })
})

describe('Registrar venda', () => {
  function openSale() {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Abrir ações de registro' }))
    fireEvent.click(screen.getByRole('menuitem', { name: 'Venda' }))
  }

  it('abre pelo menu Registrar como venda em Ponto Parceiro', () => {
    openSale()

    expect(screen.getByRole('heading', { name: 'Registrar venda' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ponto Parceiro' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByLabelText('Ponto Parceiro')).toHaveValue('salao')
    expect(screen.getByLabelText('Produto')).toHaveValue('caneca')
    expect(screen.getByLabelText('Preço usado')).toHaveValue('39,90')
  })

  it('calcula a baixa no parceiro e a pendência de acerto', () => {
    openSale()

    const effect = screen.getByText(/O saldo em Salão Bella passaria/)
    expect(effect).toHaveTextContent('de 4 para 1 unidades')
    expect(effect).toHaveTextContent(/Criaria.*119,70 para acerto/)
    expect(screen.getByText('Venda informada não significa pagamento recebido. O acerto vem depois.')).toBeInTheDocument()
  })

  it('salva venda direta com origem própria e sem criar acerto', async () => {
    openSale()

    fireEvent.click(screen.getByRole('button', { name: 'Venda direta' }))

    expect(screen.queryByLabelText('Ponto Parceiro')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Produto')).toHaveValue('vela')
    expect(screen.getByLabelText('Quantidade')).toHaveValue(1)
    expect(screen.getByText(/O saldo em Estoque próprio passaria/)).toHaveTextContent('de 4 para 3 unidades')
    expect(screen.getByText(/Total da venda/)).toHaveTextContent('Não cria acerto')

    await waitForEstimatedStock()
    fireEvent.click(screen.getByRole('button', { name: 'Salvar neste aparelho' }))

    expect(await screen.findByRole('heading', { name: 'Venda direta salva' })).toBeInTheDocument()
    const commands = await listOutboxCommands()
    expect(commands).toHaveLength(1)
    expect(commands[0].command_type).toBe('sale.confirm')
    expect(commands[0].payload).toMatchObject({
      sale_channel: 'direct',
      partner_point_id: null,
      partner_name: null,
      items: [{ product_name: 'Vela Baunilha', quantity: 1, unit_price_cents: 2990 }],
      demo_mode: true,
    })
  })

  it('preserva o preço alterado no cálculo da simulação', () => {
    openSale()

    fireEvent.change(screen.getByLabelText('Preço usado'), { target: { value: '35,00' } })

    expect(screen.getByText(/O saldo em Salão Bella passaria/)).toHaveTextContent(/Criaria.*105,00 para acerto/)
  })

  it('rejeita venda comum sem saldo suficiente na origem', async () => {
    openSale()

    fireEvent.click(screen.getByRole('button', { name: 'Venda direta' }))
    fireEvent.change(screen.getByLabelText('Quantidade'), { target: { value: '5' } })
    await waitForEstimatedStock()
    fireEvent.click(screen.getByRole('button', { name: 'Salvar neste aparelho' }))

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Estoque insuficiente. Há 4 unidades disponíveis em Estoque próprio.',
    )
  })

  it('abre pela ação do parceiro e salva a venda com pendência de acerto', async () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Parceiros' }))
    fireEvent.click(screen.getByRole('button', { name: 'Ações de Salão Bella' }))
    fireEvent.click(screen.getByRole('menuitem', { name: 'Registrar venda' }))

    expect(screen.getByLabelText('Ponto Parceiro')).toHaveValue('salao')
    await waitForEstimatedStock()
    fireEvent.click(screen.getByRole('button', { name: 'Salvar neste aparelho' }))

    expect(await screen.findByRole('heading', { name: 'Venda no parceiro salva' })).toBeInTheDocument()
    expect(screen.getByText('Salvo neste aparelho')).toBeInTheDocument()
    expect(screen.getByText('Salvo neste aparelho. Ainda não foi enviada ao banco central.')).toBeInTheDocument()
    expect(screen.getByText(/O estoque de Caneca Flores em Salão Bella passaria/)).toHaveTextContent(
      /Criaria.*119,70 para acerto/,
    )

    const commands = await listOutboxCommands()
    expect(commands).toHaveLength(1)
    expect(commands[0].command_type).toBe('sale.confirm')
    expect(commands[0].payload).toMatchObject({
      sale_channel: 'partner',
      partner_name: 'Salão Bella',
      items: [{ product_name: 'Caneca Flores', quantity: 3, unit_price_cents: 3990 }],
      demo_mode: true,
    })
  })
})

describe('Registrar devolução', () => {
  function openReturn() {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Abrir ações de registro' }))
    fireEvent.click(screen.getByRole('menuitem', { name: 'Devolução' }))
  }

  it('abre pelo menu Registrar com origem e destino corretos', () => {
    openReturn()

    expect(screen.getByRole('heading', { name: 'Registrar devolução' })).toBeInTheDocument()
    expect(screen.getByLabelText('Ponto Parceiro')).toHaveValue('salao')
    expect(screen.getByLabelText('Produto')).toHaveValue('kit')
    expect(screen.getByLabelText('Quantidade')).toHaveValue(1)
    expect(screen.getByLabelText('Trajeto da devolução')).toHaveTextContent('Salão Bella')
    expect(screen.getByLabelText('Trajeto da devolução')).toHaveTextContent('Estoque próprio')
  })

  it('calcula a saída do parceiro e a volta ao estoque próprio', () => {
    openReturn()

    expect(screen.getByText(/O saldo no Salão Bella passaria/)).toHaveTextContent(
      'de 2 para 1 unidades, e o estoque próprio passaria de 0 para 1 unidades.',
    )
    expect(screen.getByText('Devolução não é venda cancelada. É uma movimentação de volta.')).toBeInTheDocument()
  })

  it('rejeita devolução maior que o saldo disponível no parceiro', async () => {
    openReturn()

    fireEvent.change(screen.getByLabelText('Quantidade'), { target: { value: '3' } })
    await waitForEstimatedStock()
    fireEvent.click(screen.getByRole('button', { name: 'Salvar neste aparelho' }))

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Estoque insuficiente. Há 2 unidades disponíveis no Salão Bella.',
    )
  })

  it('abre pela visão detalhada do parceiro com a origem preenchida', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Parceiros' }))
    fireEvent.click(screen.getByRole('button', { name: 'Detalhes' }))
    fireEvent.click(screen.getByRole('button', { name: 'Registrar devolução' }))

    expect(screen.getByRole('heading', { name: 'Registrar devolução' })).toBeInTheDocument()
    expect(screen.getByLabelText('Ponto Parceiro')).toHaveValue('salao')
  })

  it('salva a devolução como transferência sem cancelar venda', async () => {
    openReturn()

    await waitForEstimatedStock()
    fireEvent.click(screen.getByRole('button', { name: 'Salvar neste aparelho' }))

    expect(await screen.findByRole('heading', { name: 'Devolução salva na demonstração' })).toBeInTheDocument()
    expect(screen.getByText('Salvo neste aparelho')).toBeInTheDocument()
    expect(screen.getByText('Salvo neste aparelho. Ainda não foi enviada ao banco central.')).toBeInTheDocument()
    expect(screen.getByText(/O estoque de Kit Presente Lavanda no Salão Bella passaria/)).toHaveTextContent(
      'de 2 para 1 unidades',
    )
    expect(screen.getByText('Devolução é uma movimentação de volta. Não é venda cancelada.')).toBeInTheDocument()

    const commands = await listOutboxCommands()
    expect(commands).toHaveLength(1)
    expect(commands[0].command_type).toBe('transfer.confirm')
    expect(commands[0].payload).toMatchObject({
      transfer_type: 'return_from_partner',
      partner_name: 'Salão Bella',
      product_name: 'Kit Presente Lavanda',
      quantity: 1,
      demo_mode: true,
    })
  })
})

describe('Registrar pagamento de acerto', () => {
  function openPayment() {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Acertos' }))
    fireEvent.click(screen.getByRole('button', { name: 'Ações do acerto de Salão Bella' }))
    fireEvent.click(screen.getByRole('menuitem', { name: 'Registrar pagamento' }))
  }

  it('abre pela ação do acerto preservando os valores separados', () => {
    openPayment()

    expect(screen.getByRole('heading', { name: 'Registrar pagamento' })).toBeInTheDocument()
    expect(screen.getByLabelText('Acerto do parceiro')).toHaveValue('salao')
    expect(screen.getByText('R$ 119,70')).toBeInTheDocument()
    expect(screen.getByText('R$ 60,00')).toBeInTheDocument()
    expect(screen.getByLabelText('Valor acordado')).toHaveValue('110,00')
    expect(screen.getByLabelText('Pagamento agora')).toHaveValue('25,00')
  })

  it('calcula pagamento parcial e total sem apagar a venda', () => {
    openPayment()

    expect(screen.getByText(/Saldo antes/)).toHaveTextContent(/Depois deste pagamento:.*25,00/)
    fireEvent.click(screen.getByRole('button', { name: 'Total' }))

    expect(screen.getByLabelText('Pagamento agora')).toHaveValue('50,00')
    expect(screen.getByText(/Saldo antes/)).toHaveTextContent(/Depois deste pagamento:.*0,00/)
    expect(screen.getByText('A venda continua vinculada ao acerto mesmo depois do pagamento.')).toBeInTheDocument()
  })

  it('troca o acerto e recalcula pelos valores do parceiro', () => {
    openPayment()

    fireEvent.change(screen.getByLabelText('Acerto do parceiro'), { target: { value: 'loja' } })

    expect(screen.getByLabelText('Valor acordado')).toHaveValue('59,80')
    expect(screen.getByLabelText('Pagamento agora')).toHaveValue('29,90')
    expect(screen.getByText(/Saldo antes/)).toHaveTextContent(/59,80.*29,90/)
  })

  it('impede pagamento acima do saldo acordado', () => {
    openPayment()

    fireEvent.change(screen.getByLabelText('Pagamento agora'), { target: { value: '51,00' } })
    fireEvent.click(screen.getByRole('button', { name: 'Salvar neste aparelho' }))

    expect(screen.getByRole('alert')).toHaveTextContent(/O pagamento supera o saldo de.*50,00 deste acerto/)
  })

  it('abre pelo detalhe do acerto correspondente', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Acertos' }))
    fireEvent.click(screen.getByRole('button', { name: 'Detalhes' }))
    fireEvent.click(screen.getByRole('button', { name: 'Registrar pagamento total' }))

    expect(screen.getByRole('heading', { name: 'Registrar pagamento' })).toBeInTheDocument()
    expect(screen.getByLabelText('Acerto do parceiro')).toHaveValue('loja')
  })

  it('salva pagamento parcial sem apagar o histórico', async () => {
    openPayment()

    fireEvent.click(screen.getByRole('button', { name: 'Salvar neste aparelho' }))

    expect(await screen.findByRole('heading', { name: 'Pagamento parcial salvo' })).toBeInTheDocument()
    expect(screen.getByText('Salvo neste aparelho')).toBeInTheDocument()
    expect(screen.getByText('Salvo neste aparelho. Ainda não foi enviado ao banco central.')).toBeInTheDocument()
    expect(screen.getByText(/O valor pago passaria/)).toHaveTextContent(/60,00.*85,00/)
    expect(screen.getByText(/O valor pago passaria/)).toHaveTextContent(/25,00 para acertar/)
    expect(screen.getByText('O pagamento não apaga a venda vinculada nem o histórico do acerto.')).toBeInTheDocument()

    const commands = await listOutboxCommands()
    expect(commands).toHaveLength(1)
    expect(commands[0].command_type).toBe('settlement.payment')
    expect(commands[0].payload).toMatchObject({
      partner_name: 'Salão Bella',
      sale_label: '3 Canecas Flores',
      payment_mode: 'partial',
      calculated_amount_cents: 11970,
      agreed_amount_cents: 11000,
      previous_paid_amount_cents: 6000,
      amount_cents: 2500,
      difference_reason: 'Valor combinado com o parceiro',
      demo_mode: true,
    })
  })
})
