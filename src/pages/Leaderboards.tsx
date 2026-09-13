import { useEffect, useRef, useState } from 'react'
import { Crosshair, Target, Clock3, Flame } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { LeaderboardTable } from '../components/LeaderboardTable'
import { getLeaderboard, metricLabels } from '../services/leaderboards'
import type { LeaderboardEntry, LeaderboardMetric } from '../services/leaderboards'
import { site } from '../config/site'

const tabs = [['kills', Crosshair], ['kd', Target], ['playtime', Clock3], ['raids', Flame]] as const
export default function Leaderboards() {
  const [metric, setMetric] = useState<LeaderboardMetric>('kills')
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const refs = useRef<Array<HTMLButtonElement | null>>([])
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true); setError('')
    getLeaderboard(metric, controller.signal).then(data => { if (!controller.signal.aborted) { setEntries(data); setLoading(false) } }).catch(err => { if (!controller.signal.aborted) { setError(err instanceof Error ? err.message : 'Unable to load leaderboard.'); setLoading(false) } })
    return () => controller.abort()
  }, [metric])
  return <><PageHero eyebrow="EARN YOUR PLACE" title="MAKE YOUR" accent="MARK." description="Every fight. Every hour. Every raid. See who's setting the pace on Rustbound." />
    <section className="container section-space"><div className="leaderboard-heading"><div><h2>{site.serverName} 2X TRIO</h2><p>{site.region} / WEEKLY WIPE</p></div><span className="data-preview">{site.dataMode === 'mock' ? 'PREVIEW LEADERBOARD • SAMPLE PLAYERS' : 'CURRENT LEADERBOARD'}</span></div>
      <div className="leaderboard-tabs" role="tablist" aria-label="Leaderboard category">{tabs.map(([key, Icon], i) => <button key={key} ref={el => { refs.current[i] = el }} role="tab" id={'tab-' + key} aria-selected={metric === key} aria-controls="leaderboard-panel" tabIndex={metric === key ? 0 : -1} onClick={() => setMetric(key)} onKeyDown={e => {
        const index = e.key === 'ArrowRight' ? (i + 1) % tabs.length : e.key === 'ArrowLeft' ? (i + tabs.length - 1) % tabs.length : e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : -1
        if (index >= 0) { e.preventDefault(); setMetric(tabs[index][0]); refs.current[index]?.focus() }
      }}><Icon size={18} />{metricLabels[key]}</button>)}</div>
      <div id="leaderboard-panel" role="tabpanel" aria-labelledby={'tab-' + metric} tabIndex={0}><LeaderboardTable entries={entries} metric={metric} loading={loading} error={error} /></div><p className="leaderboard-footnote">{site.dataMode === 'mock' ? 'These are sample standings. Live player statistics will appear when the leaderboard service is connected.' : 'Standings reflect the latest data reported by the server.'}</p>
    </section></>
}
