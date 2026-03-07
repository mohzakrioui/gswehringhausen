import { Metadata } from 'next'
import PageHero from '../../../components/ui/PageHero'
import { Clock, Euro, Heart, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'OGS – Offene Ganztagsschule',
  description: 'Informationen zur offenen Ganztagsschule (OGS) der Grundschule Wehringhausen.',
}

export default function OgsPage() {
  return (
    <>
      <PageHero
        title="OGS – Offene Ganztagsschule"
        subtitle="Betreuung, Förderung und Freizeit für unsere Schülerinnen und Schüler"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {[
            {
              icon: Clock,
              title: 'Öffnungszeiten',
              body: 'Mo–Fr 11:30 – 16:00 Uhr\nMittagessen ab 11:30 Uhr',
            },
            {
              icon: Calendar,
              title: 'Schließzeiten',
              body: 'In den NRW-Schulferien geschlossen.\nEinzelne Betreuungstage in den Ferien nach Absprache.',
            },
            {
              icon: Heart,
              title: 'Angebot',
              body: 'Hausaufgabenbetreuung, kreative AGs, Sport, Ausflüge, Ruhephasen',
            },
            {
              icon: Euro,
              title: 'Elternbeitrag',
              body: 'Einkommensabhängiger Beitrag nach dem Kinderbildungsgesetz (KiBiz).\nAnmeldung über das Schulsekretariat.',
            },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <Icon className="h-6 w-6 text-[var(--color-primary)] mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-600 whitespace-pre-line">{body}</p>
            </div>
          ))}
        </div>

        <section className="prose text-gray-700">
          <h2>Pädagogisches Konzept</h2>
          <p>
            Die OGS versteht sich als Ergänzung und Verlängerung des schulischen Tages. Im
            Mittelpunkt stehen das Wohlfühlen, die individuelle Förderung und die
            Freizeitgestaltung der Kinder. Unsere pädagogischen Fachkräfte gestalten ein
            abwechslungsreiches Programm.
          </p>
          <h3>Mittagessen</h3>
          <p>
            Täglich wird ein frisch zubereitetes Mittagessen angeboten. Wir achten auf
            ausgewogene, kindgerechte Kost und berücksichtigen Allergien und besondere
            Ernährungsbedürfnisse (vegetarisch, Halal etc.).
          </p>
          <h3>Anmeldung</h3>
          <p>
            Die Anmeldung zur OGS erfolgt über das Schulsekretariat. Die Betreuungsplätze
            werden vergeben nach Einschulungsdatum und sozialen Kriterien.
          </p>
        </section>
      </div>
    </>
  )
}
