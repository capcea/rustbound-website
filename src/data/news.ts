import { hero, compound, coast } from '../assets/backgrounds'

export interface NewsArticle {
  id: string
  category: string
  date: string
  title: string
  excerpt: string
  image: string
  body: string[]
}
export const news: NewsArticle[] = [
  { id: 'weekly-wipe', category: 'WIPE INTEL', date: '2026-09-13', title: 'WEEKLY WIPE',
    excerpt: 'A new map. A clean slate. Server wipes every Thursday.',
    image: compound, body: [
      'Every Thursday brings a new map and another chance to make your mark. Find your trio, plan your start and be ready when the server opens.',
      'Map wipes are scheduled for 19:00 Romanian time. Blueprints reset only with the force wipe. Check the Wipes page for the next dates and follow Discord for release announcements.',
    ] },
  { id: 'rustbound-launch', category: 'NETWORK NEWS', date: '2026-09-12', title: 'RUSTBOUND LAUNCH',
    excerpt: 'Built from the ground up. Development and testing are underway.',
    image: hero, body: [
      'Rustbound is taking shape around one idea: a competitive Rust experience that respects progression. We are developing and testing the EU 2X trio server.',
      'The focus is balanced loot, reliable performance and a clear ruleset. Launch details and connection information will be shared through the Rustbound community channels.',
    ] },
  { id: 'server-updates', category: 'FROM THE WORKBENCH', date: '2026-09-10', title: 'SERVER UPDATES',
    excerpt: 'Small changes. Better wipes. Balance and quality-of-life improvements.',
    image: coast, body: [
      'Our Vanilla+ balance keeps weapons and explosives at vanilla levels, with 2X scrap and 1.5X components. Gathering and crafting are faster without skipping the survival loop.',
      'Smelting and recycling receive a smaller boost. Testing continues, and player feedback will help shape future balance and quality-of-life updates.',
    ] },
]
