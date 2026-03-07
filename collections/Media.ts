import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'public/media',
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 512, position: 'centre' },
      { name: 'hero', width: 1280, height: 640, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'application/pdf'],
  },
  admin: {
    group: 'Medien',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt-Text (Barrierefreiheit)',
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Bildunterschrift',
    },
  ],
  access: {
    read: () => true,
  },
}
