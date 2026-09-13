import { Link } from 'react-router-dom'
export default function NotFound() {
  return <section className="container section-space not-found"><p className="eyebrow">404 / OUTSIDE THE MAP</p><h1 className="display-title">LOST IN THE <span>WILDERNESS.</span></h1><p>This page didn't survive the wipe. Head back to familiar ground.</p><Link className="button button-primary" to="/">BACK TO HOME ↗</Link></section>
}
