import { useEffect, useMemo, useRef, useState, type MouseEvent } from 'react'
import { settlements } from '../data/settlements'
import { loadProjectedSettlements } from '../services/settlementProjection'
import type { Settlement, SettlementFilter, SettlementView } from '../types/settlement'

const filters: Array<{ value: SettlementFilter; label: string }> = [
  { value: 'all', label: 'Todos' },
  { value: 'open', label: 'Em aberto' },
  { value: 'partial', label: 'Parcial' },
  { value: 'paid', label: 'Pagos' },
]

const settlementActions = ['Registrar pagamento', 'Ver histórico']

function SettlementIdentity({ settlement }: { settlement: Settlement }) {
  const statusClass = settlement.status === 'partial' ? 'alerta' : settlement.status === 'open' ? 'erro' : ''

  return (
    <div className="consulta-identidade">
      <strong>{settlement.partnerName}</strong>
      <span className="consulta-status">
        <span className={`consulta-status-ponto ${statusClass}`} aria-hidden="true" />
        {settlement.statusLabel}
      </span>
    </div>
  )
}

function Amounts({ settlement }: { settlement: Settlement }) {
  return (
    <div className="quadro-detalhes">
      {settlement.amounts.map((amount) => (
        <div className="linha-detalhe" key={amount.label}>
          <span>{amount.label}</span>
          <strong>{amount.value}</strong>
        </div>
      ))}
    </div>
  )
}

function SettlementListCard({
  settlement,
  openMenuId,
  onToggleMenu,
  onAction,
  onOpenDetails,
}: {
  settlement: Settlement
  openMenuId: string | null
  onToggleMenu: (settlementId: string) => void
  onAction: (action: string) => void
  onOpenDetails: (settlement: Settlement) => void
}) {
  const isMenuOpen = openMenuId === settlement.id

  return (
    <article className="cartao consulta-item">
      <div className="consulta-cabecalho">
        <SettlementIdentity settlement={settlement} />
        <div className="consulta-menu-area">
          <button
            className="botao-menu"
            type="button"
            aria-label={`Ações do acerto de ${settlement.partnerName}`}
            aria-expanded={isMenuOpen}
            aria-haspopup="menu"
            onClick={(event) => {
              event.stopPropagation()
              onToggleMenu(settlement.id)
            }}
          >
            ...
          </button>
          {isMenuOpen ? (
            <div className="consulta-menu" role="menu" aria-label={`Ações do acerto de ${settlement.partnerName}`}>
              {settlementActions.map((action) => (
                <button
                  className="consulta-menu-acao"
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
      <div className="consulta-resumos">
        {settlement.summaryAmounts.map((amount) => (
          <div className="consulta-resumo" key={amount.label}>
            <span>{amount.label}</span>
            <strong>{amount.value}</strong>
          </div>
        ))}
      </div>
      <div className="consulta-total">
        <span>{settlement.saleLabel}</span>
        <button className="link-discreto" type="button" onClick={() => onOpenDetails(settlement)}>
          Ver detalhes
        </button>
      </div>
    </article>
  )
}

function SettlementDetailsCard({
  settlement,
  onAction,
}: {
  settlement: Settlement
  onAction: (action: string) => void
}) {
  return (
    <article className="cartao acerto-detalhado">
      <div className="consulta-cabecalho">
        <SettlementIdentity settlement={settlement} />
      </div>
      <span className="consulta-apoio">{settlement.detailLabel}</span>
      <Amounts settlement={settlement} />
      <button
        className={settlement.actionTone === 'primary' ? 'botao-principal' : 'botao-secundario'}
        type="button"
        onClick={() => onAction(settlement.actionLabel)}
      >
        {settlement.actionLabel}
      </button>
    </article>
  )
}

function SettlementSheet({ settlement, onClose }: { settlement: Settlement; onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

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
    <div className="consulta-modal" onMouseDown={closeFromBackdrop}>
      <div
        className="consulta-folha"
        role="dialog"
        aria-modal="true"
        aria-labelledby="acerto-modal-titulo"
        aria-describedby="acerto-modal-subtitulo"
      >
        <div className="consulta-folha-cabecalho">
          <div>
            <h3 id="acerto-modal-titulo">{settlement.partnerName}</h3>
            <p id="acerto-modal-subtitulo">{settlement.statusLabel}</p>
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
        <Amounts settlement={settlement} />
      </div>
    </div>
  )
}

export function SettlementPage({ onOpenPayment }: { onOpenPayment: (settlementId: string) => void }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<SettlementFilter>('all')
  const [view, setView] = useState<SettlementView>('list')
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [projectedSettlements, setProjectedSettlements] = useState(settlements)
  const [localPaymentCount, setLocalPaymentCount] = useState(0)
  const [projectionError, setProjectionError] = useState(false)
  const [selectedSettlementId, setSelectedSettlementId] = useState<string | null>(null)
  const [notice, setNotice] = useState('')
  const selectedSettlement =
    projectedSettlements.find((settlement) => settlement.id === selectedSettlementId) ?? null

  useEffect(() => {
    let active = true

    loadProjectedSettlements()
      .then((projection) => {
        if (!active) return
        setProjectedSettlements(projection.settlements)
        setLocalPaymentCount(projection.appliedPaymentCount)
      })
      .catch(() => {
        if (active) setProjectionError(true)
      })

    return () => {
      active = false
    }
  }, [])

  const visibleSettlements = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase('pt-BR')

    return projectedSettlements.filter((settlement) => {
      const matchesSearch =
        !normalizedSearch || settlement.partnerName.toLocaleLowerCase('pt-BR').includes(normalizedSearch)
      const matchesFilter = filter === 'all' || settlement.status === filter

      return matchesSearch && matchesFilter
    })
  }, [filter, projectedSettlements, search])

  function handleAction(action: string, settlement: Settlement) {
    if (
      action === 'Registrar pagamento' ||
      action === 'Registrar acerto parcial' ||
      action === 'Registrar pagamento total'
    ) {
      onOpenPayment(settlement.id)
      return
    }
    setNotice(`${action} ficará disponível no lote do fluxo correspondente.`)
    setOpenMenuId(null)
  }

  const countLabel = `${visibleSettlements.length} ${visibleSettlements.length === 1 ? 'acerto' : 'acertos'}`

  return (
    <main className="conteudo-consulta" onClick={() => setOpenMenuId(null)}>
      <div className="cabecalho-tela">
        <h2 id="titulo-acertos">Acertos</h2>
        <p>Veja o que está em aberto e registre pagamentos sem apagar o histórico.</p>
      </div>

      {notice ? (
        <div className="estoque-aviso visivel" role="status">
          {notice}
        </div>
      ) : null}

      {localPaymentCount > 0 ? (
        <div className="estoque-aviso estimado visivel" role="status">
          Valores estimados incluem {localPaymentCount}{' '}
          {localPaymentCount === 1 ? 'pagamento salvo' : 'pagamentos salvos'} neste aparelho.
        </div>
      ) : null}

      {projectionError ? (
        <div className="estoque-aviso alerta visivel" role="alert">
          Não foi possível incluir agora os pagamentos salvos neste aparelho.
        </div>
      ) : null}

      <div className="consulta-busca">
        <input
          type="search"
          placeholder="Buscar parceiro"
          aria-label="Buscar acerto por parceiro"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="consulta-filtros" role="group" aria-label="Filtrar acertos">
        {filters.map((item) => (
          <button
            className={`filtro-consulta${filter === item.value ? ' ativo' : ''}`}
            type="button"
            aria-pressed={filter === item.value}
            key={item.value}
            onClick={() => {
              setFilter(item.value)
              setOpenMenuId(null)
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="estoque-barra">
        <small>{countLabel}</small>
        <div className="controle-visao" role="group" aria-label="Escolher visualização dos acertos">
          <button
            className={`botao-visao${view === 'list' ? ' ativo' : ''}`}
            type="button"
            aria-pressed={view === 'list'}
            onClick={() => setView('list')}
          >
            Lista
          </button>
          <button
            className={`botao-visao${view === 'details' ? ' ativo' : ''}`}
            type="button"
            aria-pressed={view === 'details'}
            onClick={() => setView('details')}
          >
            Detalhes
          </button>
        </div>
      </div>

      {visibleSettlements.length === 0 ? (
        <p className="consulta-lista-vazia visivel">Nenhum acerto encontrado.</p>
      ) : view === 'list' ? (
        <div className="lista consulta-lista">
          {visibleSettlements.map((settlement) => (
            <SettlementListCard
              settlement={settlement}
              openMenuId={openMenuId}
              onToggleMenu={(settlementId) =>
                setOpenMenuId((current) => (current === settlementId ? null : settlementId))
              }
              onAction={(action) => handleAction(action, settlement)}
              onOpenDetails={(item) => setSelectedSettlementId(item.id)}
              key={settlement.id}
            />
          ))}
        </div>
      ) : (
        <div className="consulta-detalhado">
          {visibleSettlements.map((settlement) => (
            <SettlementDetailsCard
              settlement={settlement}
              onAction={(action) => handleAction(action, settlement)}
              key={settlement.id}
            />
          ))}
        </div>
      )}

      {selectedSettlement ? (
        <SettlementSheet settlement={selectedSettlement} onClose={() => setSelectedSettlementId(null)} />
      ) : null}
    </main>
  )
}
