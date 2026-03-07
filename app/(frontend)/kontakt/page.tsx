import { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'
import PageHero from '../../../components/ui/PageHero'
import ContactForm from '../../../components/sections/ContactForm'
import MapClientWrapper from '../../../components/sections/MapClientWrapper'

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Kontaktinformationen und Kontaktformular der Grundschule Wehringhausen.',
}

export default function KontaktPage() {
  return (
    <>
      <PageHero title="Kontakt" subtitle="Wir freuen uns über Ihre Nachricht" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Erreichbarkeit</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[--color-primary] shrink-0 mt-0.5" style={{ color: 'var(--color-primary)' }} />
                  <div>
                    <p className="font-medium">Adresse</p>
                    <p className="text-sm text-gray-600">
                      Wehringhausener Str. 1<br />
                      58089 Hagen
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="h-5 w-5 shrink-0 mt-0.5" style={{ color: 'var(--color-primary)' }} />
                  <div>
                    <p className="font-medium">Telefon</p>
                    <a href="tel:+492331XXXXXX" className="text-sm text-gray-600 hover:text-gray-900">
                      02331 / XXX XXX
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="h-5 w-5 shrink-0 mt-0.5" style={{ color: 'var(--color-primary)' }} />
                  <div>
                    <p className="font-medium">E-Mail</p>
                    <a href="mailto:info@gswehringhausen.de" className="text-sm text-gray-600 hover:text-gray-900">
                      info@gswehringhausen.de
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="h-5 w-5 shrink-0 mt-0.5" style={{ color: 'var(--color-primary)' }} />
                  <div>
                    <p className="font-medium">Sekretariat</p>
                    <p className="text-sm text-gray-600">
                      Mo–Fr 7:30–12:30 Uhr<br />
                      Mo, Di, Do 13:30–15:30 Uhr
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Emergency notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="font-semibold text-amber-800 mb-1">🤒 Krankmeldung</p>
              <p className="text-sm text-amber-700">
                Bitte melden Sie Ihr Kind bis <strong>8:00 Uhr</strong> telefonisch krank oder
                nutzen Sie das{' '}
                <Link href="/eltern" className="underline">Online-Formular im Elternbereich</Link>.
              </p>
            </div>

            {/* Map */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Anfahrt</h2>
              <MapClientWrapper />
              <p className="text-xs text-gray-400 mt-2">Karte: © OpenStreetMap-Mitwirkende</p>
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Schreiben Sie uns</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  )
}
