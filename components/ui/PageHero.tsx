interface PageHeroProps {
  title: string
  subtitle?: string
  className?: string
}

export default function PageHero({ title, subtitle, className = '' }: PageHeroProps) {
  return (
    <section
      className={`py-14 px-4 ${className}`}
      style={{
        background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 drop-shadow-sm" style={{ color: 'var(--color-accent)' }}>
          {title}
        </h1>
        {subtitle && <p className="text-gray-900 font-medium text-lg max-w-2xl">{subtitle}</p>}
      </div>
    </section>
  )
}
