export type CityDestination = 'Hyderabad' | 'Delhi' | 'Mumbai' | 'All';

export type SpotCategory = 
  | 'Heritage & Landmarks'
  | 'Comfort Stays & Hotels'
  | 'Local Food & Delicacies'
  | 'Shopping & Bazaars'
  | 'Arts & Culture';

export interface TouristSpot {
  id: string;
  name: string;
  city: 'Hyderabad' | 'Delhi' | 'Mumbai';
  category: SpotCategory;
  lat: number;
  lng: number;
  image: string;
  rating: number;
  description: string;
  durationHours: number;
  bestTimeToVisit: string;
  ticketFeeINR: number;
  travelerTip: string;
  address: string;
}

export interface ItineraryActivity {
  id: string;
  time: string;
  activity: string;
  location: string;
  description: string;
  category: 'Heritage' | 'Local Dining' | 'Stay' | 'Sightseeing' | 'Shopping' | 'Guided Tour';
  insiderTip?: string;
  completed?: boolean;
}

export interface DayItinerary {
  dayNumber: number;
  theme: string;
  schedule: ItineraryActivity[];
}

export interface Package {
  id: string;
  title: string;
  subtitle: string;
  city: 'Hyderabad' | 'Delhi' | 'Mumbai';
  durationDays: number;
  priceINR: number;
  originalPriceINR: number;
  coverImage: string;
  galleryImages: string[];
  hotelName: string;
  hotelRating: number;
  rating: number;
  totalReviews: number;
  tags: string[];
  highlights: string[];
  inclusions: string[];
  dayByDayItinerary: DayItinerary[];
  bestFor: string;
}

export interface UserProfileData {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  memberSince: string;
  savedPackageIds: string[];
}

export interface Booking {
  id: string;
  bookingCode: string;
  packageId: string;
  packageTitle: string;
  city: 'Hyderabad' | 'Delhi' | 'Mumbai';
  startDate: string;
  endDate: string;
  guestsCount: number;
  status: 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  totalPaidINR: number;
  paymentMethod: string;
  paymentDate: string;
  transactionId: string;
  hotelBooked: string;
  driverName: string;
  driverContact: string;
  vehicleModel: string;
  itineraryDays: DayItinerary[];
  specialRequests?: string;
}

export interface SearchFilters {
  destination: CityDestination;
  checkInDate: string;
  guests: number;
  travelStyle: string;
  maxBudgetINR: number;
  searchQuery: string;
}

