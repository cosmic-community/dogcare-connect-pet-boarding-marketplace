import Link from 'next/link'
import { DogCareService } from '@/types'
import { MapPin, Star, Shield, DollarSign } from 'lucide-react'

interface ServiceCardProps {
  service: DogCareService
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const rating = service.metadata?.rating || 0
  const reviewCount = service.metadata?.total_reviews || 0
  const isVerified = service.metadata?.verification_status === 'verified'
  const profileImage = service.metadata?.profile_image

  return (
    <Link href={`/services/${service.slug}`} className="card hover:shadow-lg transition-shadow">
      <div className="relative">
        {profileImage ? (
          <img 
            src={`${profileImage.imgix_url}?w=600&h=300&fit=crop&auto=format,compress`}
            alt={service.metadata.provider_name}
            className="w-full h-48 object-cover"
            width="300"
            height="192"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <div className="text-4xl">🐕</div>
          </div>
        )}
        
        {isVerified && (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
            <Shield className="w-3 h-3 mr-1" />
            Verified
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
            {service.metadata.provider_name}
          </h3>
          <div className="flex items-center text-sm">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="font-medium">{rating.toFixed(1)}</span>
            <span className="text-gray-500 ml-1">({reviewCount})</span>
          </div>
        </div>

        <div className="flex items-center text-gray-600 text-sm mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{service.metadata.city}, {service.metadata.state}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {service.metadata.description}
        </p>

        <div className="space-y-2">
          {service.metadata?.services && service.metadata.services.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {service.metadata.services.slice(0, 3).map((serviceItem: string, index: number) => (
                <span key={index} className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-xs">
                  {serviceItem}
                </span>
              ))}
              {service.metadata.services.length > 3 && (
                <span className="text-gray-500 text-xs">
                  +{service.metadata.services.length - 3} more
                </span>
              )}
            </div>
          )}

          {service.metadata?.pricing && (
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="flex items-center text-sm">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <span className="font-medium">${service.metadata.pricing.overnight_rate}/night</span>
              </div>
              <div className="text-xs text-gray-500">
                Starting from
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}