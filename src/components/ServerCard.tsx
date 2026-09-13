import { Radio, Users, CalendarDays, ShieldCheck, Signal } from 'lucide-react'
import { compound } from '../assets/backgrounds'
import type { RustServer } from '../data/servers'
import { useServerStatus } from '../hooks/useServerStatus'
import { ConnectButton } from './Actions'
import { wipeDate } from '../lib/time'
import { site } from '../config/site'

export function ServerCard({ server }: { server: RustServer }) {
  const { data, loading, error } = useServerStatus(server.id)
  return <article className="server-card industrial-panel">
    <div className="server-card-art"><img src={compound} alt="Rustbound's industrial reservoir at sunset" /><div><span className="server-id">RUSTBOUND NETWORK / 01</span><h2>{server.name}</h2><p>BUILT FOR THE WIPE.</p></div><span className="server-region">{server.region}</span></div>
    <div className="server-card-content"><div className="server-tags">{[server.region, server.rate, server.team, server.wipe].map(tag => <span key={tag}>{tag}</span>)}<span className={data?.online ? 'online' : ''}>{loading ? 'CHECKING' : error ? 'UNAVAILABLE' : data?.online ? 'ONLINE' : 'OFFLINE'}</span></div><p className="server-description">{server.description}</p>
      {error && <p role="status" className="status-error">{error}</p>}
      <div className="server-card-stats"><div><Users /><span>PLAYERS</span><strong>{data ? data.players + ' / ' + data.maxPlayers : '—'}</strong></div><div><CalendarDays /><span>MAP WIPE</span><strong>{server.wipe}</strong></div><div><ShieldCheck /><span>BLUEPRINTS</span><strong>{server.blueprints}</strong></div><div><Signal /><span>REGION / PING</span><strong>{server.region}</strong></div></div>
      <div className="server-card-bottom"><div><span className="micro-label">NEXT WIPE</span><p>{wipeDate(data?.nextWipe ?? site.nextWipe, { weekday: 'long' })} • {wipeDate(data?.nextWipe ?? site.nextWipe, { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })} {site.timeZoneLabel}</p></div><ConnectButton label="CONNECT" ip={server.ip} port={server.port} /></div>
      <div className="server-data-note"><Radio size={12} />{data?.source === 'mock' ? 'STATUS PREVIEW • SAMPLE PLAYER COUNT' : 'STATUS REFRESHES EVERY 60 SECONDS'}</div>
    </div>
  </article>
}
