'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'

const schema = z.object({
  childName: z.string().min(2, 'Bitte Name des Kindes eingeben'),
  class: z.string().min(1, 'Bitte Klasse eingeben'),
  parentName: z.string().min(2, 'Bitte Ihren Namen eingeben'),
  parentEmail: z.string().email('Ungültige E-Mail-Adresse').optional().or(z.literal('')),
  parentPhone: z.string().optional(),
  date: z.string().min(1, 'Bitte Datum wählen'),
  returnDate: z.string().optional(),
  reason: z.string().optional(),
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: 'Bitte stimmen Sie der Datenschutzerklärung zu',
  }),
})

type FormData = z.infer<typeof schema>

export default function SickReportForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    setStatus('loading')
    try {
      const res = await fetch('/api/krankmeldung', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-3 p-5 bg-blue-50 border border-blue-200 rounded-xl text-blue-800">
        <CheckCircle className="h-5 w-5 shrink-0" />
        <p>
          Die Krankmeldung wurde erfolgreich übermittelt. Vielen Dank!
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Name des Kindes *" error={errors.childName?.message}>
          <input {...register('childName')} className="form-input" placeholder="Vorname Nachname" />
        </Field>
        <Field label="Klasse / Gruppe *" error={errors.class?.message}>
          <input {...register('class')} className="form-input" placeholder="z.B. 1a" />
        </Field>
      </div>

      <Field label="Name des Erziehungsberechtigten *" error={errors.parentName?.message}>
        <input {...register('parentName')} className="form-input" placeholder="Vorname Nachname" />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="E-Mail" error={errors.parentEmail?.message}>
          <input {...register('parentEmail')} type="email" className="form-input" />
        </Field>
        <Field label="Telefon">
          <input {...register('parentPhone')} type="tel" className="form-input" />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Abwesend ab *" error={errors.date?.message}>
          <input {...register('date')} type="date" className="form-input" />
        </Field>
        <Field label="Voraussichtliche Rückkehr">
          <input {...register('returnDate')} type="date" className="form-input" />
        </Field>
      </div>

      <Field label="Grund (optional)">
        <textarea {...register('reason')} rows={3} className="form-input" placeholder="Krankheit, Arztbesuch etc." />
      </Field>

      <div>
        <label className="flex items-start gap-2 cursor-pointer">
          <input {...register('gdprConsent')} type="checkbox" className="mt-1 rounded" />
          <span className="text-sm text-gray-700">
            Ich stimme der Verarbeitung meiner Daten gemäß der{' '}
            <Link href="/datenschutz" className="underline text-[var(--color-primary)]" target="_blank">
              Datenschutzerklärung
            </Link>{' '}
            zu. *
          </span>
        </label>
        {errors.gdprConsent && (
          <p className="text-sm text-red-600 mt-1">{errors.gdprConsent.message}</p>
        )}
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 rounded-lg p-3 text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder rufen Sie uns an.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full sm:w-auto flex items-center gap-2 justify-center bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-60"
      >
        {status === 'loading' && <Loader2 className="h-4 w-4 animate-spin" />}
        Krankmeldung absenden
      </button>

      <style jsx>{`
        .form-input {
          width: 100%;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.15s;
        }
        .form-input:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(29,78,216,0.15);
        }
      `}</style>
    </form>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {children}
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  )
}
