import { useEffect, useState } from 'react'
import { remainingTime } from '../lib/time'
import { site } from '../config/site'

export function WipeCountdown({ target = site.nextWipe }: { target?: string }) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => { const timer = window.setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(timer) }, [])
  const remaining = remainingTime(target, now)
  if (!remaining) return <p className="countdown-notice">WIPE DATE TO BE ANNOUNCED</p>
  return <div>
    <div className="countdown" role="timer" aria-label="Time until next wipe">
      {[['DAYS', remaining.days], ['HOURS', remaining.hours], ['MINUTES', remaining.minutes], ['SECONDS', remaining.seconds]].map(([label, value]) => <div className="countdown-unit" key={label}><strong>{String(value).padStart(2, '0')}</strong><span>{label}</span></div>)}
    </div>
    {remaining.expired && <p className="countdown-notice">IT'S WIPE TIME. CHECK DISCORD FOR SERVER UPDATES.</p>}
  </div>
}
