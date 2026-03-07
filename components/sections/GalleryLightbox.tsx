'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

interface Photo {
  photo: { url: string; alt?: string; width?: number; height?: number }
  caption?: string
}

interface Props {
  photos: Photo[]
}

export default function GalleryLightbox({ photos }: Props) {
  const [index, setIndex] = useState(-1)

  const slides = photos.map(({ photo, caption }) => ({
    src: photo.url,
    alt: photo.alt,
    title: caption,
    width: photo.width ?? 1600,
    height: photo.height ?? 900,
  }))

  return (
    <>
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
        {photos.map(({ photo, caption }, i) => (
          <button
            key={i}
            className="block w-full break-inside-avoid cursor-zoom-in rounded-lg overflow-hidden focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            onClick={() => setIndex(i)}
            aria-label={caption ?? `Foto ${i + 1} öffnen`}
          >
            <Image
              src={photo.url}
              alt={photo.alt ?? caption ?? `Foto ${i + 1}`}
              width={600}
              height={400}
              className="w-full h-auto object-cover hover:opacity-90 transition-opacity"
            />
          </button>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
        index={index}
      />
    </>
  )
}
