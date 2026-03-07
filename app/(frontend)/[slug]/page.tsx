import { getPayloadClient } from '../../../lib/payload'
import { notFound } from 'next/navigation'
import PageHero from '../../../components/ui/PageHero'
import RichText from '../../../components/ui/RichText'
import { FileText, Download } from 'lucide-react'
import Link from 'next/link'
import { unstable_cache } from 'next/cache'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export const revalidate = 600 // Revalidate every 10 minutes

const getPageData = unstable_cache(
  async (slug: string) => {
    const payload = await getPayloadClient()
    const pages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: slug,
        },
      },
    })
    return pages.docs[0] || null
  },
  ['pages-slug'],
  { revalidate: 600, tags: ['pages'] }
)

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const pages = await payload.find({
    collection: 'pages',
    limit: 100,
    select: {
      slug: true,
    },
  })

  return pages.docs.map((page: any) => ({
    slug: page.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const page = await getPageData(slug) as any

  if (!page) {
    return {
      title: 'Seite nicht gefunden',
    }
  }

  return {
    title: page.title,
  }
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params
  const page = await getPageData(slug) as any

  if (!page) {
    notFound()
  }

  return (
    <>
      <PageHero title={page.title} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <RichText data={page.content} className="prose prose-blue max-w-none" />

        {page.attachments && page.attachments.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FileText className="h-5 w-5 text-[var(--color-primary)]" />
              Downloads & Dokumente
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {page.attachments.map((item: any, i: number) => (
                <Link
                  key={i}
                  href={item.file.url}
                  target="_blank"
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-white transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-gray-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                    <Download className="h-5 w-5 text-gray-400 group-hover:text-[var(--color-primary)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{item.label}</p>
                    <p className="text-xs text-gray-500 uppercase">
                      {item.file.filename.split('.').pop()} · {(item.file.filesize / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
