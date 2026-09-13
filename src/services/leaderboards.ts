import { site } from '../config/site'
export type LeaderboardMetric = 'kills' | 'kd' | 'playtime' | 'raids'
export interface LeaderboardEntry { id: string; name: string; value: number }
const players = [
  ['WASTELAND', 284, 4.82, 176.5, 31], ['Ashborn', 267, 4.11, 214.2, 27],
  ['KNOX', 241, 3.76, 198.7, 24], ['Deadwood', 218, 3.54, 167.4, 23],
  ['Feral', 197, 3.28, 149.3, 21], ['Rook', 184, 3.07, 182.5, 19],
  ['ironlung', 172, 2.96, 138.4, 18], ['Wick', 159, 2.81, 127.9, 17],
  ['NORTH', 148, 2.64, 155.6, 15], ['ColdFront', 136, 2.42, 119.1, 13],
  ['Hollow', 121, 2.25, 105.8, 11], ['RUSTY', 108, 2.09, 98.6, 9],
] as const
export const metricLabels: Record<LeaderboardMetric, string> = { kills: 'KILLS', kd: 'K/D', playtime: 'PLAYTIME', raids: 'RAIDS' }
export function sortLeaderboard(entries: LeaderboardEntry[]) {
  return [...entries].sort((a, b) => b.value - a.value || a.name.localeCompare(b.name))
}
export async function getLeaderboard(metric: LeaderboardMetric, signal?: AbortSignal): Promise<LeaderboardEntry[]> {
  if (site.dataMode === 'mock') {
    const index = { kills: 1, kd: 2, playtime: 3, raids: 4 }[metric]
    return sortLeaderboard(players.map((row, i) => ({ id: String(i + 1), name: row[0], value: Number(row[index]) })))
  }
  const response = await fetch(site.apiBaseUrl + '/leaderboards?metric=' + metric, { signal })
  if (!response.ok) throw new Error('Leaderboards are temporarily unavailable.')
  const data: unknown = await response.json()
  if (!Array.isArray(data) || data.some(row => !row || typeof row.id !== 'string' || typeof row.name !== 'string' || typeof row.value !== 'number' || !Number.isFinite(row.value) || row.value < 0)) throw new Error('Invalid leaderboard response.')
  return sortLeaderboard(data)
}
export function formatLeaderboardValue(value: number, metric: LeaderboardMetric) {
  if (metric === 'kd') return value.toFixed(2)
  if (metric === 'playtime') {
    const minutes = Math.round(value * 60)
    return Math.floor(minutes / 60).toLocaleString('en-GB') + 'h ' + minutes % 60 + 'm'
  }
  return value.toLocaleString('en-GB')
}
