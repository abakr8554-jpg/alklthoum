import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'
import { SITE } from '@/lib/site'

export const ogSize = { width: 1200, height: 630 }

/**
 * Branded 1200×630 share card rendered with Satori (next/og).
 * Latin-only type so it never depends on a remote Arabic font at build time;
 * the logo mark is inlined from /public so there is no network fetch.
 */
export function buildOgImage() {
  let logo = ''
  try {
    const svg = readFileSync(join(process.cwd(), 'public', 'logo-mark.svg'))
    logo = `data:image/svg+xml;base64,${svg.toString('base64')}`
  } catch {
    /* logo optional */
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 96px',
          background:
            'radial-gradient(1000px 600px at 82% -10%, rgba(232,87,26,0.26), transparent 60%),' +
            'radial-gradient(900px 600px at 0% 120%, rgba(46,107,26,0.45), transparent 60%),' +
            'linear-gradient(135deg, #0a1610 0%, #10251a 55%, #0a1610 100%)',
          color: '#f4f7f2',
          fontFamily: 'sans-serif',
        }}
      >
        {/* top row: mark + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} width={128} height={151} alt="" />
          ) : null}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                fontSize: 84,
                fontWeight: 800,
                letterSpacing: -2,
                lineHeight: 1,
              }}
            >
              AL KALTHOUM
            </div>
            <div
              style={{
                fontSize: 27,
                letterSpacing: 10,
                color: '#c8dd78',
                marginTop: 12,
                fontWeight: 600,
              }}
            >
              AGRICULTURAL GROUP
            </div>
          </div>
        </div>

        {/* accent line */}
        <div
          style={{
            display: 'flex',
            width: 240,
            height: 4,
            marginTop: 46,
            marginBottom: 34,
            background: 'linear-gradient(90deg, #e8571a, #c8dd78)',
            borderRadius: 4,
          }}
        />

        {/* tagline */}
        <div style={{ display: 'flex', fontSize: 46, fontWeight: 700, maxWidth: 820 }}>
          {SITE.tagline}
        </div>

        {/* footer meta */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: 54,
            left: 96,
            right: 96,
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 24,
            letterSpacing: 4,
            color: 'rgba(200,221,120,0.82)',
            fontWeight: 600,
          }}
        >
          <div style={{ display: 'flex' }}>SINCE 1993</div>
          <div style={{ display: 'flex', color: 'rgba(244,247,242,0.72)' }}>
            alkalthoum.com
          </div>
        </div>
      </div>
    ),
    { ...ogSize },
  )
}
