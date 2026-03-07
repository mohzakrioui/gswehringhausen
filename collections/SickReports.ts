import type { CollectionConfig } from 'payload'

export const SickReports: CollectionConfig = {
  slug: 'sick-reports',
  labels: { singular: 'Krankmeldung', plural: 'Krankmeldungen' },
  admin: {
    useAsTitle: 'childName',
    defaultColumns: ['childName', 'class', 'date', 'read', 'createdAt'],
    group: 'Posteingang',
  },
  fields: [
    {
      name: 'childName',
      type: 'text',
      label: 'Name des Kindes',
      required: true,
    },
    {
      name: 'class',
      type: 'text',
      label: 'Klasse / Gruppe',
      required: true,
    },
    {
      name: 'parentName',
      type: 'text',
      label: 'Name des Erziehungsberechtigten',
      required: true,
    },
    {
      name: 'parentEmail',
      type: 'email',
      label: 'E-Mail der Eltern',
    },
    {
      name: 'parentPhone',
      type: 'text',
      label: 'Telefonnummer',
    },
    {
      name: 'date',
      type: 'date',
      label: 'Abwesenheit ab',
      required: true,
    },
    {
      name: 'returnDate',
      type: 'date',
      label: 'Voraussichtliche Rückkehr',
    },
    {
      name: 'reason',
      type: 'textarea',
      label: 'Grund (optional)',
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
  ],
  timestamps: true,
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => req.user?.role === 'admin',
  },
}
