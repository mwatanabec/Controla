import { useCallback, useEffect, useRef, useState } from 'react'
import { settlementPaymentSources } from '../data/settlementPayment'
import { loadProjectedSettlementPaymentSources } from '../services/settlementProjection'

type EstimatedSettlementStatus = 'loading' | 'ready' | 'error'

export function useEstimatedSettlements() {
  const [sources, setSources] = useState(settlementPaymentSources)
  const [status, setStatus] = useState<EstimatedSettlementStatus>('loading')
  const requestId = useRef(0)

  const refresh = useCallback(async () => {
    const currentRequest = ++requestId.current

    try {
      const projection = await loadProjectedSettlementPaymentSources()
      if (requestId.current !== currentRequest) return false
      setSources(projection.sources)
      setStatus('ready')
      return true
    } catch {
      if (requestId.current === currentRequest) setStatus('error')
      return false
    }
  }, [])

  useEffect(() => {
    const currentRequest = ++requestId.current

    loadProjectedSettlementPaymentSources()
      .then((projection) => {
        if (requestId.current !== currentRequest) return
        setSources(projection.sources)
        setStatus('ready')
      })
      .catch(() => {
        if (requestId.current === currentRequest) setStatus('error')
      })

    return () => {
      requestId.current += 1
    }
  }, [])

  return { sources, status, refresh }
}
