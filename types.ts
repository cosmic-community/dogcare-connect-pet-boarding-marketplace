// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Dog Care Service Provider
interface DogCareService extends CosmicObject {
  type: 'dog-care-services';
  metadata: {
    provider_name: string;
    description: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    latitude?: number;
    longitude?: number;
    phone: string;
    email: string;
    profile_image?: {
      url: string;
      imgix_url: string;
    };
    gallery?: Array<{
      url: string;
      imgix_url: string;
    }>;
    pricing: {
      overnight_rate: number;
      day_care_rate: number;
      walk_rate: number;
    };
    services: string[];
    amenities: string[];
    availability: boolean;
    max_dogs: number;
    rating?: number;
    total_reviews?: number;
    verification_status: 'pending' | 'verified' | 'rejected';
    years_experience: number;
    about: string;
    house_type: string;
    yard_size?: string;
    emergency_contact: string;
  };
}

// Booking/Reservation
interface Booking extends CosmicObject {
  type: 'bookings';
  metadata: {
    service: DogCareService;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    dog_name: string;
    dog_breed?: string;
    dog_age?: number;
    dog_size: 'small' | 'medium' | 'large' | 'extra-large';
    dog_photo?: {
      url: string;
      imgix_url: string;
    };
    start_date: string;
    end_date: string;
    service_type: 'overnight' | 'day-care' | 'dog-walking';
    total_cost: number;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    special_requirements?: string;
    emergency_contact: string;
    vaccination_records?: {
      url: string;
      imgix_url: string;
    };
    booking_notes?: string;
    created_date: string;
  };
}

// Customer Reviews
interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    service: DogCareService;
    booking: Booking;
    customer_name: string;
    rating: number;
    review_text: string;
    photos?: Array<{
      url: string;
      imgix_url: string;
    }>;
    verified_booking: boolean;
    response?: string;
    response_date?: string;
  };
}

// Service Areas for geographic coverage
interface ServiceArea extends CosmicObject {
  type: 'service-areas';
  metadata: {
    area_name: string;
    city: string;
    state: string;
    zip_codes: string[];
    latitude: number;
    longitude: number;
    radius_miles: number;
  };
}

// Available amenities/services
interface Amenity extends CosmicObject {
  type: 'amenities';
  metadata: {
    name: string;
    description: string;
    icon?: string;
    category: 'basic' | 'premium' | 'medical' | 'entertainment';
  };
}

// API response types
interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards for runtime validation
function isDogCareService(obj: CosmicObject): obj is DogCareService {
  return obj.type === 'dog-care-services';
}

function isBooking(obj: CosmicObject): obj is Booking {
  return obj.type === 'bookings';
}

function isReview(obj: CosmicObject): obj is Review {
  return obj.type === 'reviews';
}

// Utility types for forms
type CreateBookingData = Omit<Booking, 'id' | 'created_at' | 'modified_at'>;
type UpdateBookingData = Partial<Booking['metadata']>;

// Search and filter types
interface SearchFilters {
  location?: string;
  radius?: number;
  services?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  availability?: boolean;
  rating?: number;
  dogSize?: string;
}

export type {
  CosmicObject,
  DogCareService,
  Booking,
  Review,
  ServiceArea,
  Amenity,
  CosmicResponse,
  CreateBookingData,
  UpdateBookingData,
  SearchFilters,
};

export {
  isDogCareService,
  isBooking,
  isReview,
};