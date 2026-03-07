'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'

const schema = z.object({
  name: z.string().min(2, 'Bitte geben Sie Ihren Namen ein'),
  email: z.string().email('Ungültige E-Mail-Adresse'),
  subject: z.string().min(3, 'Bitte geben Sie einen Betreff ein'),
  message: z.string().min(10, 'Die Nachricht ist zu kurz'),
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: 'Bitte stimmen Sie der Datenschutzerklärung zu',
  }),
})

type FormData = z.infer<typeof schema>

export default function ContactForm() {
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
      const res = await fetch('/api/contact', {
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
      <div className="flex items-start gap-3 p-5 bg-blue-50 border border-blue-200 rounded-xl text-blue-800">
        <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" />
        <p>
          Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns so bald wie möglich
          bei Ihnen!
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input
            {...register('name')}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
            placeholder="Ihr Name"
          />
          {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail *</label>
          <input
            {...register('email')}
            type="email"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
            placeholder="ihre@email.de"
          />
          {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Betreff *</label>
        <input
          {...register('subject')}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
          placeholder="Worum geht es?"
        />
        {errors.subject && (
          <p className="text-sm text-red-600 mt-1">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nachricht *</label>
        <textarea
          {...register('message')}
          rows={5}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
          placeholder="Ihre Nachricht…"
        />
        {errors.message && (
          <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>
        )}
      </div>

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
          Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-60"
      >
        {status === 'loading' && <Loader2 className="h-4 w-4 animate-spin" />}
        Nachricht senden
      </button>
    </form>
  )
}
