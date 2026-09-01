import { useEffect, useState } from 'react'
import './App.css'
import { AppHeader } from './components/AppHeader'
import { BottomNavigation } from './components/BottomNavigation'
import { HomePage } from './components/HomePage'
import { PartnerPage } from './components/PartnerPage'
import { PurchasePage } from './components/PurchasePage'
import { SettlementPage } from './components/SettlementPage'
import { ShippingPage } from './components/ShippingPage'
import { StockPage } from './components/StockPage'
import type { AppRoute } from './types/navigation'

function routeFromAddress(): AppRoute {
  if (window.location.hash === '#estoque') return 'stock'
  if (window.location.hash === '#parceiros') return 'partners'
  if (window.location.hash === '#acertos') return 'settlements'
  if (window.location.hash === '#registrar-compra') return 'purchase'
  if (window.location.hash === '#registrar-envio') return 'shipping'
  return 'home'
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>(routeFromAddress)
  const [notice, setNotice] = useState('')
  const [shippingPartnerId, setShippingPartnerId] = useState('')

  useEffect(() => {
    function syncRoute() {
      setRoute(routeFromAddress())
      setNotice('')
    }

    window.addEventListener('popstate', syncRoute)
    window.addEventListener('hashchange', syncRoute)
    return () => {
      window.removeEventListener('popstate', syncRoute)
      window.removeEventListener('hashchange', syncRoute)
    }
  }, [])

  function showNextLotNotice(feature: string) {
    setNotice(`Este recurso será implementado nos próximos lotes: ${feature}.`)
  }

  function navigate(nextRoute: AppRoute) {
    const address = new URL(window.location.href)
    address.hash =
      nextRoute === 'stock'
        ? 'estoque'
        : nextRoute === 'partners'
          ? 'parceiros'
          : nextRoute === 'settlements'
            ? 'acertos'
            : nextRoute === 'purchase'
              ? 'registrar-compra'
              : nextRoute === 'shipping'
                ? 'registrar-envio'
            : ''
    window.history.pushState(null, '', address)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    setNotice('')
    setRoute(nextRoute)
  }

  function openShipping(partnerId = '') {
    setShippingPartnerId(partnerId)
    navigate('shipping')
  }

  return (
    <div className="app">
      <AppHeader />
      {route === 'home' ? (
        <HomePage
          onUnavailable={showNextLotNotice}
          onOpenStock={() => navigate('stock')}
          onOpenPartners={() => navigate('partners')}
        />
      ) : route === 'stock' ? (
        <StockPage onOpenPurchase={() => navigate('purchase')} />
      ) : route === 'partners' ? (
        <PartnerPage onOpenShipping={openShipping} />
      ) : route === 'settlements' ? (
        <SettlementPage />
      ) : route === 'purchase' ? (
        <PurchasePage onBack={() => navigate('home')} />
      ) : (
        <ShippingPage initialPartnerId={shippingPartnerId} onBack={() => navigate('home')} />
      )}
      {notice ? (
        <div className="aviso-proximo-lote" role="status">
          {notice}
        </div>
      ) : null}
      <BottomNavigation
        activeRoute={route}
        onNavigate={navigate}
        onOpenShipping={() => openShipping()}
        onUnavailable={showNextLotNotice}
      />
    </div>
  )
}
