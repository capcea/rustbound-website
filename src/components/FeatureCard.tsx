import type { LucideIcon } from 'lucide-react'

export function FeatureCard({ icon: Icon, title, description, number }: { icon: LucideIcon; title: string; description: string; number: number }) {
  return <article className="feature-card"><span className="feature-number">0{number}</span><div className="feature-card-icon"><Icon size={28} strokeWidth={1.5} /></div><h3>{title}</h3><p>{description}</p><div className="feature-card-line" /></article>
}
