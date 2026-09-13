import { ShieldCheck, Users, Server, Signal } from 'lucide-react'
import { DiscordButton } from './Actions'
import { hero } from '../assets/backgrounds'

export const communityValues = [[ShieldCheck, 'ACTIVE ADMINS'], [Users, 'FAIR PLAY'], [Server, 'STABLE SERVER'], [Signal, 'GROWING COMMUNITY']] as const
export function DiscordCTA() {
  return <section className="community-section"><img src={hero} alt="" loading="lazy" className="community-background" /><div className="container community-content"><div><p className="eyebrow">MORE THAN A SERVER</p><h2>GOOD PLAYERS.<br /><span>BETTER STORIES.</span></h2><p>Find your trio. Meet your rivals. Share the wins that almost didn't happen. The best part of every wipe is who you share it with.</p></div><div className="community-action"><DiscordButton label="JOIN RUSTBOUND DISCORD" /><span>YOUR NEXT TEAMMATE IS ALREADY OUT THERE.</span></div></div><div className="container community-values">{communityValues.map(([Icon, text]) => <div key={text}><Icon size={17} strokeWidth={1.6} />{text}</div>)}</div></section>
}
