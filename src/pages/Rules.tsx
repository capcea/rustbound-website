import { ShieldCheck, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { rules } from '../data/rules'

export default function Rules() {
  return <><PageHero eyebrow="COMPETE HARD. PLAY FAIR." title="THE RULES" accent="OF THE GROUND." description="A level playing field makes every win worth more. These rules apply to everyone." />
    <section className="container section-space rules-layout"><aside className="rules-index"><p className="eyebrow"><ShieldCheck size={16} />FIELD MANUAL</p><nav aria-label="Rule sections">{rules.map((rule, i) => <a key={rule.id} href={'#' + rule.id}><span>0{i + 1}</span>{rule.title}<span>↗</span></a>)}</nav><p>Need to report an issue or appeal a decision?</p><Link to="/discord" className="text-link">CONTACT STAFF <ArrowUpRight size={15} /></Link></aside>
      <div className="rules-content">{rules.map((rule, i) => <article key={rule.id} id={rule.id} className="rule-section"><span className="rule-number">0{i + 1}</span><div><p className="eyebrow">{rule.summary}</p><h2>{rule.title}</h2><ul>{rule.rules.map(text => <li key={text}>{text}</li>)}</ul></div></article>)}</div>
    </section></>
}
