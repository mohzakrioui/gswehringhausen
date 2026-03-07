import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { Images, Lock } from 'lucide-react'
import { getPayloadClient } from '../../../lib/payload'
import PageHero from '../../../components/ui/PageHero'

export const metadata: Metadata = {
  title: 'Galerie',
  description: 'Fotoalben aus dem Schulleben der Grundschule Wehringhausen.',
}

export const revalidate = 3600

export default async function GaleriePage() {
  const payload = await getPayloadClient()
  const { docs: albums } = await payload.find({
    collection: 'gallery-albums',
    limit: 50,
    sort: '-date',
    where: { status: { equals: 'published' }, protected: { equals: false } },
    depth: 1,
  })

  return (
    <>
      <PageHero
        title="Galerie"
        subtitle="Eindrücke aus unserem Schulleben – Feste, Projekte und besondere Momente"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {albums.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <Images className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>Noch keine Alben vorhanden.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album: any) => (
              <Link
                key={album.id}
                href={`/galerie/${album.slug}`}
                className="group rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white"
              >
                <div className="relative h-52 bg-gray-100">
                  {album.coverImage ? (
                    <Image
                      src={album.coverImage.url}
                      alt={album.coverImage.alt ?? album.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Images className="h-12 w-12 text-gray-300" />
                    </div>
                  )}
                  {album.protected && (
                    <div className="absolute top-3 right-3 bg-black/60 text-white rounded-full p-1.5">
                      <Lock className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h2 className="font-semibold text-gray-900 group-hover:text-[var(--color-primary)] transition-colors">
                    {album.title}
                  </h2>
                  {album.date && (
                    <p className="text-sm text-gray-400 mt-1">
                      {format(new Date(album.date), 'd. MMMM yyyy', { locale: de })}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-0.5">
                    {album.photos?.length ?? 0} Foto{album.photos?.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
