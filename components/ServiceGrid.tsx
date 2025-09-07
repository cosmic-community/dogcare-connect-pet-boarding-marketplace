import { DogCareService } from '@/types'
import ServiceCard from '@/components/ServiceCard'

interface ServiceGridProps {
  services: DogCareService[]
}

export default function ServiceGrid({ services }: ServiceGridProps) {
  if (!services || services.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🐕</div>
        <h3 className="text-xl font-semibold mb-2">No services found</h3>
        <p className="text-gray-600">
          Try adjusting your search criteria or explore different locations.
        </p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map(service => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  )
}