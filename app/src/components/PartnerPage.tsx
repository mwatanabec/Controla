import { useEffect, useMemo, useRef, useState, type MouseEvent } from 'react'
import { partners } from '../data/partners'
import type { Partner, PartnerFilter, PartnerView } from '../types/partner'

const filters: Array<{ value: PartnerFilter; label: string }> = [
  { value: 'all', label: 'Todos' },
  { value: 'pending', label: 'Com pendência' },
  { value: 'stale', label: 'Sem atualização' },
]

const partnerActions = ['Registrar venda', 'Registrar envio', 'Editar parceiro']

function PartnerIdentity({ partner }: { partner: Partner }) {
  return (
    <div className="consulta-identidade">
      <strong>{partner.name}</strong>
      <span className="consulta-status">
        <span
          className={`consulta-status-ponto ${partner.status === 'pending' ? 'alerta' : 'erro'}`}
          aria-hidden="true"
        />
        {partner.statusLabel}
      </span>
    </div>
  )
}

function PartnerListCard({
  partner,
  openMenuId,
  onToggleMenu,
  onAction,
  onOpenDetails,
}: {
  partner: Partner
  openMenuId: string | null
  onToggleMenu: (partnerId: string) => void
  onAction: (action: string) => void
  onOpenDetails: (partner: Partner) => void
}) {
  const isMenuOpen = openMenuId === partner.id

  return (
    <article className="cartao consulta-item">
      <div className="consulta-cabecalho">
        <PartnerIdentity partner={partner} />
        <div className="consulta-menu-area">
          <button
            className="botao-menu"
            type="button"
            aria-label={`Ações de ${partner.name}`}
            aria-expanded={isMenuOpen}
            aria-haspopup="menu"
            onClick={(event) => {
              event.stopPropagation()
              onToggleMenu(partner.id)
            }}
          >
            ...
          </button>
          {isMenuOpen ? (
            <div className="consulta-menu" role="menu" aria-label={`Ações de ${partner.name}`}>
              {partnerActions.map((action) => (
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
        {partner.metrics.map((metric) => (
          <div className="consulta-resumo" key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </div>
        ))}
      </div>
      <div className="consulta-total">
        <span>{partner.summaryLabel}</span>
        <button className="link-discreto" type="button" onClick={() => onOpenDetails(partner)}>
          Ver detalhes
        </button>
      </div>
    </article>
  )
}

function PartnerDetailsCard({
  partner,
  onAction,
}: {
  partner: Partner
  onAction: (action: string) => void
}) {
  return (
    <article className="cartao parceiro-detalhado">
      <div className="consulta-cabecalho">
        <PartnerIdentity partner={partner} />
      </div>
      <div className="quadro-detalhes">
        {partner.details.map((detail) => (
          <div className="linha-detalhe" key={detail.label}>
            <span>{detail.label}</span>
            <strong>{detail.value}</strong>
          </div>
        ))}
      </div>
      <div className={`linha-botoes${partner.detailActions.length === 1 ? ' unica' : ''}`}>
        {partner.detailActions.map((action, index) => (
          <button
            className={index === 0 ? 'botao-secundario' : 'botao-fantasma'}
            type="button"
            key={action}
            onClick={() => onAction(action)}
          >
            {action}
          </button>
        ))}
      </div>
    </article>
  )
}

function PartnerSheet({ partner, onClose }: { partner: Partner; onClose: () => void }) {
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
        aria-labelledby="parceiro-modal-titulo"
        aria-describedby="parceiro-modal-subtitulo"
      >
        <div className="consulta-folha-cabecalho">
          <div>
            <h3 id="parceiro-modal-titulo">{partner.name}</h3>
            <p id="parceiro-modal-subtitulo">Mercadorias e situação do ponto.</p>
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
          {partner.details.map((detail) => (
            <div className="linha-detalhe" key={detail.label}>
              <span>{detail.label}</span>
              <strong>{detail.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function PartnerPage({
  onOpenReturn,
  onOpenSale,
  onOpenShipping,
}: {
  onOpenReturn: (partnerId: string) => void
  onOpenSale: (partnerId: string) => void
  onOpenShipping: (partnerId: string) => void
}) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<PartnerFilter>('all')
  const [view, setView] = useState<PartnerView>('list')
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)
  const [notice, setNotice] = useState('')

  const visiblePartners = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase('pt-BR')

    return partners.filter((partner) => {
      const matchesSearch = !normalizedSearch || partner.name.toLocaleLowerCase('pt-BR').includes(normalizedSearch)
      const matchesFilter = filter === 'all' || partner.status === filter

      return matchesSearch && matchesFilter
    })
  }, [filter, search])

  function handleAction(action: string, partner: Partner) {
    if (action === 'Registrar devolução') {
      onOpenReturn(partner.id)
      return
    }
    if (action === 'Registrar venda') {
      onOpenSale(partner.id)
      return
    }
    if (action === 'Registrar envio' || action === 'Registrar novo envio') {
      onOpenShipping(partner.id)
      return
    }
    setNotice(`${action} ficará disponível no lote do fluxo correspondente.`)
    setOpenMenuId(null)
  }

  const countLabel = `${visiblePartners.length} ${visiblePartners.length === 1 ? 'Ponto Parceiro' : 'Pontos Parceiros'}`

  return (
    <main className="conteudo-consulta" onClick={() => setOpenMenuId(null)}>
      <div className="cabecalho-tela">
        <h2 id="titulo-parceiros">Pontos Parceiros</h2>
        <p>Veja o que está em cada ponto e o que precisa conferir.</p>
      </div>

      {notice ? (
        <div className="estoque-aviso visivel" role="status">
          {notice}
        </div>
      ) : null}

      <div className="consulta-busca">
        <input
          type="search"
          placeholder="Buscar Ponto Parceiro"
          aria-label="Buscar Ponto Parceiro"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="consulta-filtros" role="group" aria-label="Filtrar Pontos Parceiros">
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
        <div className="controle-visao" role="group" aria-label="Escolher visualização dos parceiros">
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

      {visiblePartners.length === 0 ? (
        <p className="consulta-lista-vazia visivel">Nenhum Ponto Parceiro encontrado.</p>
      ) : view === 'list' ? (
        <div className="lista consulta-lista">
          {visiblePartners.map((partner) => (
            <PartnerListCard
              partner={partner}
              openMenuId={openMenuId}
              onToggleMenu={(partnerId) => setOpenMenuId((current) => (current === partnerId ? null : partnerId))}
              onAction={(action) => handleAction(action, partner)}
              onOpenDetails={setSelectedPartner}
              key={partner.id}
            />
          ))}
        </div>
      ) : (
        <div className="consulta-detalhado">
          {visiblePartners.map((partner) => (
            <PartnerDetailsCard partner={partner} onAction={(action) => handleAction(action, partner)} key={partner.id} />
          ))}
        </div>
      )}

      {selectedPartner ? <PartnerSheet partner={selectedPartner} onClose={() => setSelectedPartner(null)} /> : null}
    </main>
  )
}
