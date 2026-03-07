import { Users, BookOpen, Layers, Heart } from 'lucide-react'

const stats = [
  { icon: Users,    value: '~350',     label: 'Schülerinnen & Schüler' },
  { icon: Layers,   value: '12',       label: 'JüL-Klassen' },
  { icon: BookOpen, value: 'seit 1920', label: 'Teil der Hagener Schullandschaft' },
  { icon: Heart,    value: 'OGS',      label: 'Offene Ganztagsschule' },
]

export default function SchoolStats() {
  return (
    <section
      className="py-16"
      style={{ background: 'var(--color-primary)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-3">
              <div className="bg-white/15 rounded-full p-3">
                <Icon className="h-6 w-6" style={{ color: 'var(--color-accent)' }} />
              </div>
              <div>
                <p className="text-3xl font-bold">{value}</p>
                <p className="text-blue-100 text-sm mt-1">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
