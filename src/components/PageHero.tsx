import type { ReactNode } from 'react'
import { hero } from '../assets/backgrounds'

export function PageHero({ eyebrow, title, accent, description, children }: { eyebrow: string; title: string; accent: string; description: string; children?: ReactNode }) {
  return <section className="page-hero"><img src={hero} alt="" /><div className="container page-hero-content"><div><p className="eyebrow">{eyebrow}</p><h1 className="display-title">{title} <span>{accent}</span></h1><p>{description}</p></div>{children}</div></section>
}
