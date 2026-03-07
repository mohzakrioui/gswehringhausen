'use client'

import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import deLocale from '@fullcalendar/core/locales/de'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { X, Download } from 'lucide-react'
import Badge from '../ui/Badge'

interface CalEvent {
  id: string
  title: string
  type: string
  startDate: string
  endDate?: string
  allDay?: boolean
  location?: string
  description?: string
}

interface Props {
  events: CalEvent[]
}

export default function SchoolCalendar({ events }: Props) {
  const [selected, setSelected] = useState<CalEvent | null>(null)

  const fcEvents = events.map((e) => ({
    id: e.id,
    title: e.title,
    start: e.startDate,
    end: e.endDate,
    allDay: e.allDay ?? true,
    classNames: [`fc-event-${e.type}`],
    extendedProps: { ...e },
  }))

  function handleExport(event: CalEvent) {
    const start = new Date(event.startDate)
    const end = event.endDate ? new Date(event.endDate) : start
    const pad = (n: number) => String(n).padStart(2, '0')
    const fmt = (d: Date) =>
      `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`

    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//GS Wehringhausen//DE',
      'BEGIN:VEVENT',
      `DTSTART;VALUE=DATE:${fmt(start)}`,
      `DTEND;VALUE=DATE:${fmt(new Date(end.getTime() + 86_400_000))}`,
      `SUMMARY:${event.title}`,
      event.description ? `DESCRIPTION:${event.description}` : '',
      event.location ? `LOCATION:${event.location}` : '',
      'END:VEVENT',
      'END:VCALENDAR',
    ]
      .filter(Boolean)
      .join('\r\n')

    const blob = new Blob([ics], { type: 'text/calendar' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${event.title.replace(/\s+/g, '-')}.ics`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-4 text-sm">
        {[
          { type: 'holiday', label: 'Schulferien' },
          { type: 'school', label: 'Schulveranstaltung' },
          { type: 'ogs', label: 'OGS' },
          { type: 'parents', label: 'Elternabend' },
          { type: 'conference', label: 'Konferenz' },
        ].map(({ type, label }) => (
          <span key={type} className="flex items-center gap-1.5">
            <span className={`w-3 h-3 rounded-sm fc-event-${type} inline-block`} />
            {label}
          </span>
        ))}
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={deLocale}
        events={fcEvents}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,listMonth',
        }}
        buttonText={{ today: 'Heute', month: 'Monat', list: 'Liste' }}
        height="auto"
        eventClick={({ event }) => setSelected(event.extendedProps as CalEvent)}
      />

      {/* Event detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              onClick={() => setSelected(null)}
              aria-label="Schließen"
            >
              <X className="h-5 w-5" />
            </button>

            <Badge value={selected.type} className="mb-3" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">{selected.title}</h3>

            <p className="text-sm text-gray-500 mb-1">
              📅{' '}
              {format(new Date(selected.startDate), 'd. MMMM yyyy', { locale: de })}
              {selected.endDate &&
                selected.endDate !== selected.startDate &&
                ` – ${format(new Date(selected.endDate), 'd. MMMM yyyy', { locale: de })}`}
            </p>

            {selected.location && (
              <p className="text-sm text-gray-500 mb-1">📍 {selected.location}</p>
            )}
            {selected.description && (
              <p className="text-sm text-gray-700 mt-3">{selected.description}</p>
            )}

            <button
              onClick={() => handleExport(selected)}
              className="mt-5 flex items-center gap-2 text-sm text-[var(--color-primary)] font-medium hover:underline"
            >
              <Download className="h-4 w-4" /> Zu meinem Kalender hinzufügen (.ics)
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
