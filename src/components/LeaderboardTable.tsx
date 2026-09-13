import { Award, Trophy } from 'lucide-react'
import type { LeaderboardEntry, LeaderboardMetric } from '../services/leaderboards'
import { formatLeaderboardValue, metricLabels } from '../services/leaderboards'

export function LeaderboardTable({ entries, metric, loading, error }: { entries: LeaderboardEntry[]; metric: LeaderboardMetric; loading: boolean; error: string }) {
  if (loading) return <div className="leaderboard-message" role="status">LOADING THE LEADERBOARD…</div>
  if (error) return <div className="leaderboard-message" role="status">{error}</div>
  if (!entries.length) return <div className="leaderboard-message">THE BOARD IS OPEN. BE THE FIRST TO MAKE YOUR MARK.</div>
  return <table className="leaderboard-table"><caption className="sr-only">Rustbound {metricLabels[metric]} leaderboard</caption><thead><tr><th scope="col">#</th><th scope="col">PLAYER</th><th scope="col">{metricLabels[metric]} <span className="sr-only">value</span></th></tr></thead><tbody>{entries.map((entry, i) => <tr key={entry.id} className={i < 3 ? 'rank-row rank-' + (i + 1) : ''}><td><span className="rank-position">{i < 3 ? <Award size={19} /> : null}{String(i + 1).padStart(2, '0')}</span></td><td><div className="player-cell"><span className="player-avatar">{entry.name.slice(0, 2).toUpperCase()}</span><strong>{entry.name}</strong>{i === 0 && <span className="table-champion"><Trophy size={12} />TOP OF THE WIPE</span>}</div></td><td>{formatLeaderboardValue(entry.value, metric)}</td></tr>)}</tbody></table>
}
