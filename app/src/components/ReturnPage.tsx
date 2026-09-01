import { useMemo, useState, type FormEvent } from 'react'
import { partners } from '../data/partners'
import { initialReturnDraft } from '../data/return'
import { useEstimatedStock } from '../hooks/useEstimatedStock'
import {
  DEMO_OWN_LOCATION_ID,
  demoPartnerIds,
  demoPartnerLocationIds,
  demoProductIds,
  getDemoIdentity,
} from '../services/demoIdentity'
import { enqueueLocalCommand, syncStatusLabel } from '../services/localDatabase'
import type { ReturnDraft, ReturnResult } from '../types/return'

type ReturnPageProps = {
  initialPartnerId?: string
  onBack: () => void
}

function formatDate(value: string) {
  const [year, month, day] = value.split('-')
  return `${day}/${month}/${year}`
}

function ReturnConfirmation({
  result,
  onBack,
  onRepeat,
}: {
  result: ReturnResult
  onBack: () => void
  onRepeat: () => void
}) {
  return (
    <main className="conteudo-fluxo resultado-compra" aria-live="polite">
      <div className="resultado-status" aria-hidden="true">
        ✓
      </div>
      <div className="texto-centro">
        <span className="etiqueta-simulacao">Dados mockados</span>
        <h2>Devolução salva na demonstração</h2>
        <p>{syncStatusLabel(result.syncStatus)}. Ainda não foi enviada ao banco central.</p>
      </div>

      <article className="cartao resultado-resumo" aria-label="Resumo da devolução simulada">
        <div className="quadro-detalhes">
          <div className="linha-detalhe">
            <span>Ponto Parceiro</span>
            <strong>{result.partnerName}</strong>
          </div>
          <div className="linha-detalhe">
            <span>Produto</span>
            <strong>{result.productName}</strong>
          </div>
          <div className="linha-detalhe">
            <span>Quantidade</span>
            <strong>{result.quantity} unidades</strong>
          </div>
          <div className="linha-detalhe">
            <span>Data</span>
            <strong>{formatDate(result.date)}</strong>
          </div>
        </div>
      </article>

      <div className="estado-sync-local" role="status">
        <strong>{syncStatusLabel(result.syncStatus)}</strong>
        <span>Comando local {result.commandId.slice(0, 8)}</span>
      </div>

      <div className="efeito">
        O estoque de {result.productName} no {result.partnerName} passaria de {result.previousPartnerQuantity} para{' '}
        {result.nextPartnerQuantity} unidades, e o estoque próprio passaria de {result.previousOwnQuantity} para{' '}
        {result.nextOwnQuantity} unidades.
      </div>
      <p className="alerta-conceitual">Devolução é uma movimentação de volta. Não é venda cancelada.</p>

      <div className="linha-botoes">
        <button className="botao-principal" type="button" onClick={onBack}>
          Voltar para Início
        </button>
        <button className="botao-fantasma" type="button" onClick={onRepeat}>
          Repetir esta devolução
        </button>
      </div>
    </main>
  )
}

export function ReturnPage({ initialPartnerId, onBack }: ReturnPageProps) {
  const [draft, setDraft] = useState<ReturnDraft>({
    ...initialReturnDraft,
    partnerId: initialPartnerId || initialReturnDraft.partnerId,
  })
  const [error, setError] = useState('')
  const [result, setResult] = useState<ReturnResult | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const { products: estimatedProducts, status: stockStatus, refresh: refreshStock } = useEstimatedStock()

  const selectedPartner = useMemo(
    () => partners.find((partner) => partner.id === draft.partnerId) ?? partners[0],
    [draft.partnerId],
  )
  const selectedProduct = useMemo(
    () => estimatedProducts.find((product) => product.id === draft.productId) ?? estimatedProducts[0],
    [draft.productId, estimatedProducts],
  )
  const quantity = Number(draft.quantity)
  const validQuantity = Number.isInteger(quantity) && quantity > 0 ? quantity : 0
  const currentPartnerQuantity =
    selectedProduct.partners.find((partner) => partner.name === selectedPartner.name)?.quantity ?? 0
  const nextPartnerQuantity = Math.max(0, currentPartnerQuantity - validQuantity)
  const nextOwnQuantity = selectedProduct.ownQuantity + validQuantity

  function updateDraft(field: keyof ReturnDraft, value: string) {
    setDraft((current) => ({ ...current, [field]: value }))
    setError('')
  }

  async function submitReturn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!Number.isInteger(quantity) || quantity <= 0) {
      setError('Informe uma quantidade inteira maior que zero.')
      return
    }
    if (quantity > currentPartnerQuantity) {
      setError(`Estoque insuficiente. Há ${currentPartnerQuantity} unidades disponíveis no ${selectedPartner.name}.`)
      return
    }
    if (!draft.date) {
      setError('Informe a data da devolução.')
      return
    }

    setIsSaving(true)
    try {
      const identity = await getDemoIdentity()
      const command = await enqueueLocalCommand({
        ...identity,
        commandType: 'transfer.confirm',
        occurredAt: `${draft.date}T12:00:00.000Z`,
        payload: {
          transfer_id: crypto.randomUUID(),
          transfer_type: 'return_from_partner',
          source_location_id: demoPartnerLocationIds[selectedPartner.id],
          destination_location_id: DEMO_OWN_LOCATION_ID,
          partner_point_id: demoPartnerIds[selectedPartner.id],
          partner_name: selectedPartner.name,
          product_id: demoProductIds[selectedProduct.id],
          product_name: selectedProduct.name,
          quantity,
          occurred_date: draft.date,
          demo_mode: true,
        },
      })

      await refreshStock()

      setResult({
        commandId: command.command_id,
        syncStatus: 'queued',
        partnerName: selectedPartner.name,
        productName: selectedProduct.name,
        quantity,
        date: draft.date,
        previousPartnerQuantity: currentPartnerQuantity,
        nextPartnerQuantity: currentPartnerQuantity - quantity,
        previousOwnQuantity: selectedProduct.ownQuantity,
        nextOwnQuantity: selectedProduct.ownQuantity + quantity,
      })
    } catch {
      setError('Não foi possível salvar neste aparelho. Tente novamente antes de sair da tela.')
    } finally {
      setIsSaving(false)
    }
  }

  if (result) {
    return <ReturnConfirmation result={result} onBack={onBack} onRepeat={() => setResult(null)} />
  }

  return (
    <main className="conteudo-fluxo">
      <button className="botao-voltar" type="button" onClick={onBack}>
        ‹ Voltar
      </button>
      <div className="cabecalho-tela">
        <span className="etiqueta-simulacao">Dados mockados</span>
        <h2 id="titulo-devolucao">Registrar devolução</h2>
        <p>Registre a mercadoria que voltou do Ponto Parceiro para o estoque próprio.</p>
      </div>

      <form className="cartao formulario-movimentacao" onSubmit={submitReturn} noValidate>
        <label className="campo-formulario">
          <span>Ponto Parceiro</span>
          <select value={draft.partnerId} onChange={(event) => updateDraft('partnerId', event.target.value)}>
            {partners.map((partner) => (
              <option value={partner.id} key={partner.id}>
                {partner.name}
              </option>
            ))}
          </select>
        </label>

        <label className="campo-formulario">
          <span>Produto</span>
          <select value={draft.productId} onChange={(event) => updateDraft('productId', event.target.value)}>
            {estimatedProducts.map((product) => {
              const partnerQuantity =
                product.partners.find((partner) => partner.name === selectedPartner.name)?.quantity ?? 0
              return (
                <option value={product.id} key={product.id}>
                  {product.name} · {partnerQuantity} no ponto
                </option>
              )
            })}
          </select>
        </label>

        <div className="campos-lado-a-lado">
          <label className="campo-formulario">
            <span>Quantidade</span>
            <input
              type="number"
              min="1"
              step="1"
              inputMode="numeric"
              value={draft.quantity}
              onChange={(event) => updateDraft('quantity', event.target.value)}
            />
          </label>
          <label className="campo-formulario">
            <span>Data da devolução</span>
            <input type="date" value={draft.date} onChange={(event) => updateDraft('date', event.target.value)} />
          </label>
        </div>

        <div className="trajeto-envio" aria-label="Trajeto da devolução">
          <div>
            <span>Origem</span>
            <strong>{selectedPartner.name}</strong>
          </div>
          <span className="seta-trajeto" aria-hidden="true">
            →
          </span>
          <div>
            <span>Destino</span>
            <strong>Estoque próprio</strong>
          </div>
        </div>

        <div className={`efeito${validQuantity > currentPartnerQuantity ? ' alerta' : ''}`}>
          O saldo no {selectedPartner.name} passaria de {currentPartnerQuantity} para {nextPartnerQuantity} unidades, e o
          estoque próprio passaria de {selectedProduct.ownQuantity} para {nextOwnQuantity} unidades.
        </div>
        <p className="alerta-conceitual">Devolução não é venda cancelada. É uma movimentação de volta.</p>

        {stockStatus === 'error' ? (
          <p className="erro-formulario" role="alert">
            Não foi possível conferir o saldo salvo neste aparelho. Tente abrir o formulário novamente.
          </p>
        ) : error ? (
          <p className="erro-formulario" role="alert">
            {error}
          </p>
        ) : null}

        <button className="botao-principal" type="submit" disabled={isSaving || stockStatus !== 'ready'}>
          {isSaving
            ? 'Salvando neste aparelho...'
            : stockStatus === 'loading'
              ? 'Conferindo saldo...'
              : stockStatus === 'error'
                ? 'Saldo indisponível'
                : 'Salvar neste aparelho'}
        </button>
      </form>
    </main>
  )
}
