import { partners } from '../data/partners'
import { stockProducts } from '../data/stock'
import { demoPartnerIds, demoProductIds } from './demoIdentity'
import { listOutboxCommands } from './localDatabase'
import type { LocalOutboxCommand, SyncCommandStatus } from '../types/sync'
import type { StockProduct, StockStatus } from '../types/stock'

const projectableStatuses = new Set<SyncCommandStatus>([
  'queued',
  'waiting_connection',
  'waiting_dependency',
  'syncing',
  'retry_wait',
  'failed_transient',
  'conflict',
])

const productKeyByDemoId = new Map(Object.entries(demoProductIds).map(([key, id]) => [id, key]))
const partnerKeyByDemoId = new Map(Object.entries(demoPartnerIds).map(([key, id]) => [id, key]))

function positiveInteger(value: unknown) {
  return typeof value === 'number' && Number.isInteger(value) && value > 0 ? value : null
}

function textValue(value: unknown) {
  return typeof value === 'string' ? value : null
}

function findProduct(products: StockProduct[], payload: Record<string, unknown>) {
  const productId = textValue(payload.product_id)
  const mockId = productId ? productKeyByDemoId.get(productId) : undefined
  const productName = textValue(payload.product_name)
  return products.find((product) => product.id === mockId || product.name === productName)
}

function findPartnerName(payload: Record<string, unknown>) {
  const partnerName = textValue(payload.partner_name)
  if (partnerName) return partnerName

  const partnerId = textValue(payload.partner_point_id)
  const mockId = partnerId ? partnerKeyByDemoId.get(partnerId) : undefined
  return partners.find((partner) => partner.id === mockId)?.name ?? null
}

function updateProductStatus(product: StockProduct, hasLocalMovements: boolean) {
  let status: StockStatus = 'ok'
  let statusLabel = 'Estoque em dia'
  let detailMessage = hasLocalMovements
    ? 'Saldo estimado inclui movimentações salvas neste aparelho.'
    : product.detailMessage

  if (product.ownQuantity <= 0) {
    status = 'out'
    statusLabel = product.ownQuantity < 0 ? 'Saldo estimado negativo' : 'Sem estoque próprio'
    detailMessage =
      product.ownQuantity < 0
        ? 'Saldo estimado negativo. Confira as movimentações pendentes antes de continuar.'
        : 'Sem estoque próprio. Pode registrar compra ou devolução.'
  } else if (product.ownQuantity < product.minimumQuantity) {
    status = 'low'
    statusLabel = 'Baixo estoque'
    detailMessage = `Precisa comprar: saldo estimado próprio abaixo do mínimo ${product.minimumQuantity}.`
  }

  return { ...product, status, statusLabel, detailMessage }
}

export function projectStockProducts(baseProducts: StockProduct[], commands: LocalOutboxCommand[]) {
  const products = baseProducts.map((product) => ({
    ...product,
    partners: product.partners.map((partner) => ({ ...partner })),
  }))
  let appliedCommandCount = 0

  for (const command of commands) {
    if (!projectableStatuses.has(command.status)) continue

    if (command.command_type === 'purchase.confirm') {
      const product = findProduct(products, command.payload)
      const quantity = positiveInteger(command.payload.quantity)
      if (!product || !quantity) continue

      product.ownQuantity += quantity
      appliedCommandCount += 1
      continue
    }

    if (command.command_type === 'transfer.confirm') {
      const product = findProduct(products, command.payload)
      const partnerName = findPartnerName(command.payload)
      const partnerStock = product?.partners.find((partner) => partner.name === partnerName)
      const quantity = positiveInteger(command.payload.quantity)
      const transferType = textValue(command.payload.transfer_type)
      if (!product || !partnerStock || !quantity) continue

      if (transferType === 'send_to_partner') {
        product.ownQuantity -= quantity
        partnerStock.quantity += quantity
        appliedCommandCount += 1
      } else if (transferType === 'return_from_partner') {
        partnerStock.quantity -= quantity
        product.ownQuantity += quantity
        appliedCommandCount += 1
      }
      continue
    }

    if (command.command_type === 'sale.confirm') {
      const items = Array.isArray(command.payload.items) ? command.payload.items : []
      const saleChannel = textValue(command.payload.sale_channel)
      const partnerName = findPartnerName(command.payload)
      let appliedItem = false

      for (const item of items) {
        if (!item || typeof item !== 'object' || Array.isArray(item)) continue
        const itemPayload = item as Record<string, unknown>
        const product = findProduct(products, itemPayload)
        const quantity = positiveInteger(itemPayload.quantity)
        if (!product || !quantity) continue

        if (saleChannel === 'direct') {
          product.ownQuantity -= quantity
          appliedItem = true
        } else if (saleChannel === 'partner') {
          const partnerStock = product.partners.find((partner) => partner.name === partnerName)
          if (!partnerStock) continue
          partnerStock.quantity -= quantity
          appliedItem = true
        }
      }

      if (appliedItem) appliedCommandCount += 1
    }
  }

  return {
    products:
      appliedCommandCount > 0 ? products.map((product) => updateProductStatus(product, true)) : products,
    appliedCommandCount,
  }
}

export async function loadProjectedStockProducts() {
  const commands = await listOutboxCommands()
  return projectStockProducts(stockProducts, commands)
}
