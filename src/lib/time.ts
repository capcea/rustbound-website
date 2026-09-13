import { site } from '../config/site'

export function remainingTime(target: string, now = Date.now()) {
  const timestamp = Date.parse(target)
  if (!Number.isFinite(timestamp)) return null
  const seconds = Math.max(0, Math.floor((timestamp - now) / 1000))
  return { days: Math.floor(seconds / 86400), hours: Math.floor(seconds / 3600) % 24,
    minutes: Math.floor(seconds / 60) % 60, seconds: seconds % 60, expired: seconds === 0 }
}

export function wipeDate(value: string, options: Intl.DateTimeFormatOptions = {}) {
  if (!Number.isFinite(Date.parse(value))) return 'To be announced'
  return new Intl.DateTimeFormat('en-GB', { timeZone: site.timeZone, ...options }).format(new Date(value))
}

// Keep the configured local hour across Romania's daylight-saving changes.
export function addLocalWeeks(value: string, weeks: number) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: site.timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
  })
  const numbers = (date: Date) => Object.fromEntries(parts.formatToParts(date).map(p => [p.type, Number(p.value)]))
  const p = numbers(new Date(value))
  const localTarget = Date.UTC(p.year, p.month - 1, p.day + weeks * 7, p.hour, p.minute, p.second)
  let utc = localTarget
  for (let i = 0; i < 3; i++) {
    const a = numbers(new Date(utc))
    const asUtc = Date.UTC(a.year, a.month - 1, a.day, a.hour, a.minute, a.second)
    utc += localTarget - asUtc
  }
  return new Date(utc).toISOString()
}
