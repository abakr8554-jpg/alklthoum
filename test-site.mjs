#!/usr/bin/env node
/**
 * Mock Test Script — Al-Kalthoum Agrico Website
 * Tests: broken links, missing images, page load errors, layout issues
 */

const BASE = 'http://localhost:3000'

// All public pages to test
const PAGES = [
  '/',
  '/about',
  '/products',
  '/products/tomato-hybrid-f1',
  '/products/pepper-bell-mixed',
  '/products/watermelon-seedless',
  '/products/mulch-film-black',
  '/products/greenhouse-film-uv',
  '/products/drip-tape-16mm',
  '/products/pe-mainline-32mm',
  '/products/npk-20-20-20',
  '/products/fungicide-copper',
  '/products/insecticide-imidacloprid',
  '/products/perlite-coarse',
  '/products/coco-peat-compressed',
  '/companies',
  '/companies/shaza',
  '/companies/kalthoum-farms',
  '/companies/fresh-fruit',
  '/companies/sona-plast',
  '/companies/diamond',
  '/ai-assistant',
  '/distributors',
  '/contact',
  '/blog',
  '/faq',
  '/privacy',
  '/terms',
  '/admin/login',
]

// Test a non-existent page returns 404 page correctly
const NOT_FOUND_PAGES = [
  '/products/does-not-exist',
  '/companies/does-not-exist',
  '/nonexistent-page',
]

async function testPage(path) {
  const url = `${BASE}${path}`
  try {
    const res = await fetch(url, { redirect: 'follow' })
    const html = await res.text()
    const status = res.status
    
    const issues = []

    // 1. Check HTTP status
    if (status >= 400 && status !== 404) {
      issues.push(`❌ HTTP ${status}`)
    }

    // 2. Check for Next.js error overlay / runtime errors
    if (html.includes('Application error') || html.includes('Internal Server Error')) {
      issues.push('❌ Application/Server error detected')
    }
    if (html.includes('Unhandled Runtime Error') || html.includes('Error: ')) {
      // Careful not to match legitimate "Error" text
      if (html.includes('__next_error__') || html.includes('nextjs-portal')) {
        issues.push('❌ Next.js error overlay detected')
      }
    }

    // 3. Check for broken images (src="") or placeholder references
    const brokenImgMatches = html.match(/src=""/g)
    if (brokenImgMatches) {
      issues.push(`⚠️  ${brokenImgMatches.length} empty image src attributes`)
    }

    // 4. Check for missing alt text
    const imgWithoutAlt = html.match(/<img(?![^>]*alt=)[^>]*>/g)
    if (imgWithoutAlt) {
      issues.push(`⚠️  ${imgWithoutAlt.length} images missing alt text`)
    }

    // 5. Check for broken internal links (href="")
    const emptyHrefs = html.match(/href=""/g)
    if (emptyHrefs) {
      issues.push(`⚠️  ${emptyHrefs.length} empty href attributes`)
    }

    // 6. Check that page has a title
    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i)
    if (!titleMatch || !titleMatch[1].trim()) {
      issues.push('⚠️  Missing or empty <title> tag')
    }

    // 7. Check for console errors in SSR output
    if (html.includes('Warning:') || html.includes('TypeError')) {
      issues.push('⚠️  React Warning or TypeError in HTML output')
    }

    // 8. Check page has some actual content (not completely blank)
    if (html.length < 500) {
      issues.push('⚠️  Suspiciously short page content')
    }

    return { path, status, issues, contentLength: html.length }
  } catch (err) {
    return { path, status: 0, issues: [`❌ FETCH FAILED: ${err.message}`], contentLength: 0 }
  }
}

async function testImageUrls(path) {
  const url = `${BASE}${path}`
  try {
    const res = await fetch(url)
    const html = await res.text()
    
    // Extract all image sources
    const imgSrcs = []
    const srcMatches = html.matchAll(/(?:src|srcSet)="([^"]+)"/g)
    for (const m of srcMatches) {
      let src = m[1]
      if (src.startsWith('data:')) continue
      if (src.startsWith('/_next')) continue  // Next.js internal assets
      // Decode HTML entities
      src = src.replace(/&amp;/g, '&')
      if (src.startsWith('/')) src = `${BASE}${src}`
      if (!src.startsWith('http')) continue
      imgSrcs.push(src)
    }

    const broken = []
    for (const src of imgSrcs) {
      try {
        const imgRes = await fetch(src, { method: 'HEAD', redirect: 'follow' })
        if (imgRes.status >= 400) {
          broken.push({ src: src.replace(BASE, ''), status: imgRes.status })
        }
      } catch {
        broken.push({ src: src.replace(BASE, ''), status: 'UNREACHABLE' })
      }
    }
    
    return { path, totalImages: imgSrcs.length, broken }
  } catch {
    return { path, totalImages: 0, broken: [{ src: 'WHOLE PAGE', status: 'FETCH FAILED' }] }
  }
}

async function testInternalLinks(path) {
  const url = `${BASE}${path}`
  try {
    const res = await fetch(url)
    const html = await res.text()
    
    // Extract all internal links
    const linkSet = new Set()
    const hrefMatches = html.matchAll(/href="(\/[^"]*?)"/g)
    for (const m of hrefMatches) {
      const href = m[1].split('#')[0].split('?')[0]
      if (href && href !== '/') linkSet.add(href)
    }

    const broken = []
    for (const link of linkSet) {
      try {
        const linkRes = await fetch(`${BASE}${link}`, { redirect: 'follow' })
        if (linkRes.status >= 400 && linkRes.status !== 404) {
          broken.push({ link, status: linkRes.status })
        } else if (linkRes.status === 404) {
          // Check if it's a valid 404 page or truly broken
          const body = await linkRes.text()
          if (body.includes('Internal Server Error') || body.length < 100) {
            broken.push({ link, status: 404 })
          }
        }
      } catch {
        broken.push({ link, status: 'UNREACHABLE' })
      }
    }
    
    return { path, totalLinks: linkSet.size, broken }
  } catch {
    return { path, totalLinks: 0, broken: [] }
  }
}

async function main() {
  console.log('═══════════════════════════════════════════════')
  console.log('  AL-KALTHOUM AGRICO — WEBSITE MOCK TEST')
  console.log('═══════════════════════════════════════════════')
  console.log()

  // ── Phase 1: Page Load Test ──
  console.log('━━━ PHASE 1: PAGE LOAD TEST ━━━')
  console.log()
  let totalIssues = 0
  for (const page of PAGES) {
    const result = await testPage(page)
    const icon = result.issues.length === 0 ? '✅' : '🔴'
    console.log(`${icon} [${result.status}] ${result.path}  (${Math.round(result.contentLength/1024)}KB)`)
    for (const issue of result.issues) {
      console.log(`      ${issue}`)
      totalIssues++
    }
  }
  console.log()

  // ── Phase 2: 404 Page Test ──
  console.log('━━━ PHASE 2: 404 PAGE TEST ━━━')
  console.log()
  for (const page of NOT_FOUND_PAGES) {
    const result = await testPage(page)
    if (result.status === 404) {
      console.log(`✅ ${page} → correctly returns 404`)
    } else {
      console.log(`⚠️  ${page} → returned ${result.status} (expected 404)`)
      totalIssues++
    }
  }
  console.log()

  // ── Phase 3: Broken Images (key pages) ──
  console.log('━━━ PHASE 3: IMAGE CHECK (key pages) ━━━')
  console.log()
  const keyPages = ['/', '/about', '/products', '/companies', '/contact', '/distributors']
  for (const page of keyPages) {
    const result = await testImageUrls(page)
    if (result.broken.length === 0) {
      console.log(`✅ ${page} — ${result.totalImages} images, all OK`)
    } else {
      console.log(`🔴 ${page} — ${result.totalImages} images, ${result.broken.length} BROKEN:`)
      for (const b of result.broken) {
        console.log(`      ❌ ${b.src} → ${b.status}`)
        totalIssues++
      }
    }
  }
  console.log()

  // ── Phase 4: Internal Link Check (key pages) ──
  console.log('━━━ PHASE 4: INTERNAL LINK CHECK (key pages) ━━━')
  console.log()
  for (const page of keyPages) {
    const result = await testInternalLinks(page)
    if (result.broken.length === 0) {
      console.log(`✅ ${page} — ${result.totalLinks} links, all OK`)
    } else {
      console.log(`🔴 ${page} — ${result.totalLinks} links, ${result.broken.length} BROKEN:`)
      for (const b of result.broken) {
        console.log(`      ❌ ${b.link} → ${b.status}`)
        totalIssues++
      }
    }
  }
  console.log()

  // ── Summary ──
  console.log('═══════════════════════════════════════════════')
  if (totalIssues === 0) {
    console.log('  🎉 ALL TESTS PASSED — NO ISSUES FOUND!')
  } else {
    console.log(`  ⚠️  TOTAL ISSUES FOUND: ${totalIssues}`)
  }
  console.log('═══════════════════════════════════════════════')
}

main().catch(console.error)
