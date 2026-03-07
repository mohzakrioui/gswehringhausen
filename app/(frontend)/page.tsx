import { getPayloadClient } from '../../lib/payload'
import HeroBanner from '../../components/sections/HeroBanner'
import NewsPreview from '../../components/sections/NewsPreview'
import UpcomingEvents from '../../components/sections/UpcomingEvents'
import SchoolStats from '../../components/sections/SchoolStats'

export const revalidate = 60 // ISR: revalidate every 60 seconds

export default async function HomePage() {
  const payload = await getPayloadClient()

  const [articlesResult, eventsResult] = await Promise.all([
    payload.find({
      collection: 'news-articles',
      limit: 3,
      sort: '-publishedAt',
      where: { status: { equals: 'published' } },
    }),
    payload.find({
      collection: 'events',
      limit: 5,
      sort: 'startDate',
      where: {
        startDate: { greater_than_equal: new Date().toISOString() },
      },
    }),
  ])

  return (
    <>
      <HeroBanner />
      <NewsPreview articles={articlesResult.docs as any} />
      <SchoolStats />
      <UpcomingEvents events={eventsResult.docs as any} />
    </>
  )
}
