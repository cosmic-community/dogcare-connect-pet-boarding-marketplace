import Link from 'next/link'
import { Heart, MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">DogCare Connect</span>
            </Link>
            <p className="text-gray-300 mb-4">
              Connecting dog owners with trusted local care providers for peace of mind pet care.
            </p>
            <div className="flex items-center text-sm text-gray-300">
              <Phone className="w-4 h-4 mr-2" />
              <span>1-800-DOG-CARE</span>
            </div>
            <div className="flex items-center text-sm text-gray-300 mt-2">
              <Mail className="w-4 h-4 mr-2" />
              <span>hello@dogcareconnect.com</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Pet Owners</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Find Services
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-white transition-colors">
                  Safety & Trust
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-white transition-colors">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Providers</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/become-provider" className="hover:text-white transition-colors">
                  Become a Provider
                </Link>
              </li>
              <li>
                <Link href="/provider-requirements" className="hover:text-white transition-colors">
                  Requirements
                </Link>
              </li>
              <li>
                <Link href="/provider-resources" className="hover:text-white transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/provider-login" className="hover:text-white transition-colors">
                  Provider Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 DogCare Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}