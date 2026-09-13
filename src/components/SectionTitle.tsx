import type { ReactNode } from 'react'
export function SectionTitle({ eyebrow, title, accent, children }: { eyebrow?: string; title: string; accent?: string; children?: ReactNode }) {
  return <div className="section-title"><div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{title} {accent && <span>{accent}</span>}</h2></div>{children}</div>
}
