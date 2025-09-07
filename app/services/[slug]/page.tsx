// app/services/[slug]/page.tsx
import { getDogCareServiceBySlug, getReviewsByService } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import ServiceDetails from '@/components/ServiceDetails'
import ServiceReviews from '@/components/ServiceReviews'
import BookingForm from '@/components/BookingForm'
import { Metadata } from 'next'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = await getDogCareServiceBySlug(slug)

  if (!service) {
    return {
      title: 'Service Not Found | DogCare Connect'
    }
  }

  return {
    title: `${service.metadata.provider_name} - Dog Care Services | DogCare Connect`,
    description: service.metadata.description,
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = await getDogCareServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const reviews = await getReviewsByService(service.id)

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ServiceDetails service={service} />
            <div className="mt-12">
              <ServiceReviews reviews={reviews} serviceId={service.id} />
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <BookingForm service={service} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}