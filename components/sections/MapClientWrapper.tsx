'use client'

import dynamic from 'next/dynamic'

const SchoolMap = dynamic(() => import('./SchoolMap'), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 rounded-xl animate-pulse" />,
})

export default function MapClientWrapper() {
  return <SchoolMap />
}
