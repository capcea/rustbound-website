function positiveNumber(value: string | undefined, fallback: number) {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback
}

export const site = {
  serverName: 'RUSTBOUND',
  tagline: 'BUILT FOR THE WIPE.',
  secondaryTagline: 'SURVIVE. RAID. REPEAT.',
  serverIp: import.meta.env.VITE_SERVER_IP?.trim() || 'SERVER_IP',
  serverPort: positiveNumber(import.meta.env.VITE_SERVER_PORT, 28015),
  discordUrl: import.meta.env.VITE_DISCORD_URL?.trim() || '',
  storeUrl: import.meta.env.VITE_STORE_URL?.trim() || '',
  nextWipe: import.meta.env.VITE_NEXT_WIPE || '2026-09-17T19:00:00+03:00',
  maxPlayers: positiveNumber(import.meta.env.VITE_MAX_PLAYERS, 200),
  region: import.meta.env.VITE_REGION || 'EU',
  timeZone: 'Europe/Bucharest',
  timeZoneLabel: 'RO',
  mapWipe: 'Every Thursday',
  blueprintWipe: 'Force Wipe only',
  serverMode: '2X • SOLO/DUO/TRIO • WEEKLY',
  dataMode: import.meta.env.VITE_DATA_MODE === 'api' ? 'api' : 'mock',
  apiBaseUrl: (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, ''),
} as const

export function connectCommand(ip = site.serverIp, port = site.serverPort) {
  return 'client.connect ' + ip + ':' + port
}

export function externalUrl(value: string): string | undefined {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' ? url.href : undefined
  } catch { return undefined }
}
