import { getDogCareServices } from '@/lib/cosmic'
import SearchForm from '@/components/SearchForm'
import ServiceGrid from '@/components/ServiceGrid'
import ServiceFilters from '@/components/ServiceFilters'

export default async function ServicesPage() {
  const services = await getDogCareServices({ verification_status: 'verified' })

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-4xl font-bold mb-6">Find Dog Care Services</h1>
          <p className="text-xl text-gray-600 mb-8">
            Browse our network of verified dog care providers in your area.
          </p>
          <SearchForm />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-80 flex-shrink-0">
            <ServiceFilters />
          </aside>
          
          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                Found {services.length} verified dog care services
              </p>
              <select className="input-field max-w-xs">
                <option value="rating">Sort by Rating</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="distance">Distance</option>
              </select>
            </div>
            
            <ServiceGrid services={services} />
          </main>
        </div>
      </div>
    </div>
  )
}