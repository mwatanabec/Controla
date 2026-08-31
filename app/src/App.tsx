import { useState } from 'react'
import './App.css'
import { AppHeader } from './components/AppHeader'
import { BottomNavigation } from './components/BottomNavigation'
import { HomePage } from './components/HomePage'

export default function App() {
  const [notice, setNotice] = useState('')

  function showNextLotNotice(feature: string) {
    setNotice(`Este recurso será implementado nos próximos lotes: ${feature}.`)
  }

  return (
    <div className="app">
      <AppHeader />
      <HomePage onUnavailable={showNextLotNotice} onOpenStock={() => showNextLotNotice('Estoque')} />
      {notice ? (
        <div className="aviso-proximo-lote" role="status">
          {notice}
        </div>
      ) : null}
      <BottomNavigation
        activeRoute="home"
        onNavigate={(route) => {
          if (route === 'stock') showNextLotNotice('Estoque')
        }}
        onUnavailable={showNextLotNotice}
      />
    </div>
  )
}
