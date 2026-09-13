import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { logo } from '../assets/brand'
import { DiscordIcon } from './Actions'

export const navItems = [['HOME', '/'], ['SERVERS', '/servers'], ['WIPES', '/wipes'], ['RULES', '/rules'], ['LEADERBOARDS', '/leaderboards'], ['STORE', '/store']] as const

export function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  useEffect(() => setOpen(false), [location.pathname])
  useEffect(() => {
    const close = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])
  return <header className="site-header">
    <div className="nav-shell">
      <Link to="/" aria-label="Rustbound home" className="brand"><img src={logo} alt="RUSTBOUND — Built for the wipe." width="806" height="206" /></Link>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="main-navigation">{open ? <X /> : <Menu />}</button>
      <nav id="main-navigation" aria-label="Main navigation" className={open ? 'main-nav is-open' : 'main-nav'}>
        {navItems.map(([label, path]) => <NavLink key={path} to={path} end={path === '/'}>{label}</NavLink>)}
        <NavLink to="/discord" className="nav-discord"><DiscordIcon />DISCORD<span>↗</span></NavLink>
      </nav>
    </div>
  </header>
}
