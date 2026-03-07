import { Metadata } from 'next'
import { getPayloadClient } from '../../../lib/payload'
import PageHero from '../../../components/ui/PageHero'
import SchoolCalendar from '../../../components/sections/SchoolCalendar'

export const metadata: Metadata = {
  title: 'Schulkalender',
  description: 'Schulferien, Veranstaltungen und Termine der Grundschule Wehringhausen.',
}

export const revalidate = 3600 // 1 hour

export default async function TerminePage() {
  const payload = await getPayloadClient()
  const { docs: events } = await payload.find({
    collection: 'events',
    limit: 200,
    sort: 'startDate',
  })

  return (
    <>
      <PageHero
        title="Schulkalender"
        subtitle="Alle Termine, Schulferien (NRW) und Veranstaltungen auf einen Blick"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <SchoolCalendar events={events as any} />
      </div>
    </>
  )
}
