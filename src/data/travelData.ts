import { Package, TouristSpot } from '../types';

export const TOURIST_SPOTS: TouristSpot[] = [
  // HYDERABAD
  {
    id: 'hyd-1',
    name: 'Charminar & Laad Bazaar',
    city: 'Hyderabad',
    category: 'Heritage & Landmarks',
    lat: 17.3616,
    lng: 78.4747,
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200&auto=format&fit=crop',
    rating: 4.8,
    description: 'The iconic 1591 centerpiece of Hyderabad. Walk through bustling Laad Bazaar for traditional lac bangles, pearls, and authentic street snacks.',
    durationHours: 2,
    bestTimeToVisit: '4:00 PM - 7:30 PM',
    ticketFeeINR: 25,
    travelerTip: 'Enjoy hot Irani Chai & Osmania biscuits at Nimrah Cafe right opposite Charminar for just ₹30.',
    address: 'Charminar Rd, Old City, Hyderabad'
  },
  {
    id: 'hyd-2',
    name: 'Golconda Fort',
    city: 'Hyderabad',
    category: 'Heritage & Landmarks',
    lat: 17.3833,
    lng: 78.4011,
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Golconda_Fort_005.jpg',
    rating: 4.7,
    description: 'A 16th-century fortress known for its incredible acoustic engineering. A clap at the main entrance gate can be heard at the hilltop acoustic pavilion.',
    durationHours: 3,
    bestTimeToVisit: '3:30 PM - 6:30 PM (Catch the Light & Sound Show)',
    ticketFeeINR: 50,
    travelerTip: 'Carry a water bottle and wear comfortable sneakers to climb up to the Bala Hissar pavilion.',
    address: 'Ibrahim Bagh, Hyderabad'
  },
  {
    id: 'hyd-3',
    name: 'Chowmahalla Palace',
    city: 'Hyderabad',
    category: 'Heritage & Landmarks',
    lat: 17.3582,
    lng: 78.4717,
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1200&auto=format&fit=crop',
    rating: 4.8,
    description: 'Former seat of the Asaf Jahi dynasty featuring grand marble courtyards, vintage vintage car galleries, and Belgian crystal chandeliers.',
    durationHours: 2,
    bestTimeToVisit: '10:00 AM - 1:00 PM',
    ticketFeeINR: 100,
    travelerTip: 'Show your student ID card if applicable for a 50% discount on ticket entry.',
    address: 'Khilwat, Motigalli, Hyderabad'
  },
  {
    id: 'hyd-4',
    name: 'Hotel Sitara Comfort & Stay',
    city: 'Hyderabad',
    category: 'Comfort Stays & Hotels',
    lat: 17.3850,
    lng: 78.4867,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
    rating: 4.6,
    description: 'Clean, modern 3-star AC accommodation located in central Hyderabad with complimentary breakfast and high-speed Wi-Fi.',
    durationHours: 24,
    bestTimeToVisit: 'Check-in 12:00 PM',
    ticketFeeINR: 0,
    travelerTip: 'Includes free shuttle service to nearest Metro station.',
    address: 'Lakdikapul, Hyderabad'
  },
  {
    id: 'hyd-5',
    name: 'Paradise & Shadab Biryani Hub',
    city: 'Hyderabad',
    category: 'Local Food & Delicacies',
    lat: 17.3620,
    lng: 78.4740,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
    rating: 4.9,
    description: 'World-famous authentic Hyderabadi Mutton & Chicken Dum Biryani served with Mirchi ka Salan and Raita at budget-friendly family prices.',
    durationHours: 1.5,
    bestTimeToVisit: '1:00 PM - 3:00 PM or 8:00 PM',
    ticketFeeINR: 350,
    travelerTip: 'A single full biryani portion easily serves 2 hungry adults!',
    address: 'High Court Road, Madina Circle, Hyderabad'
  },

  // DELHI
  {
    id: 'del-1',
    name: 'Qutub Minar Complex',
    city: 'Delhi',
    category: 'Heritage & Landmarks',
    lat: 28.5244,
    lng: 77.1855,
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop',
    rating: 4.8,
    description: '73-meter UNESCO World Heritage brick minaret built in 1193 surrounded by ancient sandstone monuments and the famous rust-free Iron Pillar.',
    durationHours: 2,
    bestTimeToVisit: '4:00 PM - 6:00 PM',
    ticketFeeINR: 40,
    travelerTip: 'Book entry tickets online via QR code at the gate to skip the long physical queue.',
    address: 'Mehrauli, New Delhi'
  },
  {
    id: 'del-2',
    name: 'Chandni Chowk Street Food Walk',
    city: 'Delhi',
    category: 'Local Food & Delicacies',
    lat: 28.6506,
    lng: 77.2303,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop',
    rating: 4.9,
    description: 'Legendary 300-year-old food lane in Old Delhi. Savor famous Paranthe Wali Gali, Natraj Dahi Bhalle, and Jalebi Wala treats.',
    durationHours: 2.5,
    bestTimeToVisit: '11:00 AM - 4:00 PM',
    ticketFeeINR: 200,
    travelerTip: 'Hop on a ₹20 shared electric rickshaw from Chandni Chowk Metro Station.',
    address: 'Chandni Chowk, Old Delhi'
  },
  {
    id: 'del-3',
    name: 'Humayun Tomb & Sundar Nursery',
    city: 'Delhi',
    category: 'Heritage & Landmarks',
    lat: 28.5933,
    lng: 77.2507,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop',
    rating: 4.8,
    description: 'Persian-style red sandstone garden tomb that inspired the Taj Mahal, adjacent to lush 90-acre heritage botanical nursery park.',
    durationHours: 2.5,
    bestTimeToVisit: '8:00 AM - 11:00 AM',
    ticketFeeINR: 40,
    travelerTip: 'Pack a light breakfast to enjoy on the grass lawns inside Sundar Nursery.',
    address: 'Nizamuddin East, New Delhi'
  },
  {
    id: 'del-4',
    name: 'Bloomrooms Janpath Hotel',
    city: 'Delhi',
    category: 'Comfort Stays & Hotels',
    lat: 28.6289,
    lng: 77.2197,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
    rating: 4.7,
    description: 'Award-winning bright & crisp budget-boutique hotel in central Connaught Place with cloud mattresses and free breakfast.',
    durationHours: 24,
    bestTimeToVisit: 'Check-in 1:00 PM',
    ticketFeeINR: 0,
    travelerTip: 'Just 5 minutes walking distance from Rajiv Chowk Metro Hub.',
    address: 'Janpath, Connaught Place, New Delhi'
  },

  // MUMBAI
  {
    id: 'mum-1',
    name: 'Gateway of India & Marine Drive',
    city: 'Mumbai',
    category: 'Heritage & Landmarks',
    lat: 18.922,
    lng: 72.8347,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop',
    rating: 4.9,
    description: 'Mumbai\'s grand basalt seaside arch built in 1924, followed by a breezy sunset stroll along the famous Queen\'s Necklace promenade.',
    durationHours: 3,
    bestTimeToVisit: '5:00 PM - 8:00 PM',
    ticketFeeINR: 0,
    travelerTip: 'Grab ₹30 Cutting Chai and Bhel Puri at Marine Drive while enjoying the ocean sea breeze.',
    address: 'Apollo Bunder, Colaba, Mumbai'
  },
  {
    id: 'mum-2',
    name: 'Elephanta Caves Island Ferry',
    city: 'Mumbai',
    category: 'Heritage & Landmarks',
    lat: 18.9633,
    lng: 72.9315,
    image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1200&auto=format&fit=crop',
    rating: 4.7,
    description: '1-hour scenic ferry boat ride across Mumbai harbor to 5th-century rock-cut cave temples dedicated to Lord Shiva.',
    durationHours: 4,
    bestTimeToVisit: '9:00 AM - 1:00 PM',
    ticketFeeINR: 260,
    travelerTip: 'Upper deck ferry seat ticket costs only ₹20 extra and gives amazing sea views!',
    address: 'Ferry Wharf Jetty, Gateway of India, Mumbai'
  },
  {
    id: 'mum-3',
    name: 'Girgaon Chowpatty & Vada Pav Walk',
    city: 'Mumbai',
    category: 'Local Food & Delicacies',
    lat: 18.9543,
    lng: 72.8152,
    image: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?q=80&w=1200&auto=format&fit=crop',
    rating: 4.8,
    description: 'Iconic beachfront food market famous for spicy Mumbai Vada Pav, Pav Bhaji, Kulfi, and Pani Puri at authentic local prices.',
    durationHours: 1.5,
    bestTimeToVisit: '6:00 PM - 9:00 PM',
    ticketFeeINR: 150,
    travelerTip: 'Try Ashok Vada Pav near Kirti College or Cannon Pav Bhaji near CSMT.',
    address: 'Marine Drive, Chowpatty, Mumbai'
  },
  {
    id: 'mum-4',
    name: 'Hotel Residency Fort',
    city: 'Mumbai',
    category: 'Comfort Stays & Hotels',
    lat: 18.935,
    lng: 72.836,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
    rating: 4.6,
    description: 'Cozy, highly-rated budget heritage hotel right in Fort/Colaba area, walking distance to CST station and Gateway of India.',
    durationHours: 24,
    bestTimeToVisit: 'Check-in 12:00 PM',
    ticketFeeINR: 0,
    travelerTip: 'Complimentary buffet breakfast with South Indian & North Indian options included.',
    address: 'Corner of Rustom Sidhwa Marg, Fort, Mumbai'
  }
];

export const FEATURED_PACKAGES: Package[] = [
  // HYDERABAD BUDGET PACKAGES
  {
    id: 'pkg-hyd-1',
    title: 'Hyderabad Heritage & City Saver Tour',
    subtitle: '3 Days City Sightseeing, Old City Walks & Biryani Feast',
    city: 'Hyderabad',
    durationDays: 3,
    priceINR: 3499,
    originalPriceINR: 5999,
    coverImage: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200&auto=format&fit=crop',
      'https://upload.wikimedia.org/wikipedia/commons/5/56/Golconda_Fort_005.jpg',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop'
    ],
    hotelName: 'Hotel Sitara Comfort AC Hotel (Central City)',
    hotelRating: 4,
    rating: 4.88,
    totalReviews: 342,
    tags: ['Best Value', 'AC Transport', 'Biryani Meal Included', 'Guide Included'],
    highlights: [
      'Guided walking tour of Charminar & Laad Pearl Bazaar',
      'Golconda Fort entry passes & evening Light & Sound Show',
      'Complimentary authentic Hyderabadi Mutton Dum Biryani meal',
      'Hussain Sagar Lake boat ride to Buddha Statue'
    ],
    inclusions: [
      '2 Nights AC Hotel Room Accommodation',
      'Daily Breakfast & 1 Special Biryani Feast',
      'AC Coach Transfers for all Sightseeing',
      'All Monument Entry Tickets & Dedicated Tour Guide'
    ],
    bestFor: 'Families, Friends, Couples & Budget Travelers',
    dayByDayItinerary: [
      {
        dayNumber: 1,
        theme: 'Arrival & Pearl City Sunset Walk',
        schedule: [
          { id: 'h1', time: '11:00 AM', activity: 'Hotel Check-in & Refresh', location: 'Hotel Sitara Comfort', description: 'Welcome drink and AC room check-in.', category: 'Stay' },
          { id: 'h2', time: '03:00 PM', activity: 'Charminar & Laad Bazaar Stroll', location: 'Old City', description: 'Explore lac bangle workshops and iconic Charminar minarets.', category: 'Sightseeing' },
          { id: 'h3', time: '05:30 PM', activity: 'Irani Chai & Osmania Snacks', location: 'Nimrah Cafe', description: 'Tea treat with views of floodlit Charminar.', category: 'Local Dining' },
          { id: 'h4', time: '08:00 PM', activity: 'Hyderabadi Dum Biryani Feast', location: 'Shadab Hotel', description: 'Included authentic Hyderabadi mutton biryani dinner.', category: 'Local Dining' }
        ]
      },
      {
        dayNumber: 2,
        theme: 'Fort Marvels & Palace History',
        schedule: [
          { id: 'h5', time: '09:30 AM', activity: 'Chowmahalla Palace Tour', location: 'Khilwat', description: 'Walk through royal durbar halls and vintage car exhibits.', category: 'Heritage' },
          { id: 'h6', time: '02:00 PM', activity: 'Golconda Fort Guided Walk', location: 'Ibrahim Bagh', description: 'Discover the acoustic clapping hall and hilltop fort views.', category: 'Heritage' },
          { id: 'h7', time: '06:30 PM', activity: 'Golconda Light & Sound Show', location: 'Golconda Fort', description: 'Historical narrative light show under starry sky.', category: 'Guided Tour' }
        ]
      },
      {
        dayNumber: 3,
        theme: 'Hussain Sagar Lake & Departure',
        schedule: [
          { id: 'h8', time: '10:00 AM', activity: 'Lumbini Park & Boat Cruise', location: 'Hussain Sagar Lake', description: 'Scenic ferry ride to world tallest monolith Buddha statue.', category: 'Sightseeing' },
          { id: 'h9', time: '01:00 PM', activity: 'Souvenir Shopping & Farewell', location: 'Mozamjahi Market', description: 'Pick up famous Karachi bakery fruit biscuits before departure.', category: 'Shopping' }
        ]
      }
    ]
  },

  // HYDERABAD RAMOJI FILM CITY BUDGET SPECIAL
  {
    id: 'pkg-hyd-2',
    title: 'Hyderabad & Ramoji Film City Budget Combo',
    subtitle: '4 Days Full Sightseeing + World\'s Largest Film City Ticket',
    city: 'Hyderabad',
    durationDays: 4,
    priceINR: 5999,
    originalPriceINR: 9999,
    coverImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop'
    ],
    hotelName: 'Minerva Quality Inn AC Hotel',
    hotelRating: 4,
    rating: 4.91,
    totalReviews: 280,
    tags: ['Family Favorite', 'Film City Pass Included', '4 Days Express', 'All Sightseeing'],
    highlights: [
      'Full-day Ramoji Film City entry ticket with studio bus tour',
      'Bahubali movie sets & live stunt show entry',
      'Salar Jung Museum & Charminar guided tour',
      'Comfortable AC room stay with daily breakfast'
    ],
    inclusions: [
      '3 Nights AC Hotel Accommodation',
      'Daily Buffet Breakfast',
      'Ramoji Film City Full Day Pass with Transfers',
      'AC Vehicle for City Sightseeing'
    ],
    bestFor: 'Families with Kids, Movie Buffs & Sightseers',
    dayByDayItinerary: [
      {
        dayNumber: 1,
        theme: 'City Arrival & Charminar Walk',
        schedule: [
          { id: 'hr1', time: '12:00 PM', activity: 'Hotel Check-in', location: 'Secunderabad', description: 'Check-in and relax.', category: 'Stay' },
          { id: 'hr2', time: '04:00 PM', activity: 'Old City Tour', location: 'Charminar', description: 'Explore local markets & shopping.', category: 'Sightseeing' }
        ]
      },
      {
        dayNumber: 2,
        theme: 'Full Day Ramoji Film City Extravaganza',
        schedule: [
          { id: 'hr3', time: '08:30 AM', activity: 'Departure to Ramoji', location: 'Ramoji Film City', description: 'Full day exploring movie sets, stunt shows & gardens.', category: 'Guided Tour' },
          { id: 'hr4', time: '06:00 PM', activity: 'Carnival Parade & Return', location: 'Ramoji', description: 'Enjoy evening parade show before return.', category: 'Sightseeing' }
        ]
      },
      {
        dayNumber: 3,
        theme: 'Palaces & Salar Jung Museum',
        schedule: [
          { id: 'hr5', time: '09:30 AM', activity: 'Salar Jung Museum', location: 'Afaq Gunj', description: 'See the Veiled Rebecca and famous musical clock.', category: 'Heritage' },
          { id: 'hr6', time: '02:00 PM', activity: 'Golconda Fort', location: 'Golconda', description: 'Explore ancient hilltop fortress.', category: 'Heritage' }
        ]
      },
      {
        dayNumber: 4,
        theme: 'Biryani Lunch & Departure',
        schedule: [
          { id: 'hr7', time: '11:00 AM', activity: 'Shopping & Departure', location: 'Abids Market', description: 'Hotel check-out and station/airport transfer.', category: 'Shopping' }
        ]
      }
    ]
  },

  // DELHI BUDGET PACKAGES
  {
    id: 'pkg-del-1',
    title: 'Delhi Capital Express & Heritage Saver',
    subtitle: '3 Days Historic Delhi, Old Street Food Walk & Qutub Minar',
    city: 'Delhi',
    durationDays: 3,
    priceINR: 3999,
    originalPriceINR: 6999,
    coverImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop'
    ],
    hotelName: 'Bloomrooms @ Janpath / Hotel City Star',
    hotelRating: 4,
    rating: 4.90,
    totalReviews: 412,
    tags: ['Super Saver', 'Old Delhi Street Food', 'Metro Included', 'Central Stay'],
    highlights: [
      'Old Delhi Rickshaw safari in Chandni Chowk',
      'Guided walk of Qutub Minar & Humayun\'s Tomb',
      'India Gate evening stroll & Rashtrapati Bhavan drive',
      'Includes complimentary Delhi Metro Tourist Card pass'
    ],
    inclusions: [
      '2 Nights AC Hotel Accommodation in Central Delhi',
      'Daily Buffet Breakfast',
      'Old Delhi Food Tasting Pass',
      'All Entry Passes & AC Vehicle Transfers'
    ],
    bestFor: 'Backpackers, History Lovers, Foodies & Families',
    dayByDayItinerary: [
      {
        dayNumber: 1,
        theme: 'Lutyens Delhi & India Gate Evening',
        schedule: [
          { id: 'd1', time: '12:00 PM', activity: 'Hotel Check-in', location: 'Connaught Place', description: 'Check-in to clean, central AC rooms.', category: 'Stay' },
          { id: 'd2', time: '04:30 PM', activity: 'India Gate & Kartavya Path Walk', location: 'India Gate', description: 'Evening stroll around illuminated memorial & lawns.', category: 'Sightseeing' },
          { id: 'd3', time: '07:30 PM', activity: 'Connaught Place Street Dinner', location: 'CP Outer Circle', description: 'Enjoy famous Rajma Chawal or Kake Da Nake Tandoori treats.', category: 'Local Dining' }
        ]
      },
      {
        dayNumber: 2,
        theme: 'Mughal Monuments & Chandni Chowk Feast',
        schedule: [
          { id: 'd4', time: '09:00 AM', activity: 'Old Delhi Electric Rickshaw Safari', location: 'Chandni Chowk', description: 'Visit Jama Masjid, spice markets & Paranthe Wali Gali.', category: 'Local Dining' },
          { id: 'd5', time: '02:00 PM', activity: 'Humayun\'s Tomb Garden Stroll', location: 'Nizamuddin', description: 'Explore Mughal garden tombs & Sundar Nursery.', category: 'Heritage' },
          { id: 'd6', time: '05:00 PM', activity: 'Qutub Minar Illumination', location: 'Mehrauli', description: 'Sunset view of the 12th-century tower.', category: 'Heritage' }
        ]
      },
      {
        dayNumber: 3,
        theme: 'Lotus Temple & Departure',
        schedule: [
          { id: 'd7', time: '10:00 AM', activity: 'Lotus Temple & Akshardham Stroll', location: 'Kalkaji', description: 'Visit marble Bahai temple and lotus gardens.', category: 'Sightseeing' },
          { id: 'd8', time: '01:00 PM', activity: 'Sarojini Nagar / Janpath Shopping', location: 'Janpath', description: 'Bargain budget clothes & handicrafts shopping.', category: 'Shopping' }
        ]
      }
    ]
  },

  // MUMBAI BUDGET PACKAGES
  {
    id: 'pkg-mum-1',
    title: 'Mumbai Coastal Express & City Explorer',
    subtitle: '3 Days Gateway of India, Marine Drive, Elephanta Ferry & Street Food',
    city: 'Mumbai',
    durationDays: 3,
    priceINR: 4499,
    originalPriceINR: 7999,
    coverImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?q=80&w=1200&auto=format&fit=crop'
    ],
    hotelName: 'Hotel Residency Fort / Suba Palace Colaba',
    hotelRating: 4,
    rating: 4.89,
    totalReviews: 310,
    tags: ['Coastal Special', 'Elephanta Ferry Pass', 'Marine Drive Sunset', 'Central Stay'],
    highlights: [
      'Elephanta Caves island ferry cruise ticket included',
      'Sunset sea walk along Marine Drive Queen\'s Necklace',
      'Girgaon Chowpatty street food voucher (Vada Pav & Pav Bhaji)',
      'Bandra-Worli Sea Link scenic AC coach drive'
    ],
    inclusions: [
      '2 Nights AC Hotel Stay in South Mumbai / Fort',
      'Daily Breakfast & Evening Snack Voucher',
      'Elephanta Island Return Ferry Pass',
      'AC Coach City Sightseeing Tour'
    ],
    bestFor: 'Couples, Young Travelers, Weekend Escapes & Families',
    dayByDayItinerary: [
      {
        dayNumber: 1,
        theme: 'Gateway Welcome & Marine Drive Sunset',
        schedule: [
          { id: 'm1', time: '01:00 PM', activity: 'Hotel Check-in', location: 'Colaba / Fort', description: 'Check-in and refresh.', category: 'Stay' },
          { id: 'm2', time: '03:30 PM', activity: 'Gateway of India Walk', location: 'Apollo Bunder', description: 'Photos at Gateway & Taj Hotel waterfront.', category: 'Sightseeing' },
          { id: 'm3', time: '06:00 PM', activity: 'Marine Drive Sunset & Bhel Puri', location: 'Queen\'s Necklace', description: 'Enjoy ocean sea breeze and street food snack.', category: 'Local Dining' }
        ]
      },
      {
        dayNumber: 2,
        theme: 'Elephanta Island Cruise & Kala Ghoda Art',
        schedule: [
          { id: 'm4', time: '09:00 AM', activity: 'Ferry to Elephanta Island', location: 'Gateway Wharf', description: '1-hour cruise into Arabian Sea.', category: 'Guided Tour' },
          { id: 'm5', time: '10:30 AM', activity: 'Ancient Shiva Rock Caves', location: 'Elephanta Caves', description: 'Guided walk through 5th-century cave sculptures.', category: 'Heritage' },
          { id: 'm6', time: '03:00 PM', activity: 'Kala Ghoda Art Precinct Walk', location: 'Fort District', description: 'Explore boutique galleries & heritage architecture.', category: 'Shopping' }
        ]
      },
      {
        dayNumber: 3,
        theme: 'Sea Link Drive & Bandra Fort',
        schedule: [
          { id: 'm7', time: '10:00 AM', activity: 'Bandra-Worli Sea Link Drive', location: 'Sea Link', description: 'Drive over the ocean bridge to Bandra Fort.', category: 'Sightseeing' },
          { id: 'm8', time: '01:00 PM', activity: 'CSMT Station Heritage View & Departure', location: 'Fort', description: 'Victorian Gothic station photo stop before departure.', category: 'Sightseeing' }
        ]
      }
    ]
  }
];
