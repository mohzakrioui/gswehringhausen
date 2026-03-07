import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { getPayloadClient } from '../../../../lib/payload'
import Badge from '../../../../components/ui/Badge'
import RichText from '../../../../components/ui/RichText'
import { unstable_cache } from 'next/cache'

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

const getArticleData = unstable_cache(
  async (slug: string) => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'news-articles',
      where: { slug: { equals: slug }, status: { equals: 'published' } },
      limit: 1,
      depth: 2,
    })
    return docs[0] || null
  },
  ['article-slug'],
  { revalidate: 60, tags: ['news-articles'] }
)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleData(slug) as any

  if (!article) return { title: 'Nicht gefunden' }
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.featuredImage ? [{ url: article.featuredImage.url }] : [],
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticleData(slug) as any
  
  if (!article) notFound()

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <Link
        href="/aktuelles"
        className="inline-flex items-center gap-1 text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] text-sm font-medium mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Zurück zu Aktuelles
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Badge value={article.category} />
          {article.publishedAt && (
            <span className="text-sm text-gray-400 flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {format(new Date(article.publishedAt), 'd. MMMM yyyy', { locale: de })}
            </span>
          )}
          {article.author?.name && (
            <span className="text-sm text-gray-400 flex items-center gap-1">
              <User className="h-4 w-4" />
              {article.author.name}
            </span>
          )}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
          {article.title}
        </h1>
        {article.excerpt && (
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">{article.excerpt}</p>
        )}
      </div>

      {/* Featured image */}
      {article.featuredImage && (
        <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden mb-10">
          <Image
            src={article.featuredImage.url}
            alt={article.featuredImage.alt ?? article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div className="prose max-w-none text-gray-800">
        <RichText data={article.content} />
      </div>
    </article>
  )
}
