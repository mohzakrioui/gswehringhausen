import type { CollectionConfig } from 'payload'

export const Staff: CollectionConfig = {
  slug: 'staff',
  labels: { singular: 'Mitarbeiter', plural: 'Mitarbeiter' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'order'],
    group: 'Inhalte',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      label: 'Funktion / Fächer',
      required: true,
    },
    {
      name: 'photo',
      type: 'upload',
      label: 'Foto',
      relationTo: 'media',
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Kurzbio',
    },
    {
      name: 'email',
      type: 'email',
      label: 'E-Mail (optional, öffentlich)',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Reihenfolge',
      defaultValue: 99,
      admin: {
        description: 'Kleinere Zahl = weiter oben angezeigt',
      },
    },
    {
      name: 'category',
      type: 'select',
      label: 'Gruppe',
      defaultValue: 'lehrkraft',
      options: [
        { label: 'Schulleitung', value: 'leitung' },
        { label: 'Lehrkräfte', value: 'lehrkraft' },
        { label: 'OGS', value: 'ogs' },
        { label: 'Schulsozialarbeit', value: 'sozialarbeit' },
        { label: 'Sekretariat', value: 'sekretariat' },
      ],
    },
  ],
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => req.user?.role === 'admin',
  },
}
