import { Link } from 'react-router-dom'
import { logo } from '../assets/brand'
import { site } from '../config/site'
import { navItems } from './Navbar'

export function Footer() {
  return <footer className="site-footer"><div className="container">
    <div className="footer-top"><Link to="/" aria-label="Rustbound home"><img src={logo} alt="RUSTBOUND" width="236" height="60" /></Link><p>{site.secondaryTagline}</p>
      <nav aria-label="Footer navigation">{navItems.slice(1).map(([label, path]) => <Link key={path} to={path}>{label}</Link>)}<Link to="/discord">DISCORD</Link></nav>
    </div>
    <div className="footer-bottom"><span>© 2026 Rustbound. All rights reserved.</span><span>Rustbound is not affiliated with or endorsed by Facepunch Studios.</span><span className="footer-coordinate">EU / EST. 2026</span></div>
  </div></footer>
}
