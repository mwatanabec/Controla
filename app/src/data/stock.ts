import type { StockProduct } from '../types/stock'

export const stockProducts: StockProduct[] = [
  {
    id: 'caneca',
    name: 'Caneca Flores',
    abbreviation: 'CF',
    photoTone: 'peach',
    status: 'low',
    statusLabel: 'Baixo estoque',
    ownQuantity: 2,
    minimumQuantity: 5,
    partners: [
      { name: 'Salão Bella', quantity: 4 },
      { name: 'Loja da Ana', quantity: 1 },
    ],
    detailMessage: 'Precisa comprar: estoque próprio abaixo do mínimo 5.',
  },
  {
    id: 'kit',
    name: 'Kit Presente Lavanda',
    abbreviation: 'KL',
    photoTone: 'lavender',
    status: 'out',
    statusLabel: 'Sem estoque próprio',
    ownQuantity: 0,
    minimumQuantity: 3,
    partners: [
      { name: 'Salão Bella', quantity: 2 },
      { name: 'Loja da Ana', quantity: 0 },
    ],
    detailMessage: 'Sem estoque próprio. Pode registrar compra ou devolução.',
  },
  {
    id: 'vela',
    name: 'Vela Baunilha',
    abbreviation: 'VB',
    photoTone: 'vanilla',
    status: 'ok',
    statusLabel: 'Estoque em dia',
    ownQuantity: 4,
    minimumQuantity: 3,
    partners: [
      { name: 'Salão Bella', quantity: 3 },
      { name: 'Loja da Ana', quantity: 2 },
    ],
    detailMessage: 'Saldo distribuído visível sem misturar os locais.',
  },
]

export function getPartnerTotal(product: StockProduct) {
  return product.partners.reduce((total, partner) => total + partner.quantity, 0)
}

export function getStockTotal(product: StockProduct) {
  return product.ownQuantity + getPartnerTotal(product)
}
