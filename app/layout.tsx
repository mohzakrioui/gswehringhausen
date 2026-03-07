import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Grundschule Wehringhausen',
    template: '%s | GS Wehringhausen',
  },
  description:
    'Willkommen auf der offiziellen Website der Grundschule Wehringhausen in Hagen – Nachrichten, Termine, Galerie und mehr.',
  keywords: ['Grundschule', 'Wehringhausen', 'Hagen', 'Schule', 'OGS'],
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: process.env.NEXT_PUBLIC_SERVER_URL,
    siteName: 'GS Wehringhausen',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  )
}
