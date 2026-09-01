import { useEffect, useMemo, useRef, useState, type MouseEvent } from 'react'
import { getPartnerTotal, getStockTotal, stockProducts } from '../data/stock'
import { listOutboxCommands } from '../services/localDatabase'
import { projectStockProducts } from '../services/stockProjection'
import type { StockFilter, StockProduct, StockView } from '../types/stock'

const filters: Array<{ value: StockFilter; label: string }> = [
  { value: 'all', label: 'Todos' },
  { value: 'low', label: 'Baixo estoque' },
  { value: 'partners', label: 'Em pontos' },
  { value: 'out', label: 'Sem estoque' },
]

const productActions = ['Editar produto', 'Registrar compra', 'Ajustar estoque']

function quantityLabel(quantity: number) {
  return `${quantity} ${quantity === 1 ? 'unidade' : 'unidades'}`
}

function ProductIdentity({ product }: { product: StockProduct }) {
  const statusClass = product.status === 'low' ? 'alerta' : product.status === 'out' ? 'sem-estoque' : ''

  return (
    <>
      <span
        className={`produto-foto ${product.photoTone}`}
        aria-label={`Foto ilustrativa de ${product.name}`}
      >
        {product.abbreviation}
      </span>
      <div className="produto-identidade">
        <strong>{product.name}</strong>
        <span className="status-produto">
          <span className={`status-ponto ${statusClass}`} aria-hidden="true" />
          {product.statusLabel}
        </span>
      </div>
    </>
  )
}

function StockListCard({
  product,
  openMenuId,
  onToggleMenu,
  onAction,
  onOpenDistribution,
  estimated,
}: {
  product: StockProduct
  openMenuId: string | null
  onToggleMenu: (productId: string) => void
  onAction: (action: string) => void
  onOpenDistribution: (product: StockProduct) => void
  estimated: boolean
}) {
  const partnerTotal = getPartnerTotal(product)
  const isMenuOpen = openMenuId === product.id

  return (
    <article className="cartao produto-item">
      <div className="produto-cabecalho">
        <ProductIdentity product={product} />
        <div className="produto-menu-area">
          <button
            className="botao-menu"
            type="button"
            aria-label={`Ações de ${product.name}`}
            aria-expanded={isMenuOpen}
            aria-haspopup="menu"
            onClick={(event) => {
              event.stopPropagation()
              onToggleMenu(product.id)
            }}
          >
            ...
          </button>
          {isMenuOpen ? (
            <div className="menu-produto" role="menu" aria-label={`Ações de ${product.name}`}>
              {productActions.map((action) => (
                <button
                  className="acao-menu"
                  type="button"
                  role="menuitem"
                  key={action}
                  onClick={(event) => {
                    event.stopPropagation()
                    onAction(action)
                  }}
                >
                  {action}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <div className="produto-numeros">
        <div className="numero-estoque">
          <span>{estimated ? 'Meu estoque estimado' : 'Meu estoque'}</span>
          <strong>{product.ownQuantity} un.</strong>
        </div>
        <button
          className="numero-estoque clicavel"
          type="button"
          aria-label={`Ver estoque de ${product.name} nos Pontos Parceiros`}
          onClick={() => onOpenDistribution(product)}
        >
          <span>Em Pontos Parceiros</span>
          <strong>{partnerTotal} un. &gt;</strong>
        </button>
      </div>
      <div className="produto-total">
        <span>{estimated ? 'Estoque total estimado' : 'Estoque total'}</span>
        <strong>{quantityLabel(getStockTotal(product))}</strong>
      </div>
    </article>
  )
}

function StockDetailsCard({ product, estimated }: { product: StockProduct; estimated: boolean }) {
  return (
    <article className="cartao produto-detalhado">
      <div className="produto-cabecalho">
        <ProductIdentity product={product} />
      </div>
      <div className="quadro-detalhes">
        <div className="linha-detalhe">
          <span>{estimated ? 'Meu estoque estimado' : 'Meu estoque'}</span>
          <strong>{quantityLabel(product.ownQuantity)}</strong>
        </div>
        {product.partners.map((partner) => (
          <div className="linha-detalhe" key={partner.name}>
            <span>{partner.name}</span>
            <strong>{quantityLabel(partner.quantity)}</strong>
          </div>
        ))}
        <div className="linha-detalhe">
          <span>{estimated ? 'Estoque total estimado' : 'Estoque total'}</span>
          <strong>{quantityLabel(getStockTotal(product))}</strong>
        </div>
      </div>
      <div className={`efeito${product.status === 'ok' ? '' : ' alerta'}`}>{product.detailMessage}</div>
    </article>
  )
}

function StockDistribution({
  product,
  onClose,
  estimated,
}: {
  product: StockProduct
  onClose: () => void
  estimated: boolean
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const partnerTotal = getPartnerTotal(product)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [onClose])

  function closeFromBackdrop(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) onClose()
  }

  return (
    <div className="estoque-modal" onMouseDown={closeFromBackdrop}>
      <div
        className="estoque-folha"
        role="dialog"
        aria-modal="true"
        aria-labelledby="estoque-modal-titulo"
        aria-describedby="estoque-modal-subtitulo"
      >
        <div className="estoque-folha-cabecalho">
          <div>
            <h3 id="estoque-modal-titulo">{product.name}</h3>
            <p id="estoque-modal-subtitulo">{quantityLabel(partnerTotal)} em Pontos Parceiros</p>
          </div>
          <button
            className="botao-fechar"
            type="button"
            aria-label="Fechar detalhe"
            onClick={onClose}
            ref={closeButtonRef}
          >
            ×
          </button>
        </div>
        <div className="quadro-detalhes">
          <div className="linha-detalhe">
            <span>{estimated ? 'Meu estoque estimado' : 'Meu estoque'}</span>
            <strong>{quantityLabel(product.ownQuantity)}</strong>
          </div>
          {product.partners.map((partner) => (
            <div className="linha-detalhe" key={partner.name}>
              <span>{partner.name}</span>
              <strong>{quantityLabel(partner.quantity)}</strong>
            </div>
          ))}
          <div className="linha-detalhe">
            <span>{estimated ? 'Estoque total estimado' : 'Estoque total'}</span>
            <strong>{quantityLabel(getStockTotal(product))}</strong>
          </div>
        </div>
      </div>
    </div>
  )
}

export function StockPage({ onOpenPurchase }: { onOpenPurchase: () => void }) {
  const [products, setProducts] = useState(stockProducts)
  const [localMovementCount, setLocalMovementCount] = useState(0)
  const [projectionError, setProjectionError] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<StockFilter>('all')
  const [view, setView] = useState<StockView>('list')
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<StockProduct | null>(null)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    let active = true

    listOutboxCommands()
      .then((commands) => {
        if (!active) return
        const projection = projectStockProducts(stockProducts, commands)
        setProducts(projection.products)
        setLocalMovementCount(projection.appliedCommandCount)
      })
      .catch(() => {
        if (active) setProjectionError(true)
      })

    return () => {
      active = false
    }
  }, [])

  const visibleProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase('pt-BR')

    return products.filter((product) => {
      const matchesSearch = !normalizedSearch || product.name.toLocaleLowerCase('pt-BR').includes(normalizedSearch)
      const matchesFilter =
        filter === 'all' ||
        (filter === 'low' && product.status === 'low') ||
        (filter === 'out' && product.status === 'out') ||
        (filter === 'partners' && getPartnerTotal(product) > 0)

      return matchesSearch && matchesFilter
    })
  }, [filter, products, search])

  function selectFilter(nextFilter: StockFilter) {
    setFilter(nextFilter)
    setOpenMenuId(null)
  }

  function selectView(nextView: StockView) {
    setView(nextView)
    setOpenMenuId(null)
  }

  function showActionNotice(action: string) {
    if (action === 'Registrar compra') {
      onOpenPurchase()
      return
    }
    setNotice(`${action} ficará disponível no lote do fluxo correspondente.`)
    setOpenMenuId(null)
  }

  return (
    <main className="conteudo-estoque" onClick={() => setOpenMenuId(null)}>
      <div className="cabecalho-tela">
        <h2 id="titulo-estoque">Estoque</h2>
        <p>Veja rapidamente o que está com você e nos Pontos Parceiros.</p>
      </div>

      {notice ? (
        <div className="estoque-aviso visivel" role="status">
          {notice}
        </div>
      ) : null}

      {localMovementCount > 0 ? (
        <div className="estoque-aviso estimado visivel" role="status">
          Saldo estimado inclui {localMovementCount}{' '}
          {localMovementCount === 1 ? 'movimentação salva' : 'movimentações salvas'} neste aparelho.
        </div>
      ) : null}

      {projectionError ? (
        <div className="estoque-aviso alerta visivel" role="alert">
          Não foi possível incluir agora as movimentações salvas neste aparelho.
        </div>
      ) : null}

      <div className="estoque-busca">
        <input
          type="search"
          placeholder="Buscar produto"
          aria-label="Buscar produto no estoque"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="estoque-filtros" role="group" aria-label="Filtrar estoque">
        {filters.map((item) => (
          <button
            className={`filtro-estoque${filter === item.value ? ' ativo' : ''}`}
            type="button"
            aria-pressed={filter === item.value}
            key={item.value}
            onClick={() => selectFilter(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="estoque-barra">
        <small>{`${visibleProducts.length} ${visibleProducts.length === 1 ? 'produto' : 'produtos'}`}</small>
        <div className="controle-visao" role="group" aria-label="Escolher visualização">
          <button
            className={`botao-visao${view === 'list' ? ' ativo' : ''}`}
            type="button"
            aria-pressed={view === 'list'}
            onClick={() => selectView('list')}
          >
            Lista
          </button>
          <button
            className={`botao-visao${view === 'details' ? ' ativo' : ''}`}
            type="button"
            aria-pressed={view === 'details'}
            onClick={() => selectView('details')}
          >
            Detalhes
          </button>
        </div>
      </div>

      {visibleProducts.length === 0 ? (
        <p className="estoque-vazio visivel">Nenhum produto encontrado com esse filtro.</p>
      ) : view === 'list' ? (
        <div className="lista estoque-lista">
          {visibleProducts.map((product) => (
            <StockListCard
              product={product}
              openMenuId={openMenuId}
              onToggleMenu={(productId) => setOpenMenuId((current) => (current === productId ? null : productId))}
              onAction={showActionNotice}
              onOpenDistribution={setSelectedProduct}
              estimated={localMovementCount > 0}
              key={product.id}
            />
          ))}
        </div>
      ) : (
        <div className="estoque-detalhado">
          {visibleProducts.map((product) => (
            <StockDetailsCard product={product} estimated={localMovementCount > 0} key={product.id} />
          ))}
        </div>
      )}

      {selectedProduct ? (
        <StockDistribution
          product={selectedProduct}
          estimated={localMovementCount > 0}
          onClose={() => setSelectedProduct(null)}
        />
      ) : null}
    </main>
  )
}
