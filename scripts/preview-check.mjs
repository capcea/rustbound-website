import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

await mkdir('artifacts', { recursive: true })
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 1 })
const errors = []
const baseUrl = process.env.PREVIEW_URL || 'http://127.0.0.1:5173'
const routes = ['/', '/servers', '/wipes', '/rules', '/leaderboards', '/store', '/discord']
const pages = []
page.on('pageerror', error => errors.push(error.message))
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
page.on('response', response => { if (response.status() >= 400) errors.push(response.status() + ' ' + response.url()) })
try {
  for (const route of routes) {
    await page.goto(baseUrl + route, { waitUntil: 'networkidle' })
    await page.locator('h1').waitFor()
    pages.push({ route, heading: await page.locator('h1').innerText() })
    if (route === '/') {
      const height = await page.evaluate(() => document.documentElement.scrollHeight)
      for (let y = 0; y < height; y += 700) {
        await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), y)
        await page.waitForTimeout(150)
      }
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
      await page.waitForTimeout(500)
      await page.screenshot({ path: 'artifacts/home-desktop.png', fullPage: true })
      await page.screenshot({ path: 'artifacts/home-preview.png' })
    }
  }
  console.log(JSON.stringify({ baseUrl, pages, errors }, null, 2))
} finally { await browser.close() }
if (errors.length) process.exitCode = 1
