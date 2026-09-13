import { ArrowDown, Pickaxe, Layers, Users, CalendarDays, Hammer, Flame, Recycle } from 'lucide-react'
import { hero } from '../assets/backgrounds'
import { site } from '../config/site'
import { ConnectButton, DiscordButton } from './Actions'

const badges = [
  [Pickaxe, '2X', 'GATHER'], [Layers, '2X', 'SCRAP'], [Users, 'TRIO', 'MAX TEAM 3'],
  [CalendarDays, 'WEEKLY', 'MAP WIPE'], [Hammer, '2X', 'CRAFTING'], [Flame, '1.5X', 'SMELTING'], [Recycle, '1.5X', 'RECYCLING'],
] as const

export function Hero() {
  return <section className="hero">
    <img className="hero-background" src={hero} alt="" fetchPriority="high" />
    <div className="hero-shade" />
    <div className="container hero-content">
      <p className="hero-kicker"><span className="orange-tick" />{site.region} • {site.serverMode}</p>
      <h1 className="hero-wordmark"><span>RUST</span><span>BOUND</span></h1>
      <p className="hero-tagline">{site.tagline}</p>
      <p className="hero-description">A fast, competitive Vanilla+ Rust experience built around fair progression, weekly wipes and trio gameplay.</p>
      <div className="hero-actions"><ConnectButton /><DiscordButton /></div>
      <p className="hero-console">COPY. OPEN RUST. PRESS F1. CONNECT.</p>
      <a className="explore-link" href="#server-status"><ArrowDown size={16} />YOUR NEXT WIPE STARTS HERE</a>
    </div>
    <div className="hero-caption"><span>GOOD PLAYERS.</span><strong>BETTER STORIES.</strong><i /></div>
    <div className="feature-badges container">{badges.map(([Icon, top, bottom]) => <div className="feature-badge" key={bottom}><Icon size={25} strokeWidth={1.7} /><div><strong>{top}</strong><span>{bottom}</span></div></div>)}</div>
  </section>
}
