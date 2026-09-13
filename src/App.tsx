import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { ToastProvider } from './components/Toast'
import Home from './pages/Home'
import Servers from './pages/Servers'
import Wipes from './pages/Wipes'
import Rules from './pages/Rules'
import Leaderboards from './pages/Leaderboards'
import Store from './pages/Store'
import Discord from './pages/Discord'
import NotFound from './pages/NotFound'

function ScrollManager() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    const name = pathname === '/' ? 'Built for the wipe.' : pathname.slice(1).toUpperCase()
    document.title = 'RUSTBOUND — ' + name
  }, [pathname])
  return null
}

export default function App() {
  const { pathname } = useLocation()
  return <ToastProvider><a className="skip-link" href="#main-content">Skip to content</a><ScrollManager /><Navbar />
    <main id="main-content" className="page-enter" key={pathname}><Routes>
      <Route path="/" element={<Home />} />
      <Route path="/servers" element={<Servers />} />
      <Route path="/wipes" element={<Wipes />} />
      <Route path="/rules" element={<Rules />} />
      <Route path="/leaderboards" element={<Leaderboards />} />
      <Route path="/store" element={<Store />} />
      <Route path="/discord" element={<Discord />} />
      <Route path="*" element={<NotFound />} />
    </Routes></main><Footer />
  </ToastProvider>
}
