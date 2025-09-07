import Link from 'next/link'
import { Heart, MapPin, Phone } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">DogCare Connect</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <Link href="/services" className="text-gray-600 hover:text-primary-600 transition-colors">
              Find Services
            </Link>
            <Link href="/how-it-works" className="text-gray-600 hover:text-primary-600 transition-colors">
              How It Works
            </Link>
            <Link href="/become-provider" className="text-gray-600 hover:text-primary-600 transition-colors">
              Become a Provider
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-primary-600 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center text-sm text-gray-600">
              <Phone className="w-4 h-4 mr-1" />
              <span>1-800-DOG-CARE</span>
            </div>
            <Link 
              href="/services" 
              className="btn-primary"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden border-t border-gray-200">
        <div className="container py-3">
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/" className="text-gray-600 hover:text-primary-600">Home</Link>
            <Link href="/services" className="text-gray-600 hover:text-primary-600">Services</Link>
            <Link href="/how-it-works" className="text-gray-600 hover:text-primary-600">How It Works</Link>
            <Link href="/contact" className="text-gray-600 hover:text-primary-600">Contact</Link>
          </div>
        </div>
      </div>
    </header>
  )
}