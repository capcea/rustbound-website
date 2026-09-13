import { describe, expect, it } from 'vitest'
import { addLocalWeeks, remainingTime, wipeDate } from './time'
import { connectCommand, externalUrl } from '../config/site'
import { getUpcomingWipes } from '../data/wipes'
import { formatLeaderboardValue, sortLeaderboard } from '../services/leaderboards'

describe('wipe schedule and connect configuration', () => {
  it('counts across days, hours and minutes without negatives', () => {
    expect(remainingTime('2026-09-17T16:00:00Z', Date.parse('2026-09-15T01:28:00Z'))).toEqual({ days: 2, hours: 14, minutes: 32, seconds: 0, expired: false })
    expect(remainingTime('2026-09-17T16:00:00Z', Date.parse('2026-09-18T16:00:00Z'))?.days).toBe(0)
    expect(remainingTime('invalid')).toBeNull()
  })
  it('keeps 19:00 Romania time through DST and year changes', () => {
    const autumn = addLocalWeeks('2026-10-22T19:00:00+03:00', 1)
    expect(autumn).toBe('2026-10-29T17:00:00.000Z')
    expect(wipeDate(autumn, { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })).toBe('19:00')
    expect(addLocalWeeks('2026-12-31T19:00:00+02:00', 1)).toBe('2027-01-07T17:00:00.000Z')
  })
  it('labels the first Thursday as a force wipe', () => {
    const events = getUpcomingWipes()
    expect(events[0].date).toBe('2026-09-17T16:00:00.000Z')
    expect(events[2].force).toBe(true)
    expect(events[1].force).toBe(false)
  })
  it('builds the configured command and rejects unsafe external URLs', () => {
    expect(connectCommand('example.test', 28016)).toBe('client.connect example.test:28016')
    expect(externalUrl('javascript:alert(1)')).toBeUndefined()
    expect(externalUrl('')).toBeUndefined()
    expect(externalUrl('https://discord.gg/example')).toBe('https://discord.gg/example')
  })
  it('sorts metrics without mutating source rows', () => {
    const source = [{ id: 'a', name: 'A', value: 2 }, { id: 'b', name: 'B', value: 4 }]
    expect(sortLeaderboard(source)[0].id).toBe('b')
    expect(source[0].id).toBe('a')
    expect(formatLeaderboardValue(4.82, 'kd')).toBe('4.82')
    expect(formatLeaderboardValue(214.2, 'playtime')).toBe('214h 12m')
  })
})
