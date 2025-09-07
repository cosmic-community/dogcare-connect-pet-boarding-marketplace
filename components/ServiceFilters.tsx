'use client'

import { useState } from 'react'
import { Filter, DollarSign, Star, MapPin } from 'lucide-react'

export default function ServiceFilters() {
  const [filters, setFilters] = useState({
    priceRange: [0, 200],
    rating: 0,
    distance: 25,
    services: [] as string[],
    availability: false
  })

  const serviceTypes = [
    'Overnight Boarding',
    'Day Care',
    'Dog Walking',
    'Pet Sitting',
    'Grooming',
    'Training',
    'Emergency Care'
  ]

  const handleServiceToggle = (service: string) => {
    setFilters(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }))
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <Filter className="w-5 h-5 mr-2 text-gray-600" />
        <h3 className="text-lg font-semibold">Filters</h3>
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <div className="flex items-center mb-3">
            <DollarSign className="w-4 h-4 mr-2 text-gray-600" />
            <span className="font-medium">Price Range</span>
          </div>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="200"
              value={filters.priceRange[1]}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                priceRange: [prev.priceRange[0], parseInt(e.target.value)]
              }))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>$0</span>
              <span>${filters.priceRange[1]}/night</span>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div>
          <div className="flex items-center mb-3">
            <Star className="w-4 h-4 mr-2 text-gray-600" />
            <span className="font-medium">Minimum Rating</span>
          </div>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center">
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={filters.rating === rating}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    rating: parseInt(e.target.value)
                  }))}
                  className="mr-2"
                />
                <div className="flex items-center">
                  {Array.from({ length: rating }, (_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-sm">& up</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Distance */}
        <div>
          <div className="flex items-center mb-3">
            <MapPin className="w-4 h-4 mr-2 text-gray-600" />
            <span className="font-medium">Distance</span>
          </div>
          <div className="space-y-2">
            <input
              type="range"
              min="1"
              max="50"
              value={filters.distance}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                distance: parseInt(e.target.value)
              }))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>1 mile</span>
              <span>{filters.distance} miles</span>
            </div>
          </div>
        </div>

        {/* Services */}
        <div>
          <span className="font-medium block mb-3">Services Offered</span>
          <div className="space-y-2">
            {serviceTypes.map((service) => (
              <label key={service} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.services.includes(service)}
                  onChange={() => handleServiceToggle(service)}
                  className="mr-2"
                />
                <span className="text-sm">{service}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.availability}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                availability: e.target.checked
              }))}
              className="mr-2"
            />
            <span className="font-medium">Available Now</span>
          </label>
        </div>

        {/* Apply Filters Button */}
        <div className="pt-4 border-t">
          <button className="w-full btn-primary">
            Apply Filters
          </button>
          <button 
            onClick={() => setFilters({
              priceRange: [0, 200],
              rating: 0,
              distance: 25,
              services: [],
              availability: false
            })}
            className="w-full mt-2 text-sm text-gray-600 hover:text-gray-800"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  )
}