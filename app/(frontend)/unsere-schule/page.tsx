import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '../../../lib/payload'
import PageHero from '../../../components/ui/PageHero'
import { Users, ArrowRight } from 'lucide-react'
import { unstable_cache } from 'next/cache'

export const metadata: Metadata = {
  title: 'Unsere Schule',
  description: 'Geschichte, pädagogisches Konzept und Team der Grundschule Wehringhausen.',
}

export const revalidate = 3600

const getStaffData = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    const { docs: staff } = await payload.find({
      collection: 'staff',
      sort: 'order',
      depth: 1,
    })
    return staff
  },
  ['staff-list'],
  { revalidate: 3600, tags: ['staff'] }
)

export default async function UnschuleSchulePage() {
  const staff = await getStaffData()

  const grouped = (staff as any[]).reduce(
    (acc: Record<string, any[]>, s) => {
      const group = s.category ?? 'andere'
      if (!acc[group]) acc[group] = []
      acc[group].push(s)
      return acc
    },
    {},
  )

  const groupLabels: Record<string, string> = {
    leitung: 'Schulleitung',
    lehrkraft: 'Lehrkräfte',
    ogs: 'OGS-Team',
    sozialarbeit: 'Schulsozialarbeit',
    sekretariat: 'Sekretariat',
  }

  return (
    <>
      <PageHero
        title="Unsere Schule"
        subtitle="Geschichte, Leitbild und das Team der GS Wehringhausen"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* About */}
        <section className="mb-14 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Über uns</h2>
            <div className="prose text-gray-700">
              <p>
                Die Grundschule Wehringhausen ist eine lebendige Schule im Hagener
                Stadtteil Wehringhausen. Als offene Ganztagsschule verbinden wir
                qualitativ hochwertigen Unterricht mit einem abwechslungsreichen
                Nachmittagsprogramm.
              </p>
              <p>
                Unser Herzstück ist das{' '}
                <strong>Jahrgangsübergreifende Lernen (JüL)</strong>: Kinder der
                Klassen 1–3 lernen gemeinsam in altersgemischten Gruppen, begleitet
                von erfahrenen Lehrkräften. Diese Methode fördert soziales Miteinander,
                gegenseitiges Helfen und individuelles Lerntempo.
              </p>
            </div>
            <Link
              href="/schulleben"
              className="inline-flex items-center gap-1 mt-4 text-[var(--color-primary)] font-semibold hover:underline"
            >
              Mehr zum Schulleben <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="font-semibold text-gray-800 mb-4">Auf einen Blick</h3>
            <dl className="space-y-3 text-sm">
              {[
                ['Schulform', 'Offene Ganztagsgrundschule (OGS)'],
                ['Konzept', 'Jahrgangsübergreifendes Lernen (JüL)'],
                ['Klassen', 'Jahrgänge 1–4'],
                ['Adresse', 'Wehringhausener Str. 1, 58089 Hagen'],
                ['Schulträger', 'Stadt Hagen'],
              ].map(([key, val]) => (
                <div key={key} className="flex gap-2">
                  <dt className="font-medium text-gray-600 w-28 shrink-0">{key}</dt>
                  <dd className="text-gray-800">{val}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Staff */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <Users className="h-6 w-6 text-[var(--color-primary)]" /> Unser Team
          </h2>

          {Object.entries(groupLabels).map(([key, label]) => {
            const members = grouped[key] ?? []
            if (!members.length) return null
            return (
              <div key={key} className="mb-10">
                <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-4 pb-2 border-b border-blue-100">
                  {label}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                  {members.map((member: any) => (
                    <div key={member.id} className="text-center">
                      <div className="relative w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden bg-blue-100">
                        {member.photo ? (
                          <Image
                            src={member.photo.url}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-[var(--color-primary)]">
                            {member.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <p className="font-semibold text-gray-900 text-sm">{member.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{member.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </section>
      </div>
    </>
  )
}
