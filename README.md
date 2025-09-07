# DogCare Connect - Pet Boarding Marketplace

![App Preview](https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&h=300&fit=crop&auto=format)

A comprehensive pet boarding marketplace connecting dog owners with trusted local caregivers. Find, compare, and book nearby dog boarding services with detailed profiles, pricing, and availability information.

## ✨ Features

- **Advanced Location Search** - Find dog care services within specific radius of your location
- **Detailed Service Profiles** - Complete caregiver information with photos, services, and pricing
- **Interactive Booking System** - Real-time availability checking and seamless reservation process
- **Review & Rating System** - Community-driven feedback and rating system for all services
- **Service Filtering** - Filter by price range, services offered, availability, and distance
- **Mobile-Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Caregiver Dashboard** - Comprehensive management system for service providers
- **Secure Messaging** - Direct communication between pet owners and caregivers

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68bdb579285c02bfe718df78&clone_repository=68bdc49b285c02bfe718df7f)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "I want to build a website were a dog owner can keep his dog for few days , the website that will contain all the dog takecare places details near by their house with all the details they will provide to dog for few days , make a complete full stack project"

### Code Generation Prompt

> "I want to build a website were a dog owner can keep his dog for few days , the website that will contain all the dog takecare places details near by their house with all the details they will provide to dog for few days full stack project"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Content Management**: Cosmic CMS
- **Database**: Cosmic CMS
- **TypeScript**: Full type safety
- **Image Optimization**: Imgix integration
- **Deployment**: Vercel/Netlify ready

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dogcare-connect
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   
   The following environment variables are automatically configured:
   - `COSMIC_BUCKET_SLUG` - Your Cosmic bucket identifier
   - `COSMIC_READ_KEY` - Read access key for your Cosmic bucket
   - `COSMIC_WRITE_KEY` - Write access key for your Cosmic bucket

4. **Run the development server**
   ```bash
   bun run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Cosmic SDK Examples

### Fetch Dog Care Services
```typescript
import { cosmic } from '@/lib/cosmic'

// Get all dog care services with location data
const services = await cosmic.objects
  .find({ type: 'dog-care-services' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Search services by location
const nearbyServices = await cosmic.objects
  .find({ 
    type: 'dog-care-services',
    'metadata.city': 'New York'
  })
  .depth(1)
```

### Book a Service
```typescript
// Create a new booking
const booking = await cosmic.objects.insertOne({
  type: 'bookings',
  title: `Booking for ${dogName}`,
  metadata: {
    service: serviceId,
    customer_name: 'John Doe',
    dog_name: 'Max',
    start_date: '2024-01-15',
    end_date: '2024-01-17',
    status: 'pending',
    special_requirements: 'Needs medication twice daily'
  }
})
```

## 🗄️ Cosmic CMS Integration

This application integrates with your existing Cosmic content structure:

- **Dog Care Services** (`dog-care-services`) - Service provider profiles with location, pricing, and amenities
- **Bookings** (`bookings`) - Reservation management system
- **Reviews** (`reviews`) - Customer feedback and ratings
- **Service Areas** (`service-areas`) - Geographic coverage areas
- **Amenities** (`amenities`) - Available services and facilities

The content model supports rich media, location data, pricing tiers, and flexible service descriptions.

## 🚀 Deployment

### Deploy to Vercel
1. Connect your repository to Vercel
2. Add your environment variables in the Vercel dashboard
3. Deploy with zero configuration

### Deploy to Netlify
1. Connect your repository to Netlify
2. Add your environment variables in site settings
3. Deploy with automatic builds

<!-- README_END -->