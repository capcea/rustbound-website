import { site } from '../config/site'
import { addLocalWeeks, wipeDate } from '../lib/time'

export interface WipeEvent { id: string; date: string; force: boolean }
export function getUpcomingWipes(count = 5): WipeEvent[] {
  if (!Number.isFinite(Date.parse(site.nextWipe))) return []
  return Array.from({ length: count }, (_, i) => {
    const date = addLocalWeeks(site.nextWipe, i)
    const day = Number(wipeDate(date, { day: 'numeric' }))
    const force = wipeDate(date, { weekday: 'long' }) === 'Thursday' && day <= 7
    return { id: date, date, force }
  })
}
