'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, GraduationCap, ChevronDown } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Startseite' },
  { href: '/aktuelles', label: 'Aktuelles' },
  { href: '/termine', label: 'Termine' },
  { href: '/galerie', label: 'Galerie' },
  {
    label: 'Unsere Schule',
    children: [
      { href: '/unsere-schule', label: 'Über uns' },
      { href: '/schulleben', label: 'Schulleben' },
      { href: '/ogs', label: 'OGS' },
    ],
  },
  { href: '/eltern', label: 'Eltern' },
  { href: '/kontakt', label: 'Kontakt' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold text-lg"
            style={{ color: 'var(--color-primary-dark)' }}
          >
            <div
              className="flex items-center justify-center w-9 h-9 rounded-lg"
              style={{ background: 'var(--color-primary)' }}
              aria-hidden
            >
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="hidden sm:block leading-tight">
              GS Wehringhausen
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Hauptnavigation">
            {navLinks.map((item) =>
              item.children ? (
                <div key={item.label} className="relative">
                  <button
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-1"
                    onClick={() =>
                      setOpenDropdown(openDropdown === item.label ? null : item.label)
                    }
                    aria-expanded={openDropdown === item.label}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openDropdown === item.label && (
                    <>
                      {/* Backdrop */}
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setOpenDropdown(null)}
                      />
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                            style={{ ['--hover-color' as string]: 'var(--color-primary)' }}
                            onClick={() => setOpenDropdown(null)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  {item.label}
                </Link>
              ),
            )}

            {/* CTA button */}
            <Link
              href="/eltern"
              className="ml-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors"
              style={{ background: 'var(--color-primary)' }}
            >
              Elternbereich
            </Link>
          </nav>

          {/* Mobile burger */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 pb-5">
          <nav aria-label="Mobile Navigation">
            {navLinks.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <p className="mt-4 mb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400 px-2">
                    {item.label}
                  </p>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-3 py-2.5 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className="block px-3 py-2.5 mt-1 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ),
            )}
            <Link
              href="/eltern"
              className="mt-4 flex justify-center py-2.5 rounded-lg text-sm font-semibold text-white"
              style={{ background: 'var(--color-primary)' }}
              onClick={() => setMobileOpen(false)}
            >
              Elternbereich
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
