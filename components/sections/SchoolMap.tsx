'use client'

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useEffect } from 'react'

// Fix Leaflet default marker icon in Next.js
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const SCHOOL_COORDS: [number, number] = [51.35787, 7.46467]

function ChangeView() {
  const map = useMap()
  useEffect(() => {
    // Force invalidating size to fix gray tiles issue
    setTimeout(() => {
      map.invalidateSize()
    }, 100)
  }, [map])
  return null
}

export default function SchoolMap() {
  return (
    <MapContainer
      center={SCHOOL_COORDS}
      zoom={16}
      className="h-64 w-full rounded-xl overflow-hidden"
      style={{ height: '256px', width: '100%' }}
      scrollWheelZoom={false}
    >
      <ChangeView />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={SCHOOL_COORDS} icon={icon}>
        <Popup>
          <div className="text-sm">
            <strong className="block font-bold">Grundschule Wehringhausen</strong>
            <p className="m-0">Wehringhausener Str. 1</p>
            <p className="m-0">58089 Hagen</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  )
}
