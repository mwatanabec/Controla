import { useEffect, useState } from 'react'
import './App.css'
import { AppHeader } from './components/AppHeader'
import { BottomNavigation } from './components/BottomNavigation'
import { HomePage } from './components/HomePage'
import { StockPage } from './components/StockPage'
import type { AppRoute } from './types/navigation'

function routeFromAddress(): AppRoute {
  return window.location.hash === '#estoque' ? 'stock' : 'home'
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>(routeFromAddress)
  const [notice, setNotice] = useState('')

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
    address.hash = nextRoute === 'stock' ? 'estoque' : ''
    window.history.pushState(null, '', address)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    setNotice('')
    setRoute(nextRoute)
  }

  return (
    <div className="app">
      <AppHeader />
      {route === 'home' ? (
        <HomePage onUnavailable={showNextLotNotice} onOpenStock={() => navigate('stock')} />
      ) : (
        <StockPage />
      )}
      {notice ? (
        <div className="aviso-proximo-lote" role="status">
          {notice}
        </div>
      ) : null}
      <BottomNavigation activeRoute={route} onNavigate={navigate} onUnavailable={showNextLotNotice} />
    </div>
  )
}
