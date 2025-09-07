import { getDogCareServices } from '@/lib/cosmic'
import Hero from '@/components/Hero'
import SearchForm from '@/components/SearchForm'
import ServiceGrid from '@/components/ServiceGrid'
import FeaturedServices from '@/components/FeaturedServices'
import TrustIndicators from '@/components/TrustIndicators'

export default async function HomePage() {
  // Get featured/verified services for homepage
  const featuredServices = await getDogCareServices({ 
    verification_status: 'verified' 
  })
  
  return (
    <div className="min-h-screen">
      <Hero />
      
      <section className="py-12 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Find Perfect Care for Your Dog
            </h2>
            <SearchForm />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Dog Care Services
          </h2>
          <FeaturedServices services={featuredServices.slice(0, 6)} />
        </div>
      </section>

      <section className="py-12 bg-primary-50">
        <div className="container">
          <TrustIndicators />
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              How DogCare Connect Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Search & Compare</h3>
                <p className="text-gray-600">
                  Browse verified dog care providers in your area. Compare services, pricing, and reviews.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Book with Confidence</h3>
                <p className="text-gray-600">
                  Contact providers directly, discuss your dog's needs, and book the perfect care solution.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Enjoy Peace of Mind</h3>
                <p className="text-gray-600">
                  Relax knowing your dog is in trusted hands with regular updates and professional care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}