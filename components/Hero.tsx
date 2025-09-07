import Link from 'next/link'
import { MapPin, Star, Shield } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      <div className="relative container py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-lg">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Find Perfect Care for Your Dog
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              Connect with verified local dog care providers. Professional pet boarding, day care, and walking services you can trust.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link 
                href="/services" 
                className="bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors text-center"
              >
                Find Services Now
              </Link>
              <Link 
                href="/how-it-works" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-700 transition-colors text-center"
              >
                Learn More
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-6 text-sm">
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-primary-200" />
                <span>Verified Providers</span>
              </div>
              <div className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-primary-200" />
                <span>5-Star Reviews</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-primary-200" />
                <span>Local Services</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop&auto=format,compress"
              alt="Happy dog with caregiver"
              className="rounded-2xl shadow-2xl w-full"
              width="600"
              height="450"
            />
            
            {/* Floating stats */}
            <div className="absolute -bottom-4 -left-4 bg-white text-gray-900 p-4 rounded-lg shadow-lg">
              <div className="text-2xl font-bold text-primary-600">500+</div>
              <div className="text-sm">Verified Providers</div>
            </div>
            
            <div className="absolute -top-4 -right-4 bg-white text-gray-900 p-4 rounded-lg shadow-lg">
              <div className="text-2xl font-bold text-primary-600">4.9★</div>
              <div className="text-sm">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}