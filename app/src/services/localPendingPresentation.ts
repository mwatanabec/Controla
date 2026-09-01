import { syncStatusLabel } from './localDatabase'
import type { LocalOutboxCommand } from '../types/sync'

export type LocalPendingItem = {
  id: string
  title: string
  detail: string
  createdLabel: string
  statusLabel: string
}

function textValue(value: unknown) {
  return typeof value === 'string' ? value : ''
}

function quantityValue(value: unknown) {
  return typeof value === 'number' && Number.isInteger(value) && value > 0 ? value : 0
}

function currencyFromCents(value: unknown) {
  const amount = typeof value === 'number' && Number.isInteger(value) ? value / 100 : 0
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount)
}

function quantityDetail(quantity: number, productName: string) {
  return `${quantity} ${quantity === 1 ? 'unidade' : 'unidades'} de ${productName}`
}

function commandDescription(command: LocalOutboxCommand) {
  const payload = command.payload

  if (command.command_type === 'purchase.confirm') {
    return {
      title: 'Compra registrada',
      detail: quantityDetail(quantityValue(payload.quantity), textValue(payload.product_name)),
    }
  }

  if (command.command_type === 'transfer.confirm') {
    const quantity = quantityValue(payload.quantity)
    const product = textValue(payload.product_name)
    const partner = textValue(payload.partner_name)
    return payload.transfer_type === 'return_from_partner'
      ? { title: 'Devolução registrada', detail: `${quantityDetail(quantity, product)} voltando de ${partner}` }
      : { title: 'Envio registrado', detail: `${quantityDetail(quantity, product)} para ${partner}` }
  }

  if (command.command_type === 'sale.confirm') {
    const firstItem = Array.isArray(payload.items) && payload.items[0] && typeof payload.items[0] === 'object'
      ? (payload.items[0] as Record<string, unknown>)
      : {}
    const detail = quantityDetail(quantityValue(firstItem.quantity), textValue(firstItem.product_name))
    return payload.sale_channel === 'partner'
      ? { title: 'Venda no parceiro registrada', detail: `${detail} em ${textValue(payload.partner_name)}` }
      : { title: 'Venda direta registrada', detail }
  }

  if (command.command_type === 'settlement.payment') {
    return {
      title: 'Pagamento de Acerto registrado',
      detail: `${currencyFromCents(payload.amount_cents)} para ${textValue(payload.partner_name)}`,
    }
  }

  return { title: 'Operação registrada', detail: 'Aguardando envio ao banco central' }
}

export function presentLocalPendingCommand(command: LocalOutboxCommand): LocalPendingItem {
  const description = commandDescription(command)
  const createdAt = new Date(command.created_local_at)

  return {
    id: command.command_id,
    ...description,
    createdLabel: Number.isNaN(createdAt.getTime())
      ? 'Horário local indisponível'
      : new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(createdAt),
    statusLabel: syncStatusLabel(command.status),
  }
}
