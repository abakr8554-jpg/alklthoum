import { buildOgImage, ogSize } from '@/lib/og'

export const runtime = 'nodejs'
export const alt = 'Al Kalthoum Group — Together We Make the Future'
export const size = ogSize
export const contentType = 'image/png'

export default function Image() {
  return buildOgImage()
}
