# GS Wehringhausen – Website

Modern website for **Grundschule Wehringhausen** in Hagen, Germany.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 + TypeScript + Tailwind CSS 4 |
| CMS / Admin | Payload CMS 3 (integrated in Next.js) |
| Database | PostgreSQL (Neon or local) |
| Media Storage | Cloudflare R2 (S3-compatible) or local disk |
| Email | Nodemailer (SMTP) |
| Maps | Leaflet + OpenStreetMap |
| Calendar | FullCalendar |
| Deployment | Vercel (frontend) |

## Getting Started

### 1. Prerequisites

- Node.js 20+
- PostgreSQL database (local or [Neon](https://neon.tech))

### 2. Environment Setup

```bash
cp .env.example .env
# Edit .env with your actual values
```

Required variables:
- `DATABASE_URI` – PostgreSQL connection string
- `PAYLOAD_SECRET` – Secret key for Payload CMS (long random string in production)
- `NEXT_PUBLIC_SERVER_URL` – Your site URL

### 3. Install & Run

```bash
npm install
npm run dev
```

App: `http://localhost:3000` | Admin: `http://localhost:3000/admin`

### 4. First Admin Account

On first visit to `/admin`, Payload will prompt you to create the first admin account.

### 5. Import NRW School Holidays

```bash
npx tsx scripts/import-nrw-holidays.ts
```

## Pages

| URL | Description |
|---|---|
| `/` | Home page |
| `/aktuelles` | News articles (paginated, filtered by category) |
| `/aktuelles/[slug]` | Single article |
| `/termine` | Interactive school calendar |
| `/galerie` | Photo gallery album list |
| `/galerie/[slug]` | Album with lightbox view |
| `/unsere-schule` | About the school + staff directory |
| `/schulleben` | School life (JüL, Lernzeiten, Sozialarbeit) |
| `/ogs` | All-day school (OGS) info |
| `/eltern` | Parents: sick reports, downloads, FAQ |
| `/kontakt` | Contact form + OpenStreetMap |
| `/impressum` | Legal notice |
| `/datenschutz` | Privacy policy (GDPR / DSGVO) |
| `/admin` | Payload CMS admin panel |

## Production Deployment

### Frontend & CMS (Vercel)

1. Push to GitHub
2. Connect repo in Vercel dashboard
3. Set all `DATABASE_URI`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`, and optional `SMTP_*`/`S3_*` variables
4. Deploy — Vercel runs both Next.js and the Payload API

### Database (Neon – recommended)

1. Create project at [neon.tech](https://neon.tech) (free tier)
2. Choose **EU Frankfurt** region (GDPR)
3. Copy connection string → `DATABASE_URI`

### Media Storage (Cloudflare R2)

1. Create R2 bucket in Cloudflare dashboard
2. Create API credentials (Access Key ID + Secret)
3. Set `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_ENDPOINT`, `NEXT_PUBLIC_CDN_URL`

Without R2 set, images are stored locally in `public/media/` (fine for development).

## GDPR / DSGVO Compliance

- No Google Analytics – cookie-free, no tracking
- Google Fonts **not used** – no external font CDN calls to Google
- Maps via OpenStreetMap + Leaflet (not Google Maps)
- Contact and sick-report forms include mandatory GDPR consent checkbox
- Password-protected gallery albums available for class photos
- Cookie consent banner (only essential cookies used)
- All data stored on EU-based servers when using Neon EU + Cloudflare R2 EU
