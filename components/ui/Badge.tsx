const categoryColors: Record<string, string> = {
  schulleben: 'bg-blue-100 text-blue-800',
  ogs: 'bg-purple-100 text-purple-800',
  veranstaltungen: 'bg-blue-100 text-blue-800',
  bekanntmachungen: 'bg-amber-100 text-amber-800',
  auszeichnungen: 'bg-rose-100 text-rose-800',
  holiday: 'bg-red-100 text-red-800',
  school: 'bg-blue-100 text-blue-800',
  parents: 'bg-amber-100 text-amber-800',
  conference: 'bg-blue-100 text-blue-800',
}

const categoryLabels: Record<string, string> = {
  schulleben: 'Schulleben',
  ogs: 'OGS',
  veranstaltungen: 'Veranstaltungen',
  bekanntmachungen: 'Bekanntmachungen',
  auszeichnungen: 'Auszeichnungen',
  holiday: 'Schulferien',
  school: 'Schulveranstaltung',
  ogs_event: 'OGS',
  parents: 'Elternabend',
  conference: 'Konferenz',
}

interface BadgeProps {
  value: string
  className?: string
}

export default function Badge({ value, className = '' }: BadgeProps) {
  const color = categoryColors[value] ?? 'bg-gray-100 text-gray-700'
  const label = categoryLabels[value] ?? value
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color} ${className}`}
    >
      {label}
    </span>
  )
}
