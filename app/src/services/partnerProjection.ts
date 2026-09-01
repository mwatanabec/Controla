import type { Partner } from '../types/partner'
import type { StockProduct } from '../types/stock'

function quantityLabel(quantity: number) {
  return `${quantity} ${quantity === 1 ? 'unidade' : 'unidades'}`
}

export function projectPartners(basePartners: Partner[], products: StockProduct[], estimated: boolean) {
  return basePartners.map((partner) => {
    if (!estimated) {
      return {
        ...partner,
        metrics: partner.metrics.map((metric) => ({ ...metric })),
        details: partner.details.map((detail) => ({ ...detail })),
        detailActions: [...partner.detailActions],
      }
    }

    const inventoryDetails = products
      .map((product) => ({
        label: product.name,
        quantity: product.partners.find((item) => item.name === partner.name)?.quantity ?? 0,
      }))
      .filter((item) => item.quantity !== 0)
      .map((item) => ({ label: item.label, value: quantityLabel(item.quantity) }))
    const productNames = new Set(products.map((product) => product.name))
    const preservedDetails = partner.details.filter(
      (detail) => ![...productNames].some((productName) => detail.label.startsWith(productName)),
    )
    const totalQuantity = products.reduce(
      (total, product) =>
        total + (product.partners.find((item) => item.name === partner.name)?.quantity ?? 0),
      0,
    )

    return {
      ...partner,
      metrics: partner.metrics.map((metric) =>
        metric.label === 'Mercadorias no ponto'
          ? { label: 'Mercadorias estimadas no ponto', value: `${totalQuantity} un.` }
          : { ...metric },
      ),
      details: [...inventoryDetails, ...preservedDetails.map((detail) => ({ ...detail }))],
      detailActions: [...partner.detailActions],
    }
  })
}
