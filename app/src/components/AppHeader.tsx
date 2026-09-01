type AppHeaderProps = {
  businessName: string
  onSignOut: () => void
  supportText?: string
}

export function AppHeader({ businessName, onSignOut, supportText = 'Veja o que precisa da sua atenção hoje.' }: AppHeaderProps) {
  return (
    <header className="topo">
      <div className="marca">
        <span className="marca-simbolo" aria-hidden="true">
          C
        </span>
        <span>Controla</span>
        <button className="sair" type="button" onClick={onSignOut}>
          Sair
        </button>
      </div>
      <h1 className="saudacao">Olá, {businessName}</h1>
      <p className="apoio">{supportText}</p>
    </header>
  )
}
