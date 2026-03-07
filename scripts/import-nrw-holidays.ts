/**
 * Import NRW school holidays directly into PostgreSQL.
 * Bypasses Payload's CMS to avoid the tsx/Next.js env-loader conflict.
 *
 * Usage: npx tsx scripts/import-nrw-holidays.ts
 *
 * Requires DATABASE_URI in .env (parsed below without dotenv dependency).
 */

import { readFileSync } from 'fs'
import { resolve } from 'path'
import pkg from 'pg'

const { Pool } = pkg

// ─── Load .env manually ────────────────────────────────────────────────────
function loadEnv() {
  try {
    const raw = readFileSync(resolve(process.cwd(), '.env'), 'utf8')
    for (const line of raw.split('\n')) {
      const match = line.match(/^\s*([^#\s=][^=]*?)\s*=\s*(.*?)\s*$/)
      if (match && !process.env[match[1]]) {
        process.env[match[1]] = match[2].replace(/^["']|["']$/g, '')
      }
    }
  } catch {
    // .env not found — rely on existing process.env
  }
}

loadEnv()

// ─── Fetch NRW school holidays ─────────────────────────────────────────────
async function fetchHolidays(year: number) {
  const url =
    `https://openholidaysapi.org/SchoolHolidays` +
    `?countryIsoCode=DE&languageIsoCode=DE&subdivisionCode=DE-NW` +
    `&validFrom=${year}-01-01&validTo=${year + 1}-12-31`

  console.log(`Fetching: ${url}`)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`API error ${res.status}: ${await res.text()}`)
  return res.json() as Promise<
    Array<{ name: Array<{ language: string; text: string }>; startDate: string; endDate: string }>
  >
}

// ─── Main ──────────────────────────────────────────────────────────────────
async function main() {
  const dbUri = process.env.DATABASE_URI
  if (!dbUri || dbUri.includes('user:password')) {
    console.error('❌  Set DATABASE_URI in .env before running this script.')
    process.exit(1)
  }

  const pool = new Pool({ connectionString: dbUri })

  // Ensure table exists (Payload creates it on first run)
  const { rows: tables } = await pool.query(
    `SELECT tablename FROM pg_tables WHERE schemaname='public' AND tablename='events'`,
  )
  if (!tables.length) {
    console.error('❌  Table "events" not found. Start the app first (npm run dev) to let Payload create the schema.')
    await pool.end()
    process.exit(1)
  }

  const year = new Date().getFullYear()
  const holidays = await fetchHolidays(year)

  let created = 0
  let skipped = 0

  for (const holiday of holidays) {
    const title = holiday.name.find((n) => n.language === 'DE')?.text ?? 'Schulferien'
    const startDate = holiday.startDate
    const endDate = holiday.endDate

    // Check for duplicates
    const { rows: existing } = await pool.query(
      `SELECT id FROM events WHERE title=$1 AND start_date=$2 AND is_nrw_holiday=true`,
      [title, startDate],
    )

    if (existing.length) {
      console.log(`  SKIP  ${title} (${startDate})`)
      skipped++
      continue
    }

    await pool.query(
      `INSERT INTO events (title, type, start_date, end_date, all_day, is_nrw_holiday, created_at, updated_at)
       VALUES ($1, 'holiday', $2, $3, true, true, NOW(), NOW())`,
      [title, startDate, endDate],
    )

    console.log(`  +     ${title}  (${startDate} – ${endDate})`)
    created++
  }

  await pool.end()
  console.log(`\nDone ✓  Created: ${created}  Skipped: ${skipped}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
