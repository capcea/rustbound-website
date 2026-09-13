import { Check, LockKeyhole } from 'lucide-react'
export interface PackageData { name: string; eyebrow: string; description: string; perks: string[]; image: string; featured?: boolean }
export function StorePackage({ item }: { item: PackageData }) {
  return <article className={'store-package industrial-panel ' + (item.featured ? 'package-featured' : '')}><div className="package-top"><span>{item.eyebrow}</span><span>RUSTBOUND</span></div><img src={item.image} alt="" loading="lazy" className="package-image" /><h2>{item.name}</h2><p>{item.description}</p><ul>{item.perks.map(perk => <li key={perk}><Check size={15} />{perk}</li>)}</ul><button className="button button-quiet" disabled><LockKeyhole size={15} />COMING SOON</button></article>
}
