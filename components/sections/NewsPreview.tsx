import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import Badge from '../ui/Badge'

interface Article {
  id: string
  title: string
  slug: string
  excerpt?: string
  category: string
  publishedAt?: string
  featuredImage?: { url: string; alt?: string }
}

export default function NewsPreview({ articles }: { articles: Article[] }) {
  if (!articles.length) return null

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Aktuelles</h2>
          <Link
            href="/aktuelles"
            className="inline-flex items-center gap-1 font-semibold text-sm transition-colors"
            style={{ color: 'var(--color-primary)' }}
          >
            Alle Beiträge <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/aktuelles/${article.slug}`}
              className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden"
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
                <h3
                  className="font-semibold text-gray-900 group-hover:transition-colors line-clamp-2"
                  style={{ ['--tw-text-opacity' as string]: 1 }}
                >
                  {article.title}
                </h3>
                {article.excerpt && (
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">{article.excerpt}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
