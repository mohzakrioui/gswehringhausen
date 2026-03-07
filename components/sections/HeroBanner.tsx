import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar, Newspaper, Image as ImageIcon, Phone } from 'lucide-react'

export default function HeroBanner() {
  return (
    <>
      <section className="relative h-[560px] sm:h-[620px] overflow-hidden">

        <Image
          src="/images/hero-placeholder.svg"
          alt="Grundschule Wehringhausen Schulgebäude"
          fill
          className="object-cover object-center"
          priority
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(90,140,144,0.92) 0%, rgba(129,187,191,0.60) 55%, rgba(129,187,191,0.20) 100%)',
          }}
        />

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">

          <div className="max-w-xl backdrop-blur-sm bg-white/10 p-6 rounded-2xl">

            <span
              className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-gray-900 shadow-sm"
              style={{ background: 'var(--color-primary-light)' }}
            >
              Willkommen an der
            </span>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-5 drop-shadow-md"
              style={{ color: 'var(--color-accent)' }}
            >
              Grundschule
              <br />
              Wehringhausen
            </h1>

            <p className="text-gray-900 text-lg sm:text-xl font-medium leading-relaxed mb-8 max-w-md">
              Eine offene Ganztagsschule in Hagen – mit jahrgangsübergreifendem Lernen,
              vielfältigem OGS-Angebot und lebendiger Schulgemeinschaft.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/aktuelles"
                className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-lg transition-colors text-gray-900 hover:opacity-90 shadow-md"
                style={{ background: 'var(--color-accent)' }}
              >
                Aktuelles <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 border-2 border-gray-900/30 hover:bg-black/5 text-gray-900 font-bold px-6 py-3 rounded-lg transition-colors"
              >
                Kontakt aufnehmen
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Quick access cards */}

      <div className="bg-white border-b border-gray-100 shadow-sm py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-4">

          {[
            { href: '/aktuelles', label: 'Aktuelles', icon: Newspaper, iconColor: '#5a8c90' },
            { href: '/termine', label: 'Kalender', icon: Calendar, iconColor: '#fdbb56' },
            { href: '/galerie', label: 'Galerie', icon: ImageIcon, iconColor: '#81bbbf' },
            { href: '/kontakt', label: 'Kontakt', icon: Phone, iconColor: '#f59e0b' },
          ].map(({ href, label, icon: Icon, iconColor }) => (

            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-all"
            >
              <Icon
                className="h-5 w-5 shrink-0"
                style={{ color: iconColor }}
              />

              <span className="font-medium text-sm text-gray-700">
                {label}
              </span>

            </Link>

          ))}
        </div>
      </div>
    </>
  )
}