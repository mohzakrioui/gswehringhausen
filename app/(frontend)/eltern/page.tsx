import { Metadata } from 'next'
import PageHero from '../../../components/ui/PageHero'
import SickReportForm from '../../../components/sections/SickReportForm'
import { FileText, Download, Users, HelpCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Elternbereich',
  description: 'Krankmeldungen, Downloads und Informationen für Eltern der GS Wehringhausen.',
}

const faq = [
  {
    q: 'Wie melde ich mein Kind krank?',
    a: 'Nutzen Sie das digitale Formular auf dieser Seite oder rufen Sie uns bis 8:00 Uhr an: 02331 / XXX XXX.',
  },
  {
    q: 'Wie beantrage ich einen Schulbefreiungsantrag?',
    a: 'Formular herunterladen, ausfüllen und mindestens 3 Werktage vorher im Schulsekretariat abgeben.',
  },
  {
    q: 'Wann findet der nächste Elternabend statt?',
    a: 'Die Termine finden Sie im Schulkalender unter /termine. Klassen-Elternabende werden gesondert durch die Klassenlehrkraft mitgeteilt.',
  },
  {
    q: 'Wie kann ich Mitglied der Schulpflegschaft werden?',
    a: 'Wenden Sie sich an die Klassenpflegschaft Ihrer Klasse oder sprechen Sie die Schulleitung an.',
  },
]

export default function ElternPage() {
  return (
    <>
      <PageHero
        title="Elternbereich"
        subtitle="Alles für Eltern der Grundschule Wehringhausen"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        {/* Sick report */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <span className="text-2xl">🤒</span> Krankmeldung
          </h2>
          <p className="text-gray-600 mb-6">
            Bitte melden Sie Ihr Kind hier an, wenn es aufgrund von Krankheit nicht zur
            Schule kommen kann. Die Meldung geht direkt an das Schulsekretariat.
          </p>
          <SickReportForm />
        </section>

        {/* Downloads */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Download className="h-6 w-6 text-[var(--color-primary)]" /> Downloads & Formulare
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: 'Schulbefreiungsantrag', format: 'PDF' },
              { name: 'Datenschutzerklärung Schule', format: 'PDF' },
              { name: 'OGS-Anmeldeformular', format: 'PDF' },
              { name: 'Schulordnung', format: 'PDF' },
            ].map(({ name, format }) => (
              <div
                key={name}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100"
              >
                <FileText className="h-8 w-8 text-[var(--color-primary)] shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{name}</p>
                  <p className="text-xs text-gray-400">{format}</p>
                </div>
                <span className="text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded">
                  Demnächst
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Schulpflegschaft */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="h-6 w-6 text-[var(--color-primary)]" /> Schulpflegschaft
          </h2>
          <p className="text-gray-700">
            Die Schulpflegschaft ist die demokratische Mitbestimmungsorganisation der Eltern.
            Sie setzt sich für die Interessen aller Schülerinnen und Schüler sowie Eltern ein
            und unterstützt das Schulleben aktiv. Die Schulpflegschaft trifft sich mehrmals
            pro Schuljahr – die Termine finden Sie im Schulkalender.
          </p>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-[var(--color-primary)]" /> Häufige Fragen
          </h2>
          <div className="space-y-4">
            {faq.map(({ q, a }) => (
              <details key={q} className="group rounded-xl border border-gray-100 bg-white">
                <summary className="flex cursor-pointer items-center justify-between p-4 font-semibold text-gray-800">
                  {q}
                  <span className="ml-2 text-[var(--color-primary)] group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="px-4 pb-4 text-sm text-gray-600">{a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
