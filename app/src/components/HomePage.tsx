import { useEffect, useState } from 'react'
import { lowStockProducts, partnerPendingItems, recentActivities, summary } from '../data/home'
import { countOutboxCommands } from '../services/localDatabase'

type HomePageProps = {
  onUnavailable: (feature: string) => void
  onOpenStock: () => void
  onOpenPartners: () => void
  onOpenLocalPending: () => void
}

export function HomePage({ onUnavailable, onOpenStock, onOpenPartners, onOpenLocalPending }: HomePageProps) {
  const [localPendingCount, setLocalPendingCount] = useState(0)

  useEffect(() => {
    let active = true
    countOutboxCommands()
      .then((count) => {
        if (active) setLocalPendingCount(count)
      })
      .catch(() => undefined)

    return () => {
      active = false
    }
  }, [])

  return (
      <main className="conteudo-home">
        <section className="indicadores" aria-label="Resumo do que exige atenção">
          {summary.map((item) => (
            <div className="indicador" key={item.label}>
              <strong className="indicador-numero">{item.value}</strong>
              <span className="indicador-rotulo">{item.label}</span>
            </div>
          ))}
        </section>

        {localPendingCount > 0 ? (
          <button className="resumo-pendencias-locais" type="button" onClick={onOpenLocalPending}>
            <span>
              <strong>
                {localPendingCount} {localPendingCount === 1 ? 'registro salvo' : 'registros salvos'} neste aparelho
              </strong>
              <small>Ainda não {localPendingCount === 1 ? 'foi enviado' : 'foram enviados'} ao banco central.</small>
            </span>
            <span aria-hidden="true">Ver ›</span>
          </button>
        ) : null}

        <section className="prioridade" aria-labelledby="titulo-prioridade">
          <span className="sinal-atencao">Atenção</span>
          <h2 id="titulo-prioridade">3 produtos precisam de reposição</h2>
          <p>Confira o que está acabando antes da próxima compra.</p>
          <button className="botao-reposicao" type="button" onClick={() => onUnavailable('Reposição')}>
            Ver reposição
          </button>
        </section>

        <section className="secao-lista" aria-labelledby="titulo-produtos">
          <div className="cabecalho-secao">
            <h2 className="titulo-secao" id="titulo-produtos">
              Produtos acabando
            </h2>
            <button className="link-discreto" type="button" onClick={onOpenStock}>
              Ver todos
            </button>
          </div>
          <div className="cartao-lista">
            {lowStockProducts.map((product) => (
              <article className="item-produto" key={product.id}>
                <div className="linha-produto">
                  <div>
                    <strong className="nome-item">{product.name}</strong>
                    <span className="detalhe-item">{product.detail}</span>
                  </div>
                  <span className="estado">{product.status}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="secao-lista" aria-labelledby="titulo-parceiros">
          <div className="cabecalho-secao">
            <h2 className="titulo-secao" id="titulo-parceiros">
              Pendências com parceiros
            </h2>
          </div>
          <div className="cartao-lista">
            {partnerPendingItems.map((partner) => (
              <article className="item-parceiro" key={partner.id}>
                <div>
                  <strong className="nome-item">{partner.name}</strong>
                  <span className="detalhe-item">{partner.detail}</span>
                </div>
                <button
                  className="ver-item"
                  type="button"
                  aria-label={`Ver pendência de ${partner.name}`}
                  onClick={onOpenPartners}
                >
                  Ver
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="secao-lista" aria-labelledby="titulo-atividades">
          <div className="cabecalho-secao">
            <h2 className="titulo-secao" id="titulo-atividades">
              Atividades recentes
            </h2>
          </div>
          <div className="cartao-lista">
            {recentActivities.map((activity) => (
              <article className="item-atividade" key={activity.id}>
                <span className="atividade-icone" aria-hidden="true">
                  {activity.abbreviation}
                </span>
                <div className="atividade-texto">
                  <strong className="nome-item">{activity.title}</strong>
                  <span className="detalhe-item">{activity.detail}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
  )
}
