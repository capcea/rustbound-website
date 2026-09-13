import { Link } from 'react-router-dom'
import { ArrowUpRight, Radio } from 'lucide-react'
import { servers } from '../data/servers'
import { useServerStatus } from '../hooks/useServerStatus'
import { wipeDate } from '../lib/time'
import { site } from '../config/site'

export function ServerStatus() {
  const server = servers[0]
  const { data, error, loading } = useServerStatus(server.id)
  return <section className="container status-wrap" id="server-status">
    <div className="server-status industrial-panel">
      <div className="status-identity"><div className="status-icon"><Radio /></div><div><p className="eyebrow">THE BATTLEGROUND</p><h2>{server.name}</h2><span className="status-source">{data?.source === 'mock' ? 'SERVER STATUS PREVIEW' : 'SERVER STATUS'}</span></div></div>
      {error ? <p className="status-error" role="status">{error}</p> : <>
        <div className="status-player"><span className="micro-label">PLAYERS ONLINE</span><strong>{loading ? '—' : data?.players} <small>/ {data?.maxPlayers ?? site.maxPlayers}</small></strong><div className="population-bar"><i style={{ width: (data ? Math.min(100, data.players / data.maxPlayers * 100) : 0) + '%' }} /></div></div>
        <div className="status-detail"><span className="micro-label">STATUS</span><strong className={data?.online ? 'online' : ''}><i />{loading ? 'CHECKING' : data?.online ? 'ONLINE' : 'OFFLINE'}</strong></div>
        <div className="status-detail status-next"><span className="micro-label">NEXT WIPE</span><strong>{wipeDate(data?.nextWipe ?? site.nextWipe, { weekday: 'long' })} <span>• {wipeDate(data?.nextWipe ?? site.nextWipe, { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })}</span></strong></div>
        <div className="status-detail status-region"><span className="micro-label">REGION / PING</span><strong>{data?.region ?? site.region}</strong></div>
      </>}
      <Link to="/servers" className="icon-link" aria-label="View server details"><ArrowUpRight /></Link>
    </div>
    <div className="status-policy"><span>MAP <b>WEEKLY</b></span><span>BLUEPRINTS <b>FORCE WIPE</b></span><span>ONE LIFE. A THOUSAND POSSIBILITIES.</span></div>
  </section>
}
