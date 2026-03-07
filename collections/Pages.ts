import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Seite', plural: 'Seiten' },
  admin: {
    useAsTitle: 'title',
    group: 'Inhalte',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Seitentitel',
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
      name: 'content',
      type: 'richText',
      label: 'Inhalt',
      editor: lexicalEditor(),
    },
    {
      name: 'attachments',
      type: 'array',
      label: 'Anhänge / Downloads (PDF)',
      fields: [
        {
          name: 'file',
          type: 'upload',
          label: 'Datei',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Bezeichnung',
          required: true,
        },
      ],
    },
  ],
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => req.user?.role === 'admin',
  },
}
