import { createBucketClient } from '@cosmicjs/sdk';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Get all dog care services
export async function getDogCareServices(filters?: any): Promise<import('../types').DogCareService[]> {
  try {
    const query: Record<string, any> = { type: 'dog-care-services' };
    
    // Add filters if provided
    if (filters?.city) {
      query['metadata.city'] = filters.city;
    }
    if (filters?.verification_status) {
      query['metadata.verification_status'] = filters.verification_status;
    }

    const response = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);

    // Manual sorting by rating (highest first)
    const services = response.objects as import('../types').DogCareService[];
    return services.sort((a, b) => {
      const ratingA = a.metadata?.rating || 0;
      const ratingB = b.metadata?.rating || 0;
      return ratingB - ratingA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch dog care services');
  }
}

// Get single dog care service by slug
export async function getDogCareServiceBySlug(slug: string): Promise<import('../types').DogCareService | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'dog-care-services',
        slug
      })
      .depth(1);

    const service = response.object as import('../types').DogCareService;
    
    if (!service || !service.metadata) {
      return null;
    }

    return service;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

// Create a new booking
export async function createBooking(bookingData: any): Promise<import('../types').Booking> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'bookings',
      title: `Booking for ${bookingData.dog_name}`,
      metadata: {
        ...bookingData,
        created_date: new Date().toISOString(),
        status: 'pending'
      }
    });

    return response.object as import('../types').Booking;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw new Error('Failed to create booking');
  }
}

// Get bookings by service
export async function getBookingsByService(serviceId: string): Promise<import('../types').Booking[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'bookings',
        'metadata.service': serviceId
      })
      .props(['id', 'title', 'metadata'])
      .depth(1);

    return response.objects as import('../types').Booking[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch bookings');
  }
}

// Get reviews for a service
export async function getReviewsByService(serviceId: string): Promise<import('../types').Review[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'reviews',
        'metadata.service': serviceId
      })
      .props(['id', 'title', 'metadata'])
      .depth(1);

    const reviews = response.objects as import('../types').Review[];
    
    // Sort by creation date (newest first)
    return reviews.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch reviews');
  }
}

// Update booking status
export async function updateBookingStatus(bookingId: string, status: string): Promise<void> {
  try {
    await cosmic.objects.updateOne(bookingId, {
      metadata: {
        status: status
      }
    });
  } catch (error) {
    console.error('Error updating booking status:', error);
    throw new Error('Failed to update booking status');
  }
}

// Create a review
export async function createReview(reviewData: any): Promise<import('../types').Review> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'reviews',
      title: `Review by ${reviewData.customer_name}`,
      metadata: {
        ...reviewData,
        verified_booking: true
      }
    });

    return response.object as import('../types').Review;
  } catch (error) {
    console.error('Error creating review:', error);
    throw new Error('Failed to create review');
  }
}

// Search services by location and other filters
export async function searchServices(filters: import('../types').SearchFilters): Promise<import('../types').DogCareService[]> {
  try {
    const query: Record<string, any> = { 
      type: 'dog-care-services',
      'metadata.verification_status': 'verified'
    };

    // Add location filter if provided
    if (filters.location) {
      // Simple text search across city and address
      // In a real implementation, you'd use geographic search
      query['metadata.city'] = filters.location;
    }

    const response = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);

    let services = response.objects as import('../types').DogCareService[];

    // Apply client-side filtering for additional filters
    if (filters.rating) {
      services = services.filter(service => 
        (service.metadata?.rating || 0) >= filters.rating!
      );
    }

    if (filters.priceRange) {
      services = services.filter(service => {
        const overnightRate = service.metadata?.pricing?.overnight_rate || 0;
        return overnightRate >= filters.priceRange!.min && 
               overnightRate <= filters.priceRange!.max;
      });
    }

    if (filters.services && filters.services.length > 0) {
      services = services.filter(service => 
        filters.services!.some(filterService => 
          service.metadata?.services?.includes(filterService)
        )
      );
    }

    return services;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to search services');
  }
}