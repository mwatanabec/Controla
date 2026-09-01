import { useMemo, useState, type FormEvent } from 'react'
import { initialPurchaseDraft } from '../data/purchase'
import { stockProducts } from '../data/stock'
import type { PurchaseDraft, PurchaseResult } from '../types/purchase'

type PurchasePageProps = {
  onBack: () => void
}

function parseCost(value: string) {
  const normalized = value.includes(',') ? value.replace(/\./g, '').replace(',', '.') : value
  return Number(normalized)
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

function formatDate(value: string) {
  const [year, month, day] = value.split('-')
  return `${day}/${month}/${year}`
}

function PurchaseConfirmation({
  result,
  onBack,
  onRepeat,
}: {
  result: PurchaseResult
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
        <h2>Compra simulada</h2>
        <p>A conferência foi concluída. Nenhum dado foi salvo no banco.</p>
      </div>

      <article className="cartao resultado-resumo" aria-label="Resumo da compra simulada">
        <div className="quadro-detalhes">
          <div className="linha-detalhe">
            <span>Produto</span>
            <strong>{result.productName}</strong>
          </div>
          <div className="linha-detalhe">
            <span>Fornecedor</span>
            <strong>{result.supplier}</strong>
          </div>
          <div className="linha-detalhe">
            <span>Quantidade</span>
            <strong>{result.quantity} unidades</strong>
          </div>
          <div className="linha-detalhe">
            <span>Custo unitário</span>
            <strong>{formatCurrency(result.unitCost)}</strong>
          </div>
          <div className="linha-detalhe">
            <span>Data</span>
            <strong>{formatDate(result.date)}</strong>
          </div>
        </div>
      </article>

      <div className="efeito">
        Aumentaria o estoque próprio de {result.productName} de {result.previousQuantity} para {result.nextQuantity}{' '}
        unidades.
      </div>

      <div className="linha-botoes">
        <button className="botao-principal" type="button" onClick={onBack}>
          Voltar para Início
        </button>
        <button className="botao-fantasma" type="button" onClick={onRepeat}>
          Repetir esta compra
        </button>
      </div>
    </main>
  )
}

export function PurchasePage({ onBack }: PurchasePageProps) {
  const [draft, setDraft] = useState<PurchaseDraft>(initialPurchaseDraft)
  const [error, setError] = useState('')
  const [result, setResult] = useState<PurchaseResult | null>(null)

  const selectedProduct = useMemo(
    () => stockProducts.find((product) => product.id === draft.productId) ?? stockProducts[0],
    [draft.productId],
  )
  const quantity = Number(draft.quantity)
  const projectedQuantity = selectedProduct.ownQuantity + (Number.isInteger(quantity) && quantity > 0 ? quantity : 0)

  function updateDraft(field: keyof PurchaseDraft, value: string) {
    setDraft((current) => ({ ...current, [field]: value }))
    setError('')
  }

  function submitPurchase(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const unitCost = parseCost(draft.unitCost)

    if (!draft.supplier.trim()) {
      setError('Informe o fornecedor da compra.')
      return
    }
    if (!Number.isInteger(quantity) || quantity <= 0) {
      setError('Informe uma quantidade inteira maior que zero.')
      return
    }
    if (!Number.isFinite(unitCost) || unitCost <= 0) {
      setError('Informe um custo unitário maior que zero.')
      return
    }
    if (!draft.date) {
      setError('Informe a data da compra.')
      return
    }

    setResult({
      productName: selectedProduct.name,
      supplier: draft.supplier.trim(),
      quantity,
      unitCost,
      date: draft.date,
      previousQuantity: selectedProduct.ownQuantity,
      nextQuantity: selectedProduct.ownQuantity + quantity,
    })
  }

  if (result) {
    return <PurchaseConfirmation result={result} onBack={onBack} onRepeat={() => setResult(null)} />
  }

  return (
    <main className="conteudo-fluxo">
      <button className="botao-voltar" type="button" onClick={onBack}>
        ‹ Voltar
      </button>
      <div className="cabecalho-tela">
        <span className="etiqueta-simulacao">Dados mockados</span>
        <h2 id="titulo-compra">Registrar compra</h2>
        <p>Confira os dados da entrada de mercadoria no estoque próprio.</p>
      </div>

      <form className="cartao formulario-compra" onSubmit={submitPurchase} noValidate>
        <label className="campo-formulario">
          <span>Produto</span>
          <select value={draft.productId} onChange={(event) => updateDraft('productId', event.target.value)}>
            {stockProducts.map((product) => (
              <option value={product.id} key={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </label>

        <label className="campo-formulario">
          <span>Fornecedor</span>
          <input
            type="text"
            value={draft.supplier}
            autoComplete="organization"
            onChange={(event) => updateDraft('supplier', event.target.value)}
          />
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
            <span>Custo unitário</span>
            <input
              type="text"
              inputMode="decimal"
              value={draft.unitCost}
              onChange={(event) => updateDraft('unitCost', event.target.value)}
            />
          </label>
        </div>

        <label className="campo-formulario">
          <span>Data da compra</span>
          <input type="date" value={draft.date} onChange={(event) => updateDraft('date', event.target.value)} />
        </label>

        <div className="destino-compra">
          <span>Destino</span>
          <strong>Estoque próprio</strong>
        </div>

        <div className="efeito">
          Aumenta o estoque próprio de {selectedProduct.name} de {selectedProduct.ownQuantity} para {projectedQuantity}{' '}
          unidades.
        </div>
        <p className="apoio-formulario">
          A compra preserva fornecedor, custo e data. Nesta etapa, a confirmação apenas simula o resultado.
        </p>

        {error ? (
          <p className="erro-formulario" role="alert">
            {error}
          </p>
        ) : null}

        <button className="botao-principal" type="submit">
          Salvar simulação
        </button>
      </form>
    </main>
  )
}
