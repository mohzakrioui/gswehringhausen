import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { ArrowLeft, Calendar } from 'lucide-react'
import { getPayloadClient } from '../../../../lib/payload'
import GalleryLightbox from '../../../../components/sections/GalleryLightbox'

export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'gallery-albums',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
  })
  const album = docs[0] as any
  if (!album) return { title: 'Nicht gefunden' }
  return { title: album.title }
}

export default async function AlbumPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'gallery-albums',
    where: { slug: { equals: slug }, status: { equals: 'published' }, protected: { equals: false } },
    limit: 1,
    depth: 2,
  })
  const album = docs[0] as any
  if (!album) notFound()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/galerie"
        className="inline-flex items-center gap-1 text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] text-sm font-medium mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Zurück zur Galerie
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{album.title}</h1>
        {album.date && (
          <p className="text-gray-500 flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {format(new Date(album.date), 'd. MMMM yyyy', { locale: de })}
          </p>
        )}
        <p className="text-sm text-gray-400 mt-1">{album.photos?.length ?? 0} Fotos</p>
      </div>

      {album.photos && album.photos.length > 0 ? (
        <GalleryLightbox photos={album.photos} />
      ) : (
        <p className="text-gray-500 text-center py-16">Keine Fotos in diesem Album.</p>
      )}
    </div>
  )
}
