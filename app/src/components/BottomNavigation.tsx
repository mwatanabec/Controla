import { useState, type CSSProperties } from 'react'
import type { AppRoute } from '../types/navigation'
import { Icon } from './Icon'

type BottomNavigationProps = {
  activeRoute: AppRoute
  onNavigate: (route: AppRoute) => void
  onUnavailable: (feature: string) => void
}

const quickActions = [
  { label: 'Compra', icon: 'purchase', x: '-116px', y: '-28px' },
  { label: 'Envio', icon: 'shipping', x: '-62px', y: '-86px' },
  { label: 'Venda', icon: 'sale', x: '62px', y: '-86px' },
  { label: 'Devolução', icon: 'return', x: '116px', y: '-28px' },
] as const

export function BottomNavigation({ activeRoute, onNavigate, onUnavailable }: BottomNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  function closeMenu() {
    setIsOpen(false)
  }

  function chooseQuickAction(label: string) {
    closeMenu()
    onUnavailable(label)
  }

  return (
    <>
      <button
        className={`fundo-menu-radial${isOpen ? ' visivel' : ''}`}
        type="button"
        tabIndex={isOpen ? 0 : -1}
        aria-label="Fechar ações de registro"
        aria-hidden={!isOpen}
        onClick={closeMenu}
      />

      <nav className="navegacao-inferior" aria-label="Navegação principal">
        <button
          className="item-navegacao"
          type="button"
          aria-current={activeRoute === 'home' ? 'page' : undefined}
          onClick={() => onNavigate('home')}
        >
          <span className="icone-navegacao">
            <Icon name="home" />
          </span>
          <span>Início</span>
        </button>

        <button
          className="item-navegacao"
          type="button"
          aria-current={activeRoute === 'stock' ? 'page' : undefined}
          onClick={() => onNavigate('stock')}
        >
          <span className="icone-navegacao">
            <Icon name="stock" />
          </span>
          <span>Estoque</span>
        </button>

        <div className={`speed-dial${isOpen ? ' aberto' : ''}`}>
          <button
            className="item-navegacao item-registrar"
            type="button"
            aria-expanded={isOpen}
            aria-haspopup="menu"
            aria-controls="acoes-registro"
            aria-label={isOpen ? 'Fechar ações de registro' : 'Abrir ações de registro'}
            onClick={() => setIsOpen((current) => !current)}
          >
            <span className="icone-registrar" aria-hidden="true">
              +
            </span>
            <span>Registrar</span>
          </button>

          <div
            className="acoes-radiais"
            id="acoes-registro"
            role="menu"
            aria-label="Ações de registro"
            aria-hidden={!isOpen}
          >
            {quickActions.map((action) => (
              <button
                className="acao-radial"
                style={{ '--x': action.x, '--y': action.y } as CSSProperties}
                type="button"
                role="menuitem"
                key={action.label}
                tabIndex={isOpen ? 0 : -1}
                onClick={() => chooseQuickAction(action.label)}
              >
                <span className="icone-acao-radial">
                  <Icon name={action.icon} />
                </span>
                <span className="rotulo-acao-radial">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button className="item-navegacao" type="button" onClick={() => onUnavailable('Pontos Parceiros')}>
          <span className="icone-navegacao">
            <Icon name="partners" />
          </span>
          <span>Parceiros</span>
        </button>

        <button className="item-navegacao" type="button" onClick={() => onUnavailable('Acertos')}>
          <span className="icone-navegacao">
            <Icon name="settlements" />
          </span>
          <span>Acertos</span>
        </button>
      </nav>
    </>
  )
}
