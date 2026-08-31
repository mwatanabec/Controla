import { useEffect, useMemo, useRef, useState, type MouseEvent } from 'react'
import { getPartnerTotal, getStockTotal, stockProducts } from '../data/stock'
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
}: {
  product: StockProduct
  openMenuId: string | null
  onToggleMenu: (productId: string) => void
  onAction: (action: string) => void
  onOpenDistribution: (product: StockProduct) => void
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
          <span>Meu estoque</span>
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
        <span>Estoque total</span>
        <strong>{quantityLabel(getStockTotal(product))}</strong>
      </div>
    </article>
  )
}

function StockDetailsCard({ product }: { product: StockProduct }) {
  return (
    <article className="cartao produto-detalhado">
      <div className="produto-cabecalho">
        <ProductIdentity product={product} />
      </div>
      <div className="quadro-detalhes">
        <div className="linha-detalhe">
          <span>Meu estoque</span>
          <strong>{quantityLabel(product.ownQuantity)}</strong>
        </div>
        {product.partners.map((partner) => (
          <div className="linha-detalhe" key={partner.name}>
            <span>{partner.name}</span>
            <strong>{quantityLabel(partner.quantity)}</strong>
          </div>
        ))}
        <div className="linha-detalhe">
          <span>Estoque total</span>
          <strong>{quantityLabel(getStockTotal(product))}</strong>
        </div>
      </div>
      <div className={`efeito${product.status === 'ok' ? '' : ' alerta'}`}>{product.detailMessage}</div>
    </article>
  )
}

function StockDistribution({ product, onClose }: { product: StockProduct; onClose: () => void }) {
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
            <span>Meu estoque</span>
            <strong>{quantityLabel(product.ownQuantity)}</strong>
          </div>
          {product.partners.map((partner) => (
            <div className="linha-detalhe" key={partner.name}>
              <span>{partner.name}</span>
              <strong>{quantityLabel(partner.quantity)}</strong>
            </div>
          ))}
          <div className="linha-detalhe">
            <span>Estoque total</span>
            <strong>{quantityLabel(getStockTotal(product))}</strong>
          </div>
        </div>
      </div>
    </div>
  )
}

export function StockPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<StockFilter>('all')
  const [view, setView] = useState<StockView>('list')
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<StockProduct | null>(null)
  const [notice, setNotice] = useState('')

  const visibleProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase('pt-BR')

    return stockProducts.filter((product) => {
      const matchesSearch = !normalizedSearch || product.name.toLocaleLowerCase('pt-BR').includes(normalizedSearch)
      const matchesFilter =
        filter === 'all' ||
        (filter === 'low' && product.status === 'low') ||
        (filter === 'out' && product.status === 'out') ||
        (filter === 'partners' && getPartnerTotal(product) > 0)

      return matchesSearch && matchesFilter
    })
  }, [filter, search])

  function selectFilter(nextFilter: StockFilter) {
    setFilter(nextFilter)
    setOpenMenuId(null)
  }

  function selectView(nextView: StockView) {
    setView(nextView)
    setOpenMenuId(null)
  }

  function showActionNotice(action: string) {
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
              key={product.id}
            />
          ))}
        </div>
      ) : (
        <div className="estoque-detalhado">
          {visibleProducts.map((product) => (
            <StockDetailsCard product={product} key={product.id} />
          ))}
        </div>
      )}

      {selectedProduct ? <StockDistribution product={selectedProduct} onClose={() => setSelectedProduct(null)} /> : null}
    </main>
  )
}
