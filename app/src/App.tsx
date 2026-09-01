import { useEffect, useState } from 'react'
import './App.css'
import { AppHeader } from './components/AppHeader'
import { BottomNavigation } from './components/BottomNavigation'
import { HomePage } from './components/HomePage'
import { LocalPendingPage } from './components/LocalPendingPage'
import { LoginPage } from './components/LoginPage'
import { PartnerPage } from './components/PartnerPage'
import { PurchasePage } from './components/PurchasePage'
import { ReturnPage } from './components/ReturnPage'
import { SalePage } from './components/SalePage'
import { SettlementPage } from './components/SettlementPage'
import { SettlementPaymentPage } from './components/SettlementPaymentPage'
import { ShippingPage } from './components/ShippingPage'
import { StockPage } from './components/StockPage'
import { clearAuthSession, readAuthSession } from './services/authSession'
import type { AuthSession } from './types/auth'
import type { AppRoute } from './types/navigation'

function routeFromAddress(): AppRoute {
  if (window.location.hash === '#estoque') return 'stock'
  if (window.location.hash === '#parceiros') return 'partners'
  if (window.location.hash === '#acertos') return 'settlements'
  if (window.location.hash === '#registrar-compra') return 'purchase'
  if (window.location.hash === '#registrar-envio') return 'shipping'
  if (window.location.hash === '#registrar-venda') return 'sale'
  if (window.location.hash === '#registrar-devolucao') return 'return'
  if (window.location.hash === '#registrar-pagamento') return 'settlement-payment'
  if (window.location.hash === '#pendencias-locais') return 'local-pending'
  return 'home'
}

export default function App() {
  const [session, setSession] = useState<AuthSession | null>(readAuthSession)
  const [route, setRoute] = useState<AppRoute>(routeFromAddress)
  const [notice, setNotice] = useState('')
  const [shippingPartnerId, setShippingPartnerId] = useState('')
  const [salePartnerId, setSalePartnerId] = useState('')
  const [returnPartnerId, setReturnPartnerId] = useState('')
  const [paymentSettlementId, setPaymentSettlementId] = useState('')

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
                : nextRoute === 'sale'
                  ? 'registrar-venda'
                  : nextRoute === 'return'
                    ? 'registrar-devolucao'
                    : nextRoute === 'settlement-payment'
                      ? 'registrar-pagamento'
                      : nextRoute === 'local-pending'
                        ? 'pendencias-locais'
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

  function openSale(partnerId = '') {
    setSalePartnerId(partnerId)
    navigate('sale')
  }

  function openReturn(partnerId = '') {
    setReturnPartnerId(partnerId)
    navigate('return')
  }

  function openSettlementPayment(settlementId: string) {
    setPaymentSettlementId(settlementId)
    navigate('settlement-payment')
  }

  function signOut() {
    clearAuthSession()
    window.history.replaceState(null, '', window.location.pathname)
    setRoute('home')
    setSession(null)
  }

  if (!session) {
    return (
      <div className="app app-acesso">
        <LoginPage onAuthenticated={setSession} />
      </div>
    )
  }

  return (
    <div className="app">
      <AppHeader businessName={session.businessName} onSignOut={signOut} />
      {route === 'home' ? (
        <HomePage
          onUnavailable={showNextLotNotice}
          onOpenStock={() => navigate('stock')}
          onOpenPartners={() => navigate('partners')}
          onOpenLocalPending={() => navigate('local-pending')}
        />
      ) : route === 'stock' ? (
        <StockPage onOpenPurchase={() => navigate('purchase')} />
      ) : route === 'partners' ? (
        <PartnerPage onOpenReturn={openReturn} onOpenSale={openSale} onOpenShipping={openShipping} />
      ) : route === 'settlements' ? (
        <SettlementPage onOpenPayment={openSettlementPayment} />
      ) : route === 'purchase' ? (
        <PurchasePage onBack={() => navigate('home')} />
      ) : route === 'shipping' ? (
        <ShippingPage initialPartnerId={shippingPartnerId} onBack={() => navigate('home')} />
      ) : route === 'sale' ? (
        <SalePage initialPartnerId={salePartnerId} onBack={() => navigate('home')} />
      ) : route === 'return' ? (
        <ReturnPage initialPartnerId={returnPartnerId} onBack={() => navigate('home')} />
      ) : route === 'local-pending' ? (
        <LocalPendingPage onBack={() => navigate('home')} />
      ) : (
        <SettlementPaymentPage
          initialSettlementId={paymentSettlementId}
          onBack={() => navigate('settlements')}
        />
      )}
      {notice ? (
        <div className="aviso-proximo-lote" role="status">
          {notice}
        </div>
      ) : null}
      <BottomNavigation
        activeRoute={route}
        onNavigate={navigate}
        onOpenReturn={() => openReturn()}
        onOpenSale={() => openSale()}
        onOpenShipping={() => openShipping()}
        onUnavailable={showNextLotNotice}
      />
    </div>
  )
}
