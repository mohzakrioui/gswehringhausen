import { NextResponse } from 'next/server'
import { getPayloadClient } from '../../../lib/payload'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message, gdprConsent } = body

    if (!name || !email || !subject || !message || !gdprConsent) {
      return NextResponse.json({ error: 'Fehlende Pflichtfelder' }, { status: 400 })
    }

    const payload = await getPayloadClient()
    await payload.create({
      collection: 'contact-submissions',
      data: { name, email, subject, message, gdprConsent: true },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Interner Fehler' }, { status: 500 })
  }
}
