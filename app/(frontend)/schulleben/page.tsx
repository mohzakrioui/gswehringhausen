import { Metadata } from 'next'
import PageHero from '../../../components/ui/PageHero'

export const metadata: Metadata = {
  title: 'Schulleben',
  description: 'JüL, Lernzeiten und Schulsozialarbeit an der Grundschule Wehringhausen.',
}

export default function SchullebenPage() {
  return (
    <>
      <PageHero
        title="Schulleben"
        subtitle="Unser pädagogischer Alltag – JüL, Lernzeiten und mehr"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          <Section title="Jahrgangsübergreifendes Lernen (JüL)">
            <p>
              Das jahrgangsübergreifende Lernen ist das Herzstück unserer Schule. Kinder der
              Jahrgänge 1 bis 3 lernen gemeinsam in einem Klassenverband. Ältere Kinder
              unterstützen jüngere, und jüngere Kinder lernen von den Älteren – ein natürliches
              Miteinander, wie es auch außerhalb der Schule besteht.
            </p>
            <ul>
              <li>Individuelle Lernwege und eigenes Lerntempo</li>
              <li>Soziale Kompetenzentwicklung durch Helfen und Unterstützen</li>
              <li>Freie Arbeit in Wochenplänen</li>
              <li>Regelmäßige Lernentwicklungsgespräche (LEG) mit Eltern</li>
            </ul>
          </Section>

          <Section title="Lernzeiten">
            <p>
              Innerhalb des Unterrichts gibt es regelmäßige Lernzeiten, in denen die Kinder
              selbstständig an ihren individuellen Aufgaben arbeiten. Lehrkräfte begleiten und
              fördern dabei jeden Schüler gezielt.
            </p>
          </Section>

          <Section title="Schulsozialarbeit">
            <p>
              Unsere Schulsozialarbeiterinnen und -sozialarbeiter sind Ansprechpartner für
              Kinder, Eltern und Lehrkräfte. Sie bieten Einzel- und Gruppenberatung,
              Konfliktmediation und unterstützen bei besonderen Lebenssituationen.
            </p>
          </Section>
        </div>
      </div>
    </>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4 pb-2 border-b border-blue-100">
        {title}
      </h2>
      <div className="prose text-gray-700">{children}</div>
    </section>
  )
}
