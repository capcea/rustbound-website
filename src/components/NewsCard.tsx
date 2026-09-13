import { useEffect, useRef } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { NewsArticle } from '../data/news'

function newsDate(date: string) {
  return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(date)).toUpperCase()
}
export function NewsCard({ article, onRead }: { article: NewsArticle; onRead: (article: NewsArticle) => void }) {
  return <article className="news-card"><div className="news-image"><img src={article.image} alt="" loading="lazy" width="950" height="660" /><span>{article.category}</span></div>
    <div className="news-card-body"><time dateTime={article.date}>{newsDate(article.date)}</time><h3>{article.title}</h3><p>{article.excerpt}</p><button className="text-link" onClick={() => onRead(article)} aria-label={'Read more: ' + article.title}>READ MORE <ArrowUpRight size={17} /></button></div>
  </article>
}

export function NewsDialog({ article, onClose }: { article: NewsArticle | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (article && ref.current && !ref.current.open) ref.current.showModal()
    if (!article && ref.current?.open) ref.current.close()
    if (article) { const previous = document.body.style.overflow; document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = previous } }
  }, [article])
  return <dialog ref={ref} className="news-dialog" aria-labelledby="news-dialog-title" onClose={onClose} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
    {article && <div><img src={article.image} alt="" className="news-dialog-image" /><button className="dialog-close" aria-label="Close article" onClick={onClose} autoFocus><X /></button><div className="news-dialog-copy"><p className="eyebrow">{article.category} / {newsDate(article.date)}</p><h2 id="news-dialog-title">{article.title}</h2>{article.body.map(p => <p key={p}>{p}</p>)}<Link to="/wipes" className="text-link" onClick={onClose}>CHECK THE WIPE SCHEDULE <ArrowUpRight size={17} /></Link></div></div>}
  </dialog>
}
