import { Review } from '@/types'
import { Star, User } from 'lucide-react'

interface ServiceReviewsProps {
  reviews: Review[]
  serviceId: string
}

export default function ServiceReviews({ reviews }: ServiceReviewsProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <h2 className="text-2xl font-semibold mb-6">Reviews</h2>
        <div className="text-center py-8">
          <div className="text-4xl mb-4">⭐</div>
          <h3 className="text-lg font-medium mb-2">No reviews yet</h3>
          <p className="text-gray-600">Be the first to review this service!</p>
        </div>
      </div>
    )
  }

  // Calculate average rating
  const averageRating = reviews.reduce((sum, review) => sum + review.metadata.rating, 0) / reviews.length

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Reviews ({reviews.length})</h2>
        <div className="flex items-center">
          <div className="flex mr-2">
            {renderStars(Math.round(averageRating))}
          </div>
          <span className="text-lg font-semibold">{averageRating.toFixed(1)}</span>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-gray-600" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-semibold">{review.metadata.customer_name}</div>
                    <div className="text-sm text-gray-600">
                      {formatDate(review.created_at)}
                      {review.metadata.verified_booking && (
                        <span className="ml-2 bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">
                          Verified Booking
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex">
                    {renderStars(review.metadata.rating)}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-3">
                  {review.metadata.review_text}
                </p>

                {/* Review Photos */}
                {review.metadata.photos && review.metadata.photos.length > 0 && (
                  <div className="flex space-x-2 mb-3">
                    {review.metadata.photos.slice(0, 3).map((photo, index) => (
                      <img
                        key={index}
                        src={`${photo.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                        alt="Review photo"
                        className="w-16 h-16 object-cover rounded"
                        width="64"
                        height="64"
                      />
                    ))}
                    {review.metadata.photos.length > 3 && (
                      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-sm text-gray-600">
                        +{review.metadata.photos.length - 3}
                      </div>
                    )}
                  </div>
                )}

                {/* Provider Response */}
                {review.metadata.response && (
                  <div className="bg-gray-50 rounded-lg p-4 mt-4">
                    <div className="font-medium text-sm mb-2">Response from provider:</div>
                    <p className="text-gray-700 text-sm">{review.metadata.response}</p>
                    {review.metadata.response_date && (
                      <div className="text-xs text-gray-500 mt-2">
                        {formatDate(review.metadata.response_date)}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}