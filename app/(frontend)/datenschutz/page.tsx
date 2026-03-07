import { Metadata } from 'next'
import PageHero from '../../../components/ui/PageHero'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  robots: { index: false },
}

export default function DatenschutzPage() {
  return (
    <>
      <PageHero title="Datenschutzerklärung" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 prose text-gray-700">
        <p>Stand: März 2026</p>

        <h2>1. Datenschutz auf einen Blick</h2>
        <h3>Allgemeine Hinweise</h3>
        <p>
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
          personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
          Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
        </p>

        <h3>Datenerfassung auf dieser Website</h3>
        <p>
          <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong>
          <br />
          Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber:
          Grundschule Wehringhausen, Wehringhausener Str. 1, 58089 Hagen.
        </p>

        <h2>2. Allgemeine Informationen und Pflichtinformationen</h2>
        <h3>Datenschutz</h3>
        <p>
          Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
          Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der
          gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
        </p>

        <h3>Cookies</h3>
        <p>
          Diese Website verwendet ausschließlich technisch notwendige Cookies. Es werden{' '}
          <strong>keine Tracking- oder Marketing-Cookies</strong> eingesetzt.
          Es wird keine Analyse-Software wie Google Analytics genutzt.
        </p>

        <h3>SSL- bzw. TLS-Verschlüsselung</h3>
        <p>
          Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung
          vertraulicher Inhalte eine SSL-/TLS-Verschlüsselung.
        </p>

        <h2>3. Datenerfassung auf dieser Website</h2>
        <h3>Kontaktformular</h3>
        <p>
          Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus
          dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks
          Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
          Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
        </p>
        <p>
          Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) bzw. Art. 6 Abs. 1
          lit. f DSGVO (berechtigtes Interesse).
        </p>

        <h3>Krankmeldungsformular</h3>
        <p>
          Die über das Krankmeldungsformular übermittelten Daten werden ausschließlich zur
          Bearbeitung der Krankmeldung verwendet und nach Ablauf der gesetzlichen
          Aufbewahrungsfristen gelöscht.
        </p>

        <h3>Schulfotos / Galerie</h3>
        <p>
          Die Veröffentlichung von Fotos, auf denen Kinder zu sehen sind, erfolgt nur mit
          ausdrücklicher schriftlicher Einwilligung der Erziehungsberechtigten. Die
          Einwilligung kann jederzeit widerrufen werden.
        </p>

        <h3>OpenStreetMap</h3>
        <p>
          Diese Website nutzt den Kartendienst OpenStreetMap. Beim Laden der Karte werden
          Verbindungsdaten (u.a. IP-Adresse) an die Server von OpenStreetMap übermittelt.
          Datenschutzinformationen: openstreetmap.org/copyright
        </p>

        <h2>4. Ihre Rechte</h2>
        <p>
          Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
          Verarbeitung, Datenübertragbarkeit und Widerspruch. Wenden Sie sich dazu an:
          info@gswehringhausen.de
        </p>
        <p>
          Sie haben außerdem das Recht, sich bei der zuständigen Aufsichtsbehörde zu beschweren:
          Landesbeauftragte für Datenschutz und Informationsfreiheit NRW,
          Kavalleriestraße 2–4, 40213 Düsseldorf.
        </p>
      </div>
    </>
  )
}
