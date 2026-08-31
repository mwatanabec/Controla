import { businessName } from '../data/home'

type AppHeaderProps = {
  supportText?: string
}

export function AppHeader({ supportText = 'Veja o que precisa da sua atenção hoje.' }: AppHeaderProps) {
  return (
    <header className="topo">
      <div className="marca">
        <span className="marca-simbolo" aria-hidden="true">
          C
        </span>
        <span>Controla</span>
      </div>
      <h1 className="saudacao">Olá, {businessName}</h1>
      <p className="apoio">{supportText}</p>
    </header>
  )
}
