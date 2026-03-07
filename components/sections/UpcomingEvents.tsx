import Link from 'next/link'
import { ArrowRight, CalendarDays } from 'lucide-react'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import Badge from '../ui/Badge'

interface Event {
  id: string
  title: string
  type: string
  startDate: string
  endDate?: string
  allDay?: boolean
  location?: string
}

export default function UpcomingEvents({ events }: { events: Event[] }) {
  if (!events.length) return null

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Nächste Termine</h2>
          <Link
            href="/termine"
            className="inline-flex items-center gap-1 font-semibold text-sm"
            style={{ color: 'var(--color-primary)' }}
          >
            Alle Termine <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="space-y-3">
          {events.map((event) => {
            const start = new Date(event.startDate)
            const end = event.endDate ? new Date(event.endDate) : null
            return (
              <div
                key={event.id}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors"
              >
                {/* Date badge */}
                <div
                  className="shrink-0 flex flex-col items-center text-white rounded-lg px-3 py-2 min-w-[52px]"
                  style={{ background: 'var(--color-primary)' }}
                >
                  <span className="text-xs font-medium opacity-80">
                    {format(start, 'MMM', { locale: de }).toUpperCase()}
                  </span>
                  <span className="text-xl font-bold leading-tight">{format(start, 'd')}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">{event.title}</h3>
                    <Badge value={event.type} />
                  </div>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {event.allDay
                      ? end && end.getTime() !== start.getTime()
                        ? `${format(start, 'd. MMM', { locale: de })} – ${format(end, 'd. MMM yyyy', { locale: de })}`
                        : format(start, 'd. MMMM yyyy', { locale: de })
                      : format(start, "d. MMMM yyyy, HH:mm 'Uhr'", { locale: de })}
                    {event.location && ` · ${event.location}`}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
