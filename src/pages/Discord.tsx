import { Bell, LifeBuoy, Flag, Scale, Users, Clapperboard, Newspaper } from 'lucide-react'
import { hero } from '../assets/backgrounds'
import { DiscordButton, DiscordIcon } from '../components/Actions'
import { communityValues } from '../components/DiscordCTA'
import { externalUrl, site } from '../config/site'

const channels = [[Bell, 'WIPE ANNOUNCEMENTS', 'Never miss a fresh start.'], [LifeBuoy, 'SUPPORT', 'Get a hand when you need it.'], [Flag, 'REPORTS', 'Help keep the server fair.'], [Scale, 'BAN APPEALS', 'Have your side heard.'], [Users, 'LOOKING FOR GROUP', 'Your next trio starts here.'], [Clapperboard, 'CLIPS', 'The moments worth keeping.'], [Newspaper, 'SERVER NEWS', 'Stay close to what is changing.']] as const
export default function Discord() {
  return <><section className="discord-hero"><img src={hero} alt="" /><div className="container discord-hero-content"><div className="discord-emblem"><DiscordIcon /></div><p className="eyebrow">GOOD PLAYERS. BETTER STORIES.</p><h1>JOIN THE RUSTBOUND <br /><span>COMMUNITY.</span></h1><p className="discord-intro">The wipe ends. The stories don't. Find your team, share your best plays and help build the kind of server you want to play on.</p><DiscordButton external />{!externalUrl(site.discordUrl) && <p className="invite-note">The official invite is coming soon. Watch this space.</p>}</div></section>
    <section className="container section-space"><div className="discord-channels">{channels.map(([Icon, title, text]) => <article key={title}><Icon size={25} strokeWidth={1.5} /><div><h2>{title}</h2><p>{text}</p></div></article>)}</div><div className="community-values discord-values">{communityValues.map(([Icon, text]) => <div key={text}><Icon size={17} />{text}</div>)}</div></section></>
}
