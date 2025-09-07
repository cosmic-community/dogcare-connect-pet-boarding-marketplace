import { DogCareService } from '@/types'
import ServiceCard from '@/components/ServiceCard'
import Link from 'next/link'

interface FeaturedServicesProps {
  services: DogCareService[]
}

export default function FeaturedServices({ services }: FeaturedServicesProps) {
  if (!services || services.length === 0) {
    return null
  }

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Link 
          href="/services" 
          className="inline-flex items-center px-6 py-3 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
        >
          View All Services
        </Link>
      </div>
    </div>
  )
}