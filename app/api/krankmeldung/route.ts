import { NextResponse } from 'next/server'
import { getPayloadClient } from '../../../lib/payload'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { childName, class: className, parentName, parentEmail, parentPhone, date, returnDate, reason, gdprConsent } = body

    if (!childName || !className || !parentName || !date || !gdprConsent) {
      return NextResponse.json({ error: 'Fehlende Pflichtfelder' }, { status: 400 })
    }

    const payload = await getPayloadClient()
    await payload.create({
      collection: 'sick-reports',
      data: {
        childName,
        class: className,
        parentName,
        parentEmail,
        parentPhone,
        date,
        returnDate: returnDate || undefined,
        reason,
        gdprConsent: true,
      },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Sick report error:', err)
    return NextResponse.json({ error: 'Interner Fehler' }, { status: 500 })
  }
}
