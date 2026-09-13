import { useEffect, useState } from 'react'
import { getServerStatus } from '../services/serverStatus'
import type { ServerStatusData } from '../services/serverStatus'

export function useServerStatus(serverId: string) {
  const [data, setData] = useState<ServerStatusData>()
  const [error, setError] = useState('')
  useEffect(() => {
    const controller = new AbortController()
    const load = async () => {
      try {
        const next = await getServerStatus(serverId, controller.signal)
        if (!controller.signal.aborted) { setData(next); setError('') }
      } catch (err) {
        if (!controller.signal.aborted) { setData(undefined); setError(err instanceof Error ? err.message : 'Unable to load server status.') }
      }
    }
    void load()
    const interval = window.setInterval(() => void load(), 60_000)
    return () => { controller.abort(); window.clearInterval(interval) }
  }, [serverId])
  return { data, error, loading: !data && !error }
}
