import { useMemo, useState, type FormEvent } from 'react'
import { settlementPaymentSources } from '../data/settlementPayment'
import { demoPartnerIds, demoSettlementIds, getDemoIdentity } from '../services/demoIdentity'
import { enqueueLocalCommand, syncStatusLabel } from '../services/localDatabase'
import type {
  PaymentMode,
  SettlementPaymentDraft,
  SettlementPaymentResult,
  SettlementPaymentSource,
} from '../types/settlementPayment'

type SettlementPaymentPageProps = {
  initialSettlementId?: string
  onBack: () => void
}

function parseCurrency(value: string) {
  const normalized = value.includes(',') ? value.replace(/\./g, '').replace(',', '.') : value
  return Number(normalized)
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

function inputCurrency(value: number) {
  return value.toFixed(2).replace('.', ',')
}

function formatDate(value: string) {
  const [year, month, day] = value.split('-')
  return `${day}/${month}/${year}`
}

function draftForSource(source: SettlementPaymentSource): SettlementPaymentDraft {
  const remaining = source.agreedValue - source.paidValue
  return {
    settlementId: source.id,
    mode: 'partial',
    agreedValue: inputCurrency(source.agreedValue),
    paymentValue: inputCurrency(Math.max(0.01, remaining / 2)),
    date: '2026-09-01',
    justification: source.agreedValue !== source.calculatedValue ? 'Valor combinado com o parceiro' : '',
  }
}

function PaymentConfirmation({
  result,
  onBack,
  onRepeat,
}: {
  result: SettlementPaymentResult
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
        <h2>{result.remainingValue === 0 ? 'Pagamento total salvo' : 'Pagamento parcial salvo'}</h2>
        <p>{syncStatusLabel(result.syncStatus)}. Ainda não foi enviado ao banco central.</p>
      </div>

      <article className="cartao resultado-resumo" aria-label="Resumo do pagamento simulado">
        <div className="quadro-detalhes">
          <div className="linha-detalhe">
            <span>Ponto Parceiro</span>
            <strong>{result.partnerName}</strong>
          </div>
          <div className="linha-detalhe">
            <span>Venda vinculada</span>
            <strong>{result.saleLabel}</strong>
          </div>
          <div className="linha-detalhe">
            <span>Valor calculado</span>
            <strong>{formatCurrency(result.calculatedValue)}</strong>
          </div>
          <div className="linha-detalhe">
            <span>Valor acordado</span>
            <strong>{formatCurrency(result.agreedValue)}</strong>
          </div>
          <div className="linha-detalhe">
            <span>Pagamento agora</span>
            <strong>{formatCurrency(result.paymentValue)}</strong>
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
        O valor pago passaria de {formatCurrency(result.previousPaidValue)} para {formatCurrency(result.nextPaidValue)}.{' '}
        {result.remainingValue === 0
          ? 'O acerto ficaria pago.'
          : `Ainda faltariam ${formatCurrency(result.remainingValue)} para acertar.`}
      </div>
      <p className="alerta-conceitual">O pagamento não apaga a venda vinculada nem o histórico do acerto.</p>

      <div className="linha-botoes">
        <button className="botao-principal" type="button" onClick={onBack}>
          Voltar para Acertos
        </button>
        <button className="botao-fantasma" type="button" onClick={onRepeat}>
          Repetir este pagamento
        </button>
      </div>
    </main>
  )
}

export function SettlementPaymentPage({ initialSettlementId, onBack }: SettlementPaymentPageProps) {
  const initialSource =
    settlementPaymentSources.find((source) => source.id === initialSettlementId) ?? settlementPaymentSources[0]
  const [draft, setDraft] = useState<SettlementPaymentDraft>(() => draftForSource(initialSource))
  const [error, setError] = useState('')
  const [result, setResult] = useState<SettlementPaymentResult | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const selectedSource = useMemo(
    () => settlementPaymentSources.find((source) => source.id === draft.settlementId) ?? settlementPaymentSources[0],
    [draft.settlementId],
  )
  const agreedValue = parseCurrency(draft.agreedValue)
  const paymentValue = parseCurrency(draft.paymentValue)
  const remainingBefore = Math.max(0, agreedValue - selectedSource.paidValue)
  const remainingAfter = Math.max(0, remainingBefore - (Number.isFinite(paymentValue) ? paymentValue : 0))

  function updateDraft(field: keyof SettlementPaymentDraft, value: string) {
    setDraft((current) => ({ ...current, [field]: value }))
    setError('')
  }

  function selectSource(settlementId: string) {
    const source = settlementPaymentSources.find((item) => item.id === settlementId) ?? settlementPaymentSources[0]
    setDraft(draftForSource(source))
    setError('')
  }

  function selectMode(mode: PaymentMode) {
    setDraft((current) => ({
      ...current,
      mode,
      paymentValue: mode === 'total' ? inputCurrency(remainingBefore) : inputCurrency(Math.max(0.01, remainingBefore / 2)),
    }))
    setError('')
  }

  async function submitPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!Number.isFinite(agreedValue) || agreedValue <= 0) {
      setError('Informe um valor acordado maior que zero.')
      return
    }
    if (agreedValue < selectedSource.paidValue) {
      setError('O valor acordado não pode ser menor que o valor já pago.')
      return
    }
    if (!Number.isFinite(paymentValue) || paymentValue <= 0) {
      setError('Informe um pagamento maior que zero.')
      return
    }
    if (paymentValue > remainingBefore) {
      setError(`O pagamento supera o saldo de ${formatCurrency(remainingBefore)} deste acerto.`)
      return
    }
    if (!draft.date) {
      setError('Informe a data do pagamento.')
      return
    }

    setIsSaving(true)
    try {
      const identity = await getDemoIdentity()
      const command = await enqueueLocalCommand({
        ...identity,
        commandType: 'settlement.payment',
        occurredAt: `${draft.date}T12:00:00.000Z`,
        payload: {
          payment_id: crypto.randomUUID(),
          settlement_id: demoSettlementIds[selectedSource.id],
          partner_point_id: demoPartnerIds[selectedSource.id],
          partner_name: selectedSource.partnerName,
          sale_label: selectedSource.saleLabel,
          payment_mode: draft.mode,
          calculated_amount_cents: Math.round(selectedSource.calculatedValue * 100),
          agreed_amount_cents: Math.round(agreedValue * 100),
          previous_paid_amount_cents: Math.round(selectedSource.paidValue * 100),
          amount_cents: Math.round(paymentValue * 100),
          difference_reason: draft.justification.trim() || null,
          paid_date: draft.date,
          demo_mode: true,
        },
      })

      setResult({
        commandId: command.command_id,
        syncStatus: 'queued',
        partnerName: selectedSource.partnerName,
        saleLabel: selectedSource.saleLabel,
        mode: draft.mode,
        calculatedValue: selectedSource.calculatedValue,
        agreedValue,
        previousPaidValue: selectedSource.paidValue,
        paymentValue,
        nextPaidValue: selectedSource.paidValue + paymentValue,
        remainingValue: remainingBefore - paymentValue,
        date: draft.date,
        justification: draft.justification.trim(),
      })
    } catch {
      setError('Não foi possível salvar neste aparelho. Tente novamente antes de sair da tela.')
    } finally {
      setIsSaving(false)
    }
  }

  if (result) {
    return <PaymentConfirmation result={result} onBack={onBack} onRepeat={() => setResult(null)} />
  }

  return (
    <main className="conteudo-fluxo">
      <button className="botao-voltar" type="button" onClick={onBack}>
        ‹ Voltar
      </button>
      <div className="cabecalho-tela">
        <span className="etiqueta-simulacao">Dados mockados</span>
        <h2 id="titulo-pagamento">Registrar pagamento</h2>
        <p>Confira o acerto e registre um pagamento parcial ou total sem apagar a venda.</p>
      </div>

      <form className="cartao formulario-movimentacao" onSubmit={submitPayment} noValidate>
        <label className="campo-formulario">
          <span>Acerto do parceiro</span>
          <select value={draft.settlementId} onChange={(event) => selectSource(event.target.value)}>
            {settlementPaymentSources.map((source) => (
              <option value={source.id} key={source.id}>
                {source.partnerName} · {source.saleLabel}
              </option>
            ))}
          </select>
        </label>

        <div className="seletor-canal" role="group" aria-label="Forma do pagamento">
          <button
            className={draft.mode === 'partial' ? 'ativo' : ''}
            type="button"
            aria-pressed={draft.mode === 'partial'}
            onClick={() => selectMode('partial')}
          >
            Parcial
          </button>
          <button
            className={draft.mode === 'total' ? 'ativo' : ''}
            type="button"
            aria-pressed={draft.mode === 'total'}
            onClick={() => selectMode('total')}
          >
            Total
          </button>
        </div>

        <div className="quadro-detalhes resumo-acerto-formulario">
          <div className="linha-detalhe">
            <span>Valor calculado</span>
            <strong>{formatCurrency(selectedSource.calculatedValue)}</strong>
          </div>
          <div className="linha-detalhe">
            <span>Já pago</span>
            <strong>{formatCurrency(selectedSource.paidValue)}</strong>
          </div>
        </div>

        <div className="campos-lado-a-lado">
          <label className="campo-formulario">
            <span>Valor acordado</span>
            <input
              type="text"
              inputMode="decimal"
              value={draft.agreedValue}
              onChange={(event) => updateDraft('agreedValue', event.target.value)}
            />
          </label>
          <label className="campo-formulario">
            <span>Pagamento agora</span>
            <input
              type="text"
              inputMode="decimal"
              value={draft.paymentValue}
              onChange={(event) => updateDraft('paymentValue', event.target.value)}
            />
          </label>
        </div>

        <label className="campo-formulario">
          <span>Data do pagamento</span>
          <input type="date" value={draft.date} onChange={(event) => updateDraft('date', event.target.value)} />
        </label>

        <label className="campo-formulario">
          <span>Justificativa da diferença (opcional)</span>
          <input
            type="text"
            value={draft.justification}
            onChange={(event) => updateDraft('justification', event.target.value)}
          />
        </label>

        <div className={`efeito${paymentValue > remainingBefore ? ' alerta' : ''}`}>
          Saldo antes: {formatCurrency(remainingBefore)}. Depois deste pagamento: {formatCurrency(remainingAfter)}.
        </div>
        <p className="alerta-conceitual">A venda continua vinculada ao acerto mesmo depois do pagamento.</p>

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
