import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: { singular: 'Kontaktnachricht', plural: 'Kontaktnachrichten' },
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['name', 'email', 'subject', 'read', 'createdAt'],
    group: 'Posteingang',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'E-Mail',
      required: true,
    },
    {
      name: 'subject',
      type: 'text',
      label: 'Betreff',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Nachricht',
      required: true,
    },
    {
      name: 'gdprConsent',
      type: 'checkbox',
      label: 'DSGVO-Zustimmung erteilt',
      required: true,
    },
    {
      name: 'read',
      type: 'checkbox',
      label: 'Gelesen',
      defaultValue: false,
    },
    {
      name: 'archived',
      type: 'checkbox',
      label: 'Archiviert',
      defaultValue: false,
    },
  ],
  timestamps: true,
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => req.user?.role === 'admin',
  },
}
