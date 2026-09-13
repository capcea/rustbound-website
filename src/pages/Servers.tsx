import { PageHero } from '../components/PageHero'
import { ServerCard } from '../components/ServerCard'
import { DiscordCTA } from '../components/DiscordCTA'
import { servers } from '../data/servers'
import { Terminal } from 'lucide-react'

export default function Servers() {
  return <><PageHero eyebrow="THE RUSTBOUND NETWORK" title="FIND YOUR" accent="BATTLEGROUND." description="Fair progression. Fierce competition. A fresh start worth fighting for." />
    <section className="container section-space"><div className="server-list">{servers.map(server => <ServerCard key={server.id} server={server} />)}</div><div className="connection-help"><Terminal size={18} /><span><strong>READY TO DROP IN?</strong> Click Connect, launch Rust, press F1 and paste the command into your console.</span></div></section><DiscordCTA /></>
}
