import { useState } from 'react'
import { Check, Copy, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { connectCommand, externalUrl, site } from '../config/site'
import { useToast } from './Toast'

export function ConnectButton({ label = 'PLAY NOW', ip, port, className = '' }: { label?: string; ip?: string; port?: number; className?: string }) {
  const toast = useToast()
  const [manual, setManual] = useState(false)
  const [copied, setCopied] = useState(false)
  const command = connectCommand(ip, port)
  async function copy() {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true); toast('CONNECT COMMAND COPIED')
    } catch { setManual(true) }
  }
  return <div className={'connect-action ' + className}>
    <button className="button button-primary" onClick={() => void copy()}>{copied ? <Check size={17} /> : <Copy size={17} />}{copied ? 'COMMAND COPIED' : label}<ArrowUpRight size={18} /></button>
    {manual && <div className="manual-connect"><label>Copy this command into your Rust F1 console<input readOnly value={command} onFocus={e => e.target.select()} /></label><button onClick={() => setManual(false)}>Close</button></div>}
  </div>
}

export function DiscordButton({ label = 'JOIN DISCORD', className = '', external = false }: { label?: string; className?: string; external?: boolean }) {
  const url = externalUrl(site.discordUrl)
  const toast = useToast()
  if (!external) return <Link to="/discord" className={'button button-secondary ' + className}><DiscordIcon />{label}<ArrowUpRight size={18} /></Link>
  if (url) return <a href={url} target="_blank" rel="noopener noreferrer" className={'button button-primary ' + className}><DiscordIcon />{label}<ArrowUpRight size={18} /></a>
  return <button className={'button button-primary ' + className} onClick={() => toast('DISCORD INVITE COMING SOON')}><DiscordIcon />{label}<ArrowUpRight size={18} /></button>
}

export function DiscordIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.7 4.6a18 18 0 0 0-4.4-1.4l-.5 1a16.3 16.3 0 0 0-5.6 0l-.5-1a18 18 0 0 0-4.4 1.4C1.5 8.8.8 12.8 1.2 16.8a18 18 0 0 0 5.4 2.7l1.1-1.8-1.7-.8.4-.3a13 13 0 0 0 11.2 0l.4.3-1.7.8 1.1 1.8a18 18 0 0 0 5.4-2.7c.5-4.7-.8-8.7-3.1-12.2ZM8.5 14.6c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm7 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z"/></svg>
}
