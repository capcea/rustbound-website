import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, CalendarDays, Pickaxe, Package, Gauge, Users, RotateCcw, ShieldCheck } from 'lucide-react'
import { Hero } from '../components/Hero'
import { ServerStatus } from '../components/ServerStatus'
import { WipeCountdown } from '../components/WipeCountdown'
import { wipeDate } from '../lib/time'
import { site } from '../config/site'
import { SectionTitle } from '../components/SectionTitle'
import { FeatureCard } from '../components/FeatureCard'
import { NewsCard, NewsDialog } from '../components/NewsCard'
import { DiscordCTA } from '../components/DiscordCTA'
import { Reveal } from '../components/Reveal'
import { news } from '../data/news'
import type { NewsArticle } from '../data/news'

const features = [
  { icon: Pickaxe, title: '2X GATHER', description: 'Faster farming without ruining progression.' },
  { icon: Package, title: 'BALANCED LOOT', description: '2X Scrap, 1.5X components, vanilla weapons and explosives.' },
  { icon: Gauge, title: 'FASTER PROGRESSION', description: '2X crafting and slightly faster smelting and recycling.' },
  { icon: Users, title: 'TRIO GAMEPLAY', description: 'Maximum team size of 3. Small teams. Big plays.' },
  { icon: RotateCcw, title: 'WEEKLY WIPES', description: 'Fresh map every week. A new chance to claim your ground.' },
  { icon: ShieldCheck, title: 'VANILLA+', description: 'No teleport spam, massive kits or absurd stacks.' },
]

export default function Home() {
  const [article, setArticle] = useState<NewsArticle | null>(null)
  return <>
    <Hero /><ServerStatus />
    <section className="container section-space wipe-preview">
      <div><p className="eyebrow"><CalendarDays size={15} /> A FRESH MAP. A NEW STORY.</p><h2 className="display-title">NEXT <span>WIPE.</span></h2><p className="wipe-date">{wipeDate(site.nextWipe, { weekday: 'long' })} <span>• {wipeDate(site.nextWipe, { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })} {site.timeZoneLabel}</span></p><p className="muted">Weekly Map Wipe <span className="text-divider">/</span> Blueprints: Force Wipe Only</p></div>
      <div className="wipe-clock"><WipeCountdown /><Link className="text-link" to="/wipes">VIEW WIPE SCHEDULE <ArrowUpRight size={17} /></Link></div>
    </section>
    <Reveal className="container section-space"><SectionTitle eyebrow="THE RUST YOU LOVE. WITH THE RIGHT CHANGES." title="VANILLA ROOTS." accent="RUSTBOUND PACE." /><div className="features-grid">{features.map((feature, i) => <FeatureCard key={feature.title} {...feature} number={i + 1} />)}</div></Reveal>
    <Reveal className="news-section"><section className="container section-space"><SectionTitle eyebrow="STRAIGHT FROM THE COMPOUND" title="SERVER" accent="NEWS."><span className="micro-label">ANNOUNCEMENTS / UPDATES / WIPE INTEL</span></SectionTitle><div className="news-grid">{news.map(item => <NewsCard key={item.id} article={item} onRead={setArticle} />)}</div></section></Reveal>
    <Reveal><DiscordCTA /></Reveal><NewsDialog article={article} onClose={() => setArticle(null)} />
  </>
}
