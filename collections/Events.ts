import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  labels: { singular: 'Termin', plural: 'Termine' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'startDate', 'endDate'],
    group: 'Inhalte',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titel',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschreibung',
    },
    {
      name: 'type',
      type: 'select',
      label: 'Terminart',
      required: true,
      defaultValue: 'school',
      options: [
        { label: 'Schulferien (NRW)', value: 'holiday' },
        { label: 'Schulveranstaltung', value: 'school' },
        { label: 'OGS-Veranstaltung', value: 'ogs' },
        { label: 'Elternabend', value: 'parents' },
        { label: 'Fachkonferenz', value: 'conference' },
      ],
    },
    {
      name: 'startDate',
      type: 'date',
      label: 'Startdatum',
      required: true,
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'Enddatum',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'allDay',
      type: 'checkbox',
      label: 'Ganztägig',
      defaultValue: true,
    },
    {
      name: 'location',
      type: 'text',
      label: 'Ort',
    },
    {
      name: 'isNrwHoliday',
      type: 'checkbox',
      label: 'NRW-Schulferienimport',
      defaultValue: false,
      admin: {
        description: 'Automatisch aus NRW-Feriendaten importiert',
      },
    },
  ],
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
}
