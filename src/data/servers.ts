import { site } from '../config/site'

export interface RustServer {
  id: string
  name: string
  region: string
  rate: string
  team: string
  wipe: string
  blueprints: string
  ip: string
  port: number
  description: string
}

export const servers: RustServer[] = [{
  id: 'eu-2x-trio',
  name: site.serverName + ' 2X TRIO',
  region: site.region,
  rate: '2X',
  team: 'SOLO/DUO/TRIO',
  wipe: 'WEEKLY',
  blueprints: site.blueprintWipe,
  ip: site.serverIp,
  port: site.serverPort,
  description: 'Your next fresh start. A balanced Vanilla+ experience for solos, duos and trios.',
}]
