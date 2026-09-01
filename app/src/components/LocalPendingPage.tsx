import { useEffect, useState } from 'react'
import { listOutboxCommands } from '../services/localDatabase'
import { presentLocalPendingCommand, type LocalPendingItem } from '../services/localPendingPresentation'

export function LocalPendingPage({ onBack }: { onBack: () => void }) {
  const [items, setItems] = useState<LocalPendingItem[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    let active = true

    listOutboxCommands()
      .then((commands) => {
        if (!active) return
        setItems(commands.map(presentLocalPendingCommand))
        setStatus('ready')
      })
      .catch(() => {
        if (active) setStatus('error')
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <main className="conteudo-consulta">
      <button className="botao-voltar" type="button" onClick={onBack}>
        ‹ Voltar
      </button>
      <div className="cabecalho-tela">
        <h2>Salvos neste aparelho</h2>
        <p>Operações que ainda não foram confirmadas pelo banco central.</p>
      </div>

      {status === 'loading' ? <p className="consulta-lista-vazia visivel">Conferindo registros locais...</p> : null}
      {status === 'error' ? (
        <div className="estoque-aviso alerta visivel" role="alert">
          Não foi possível consultar os registros deste aparelho agora.
        </div>
      ) : null}
      {status === 'ready' && items.length === 0 ? (
        <p className="consulta-lista-vazia visivel">Nenhuma operação aguardando envio.</p>
      ) : null}

      {status === 'ready' && items.length > 0 ? (
        <>
          <div className="estoque-barra">
            <small>{`${items.length} ${items.length === 1 ? 'operação local' : 'operações locais'}`}</small>
          </div>
          <div className="lista consulta-lista" aria-label="Operações salvas neste aparelho">
            {items.map((item) => (
              <article className="cartao pendencia-local-item" key={item.id}>
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.detail}</span>
                  <small>{item.createdLabel}</small>
                </div>
                <span className="estado pendencia-local-estado">{item.statusLabel}</span>
              </article>
            ))}
          </div>
        </>
      ) : null}

      <p className="alerta-conceitual">
        Estes registros permanecem no aparelho até a futura sincronização. Não limpe os dados do navegador enquanto houver pendências.
      </p>
    </main>
  )
}
