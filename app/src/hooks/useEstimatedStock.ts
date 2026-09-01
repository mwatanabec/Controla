import { useCallback, useEffect, useRef, useState } from 'react'
import { stockProducts } from '../data/stock'
import { loadProjectedStockProducts } from '../services/stockProjection'

type EstimatedStockStatus = 'loading' | 'ready' | 'error'

export function useEstimatedStock() {
  const [products, setProducts] = useState(stockProducts)
  const [localMovementCount, setLocalMovementCount] = useState(0)
  const [status, setStatus] = useState<EstimatedStockStatus>('loading')
  const requestId = useRef(0)

  const refresh = useCallback(async () => {
    const currentRequest = ++requestId.current
    setStatus('loading')

    try {
      const projection = await loadProjectedStockProducts()
      if (requestId.current !== currentRequest) return false

      setProducts(projection.products)
      setLocalMovementCount(projection.appliedCommandCount)
      setStatus('ready')
      return true
    } catch {
      if (requestId.current === currentRequest) setStatus('error')
      return false
    }
  }, [])

  useEffect(() => {
    const currentRequest = ++requestId.current

    loadProjectedStockProducts()
      .then((projection) => {
        if (requestId.current !== currentRequest) return
        setProducts(projection.products)
        setLocalMovementCount(projection.appliedCommandCount)
        setStatus('ready')
      })
      .catch(() => {
        if (requestId.current === currentRequest) setStatus('error')
      })

    return () => {
      requestId.current += 1
    }
  }, [])

  return { products, localMovementCount, status, refresh }
}
