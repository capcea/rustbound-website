import { CalendarDays, Layers } from 'lucide-react'
import type { WipeEvent } from '../data/wipes'
import { wipeDate } from '../lib/time'
import { site } from '../config/site'

export function WipeTimeline({ wipes }: { wipes: WipeEvent[] }) {
  return <ol className="wipe-timeline">{wipes.map((wipe, index) => <li key={wipe.id} className={wipe.force ? 'force-wipe' : ''}><span className="timeline-node" /><p className="timeline-index">{index === 0 ? 'UP NEXT' : '0' + (index + 1)}</p><time dateTime={wipe.date}><strong>{wipeDate(wipe.date, { day: '2-digit' })}</strong><span>{wipeDate(wipe.date, { month: 'short' })}</span></time><div className="timeline-kind">{wipe.force ? <Layers size={19} /> : <CalendarDays size={19} />}<h3>{wipe.force ? 'FORCE WIPE' : 'MAP WIPE'}</h3></div><p>{wipe.force ? 'MAP + BLUEPRINT RESET' : 'NEW MAP. SAME BLUEPRINTS.'}</p><span className="timeline-time">{wipe.force ? 'WITH THE RUST UPDATE' : wipeDate(wipe.date, { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }) + ' ' + site.timeZoneLabel}</span></li>)}</ol>
}
