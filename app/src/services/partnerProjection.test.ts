import { describe, expect, it } from 'vitest'
import { partners } from '../data/partners'
import { stockProducts } from '../data/stock'
import { projectPartners } from './partnerProjection'

describe('projeção local de Pontos Parceiros', () => {
  it('atualiza quantidades sem modificar os dados-base ou os valores financeiros', () => {
    const projectedStock = stockProducts.map((product) => ({
      ...product,
      partners: product.partners.map((partner) =>
        partner.name === 'Loja da Ana' && product.id === 'vela' ? { ...partner, quantity: 4 } : { ...partner },
      ),
    }))

    const result = projectPartners(partners, projectedStock, true)
    const loja = result.find((partner) => partner.id === 'loja')

    expect(loja?.metrics).toContainEqual({ label: 'Mercadorias estimadas no ponto', value: '5 un.' })
    expect(loja?.details).toContainEqual({ label: 'Vela Baunilha', value: '4 unidades' })
    expect(loja?.details).toContainEqual({ label: 'Situação', value: 'Conferir' })
    expect(partners[1].metrics[0]).toEqual({ label: 'Mercadorias no ponto', value: '3 un.' })
  })
})
