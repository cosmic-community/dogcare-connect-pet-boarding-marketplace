'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Search, Calendar } from 'lucide-react'

export default function SearchForm() {
  const [location, setLocation] = useState('')
  const [serviceType, setServiceType] = useState('')
  const [dates, setDates] = useState({ start: '', end: '' })
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    const searchParams = new URLSearchParams()
    if (location) searchParams.set('location', location)
    if (serviceType) searchParams.set('service', serviceType)
    if (dates.start) searchParams.set('start_date', dates.start)
    if (dates.end) searchParams.set('end_date', dates.end)
    
    router.push(`/services?${searchParams.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="grid md:grid-cols-4 gap-4">
        {/* Location */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            Location
          </label>
          <input
            type="text"
            placeholder="City, State or ZIP"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input-field"
          />
        </div>

        {/* Service Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Type
          </label>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="input-field"
          >
            <option value="">All Services</option>
            <option value="overnight">Overnight Boarding</option>
            <option value="day-care">Day Care</option>
            <option value="dog-walking">Dog Walking</option>
          </select>
        </div>

        {/* Check-in Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Check-in
          </label>
          <input
            type="date"
            value={dates.start}
            onChange={(e) => setDates(prev => ({ ...prev, start: e.target.value }))}
            className="input-field"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Check-out Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Check-out
          </label>
          <input
            type="date"
            value={dates.end}
            onChange={(e) => setDates(prev => ({ ...prev, end: e.target.value }))}
            className="input-field"
            min={dates.start || new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          type="submit"
          className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center"
        >
          <Search className="w-5 h-5 mr-2" />
          Search Services
        </button>
      </div>
    </form>
  )
}