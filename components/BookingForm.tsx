'use client'

import { useState } from 'react'
import { DogCareService } from '@/types'
import { createBooking } from '@/lib/cosmic'
import { Calendar, DollarSign, Phone, Mail, User } from 'lucide-react'

interface BookingFormProps {
  service: DogCareService
}

export default function BookingForm({ service }: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    dog_name: '',
    dog_breed: '',
    dog_age: '',
    dog_size: 'medium',
    start_date: '',
    end_date: '',
    service_type: 'overnight',
    special_requirements: '',
    emergency_contact: ''
  })

  const calculateTotal = () => {
    if (!formData.start_date || !formData.end_date) return 0
    
    const startDate = new Date(formData.start_date)
    const endDate = new Date(formData.end_date)
    const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    
    let rate = 0
    switch (formData.service_type) {
      case 'overnight':
        rate = service.metadata?.pricing?.overnight_rate || 0
        return nights * rate
      case 'day-care':
        rate = service.metadata?.pricing?.day_care_rate || 0
        return nights * rate
      case 'dog-walking':
        rate = service.metadata?.pricing?.walk_rate || 0
        return nights * rate
      default:
        return 0
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const bookingData = {
        ...formData,
        service: service.id,
        total_cost: calculateTotal(),
        dog_age: formData.dog_age ? parseInt(formData.dog_age) : undefined
      }

      await createBooking(bookingData)
      
      alert('Booking request submitted successfully! The provider will contact you soon.')
      setShowForm(false)
      setFormData({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        dog_name: '',
        dog_breed: '',
        dog_age: '',
        dog_size: 'medium',
        start_date: '',
        end_date: '',
        service_type: 'overnight',
        special_requirements: '',
        emergency_contact: ''
      })
    } catch (error) {
      console.error('Booking error:', error)
      alert('There was an error submitting your booking. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!showForm) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold mb-2">Book This Service</h3>
          <p className="text-gray-600">Get in touch to arrange care for your dog</p>
        </div>

        {/* Pricing Display */}
        {service.metadata?.pricing && (
          <div className="space-y-3 mb-6">
            {service.metadata.pricing.overnight_rate && (
              <div className="flex justify-between items-center">
                <span>Overnight Boarding</span>
                <span className="font-semibold">${service.metadata.pricing.overnight_rate}/night</span>
              </div>
            )}
            {service.metadata.pricing.day_care_rate && (
              <div className="flex justify-between items-center">
                <span>Day Care</span>
                <span className="font-semibold">${service.metadata.pricing.day_care_rate}/day</span>
              </div>
            )}
            {service.metadata.pricing.walk_rate && (
              <div className="flex justify-between items-center">
                <span>Dog Walking</span>
                <span className="font-semibold">${service.metadata.pricing.walk_rate}/walk</span>
              </div>
            )}
          </div>
        )}

        <div className="space-y-3 mb-6">
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="w-4 h-4 mr-2" />
            <span>{service.metadata.phone}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="w-4 h-4 mr-2" />
            <span>{service.metadata.email}</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setShowForm(true)}
            className="w-full btn-primary flex items-center justify-center"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book Online
          </button>
          <a
            href={`tel:${service.metadata.phone}`}
            className="w-full btn-secondary text-center block"
          >
            <Phone className="w-4 h-4 inline mr-2" />
            Call Now
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Book Service</h3>
        <button
          onClick={() => setShowForm(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Customer Information */}
        <div>
          <label className="block text-sm font-medium mb-1">
            <User className="w-4 h-4 inline mr-1" />
            Your Name *
          </label>
          <input
            type="text"
            name="customer_name"
            value={formData.customer_name}
            onChange={handleInputChange}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <input
            type="email"
            name="customer_email"
            value={formData.customer_email}
            onChange={handleInputChange}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone *</label>
          <input
            type="tel"
            name="customer_phone"
            value={formData.customer_phone}
            onChange={handleInputChange}
            className="input-field"
            required
          />
        </div>

        {/* Dog Information */}
        <div>
          <label className="block text-sm font-medium mb-1">Dog's Name *</label>
          <input
            type="text"
            name="dog_name"
            value={formData.dog_name}
            onChange={handleInputChange}
            className="input-field"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Breed</label>
            <input
              type="text"
              name="dog_breed"
              value={formData.dog_breed}
              onChange={handleInputChange}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Age</label>
            <input
              type="number"
              name="dog_age"
              value={formData.dog_age}
              onChange={handleInputChange}
              className="input-field"
              min="0"
              max="30"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Dog Size *</label>
          <select
            name="dog_size"
            value={formData.dog_size}
            onChange={handleInputChange}
            className="input-field"
            required
          >
            <option value="small">Small (under 25 lbs)</option>
            <option value="medium">Medium (25-60 lbs)</option>
            <option value="large">Large (60-90 lbs)</option>
            <option value="extra-large">Extra Large (over 90 lbs)</option>
          </select>
        </div>

        {/* Booking Details */}
        <div>
          <label className="block text-sm font-medium mb-1">Service Type *</label>
          <select
            name="service_type"
            value={formData.service_type}
            onChange={handleInputChange}
            className="input-field"
            required
          >
            <option value="overnight">Overnight Boarding</option>
            <option value="day-care">Day Care</option>
            <option value="dog-walking">Dog Walking</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">
              <Calendar className="w-4 h-4 inline mr-1" />
              Start Date *
            </label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleInputChange}
              className="input-field"
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Date *</label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleInputChange}
              className="input-field"
              min={formData.start_date || new Date().toISOString().split('T')[0]}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Special Requirements</label>
          <textarea
            name="special_requirements"
            value={formData.special_requirements}
            onChange={handleInputChange}
            rows={3}
            className="input-field resize-none"
            placeholder="Any special needs, medications, or instructions for your dog..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Emergency Contact *</label>
          <input
            type="text"
            name="emergency_contact"
            value={formData.emergency_contact}
            onChange={handleInputChange}
            className="input-field"
            placeholder="Name and phone number"
            required
          />
        </div>

        {/* Total Cost */}
        {formData.start_date && formData.end_date && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium">Estimated Total:</span>
              <span className="text-xl font-bold text-primary-600">
                <DollarSign className="w-5 h-5 inline" />
                {calculateTotal()}
              </span>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
        </button>

        <p className="text-xs text-gray-500 text-center">
          By submitting, you agree to our terms of service. The provider will contact you to confirm details.
        </p>
      </form>
    </div>
  )
}