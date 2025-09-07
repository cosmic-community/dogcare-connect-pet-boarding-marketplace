import { Shield, Star, Heart, Users } from 'lucide-react'

export default function TrustIndicators() {
  const indicators = [
    {
      icon: Shield,
      title: 'Verified Providers',
      description: 'All care providers are background checked and verified',
      stat: '100%'
    },
    {
      icon: Star,
      title: 'Top Rated',
      description: 'Average rating of 4.9/5 stars from pet owners',
      stat: '4.9★'
    },
    {
      icon: Heart,
      title: 'Happy Pets',
      description: 'Over 10,000 successful bookings completed',
      stat: '10k+'
    },
    {
      icon: Users,
      title: 'Growing Community',
      description: 'Join thousands of pet owners who trust us',
      stat: '500+'
    }
  ]

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Why Pet Owners Trust Us</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We're committed to connecting you with the most trusted and reliable dog care providers in your area.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {indicators.map((indicator, index) => {
          const Icon = indicator.icon
          return (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {indicator.stat}
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {indicator.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {indicator.description}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}