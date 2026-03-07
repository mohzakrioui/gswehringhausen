import path from 'path'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { s3Storage } from '@payloadcms/storage-s3'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { NewsArticles } from './collections/NewsArticles'
import { Events } from './collections/Events'
import { GalleryAlbums } from './collections/GalleryAlbums'
import { Pages } from './collections/Pages'
import { Staff } from './collections/Staff'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { SickReports } from './collections/SickReports'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const useS3 = Boolean(
  process.env.S3_BUCKET &&
  process.env.S3_ACCESS_KEY_ID &&
  process.env.S3_SECRET_ACCESS_KEY &&
  process.env.S3_ENDPOINT,
)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '– GS Wehringhausen Admin',
      icons: [{ rel: 'icon', url: '/favicon.ico' }],
    },
    components: {},
  },
  collections: [
    Users,
    Media,
    NewsArticles,
    Events,
    GalleryAlbums,
    Pages,
    Staff,
    ContactSubmissions,
    SickReports,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'dev-secret',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  email: process.env.SMTP_HOST
    ? nodemailerAdapter({
        defaultFromAddress: process.env.SMTP_FROM || 'noreply@gswehringhausen.de',
        defaultFromName: 'GS Wehringhausen',
        transportOptions: {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        },
      })
    : undefined,
  plugins: [
    seoPlugin({
      generateTitle: ({ doc }) => `${doc?.title} | GS Wehringhausen`,
      generateDescription: ({ doc }) => (doc?.excerpt ? String(doc.excerpt) : ''),
    }),
    ...(useS3
      ? [
          s3Storage({
            collections: {
              media: true,
            },
            bucket: process.env.S3_BUCKET || '',
            config: {
              endpoint: process.env.S3_ENDPOINT,
              region: process.env.S3_REGION || 'auto',
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
              },
            },
          }),
        ]
      : []),
  ],
  upload: {
    limits: {
      fileSize: 10_000_000, // 10 MB
    },
  },
  localization: {
    locales: [{ label: 'Deutsch', code: 'de' }],
    defaultLocale: 'de',
  },
  sharp,
})
