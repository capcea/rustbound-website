import { test, expect } from '@playwright/test'

const routes = ['/', '/servers', '/wipes', '/rules', '/leaderboards', '/store', '/discord']
const desktopTitles = ['RUSTBOUND', 'FIND YOUR BATTLEGROUND.', 'EVERY WIPE. A FRESH START.', 'THE RULES OF THE GROUND.', 'MAKE YOUR MARK.', 'SUPPORT RUSTBOUND.', 'JOIN THE RUSTBOUND COMMUNITY.']

for (const width of [1440, 390, 768, 1024, 320]) {
  test('all routes render without errors or overflow at ' + width + 'px', async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    const errors: string[] = []
    page.on('pageerror', err => errors.push(err.message))
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()) })
    page.on('response', res => { if (res.status() >= 400) errors.push(res.status() + ' ' + res.url()) })
    for (const [index, route] of routes.entries()) {
      await page.goto(route, { waitUntil: 'networkidle' })
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(desktopTitles[index])
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true)
      const images = await page.locator('img').evaluateAll(images => images.filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src))
      // Lazy images load after scrolling; inspect them when capturing.
      if (width === 1440 || width === 390) {
        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo({ top: y, behavior: 'instant' }); await new Promise(resolve => setTimeout(resolve, 150)) }
          window.scrollTo({ top: 0, behavior: 'instant' })
        })
        await page.waitForTimeout(450)
        expect(await page.locator('img').evaluateAll(images => images.every(img => img.complete && img.naturalWidth > 0))).toBe(true)
        await page.screenshot({ path: 'artifacts/' + (route === '/' ? 'home' : route.slice(1)) + '-' + width + '.png', fullPage: true })
      } else expect(images.filter(src => !src)).toEqual([])
    }
    expect(errors).toEqual([])
  })
}

test('copy connect and accessible manual fallback', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/')
  await page.getByRole('button', { name: 'PLAY NOW', exact: true }).click()
  await expect(page.getByText('CONNECT COMMAND COPIED', { exact: true })).toBeVisible()
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('client.connect SERVER_IP:28015')
  await page.goto('/servers')
  await page.evaluate(() => { navigator.clipboard.writeText = async () => { throw new Error('Permission denied') } })
  await page.getByRole('button', { name: 'CONNECT', exact: true }).click()
  await expect(page.getByRole('textbox')).toHaveValue('client.connect SERVER_IP:28015')
})

test('desktop navigation, news modal, focus restoration and close', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Read more: WEEKLY WIPE' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.getByRole('dialog').getByRole('heading', { name: 'WEEKLY WIPE' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await expect(page.getByRole('button', { name: 'Read more: WEEKLY WIPE' })).toBeFocused()
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'SERVERS', exact: true }).click()
  await expect(page).toHaveURL(/\/servers$/)
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'SERVERS', exact: true })).toHaveAttribute('aria-current', 'page')
})

test('mobile navigation closes after selection and Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Open navigation' }).click()
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible()
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'WIPES', exact: true }).click()
  await expect(page).toHaveURL(/\/wipes$/)
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).not.toBeVisible()
  await page.getByRole('button', { name: 'Open navigation' }).click()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button', { name: 'Open navigation' })).toHaveAttribute('aria-expanded', 'false')
})

test('leaderboard tabs change metric, order and keyboard focus', async ({ page }) => {
  await page.goto('/leaderboards')
  await expect(page.locator('tbody tr').first()).toContainText('WASTELAND')
  await page.getByRole('tab', { name: 'PLAYTIME' }).click()
  await expect(page.locator('tbody tr').first()).toContainText('Ashborn')
  await expect(page.locator('tbody tr').first()).toContainText('214h 12m')
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('tab', { name: 'RAIDS' })).toBeFocused()
  await expect(page.getByRole('tab', { name: 'RAIDS' })).toHaveAttribute('aria-selected', 'true')
  await expect(page.locator('tbody tr').first()).toContainText('WASTELAND')
  await page.keyboard.press('Home')
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('tab', { name: 'K/D' })).toHaveAttribute('aria-selected', 'true')
  await expect(page.locator('tbody tr').first()).toContainText('4.82')
})

test('countdown ticks and stops at zero', async ({ page }) => {
  await page.clock.install({ time: new Date('2026-09-17T15:59:50Z') })
  await page.clock.pauseAt(new Date('2026-09-17T15:59:58Z'))
  await page.goto('/wipes')
  await expect(page.getByRole('timer')).toContainText('02SECONDS')
  await page.clock.runFor(1000)
  await expect(page.getByRole('timer')).toContainText('01SECONDS')
  await page.clock.runFor(2000)
  await expect(page.getByRole('timer')).toContainText('00SECONDS')
  await expect(page.getByText("IT'S WIPE TIME.", { exact: false })).toBeVisible()
})

test('honest community and store placeholders, rules anchor, unknown route', async ({ page }) => {
  await page.goto('/discord')
  await page.getByRole('button', { name: 'JOIN DISCORD', exact: true }).click()
  await expect(page.getByText('DISCORD INVITE COMING SOON')).toBeVisible()
  await page.goto('/store')
  expect(await page.getByRole('button', { name: 'COMING SOON' }).count()).toBe(3)
  for (const button of await page.getByRole('button', { name: 'COMING SOON' }).all()) await expect(button).toBeDisabled()
  await page.goto('/rules')
  await page.getByRole('navigation', { name: 'Rule sections' }).getByRole('link', { name: '02 CHEATING' }).click()
  await expect(page).toHaveURL(/#cheating$/)
  await expect(page.getByRole('heading', { name: 'CHEATING', exact: true })).toBeInViewport()
  await page.goto('/outside-the-map')
  await expect(page.getByRole('heading', { name: 'LOST IN THE WILDERNESS.' })).toBeVisible()
})
