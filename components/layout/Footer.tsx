import Link from 'next/link'
import { Phone, Mail, MapPin, GraduationCap } from 'lucide-react'

export default function Footer() {
  return (
    <footer
        className="mt-auto"
        style={{
          background:
            'linear-gradient(180deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
          color: 'white',
        }}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Branding */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div
                className="flex items-center justify-center w-8 h-8 rounded-lg"
                style={{ background: 'var(--color-accent)' }}
                aria-hidden
              >
                <GraduationCap className="h-4 w-4" style={{ color: 'var(--color-text)' }} />
              </div>
              <span className="font-bold text-lg text-white">GS Wehringhausen</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Grundschule Wehringhausen – eine offene Ganztagsschule in Hagen mit
              jahrgangsübergreifendem Lernen (JüL).
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-3 text-white">
              Schnellzugriff
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              {[
                { href: '/aktuelles',     label: 'Aktuelles' },
                { href: '/termine',       label: 'Schulkalender' },
                { href: '/galerie',       label: 'Galerie' },
                { href: '/eltern',        label: 'Elternbereich' },
                { href: '/unsere-schule', label: 'Über uns' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-3 text-white">
              Kontakt
            </h3>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-white" />
                <span>Wehringhausener Str. 1<br />58089 Hagen</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-white" />
                <a href="tel:+492331XXXXXX" className="hover:text-white transition-colors">
                  02331 / XXX XXX
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-white" />
                <a href="mailto:info@gswehringhausen.de" className="hover:text-white transition-colors">
                  info@gswehringhausen.de
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-3 text-white">
              Rechtliches
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              {[
                { href: '/impressum',  label: 'Impressum' },
                { href: '/datenschutz', label: 'Datenschutzerklärung' },
                { href: '/kontakt',    label: 'Kontakt' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/20 text-center text-xs text-white/60">
          © {new Date().getFullYear()} Grundschule Wehringhausen, Hagen. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  )
}