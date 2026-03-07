import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const NewsArticles: CollectionConfig = {
  slug: 'news-articles',
  labels: { singular: 'Artikel', plural: 'Artikel' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt'],
    group: 'Inhalte',
  },
  versions: {
    drafts: {
      autosave: true,
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titel',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'URL-Slug',
      required: true,
      unique: true,
      admin: {
        description: 'z.B. "schulfest-2024" → /aktuelles/schulfest-2024',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Kurzbeschreibung (für Listen & SEO)',
      maxLength: 300,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      label: 'Titelbild',
      relationTo: 'media',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Inhalt',
      editor: lexicalEditor(),
    },
    {
      name: 'category',
      type: 'select',
      label: 'Kategorie',
      required: true,
      defaultValue: 'schulleben',
      options: [
        { label: 'Schulleben', value: 'schulleben' },
        { label: 'OGS', value: 'ogs' },
        { label: 'Veranstaltungen', value: 'veranstaltungen' },
        { label: 'Bekanntmachungen', value: 'bekanntmachungen' },
        { label: 'Auszeichnungen', value: 'auszeichnungen' },
      ],
    },
    {
      name: 'author',
      type: 'relationship',
      label: 'Autor',
      relationTo: 'users',
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Veröffentlichungsdatum',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
      },
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
      access: {
        read: () => true,
      },
    },
  ],
  access: {
    read: ({ req }) => {
      if (req.user) return true
      return { status: { equals: 'published' } }
    },
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => req.user?.role === 'admin',
  },
}
