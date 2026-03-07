# 🏫 GS Wehringhausen – Website Modernization Plan

> A comprehensive development blueprint for modernizing the Grundschule Wehringhausen website into a modern, maintainable, and parent-friendly platform.

---

## 1. Current Website Analysis

The existing site at **gswehringhausen.de** is built on **Wix** — a drag-and-drop no-code platform. While it gets the basics done, it has significant limitations:

- **Rigid structure** – hard to extend or customize deeply
- **No proper CMS backend** – content updates require Wix editor access; no multi-admin workflow
- **No interactive calendar** – events are listed as static text
- **No photo gallery system** – images are dropped manually into pages
- **No news/blog system** with categories, search, or archive
- **Performance issues** – Wix sites are known for heavy JS bundles and slow load times
- **Poor SEO control** – limited structured data, no sitemap control
- **Vendor lock-in** – you can't export or self-host your Wix site
- **No GDPR-compliant cookie management** built in
- **Not fully accessible** (WCAG compliance is limited on Wix)

---

## 2. Recommended Technology Stack

### ✅ Frontend: **Next.js (React)**

**Why Next.js?**
- The gold standard for modern web apps — used by thousands of school, government, and enterprise sites
- **Server-Side Rendering (SSR)** and **Static Generation (SSG)** for blazing-fast pages
- Built-in routing, image optimization, and SEO metadata control
- Excellent TypeScript support
- Large community, long-term support from Vercel
- Works seamlessly with a headless CMS (see below)

**Styling: Tailwind CSS**
- Utility-first CSS framework — fast to build, easy to maintain
- Fully responsive by default (mobile-first)
- Clean, professional look with minimal effort
- School color palette can be configured globally

---

### ✅ Backend & CMS: **Payload CMS** (or **Strapi** as alternative)

**You DO need a backend/CMS.** Here's why and what it does:

| Feature | Without CMS | With CMS |
|---|---|---|
| Post news articles | Edit code files manually | Click "New Post" in admin panel |
| Add calendar events | Hardcode dates in HTML | Fill in a form, pick a date |
| Update photo gallery | FTP upload + code changes | Drag-and-drop upload |
| Manage contact info | Code edit | Simple field update |
| Multiple staff editors | Not possible | Role-based access for each teacher |

**Why Payload CMS?**
- Open source, self-hostable (no recurring SaaS fees)
- Built with TypeScript + Node.js — same language as Next.js
- Beautiful, modern admin panel out of the box
- Highly customizable content types (news, events, gallery albums, pages)
- Built-in media library with image resizing
- REST and GraphQL APIs
- Role-based access control (Principal vs. Teacher vs. Secretary roles)

**Alternative: Strapi** — also excellent, slightly more opinionated but very mature.

---

### ✅ Database: **PostgreSQL** (via Neon or Supabase)

**You DO need a database** — this is where all your content lives (news posts, calendar events, gallery metadata, contact info, etc.)

- **Neon** or **Supabase** offer free-tier hosted PostgreSQL — perfect for a school with low traffic
- Payload CMS manages all database interactions automatically — you never write SQL manually
- Backups are handled automatically by the host

---

### ✅ File/Media Storage: **Cloudflare R2** or **Uploadthing**

- Photo gallery images, logos, and documents (PDFs) stored in cloud object storage
- Very cheap (Cloudflare R2 has a generous free tier)
- Images auto-optimized and served via CDN globally

---

### ✅ Hosting: **Vercel** (Frontend) + **Railway** or **Render** (Backend/CMS)

| Component | Host | Cost |
|---|---|---|
| Next.js Frontend | Vercel | Free tier |
| Payload CMS Admin + API | Railway or Render | ~€5–10/month |
| PostgreSQL Database | Neon or Supabase | Free tier |
| Media Storage | Cloudflare R2 | Free tier |
| Domain (gswehringhausen.de) | Keep existing | ~€10/year |

**Total estimated monthly cost: €0–10/month**, compared to Wix which can cost €15–30/month with limited functionality.

---

## 3. Website Pages & Features

### 3.1 Public-Facing Pages

#### 🏠 Home Page (`/`)
- Hero banner with school photo and welcome message
- Quick-access cards: News, Calendar, Gallery, Contact
- "Important Upcoming Dates" widget (auto-pulled from calendar)
- Latest 3 news articles preview
- School overview paragraph + key stats (number of students, classes, etc.)
- Quick contact strip at bottom (phone, email, address, map)

#### 📰 News Page (`/aktuelles`)
- Paginated list of news articles with thumbnail, title, date, excerpt
- Category filters (e.g., School Life, OGS, Events, Announcements)
- Search functionality
- Individual article pages with full content, images, author, and date
- RSS feed for parents who use feed readers

#### 📅 School Calendar (`/termine`)
- **Interactive calendar view** (monthly/weekly/list toggle)
- Color-coded event types: School holidays (NRW-official), School events, OGS events, Parent meetings
- **Automatic NRW public school holiday import** via iCal/API integration (Schulferien NRW API)
- Click on event to see details modal
- "Add to my Calendar" button (exports .ics for Google/Apple Calendar)
- Admin can add custom school events via the CMS admin panel

#### 🖼 Photo Gallery (`/galerie`)
- Album-based structure (e.g., "Schulfest 2024", "Projektwoche", "Theater")
- Masonry/grid layout with lightbox preview
- Albums managed entirely from admin panel
- Image upload with automatic compression and thumbnail generation
- Optional: password-protected albums for internal/class use

#### 🏫 About the School (`/unsere-schule`)
- School history and philosophy
- Teaching concept (JüL – Jahrgangsübergreifendes Lernen)
- Team/staff page with photos and roles
- School map/location section

#### 📚 School Life (`/schulleben`)
- Sub-pages: JüL, Lernzeiten, Schulsozialarbeit
- Rich text with embedded images and downloadable PDFs

#### 🌇 OGS (`/ogs`)
- Overview of the all-day school program
- Pädagogisches Konzept sub-page
- Schedule / Fees information

#### 👨‍👩‍👧 Parents (`/eltern`)
- Absence/illness reporting form (Krankmeldung) — sends email to school
- Parent café info
- Downloadable forms (PDF)
- Parent committee (Schulpflegschaft) info
- FAQ section

#### 📞 Contact (`/kontakt`)
- Contact form (name, email, subject, message) with GDPR consent checkbox
- Phone, email, opening hours
- Interactive Google Maps embed (or Leaflet for privacy-friendly alternative)
- Emergency/absence notification info

#### ⚖️ Legal Pages
- Impressum (`/impressum`)
- Datenschutzerklärung (`/datenschutz`) — **GDPR compliant, auto-updated template**
- Cookie consent (`/cookies`)

---

### 3.2 Admin Panel Features

Accessible at `/admin` — login required (staff only)

#### Dashboard
- Quick stats: Recent posts, upcoming events, latest gallery uploads
- Notification center (contact form submissions)

#### News Management
- Create / Edit / Delete articles
- Rich text editor (headings, bold, images, links, embedded videos)
- Categories and tags
- Schedule posts for future publication
- Featured image upload

#### Calendar Management
- Add / Edit / Delete custom school events
- Set event type, color, date/time, description, location
- View and override NRW holiday imports

#### Gallery Management
- Create albums with title, date, description
- Bulk upload photos to albums
- Reorder photos via drag-and-drop
- Toggle album visibility (published / draft)

#### Page Content Management
- Edit static page content (About, OGS, School Life pages) via rich text editor
- Upload/replace PDFs for parents section

#### Contact Form Inbox
- View all submitted contact forms
- Mark as read / archive
- Forward to email

#### User Management (for Principal/Admin role only)
- Create staff accounts with role-based permissions
  - **Admin**: Full access
  - **Editor**: Can post news, manage gallery
  - **Viewer**: Read-only access to admin panel

---

## 4. Development Phases

### Phase 1 – Foundation (Weeks 1–3)
- Set up Next.js project with TypeScript + Tailwind CSS
- Set up Payload CMS with PostgreSQL
- Define content models: News, Events, Gallery Albums, Pages, Staff
- Configure media storage (Cloudflare R2)
- Set up CI/CD pipeline (GitHub → Vercel/Railway auto-deploy)
- Implement authentication and role-based admin access

### Phase 2 – Core Pages (Weeks 4–6)
- Build shared layout: Header, Navigation (responsive mobile menu), Footer
- Build Home Page with dynamic content blocks
- Build News listing + individual article pages
- Build Contact page with working email form
- Build About + School Life pages (static-ish, CMS-editable)

### Phase 3 – Dynamic Features (Weeks 7–9)
- Build interactive School Calendar
- Integrate NRW school holidays API / iCal import
- Build Photo Gallery with album structure and lightbox
- Build Parents section with illness reporting form
- GDPR cookie consent banner integration (e.g., Cookiebot or self-built)

### Phase 4 – Admin Panel Polish & Testing (Weeks 10–11)
- Polish admin panel UI and workflows for non-technical staff
- Write brief "How to use the CMS" guide for school staff
- Cross-browser and mobile responsiveness testing
- Accessibility audit (WCAG 2.1 AA)
- Performance testing (Lighthouse score target: 90+)
- SEO metadata, Open Graph tags, structured data (JSON-LD for school)

### Phase 5 – Migration & Launch (Week 12)
- Migrate existing content from Wix to new CMS
- DNS cutover from Wix to new hosting
- Set up SSL certificate (automatic via Vercel)
- Set up Google Search Console
- 301 redirects for old Wix URLs
- Handover to school staff + CMS training session

---

## 5. Key Technical Decisions Explained

### Why not WordPress?
WordPress is the world's most popular CMS, but for a new build in 2025 it has drawbacks:
- Security vulnerabilities require constant plugin updates
- Performance is poor out of the box without heavy optimization
- The admin UI is dated compared to modern headless CMS options
- PHP stack vs. modern JavaScript ecosystem

### Why not Wix / Squarespace / Jimdo?
- Vendor lock-in (you can never truly own or export your site)
- Limited customization for specialized features (interactive calendar, gallery with albums, etc.)
- Monthly costs that rise over time
- No proper developer workflow or version control

### Why not a static site (plain HTML/CSS)?
- Cannot support an admin panel for non-technical staff
- No database = no dynamic content = teachers would need developer help for every update

### Self-hosted vs. SaaS CMS
A self-hosted CMS (Payload/Strapi) is chosen because:
- No recurring per-seat SaaS fees
- Full data ownership (important for GDPR — data stays in EU)
- Content lives in your own database, not a third-party cloud
- Fully customizable to the school's needs

---

## 6. GDPR Considerations (Critical for German Schools)

German schools are subject to strict DSGVO (GDPR) requirements:

- **Cookie consent banner** required before any tracking scripts load
- **No Google Analytics** without explicit consent — use privacy-friendly **Plausible** or **Umami** instead (self-hosted, no cookies needed)
- **Contact forms** must include explicit consent checkbox and link to Datenschutzerklärung
- **Photo gallery** — photos of children require parental consent; consider password-protecting student photo albums
- **Google Fonts** — must be self-hosted (not loaded from Google CDN) to avoid IP address transfer to Google
- **Google Maps embed** — use **OpenStreetMap / Leaflet.js** as a privacy-preserving alternative
- **Impressum** — required by German law, must be easily accessible (max 2 clicks from any page)
- All user data (form submissions) stored on EU-based servers

---

## 7. Recommended Tech Stack Summary

| Layer | Technology | Why |
|---|---|---|
| Frontend Framework | **Next.js 14** | Performance, SSR, SEO |
| UI Styling | **Tailwind CSS** | Fast, responsive, maintainable |
| Language | **TypeScript** | Type safety, fewer bugs |
| CMS / Admin Panel | **Payload CMS 2** | Modern, self-hosted, great DX |
| Database | **PostgreSQL** (Neon) | Reliable, free tier |
| Media Storage | **Cloudflare R2** | Cheap, fast CDN |
| Email (forms) | **Resend** or **Nodemailer** | Reliable transactional email |
| Analytics | **Plausible** (self-hosted) | GDPR-compliant, no cookies |
| Maps | **Leaflet + OpenStreetMap** | Privacy-preserving |
| Deployment (Frontend) | **Vercel** | Best Next.js hosting |
| Deployment (CMS) | **Railway** | Easy Node.js hosting |
| Version Control | **GitHub** | Industry standard |
| Calendar Sync | **iCal / ics.js** | NRW holiday auto-import |

---

## 8. Effort & Team Estimate

| Role | Hours | Notes |
|---|---|---|
| Frontend Developer | ~120 hrs | All pages, components, responsive design |
| Backend/CMS Developer | ~60 hrs | Can be same person if full-stack |
| Designer (UI/UX) | ~20 hrs | Color palette, logo placement, layout mockups |
| QA / Testing | ~15 hrs | Cross-browser, mobile, accessibility |
| Content Migration | ~10 hrs | Moving Wix content to new CMS |
| **Total** | **~225 hrs** | |

If done by a single freelance developer at German market rates (~€60–80/hr), estimated project cost: **€13,500–18,000**.

An open-source alternative approach using a pre-built school theme/template could reduce this to **€3,000–6,000**.

---

## 9. Next Steps

1. **Design Phase** – Create wireframes/mockups for Home, News, Calendar, Gallery pages (tools: Figma)
2. **Define Content Structure** – List all content types, fields, and relationships needed in Payload CMS
3. **Set Up Development Environment** – GitHub repo, Vercel project, Railway instance, Neon DB
4. **Build MVP** – Home + News + Calendar as a first working prototype
5. **Stakeholder Review** – Show to school principal and parents for feedback
6. **Iterate & Complete** remaining pages
7. **Staff Training** – Short video guide + written docs for using the admin panel
8. **Launch** 🚀

---

*Plan prepared: March 2026 | Based on analysis of gswehringhausen.de and modern school website best practices.*
