import { DogCareService } from '@/types'
import { MapPin, Phone, Mail, Shield, Star, Users, Home } from 'lucide-react'

interface ServiceDetailsProps {
  service: DogCareService
}

export default function ServiceDetails({ service }: ServiceDetailsProps) {
  const isVerified = service.metadata?.verification_status === 'verified'
  const rating = service.metadata?.rating || 0
  const reviewCount = service.metadata?.total_reviews || 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">{service.metadata.provider_name}</h1>
          {isVerified && (
            <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full">
              <Shield className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">Verified Provider</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-6 text-gray-600">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{service.metadata.address}, {service.metadata.city}, {service.metadata.state}</span>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="font-medium">{rating.toFixed(1)}</span>
            <span className="ml-1">({reviewCount} reviews)</span>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      {service.metadata?.profile_image && (
        <div className="rounded-lg overflow-hidden">
          <img 
            src={`${service.metadata.profile_image.imgix_url}?w=1200&h=400&fit=crop&auto=format,compress`}
            alt={service.metadata.provider_name}
            className="w-full h-80 object-cover"
            width="800"
            height="320"
          />
        </div>
      )}

      {/* About */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">About</h2>
        <p className="text-gray-700 leading-relaxed">
          {service.metadata.about || service.metadata.description}
        </p>
      </div>

      {/* Services & Pricing */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Services & Pricing</h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="grid md:grid-cols-3 gap-6">
            {service.metadata?.pricing?.overnight_rate && (
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 mb-2">
                  ${service.metadata.pricing.overnight_rate}
                </div>
                <div className="text-sm text-gray-600">per night</div>
                <div className="font-medium">Overnight Boarding</div>
              </div>
            )}
            {service.metadata?.pricing?.day_care_rate && (
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 mb-2">
                  ${service.metadata.pricing.day_care_rate}
                </div>
                <div className="text-sm text-gray-600">per day</div>
                <div className="font-medium">Day Care</div>
              </div>
            )}
            {service.metadata?.pricing?.walk_rate && (
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 mb-2">
                  ${service.metadata.pricing.walk_rate}
                </div>
                <div className="text-sm text-gray-600">per walk</div>
                <div className="font-medium">Dog Walking</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Services Offered */}
      {service.metadata?.services && service.metadata.services.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Services Offered</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {service.metadata.services.map((serviceItem: string, index: number) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                <span>{serviceItem}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Amenities */}
      {service.metadata?.amenities && service.metadata.amenities.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {service.metadata.amenities.map((amenity: string, index: number) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Provider Details */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Provider Details</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-3 text-gray-600" />
              <div>
                <div className="font-medium">Experience</div>
                <div className="text-gray-600">{service.metadata.years_experience} years</div>
              </div>
            </div>
            <div className="flex items-center">
              <Home className="w-5 h-5 mr-3 text-gray-600" />
              <div>
                <div className="font-medium">Home Type</div>
                <div className="text-gray-600">{service.metadata.house_type}</div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-3 text-gray-600" />
              <div>
                <div className="font-medium">Phone</div>
                <div className="text-gray-600">{service.metadata.phone}</div>
              </div>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-3 text-gray-600" />
              <div>
                <div className="font-medium">Email</div>
                <div className="text-gray-600">{service.metadata.email}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}