import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const GalleryAlbums: CollectionConfig = {
  slug: 'gallery-albums',
  labels: { singular: 'Fotoalbum', plural: 'Fotoalben' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'status', 'protected'],
    group: 'Inhalte',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Albumtitel',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'URL-Slug',
      required: true,
      unique: true,
    },
    {
      name: 'date',
      type: 'date',
      label: 'Datum des Ereignisses',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Beschreibung',
      editor: lexicalEditor(),
    },
    {
      name: 'coverImage',
      type: 'upload',
      label: 'Titelbild',
      relationTo: 'media',
    },
    {
      name: 'photos',
      type: 'array',
      label: 'Fotos',
      fields: [
        {
          name: 'photo',
          type: 'upload',
          label: 'Foto',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Bildunterschrift',
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      defaultValue: 'draft',
      options: [
        { label: 'Entwurf', value: 'draft' },
        { label: 'Veröffentlicht', value: 'published' },
      ],
    },
    {
      name: 'protected',
      type: 'checkbox',
      label: 'Passwortgeschützt',
      defaultValue: false,
      admin: {
        description: 'Nur für Eltern mit Zugang (Klassenfotos etc.)',
      },
    },
    {
      name: 'password',
      type: 'text',
      label: 'Passwort',
      admin: {
        condition: (_, siblingData) => siblingData?.protected === true,
      },
    },
  ],
  access: {
    read: ({ req }) => {
      if (req.user) return true
      return { status: { equals: 'published' }, protected: { equals: false } }
    },
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => req.user?.role === 'admin',
  },
}
