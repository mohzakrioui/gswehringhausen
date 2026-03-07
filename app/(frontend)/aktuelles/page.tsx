import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { getPayloadClient } from '../../../lib/payload'
import PageHero from '../../../components/ui/PageHero'
import Badge from '../../../components/ui/Badge'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Aktuelles',
  description: 'Neuigkeiten, Berichte und Ankündigungen der Grundschule Wehringhausen.',
}

export const revalidate = 60

const CATEGORIES = [
  { value: '', label: 'Alle' },
  { value: 'schulleben', label: 'Schulleben' },
  { value: 'ogs', label: 'OGS' },
  { value: 'veranstaltungen', label: 'Veranstaltungen' },
  { value: 'bekanntmachungen', label: 'Bekanntmachungen' },
  { value: 'auszeichnungen', label: 'Auszeichnungen' },
]

interface SearchParams {
  page?: string
  category?: string
}

export default async function AktuellesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const category = params.category || ''

  const payload = await getPayloadClient()
  const { docs: articles, totalPages } = await payload.find({
    collection: 'news-articles',
    limit: 9,
    page,
    sort: '-publishedAt',
    where: {
      status: { equals: 'published' },
      ...(category ? { category: { equals: category } } : {}),
    },
  })

  return (
    <>
      <PageHero
        title="Aktuelles"
        subtitle="Neuigkeiten, Berichte und Ankündigungen aus dem Schulleben"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(({ value, label }) => (
            <Link
              key={value}
              href={value ? `/aktuelles?category=${value}` : '/aktuelles'}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                category === value
                  ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                  : 'border-gray-200 text-gray-600 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Articles grid */}
        {articles.length === 0 ? (
          <p className="text-gray-500 text-center py-16">Keine Beiträge gefunden.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article: any) => (
              <Link
                key={article.id}
                href={`/aktuelles/${article.slug}`}
                className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                {article.featuredImage && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={article.featuredImage.url}
                      alt={article.featuredImage.alt ?? article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge value={article.category} />
                    {article.publishedAt && (
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(article.publishedAt), 'd. MMM yyyy', { locale: de })}
                      </span>
                    )}
                  </div>
                  <h2 className="font-semibold text-gray-900 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  {article.excerpt && (
                    <p className="text-sm text-gray-500 mt-2 line-clamp-3">{article.excerpt}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-10">
            {page > 1 && (
              <Link
                href={`/aktuelles?page=${page - 1}${category ? `&category=${category}` : ''}`}
                className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50"
              >
                <ChevronLeft className="h-4 w-4" /> Zurück
              </Link>
            )}
            <span className="text-sm text-gray-500">
              Seite {page} von {totalPages}
            </span>
            {page < totalPages && (
              <Link
                href={`/aktuelles?page=${page + 1}${category ? `&category=${category}` : ''}`}
                className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50"
              >
                Weiter <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  )
}
