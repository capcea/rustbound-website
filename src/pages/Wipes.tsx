import { CalendarDays, Layers, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { WipeCountdown } from '../components/WipeCountdown'
import { WipeTimeline } from '../components/WipeTimeline'
import { SectionTitle } from '../components/SectionTitle'
import { getUpcomingWipes } from '../data/wipes'
import { wipeDate } from '../lib/time'
import { site } from '../config/site'

export default function Wipes() {
  return <><PageHero eyebrow="PLAN YOUR NEXT START" title="EVERY WIPE." accent="A FRESH START." description="Set your alarm. Rally your trio. Thursday belongs to Rustbound." />
    <section className="container section-space"><div className="wipe-main industrial-panel"><div><p className="eyebrow"><CalendarDays size={16} />NEXT WIPE</p><h2>{wipeDate(site.nextWipe, { weekday: 'long' })}<span>{wipeDate(site.nextWipe, { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })} {site.timeZoneLabel}</span></h2><p>WEEKLY MAP WIPE</p></div><WipeCountdown /></div>
      <div className="wipe-policies"><div><CalendarDays /><span>MAP WIPE</span><strong>{site.mapWipe}</strong></div><div><Layers /><span>BLUEPRINT WIPE</span><strong>{site.blueprintWipe}</strong></div><p>All scheduled times are in Romania's local time. Force wipes follow the monthly Rust update; watch Discord for the confirmed release time.</p></div>
      <div className="upcoming-section"><SectionTitle eyebrow="MARK YOUR CALENDAR" title="THE NEXT" accent="CHAPTERS." /><WipeTimeline wipes={getUpcomingWipes()} /></div>
      <div className="inline-cta"><span>Be there for the first drop. Get wipe announcements on Discord.</span><Link to="/discord" className="text-link">GET THE HEADS-UP <ArrowUpRight size={17} /></Link></div>
    </section></>
}
