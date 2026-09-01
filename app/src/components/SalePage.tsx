import { useMemo, useState, type FormEvent } from 'react'
import { partners } from '../data/partners'
import { initialSaleDraft, productSalePrices } from '../data/sale'
import { stockProducts } from '../data/stock'
import {
  DEMO_OWN_LOCATION_ID,
  demoPartnerIds,
  demoPartnerLocationIds,
  demoProductIds,
  getDemoIdentity,
} from '../services/demoIdentity'
import { enqueueLocalCommand, syncStatusLabel } from '../services/localDatabase'
import type { SaleChannel, SaleDraft, SaleResult } from '../types/sale'

type SalePageProps = {
  initialPartnerId?: string
  onBack: () => void
}

function parsePrice(value: string) {
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

function SaleConfirmation({
  result,
  onBack,
  onRepeat,
}: {
  result: SaleResult
  onBack: () => void
  onRepeat: () => void
}) {
  const isPartnerSale = result.channel === 'partner'

  return (
    <main className="conteudo-fluxo resultado-compra" aria-live="polite">
      <div className="resultado-status" aria-hidden="true">
        ✓
      </div>
      <div className="texto-centro">
        <span className="etiqueta-simulacao">Dados mockados</span>
        <h2>{isPartnerSale ? 'Venda no parceiro salva' : 'Venda direta salva'}</h2>
        <p>{syncStatusLabel(result.syncStatus)}. Ainda não foi enviada ao banco central.</p>
      </div>

      <article className="cartao resultado-resumo" aria-label="Resumo da venda simulada">
        <div className="quadro-detalhes">
          <div className="linha-detalhe">
            <span>Canal</span>
            <strong>{isPartnerSale ? 'Ponto Parceiro' : 'Venda direta'}</strong>
          </div>
          <div className="linha-detalhe">
            <span>Origem</span>
            <strong>{result.originName}</strong>
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
            <span>Preço usado</span>
            <strong>{formatCurrency(result.unitPrice)}</strong>
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
        O estoque de {result.productName} em {result.originName} passaria de {result.previousQuantity} para{' '}
        {result.nextQuantity} unidades. {isPartnerSale ? `Criaria ${formatCurrency(result.total)} para acerto.` : 'Não criaria acerto.'}
      </div>
      <p className="alerta-conceitual">
        {isPartnerSale
          ? 'Venda informada não significa pagamento recebido. O acerto vem depois.'
          : 'Venda direta sai do estoque próprio e fica separada das pendências dos parceiros.'}
      </p>

      <div className="linha-botoes">
        <button className="botao-principal" type="button" onClick={onBack}>
          Voltar para Início
        </button>
        <button className="botao-fantasma" type="button" onClick={onRepeat}>
          Repetir esta venda
        </button>
      </div>
    </main>
  )
}

export function SalePage({ initialPartnerId, onBack }: SalePageProps) {
  const [draft, setDraft] = useState<SaleDraft>({
    ...initialSaleDraft,
    partnerId: initialPartnerId || initialSaleDraft.partnerId,
  })
  const [error, setError] = useState('')
  const [result, setResult] = useState<SaleResult | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const selectedPartner = useMemo(
    () => partners.find((partner) => partner.id === draft.partnerId) ?? partners[0],
    [draft.partnerId],
  )
  const selectedProduct = useMemo(
    () => stockProducts.find((product) => product.id === draft.productId) ?? stockProducts[0],
    [draft.productId],
  )
  const quantity = Number(draft.quantity)
  const unitPrice = parsePrice(draft.unitPrice)
  const validQuantity = Number.isInteger(quantity) && quantity > 0 ? quantity : 0
  const partnerQuantity =
    selectedProduct.partners.find((partner) => partner.name === selectedPartner.name)?.quantity ?? 0
  const availableQuantity = draft.channel === 'partner' ? partnerQuantity : selectedProduct.ownQuantity
  const originName = draft.channel === 'partner' ? selectedPartner.name : 'Estoque próprio'
  const projectedQuantity = Math.max(0, availableQuantity - validQuantity)
  const projectedTotal = Number.isFinite(unitPrice) && unitPrice > 0 ? validQuantity * unitPrice : 0

  function updateDraft(field: keyof SaleDraft, value: string) {
    setDraft((current) => ({ ...current, [field]: value }))
    setError('')
  }

  function selectChannel(channel: SaleChannel) {
    setDraft((current) =>
      channel === 'direct'
        ? { ...current, channel, productId: 'vela', quantity: '1', unitPrice: productSalePrices.vela }
        : { ...current, channel, productId: 'caneca', quantity: '3', unitPrice: productSalePrices.caneca },
    )
    setError('')
  }

  function selectProduct(productId: string) {
    setDraft((current) => ({ ...current, productId, unitPrice: productSalePrices[productId] }))
    setError('')
  }

  async function submitSale(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!Number.isInteger(quantity) || quantity <= 0) {
      setError('Informe uma quantidade inteira maior que zero.')
      return
    }
    if (quantity > availableQuantity) {
      setError(`Estoque insuficiente. Há ${availableQuantity} unidades disponíveis em ${originName}.`)
      return
    }
    if (!Number.isFinite(unitPrice) || unitPrice <= 0) {
      setError('Informe um preço usado maior que zero.')
      return
    }
    if (!draft.date) {
      setError('Informe a data da venda.')
      return
    }

    setIsSaving(true)
    try {
      const identity = await getDemoIdentity()
      const isPartnerSale = draft.channel === 'partner'
      const unitPriceCents = Math.round(unitPrice * 100)
      const command = await enqueueLocalCommand({
        ...identity,
        commandType: 'sale.confirm',
        occurredAt: `${draft.date}T12:00:00.000Z`,
        payload: {
          sale_id: crypto.randomUUID(),
          sale_channel: draft.channel,
          source_location_id: isPartnerSale
            ? demoPartnerLocationIds[selectedPartner.id]
            : DEMO_OWN_LOCATION_ID,
          partner_point_id: isPartnerSale ? demoPartnerIds[selectedPartner.id] : null,
          partner_name: isPartnerSale ? selectedPartner.name : null,
          items: [
            {
              id: crypto.randomUUID(),
              product_id: demoProductIds[selectedProduct.id],
              product_name: selectedProduct.name,
              quantity,
              suggested_unit_price_cents: Math.round(parsePrice(productSalePrices[selectedProduct.id]) * 100),
              unit_price_cents: unitPriceCents,
              total_amount_cents: quantity * unitPriceCents,
              price_source: 'manual',
            },
          ],
          occurred_date: draft.date,
          demo_mode: true,
        },
      })

      setResult({
        commandId: command.command_id,
        syncStatus: 'queued',
        channel: draft.channel,
        originName,
        partnerName: isPartnerSale ? selectedPartner.name : undefined,
        productName: selectedProduct.name,
        quantity,
        unitPrice,
        total: quantity * unitPrice,
        date: draft.date,
        previousQuantity: availableQuantity,
        nextQuantity: availableQuantity - quantity,
      })
    } catch {
      setError('Não foi possível salvar neste aparelho. Tente novamente antes de sair da tela.')
    } finally {
      setIsSaving(false)
    }
  }

  if (result) {
    return <SaleConfirmation result={result} onBack={onBack} onRepeat={() => setResult(null)} />
  }

  return (
    <main className="conteudo-fluxo">
      <button className="botao-voltar" type="button" onClick={onBack}>
        ‹ Voltar
      </button>
      <div className="cabecalho-tela">
        <span className="etiqueta-simulacao">Dados mockados</span>
        <h2 id="titulo-venda">Registrar venda</h2>
        <p>Escolha de onde a mercadoria saiu e confira o efeito antes de salvar a simulação.</p>
      </div>

      <form className="cartao formulario-movimentacao" onSubmit={submitSale} noValidate>
        <div className="seletor-canal" role="group" aria-label="Canal da venda">
          <button
            className={draft.channel === 'partner' ? 'ativo' : ''}
            type="button"
            aria-pressed={draft.channel === 'partner'}
            onClick={() => selectChannel('partner')}
          >
            Ponto Parceiro
          </button>
          <button
            className={draft.channel === 'direct' ? 'ativo' : ''}
            type="button"
            aria-pressed={draft.channel === 'direct'}
            onClick={() => selectChannel('direct')}
          >
            Venda direta
          </button>
        </div>

        {draft.channel === 'partner' ? (
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
        ) : null}

        <label className="campo-formulario">
          <span>Produto</span>
          <select value={draft.productId} onChange={(event) => selectProduct(event.target.value)}>
            {stockProducts.map((product) => (
              <option value={product.id} key={product.id}>
                {product.name}
              </option>
            ))}
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
            <span>Preço usado</span>
            <input
              type="text"
              inputMode="decimal"
              value={draft.unitPrice}
              onChange={(event) => updateDraft('unitPrice', event.target.value)}
            />
          </label>
        </div>

        <label className="campo-formulario">
          <span>Data da venda</span>
          <input type="date" value={draft.date} onChange={(event) => updateDraft('date', event.target.value)} />
        </label>

        <div className="destino-compra">
          <span>Origem da venda</span>
          <strong>{originName}</strong>
        </div>

        <div className={`efeito${validQuantity > availableQuantity ? ' alerta' : ''}`}>
          O saldo em {originName} passaria de {availableQuantity} para {projectedQuantity} unidades.{' '}
          {draft.channel === 'partner'
            ? `Criaria ${formatCurrency(projectedTotal)} para acerto.`
            : `Total da venda: ${formatCurrency(projectedTotal)}. Não cria acerto.`}
        </div>
        <p className="alerta-conceitual">
          {draft.channel === 'partner'
            ? 'Venda informada não significa pagamento recebido. O acerto vem depois.'
            : 'Venda direta e venda do parceiro ficam separadas para não misturar pendências.'}
        </p>

        {error ? (
          <p className="erro-formulario" role="alert">
            {error}
          </p>
        ) : null}

        <button className="botao-principal" type="submit" disabled={isSaving}>
          {isSaving ? 'Salvando neste aparelho...' : 'Salvar neste aparelho'}
        </button>
      </form>
    </main>
  )
}
