import { site } from '../config/site'

export interface ServerStatusData {
  serverId: string
  online: boolean
  players: number
  maxPlayers: number
  region: string
  nextWipe: string
  source: 'mock' | 'api'
}

export async function getServerStatus(serverId = 'eu-2x-trio', signal?: AbortSignal): Promise<ServerStatusData> {
  if (site.dataMode === 'mock') return {
    serverId, online: true, players: Math.min(127, site.maxPlayers), maxPlayers: site.maxPlayers,
    region: site.region, nextWipe: site.nextWipe, source: 'mock',
  }
  const response = await fetch(site.apiBaseUrl + '/servers/' + encodeURIComponent(serverId), { signal })
  if (!response.ok) throw new Error('Server status is temporarily unavailable.')
  const data: unknown = await response.json()
  if (!data || typeof data !== 'object') throw new Error('Invalid server response.')
  const row = data as Record<string, unknown>
  if (typeof row.online !== 'boolean' || typeof row.players !== 'number' || !Number.isFinite(row.players) || row.players < 0
    || typeof row.maxPlayers !== 'number' || !Number.isFinite(row.maxPlayers) || row.maxPlayers < 1
    || typeof row.nextWipe !== 'string' || !Number.isFinite(Date.parse(row.nextWipe))) throw new Error('Invalid server response.')
  return { serverId, online: row.online, players: row.players, maxPlayers: row.maxPlayers,
    region: typeof row.region === 'string' ? row.region : site.region, nextWipe: row.nextWipe, source: 'api' }
}
