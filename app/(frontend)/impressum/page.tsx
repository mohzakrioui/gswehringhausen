import { Metadata } from 'next'
import PageHero from '../../../components/ui/PageHero'

export const metadata: Metadata = {
  title: 'Impressum',
  robots: { index: false },
}

export default function ImpressumPage() {
  return (
    <>
      <PageHero title="Impressum" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 prose text-gray-700">
        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
          <strong>Grundschule Wehringhausen</strong>
          <br />
          Wehringhausener Str. 1<br />
          58089 Hagen
        </p>

        <h3>Vertreten durch</h3>
        <p>Schulleitung: [Name der Schulleitung]</p>

        <h3>Schulträger</h3>
        <p>
          Stadt Hagen – Der Oberbürgermeister
          <br />
          Volme-Galerie 1<br />
          58095 Hagen
        </p>

        <h3>Kontakt</h3>
        <p>
          Telefon: 02331 / XXX XXX
          <br />
          E-Mail: info@gswehringhausen.de
        </p>

        <h3>Aufsichtsbehörde</h3>
        <p>
          Bezirksregierung Arnsberg
          <br />
          Seibertzstraße 1<br />
          59821 Arnsberg
        </p>

        <h3>Haftungsausschluss</h3>
        <p>
          Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
          Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
        </p>

        <h3>Urheberrecht</h3>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
          dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
          der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
          Zustimmung des jeweiligen Autors bzw. Erstellers.
        </p>
      </div>
    </>
  )
}
