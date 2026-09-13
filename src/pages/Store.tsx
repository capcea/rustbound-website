import { ShieldCheck, HeartHandshake, ArrowUpRight } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { StorePackage } from '../components/StorePackage'
import type { PackageData } from '../components/StorePackage'
import supporter from '../assets/icons/supporter.webp'
import loyalty from '../assets/icons/loyalty.webp'
import founders from '../assets/brand/founders.webp'
import { site, externalUrl } from '../config/site'

const packages: PackageData[] = [
  { name: 'SUPPORTER', eyebrow: 'LEAVE YOUR MARK', description: 'For the players who make this place home.', image: supporter, perks: ['Discord role', 'Chat badge', 'Cosmetics', 'Supporter recognition'] },
  { name: 'VIP', eyebrow: 'BACK THE BATTLEGROUND', description: 'A little convenience. The same fair fight.', image: loyalty, featured: true, perks: ['Queue priority', 'Chat badge', 'Cosmetics', 'Minor convenience features'] },
  { name: 'FOUNDERS', eyebrow: 'HERE FROM THE BEGINNING', description: 'Be part of the story from day one.', image: founders, perks: ['Limited supporter badge', 'Discord role', 'Cosmetics', 'Permanent recognition'] },
]
export default function Store() {
  const storeUrl = externalUrl(site.storeUrl)
  return <><PageHero eyebrow="KEEP THE FIRES BURNING" title="SUPPORT" accent="RUSTBOUND." description="Support the server while keeping gameplay fair." />
    <section className="container section-space"><div className="fair-play-banner"><ShieldCheck size={29} /><div><h2>NO PAY-TO-WIN.</h2><p>No weapons. No explosives. No resources. No raid kits. Your support keeps the server running; your skill wins the fight.</p></div><HeartHandshake size={28} /></div><div className="store-grid">{packages.map(item => <StorePackage key={item.name} item={item} />)}</div><div className="store-note"><span>Packages are in development. Full details will be announced before the store opens.</span>{storeUrl && <a href={storeUrl} target="_blank" rel="noopener noreferrer" className="text-link">OFFICIAL STORE <ArrowUpRight size={16} /></a>}</div></section></>
}
