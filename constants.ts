import { Car, Seller, Review } from './types';

export const BRANDS = [
  { name: 'Toyota', logo: 'https://cdn.simpleicons.org/toyota' },
  { name: 'Honda', logo: 'https://cdn.simpleicons.org/honda' },
  { name: 'Mercedes', logo: 'https://cdn.simpleicons.org/mercedes' },
  { name: 'Lexus', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Lexus_logo_2024.svg/1024px-Lexus_logo_2024.svg.png' }, 
  { name: 'Ford', logo: 'https://cdn.simpleicons.org/ford' },
  { name: 'Hyundai', logo: 'https://cdn.simpleicons.org/hyundai' },
  { name: 'BMW', logo: 'https://cdn.simpleicons.org/bmw' },
  { name: 'Tesla', logo: 'https://cdn.simpleicons.org/tesla' },
];

export const MOCK_SELLERS: Record<string, Seller> = {
  's1': {
    id: 's1',
    name: 'Mikano Motors Verified',
    isVerified: true,
    verificationStatus: 'verified',
    rating: 4.8,
    reviewCount: 124,
    joinedDate: '2021-05-12',
    type: 'Dealer',
    logoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200'
  },
  's2': {
    id: 's2',
    name: 'Chinedu Autos',
    isVerified: false,
    verificationStatus: 'unverified',
    rating: 4.2,
    reviewCount: 15,
    joinedDate: '2023-01-20',
    type: 'Private',
    logoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200'
  }
};

export const MOCK_CARS: Car[] = [
  {
    id: 'c1',
    make: 'Toyota',
    model: 'Camry XSE',
    year: 2021,
    price: 28500000,
    mileage: 15000,
    location: 'Lagos, Victoria Island',
    condition: 'Foreign Used',
    transmission: 'Automatic',
    sellerId: 's1',
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c399a7eeb?auto=format&fit=crop&q=80&w=1200', // White Camry-ish
    ],
    description: 'Clean title, accident free, full option 2021 Toyota Camry XSE. Panoramic roof, leather seats, navigation system.',
    features: ['Bluetooth', 'Backup Camera', 'Leather Seats', 'Navigation', 'Sunroof']
  },
  {
    id: 'c2',
    make: 'Lexus',
    model: 'RX 350',
    year: 2020,
    price: 35000000,
    mileage: 24000,
    location: 'Abuja, Maitama',
    condition: 'Foreign Used',
    transmission: 'Automatic',
    sellerId: 's1',
    images: [
      'https://images.unsplash.com/photo-1590076215667-875d4ef2d743?auto=format&fit=crop&q=80&w=1200',
    ],
    description: 'Pristine condition Lexus RX 350. Well maintained by certified mechanics. Keyless entry and start.',
    features: ['Keyless Entry', 'Heated Seats', 'Premium Audio', 'All-Wheel Drive']
  },
  {
    id: 'c3',
    make: 'Honda',
    model: 'Accord',
    year: 2018,
    price: 12500000,
    mileage: 45000,
    location: 'Lagos, Ikeja',
    condition: 'Nigerian Used',
    transmission: 'Automatic',
    sellerId: 's2',
    images: [
      'https://images.unsplash.com/photo-1592750430926-526b75a27766?auto=format&fit=crop&q=80&w=1200',
    ],
    description: 'Buy and drive Honda Accord. Engine and gear in perfect condition. AC chilling.',
    features: ['Alloy Wheels', 'Cruise Control', 'Power Windows']
  },
  {
    id: 'c4',
    make: 'Mercedes-Benz',
    model: 'C300',
    year: 2019,
    price: 22000000,
    mileage: 30000,
    location: 'Port Harcourt',
    condition: 'Foreign Used',
    transmission: 'Automatic',
    sellerId: 's1',
    images: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1200', // C-Class
    ],
    description: 'Luxury C300 with AMG package. Direct Belgium import.',
    features: ['AMG Kit', 'Burmester Sound', 'Leather Interior']
  },
  {
    id: 'c5',
    make: 'Ford',
    model: 'Mustang GT',
    year: 2022,
    price: 45000000,
    mileage: 5000,
    location: 'Lagos, Lekki',
    condition: 'Foreign Used',
    transmission: 'Automatic',
    sellerId: 's1',
    images: [
      'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&q=80&w=1200',
    ],
    description: 'Almost new Ford Mustang GT. V8 Engine, roar is unmistakable. Perfect weekend car.',
    features: ['V8 Engine', 'Sport Mode', 'Leather Seats', 'Apple CarPlay']
  },
  {
    id: 'c6',
    make: 'Toyota',
    model: 'Land Cruiser',
    year: 2023,
    price: 120000000,
    mileage: 1200,
    location: 'Abuja, Central',
    condition: 'New',
    transmission: 'Automatic',
    sellerId: 's1',
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1200', // SUV
    ],
    description: 'Brand new 2023 Land Cruiser. Twin Turbo V6. The ultimate luxury SUV.',
    features: ['Twin Turbo', '360 Camera', 'Cool Box', 'Rear Entertainment']
  },
  {
    id: 'c7',
    make: 'Hyundai',
    model: 'Elantra',
    year: 2017,
    price: 7500000,
    mileage: 68000,
    location: 'Lagos, Surulere',
    condition: 'Nigerian Used',
    transmission: 'Automatic',
    sellerId: 's2',
    images: [
      'https://images.unsplash.com/photo-1626859343360-1405e364670c?auto=format&fit=crop&q=80&w=1200', // Hyundai interior/exterior
    ],
    description: 'Fuel efficient Hyundai Elantra. Good for daily commute. New tires.',
    features: ['Bluetooth', 'Fabric Seats', 'Economy Mode']
  },
  {
    id: 'c8',
    make: 'Mercedes-Benz',
    model: 'G-Wagon G63',
    year: 2021,
    price: 180000000,
    mileage: 10000,
    location: 'Lagos, Ikoyi',
    condition: 'Foreign Used',
    transmission: 'Automatic',
    sellerId: 's1',
    images: [
      'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=1200',
    ],
    description: 'Matte Black G63 AMG. Red interior. Fully loaded.',
    features: ['Night Package', 'Massage Seats', 'Carbon Fiber Trim']
  },
  {
    id: 'c9',
    make: 'Range Rover',
    model: 'Velar',
    year: 2020,
    price: 42000000,
    mileage: 28000,
    location: 'Abuja, Wuse 2',
    condition: 'Foreign Used',
    transmission: 'Automatic',
    sellerId: 's1',
    images: [
      'https://images.unsplash.com/photo-1606220838315-056192d5e927?auto=format&fit=crop&q=80&w=1200',
    ],
    description: 'Sleek Range Rover Velar. White exterior, black roof. Head-turner.',
    features: ['Touch Pro Duo', 'Matrix LED', 'Meridian Sound']
  },
  {
    id: 'c10',
    make: 'Toyota',
    model: 'Corolla',
    year: 2015,
    price: 6500000,
    mileage: 85000,
    location: 'Ibadan',
    condition: 'Nigerian Used',
    transmission: 'Automatic',
    sellerId: 's2',
    images: [
      'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?auto=format&fit=crop&q=80&w=1200',
    ],
    description: 'Rugged and reliable Corolla. Engine is sound. First body.',
    features: ['Fabric Seats', 'CD Player', 'Air Conditioning']
  },
];

export const MOCK_REVIEWS: Review[] = [
  { id: 'r1', author: 'Tunde B.', rating: 5, text: 'Great seller! The car was exactly as described.', date: '2023-10-15' },
  { id: 'r2', author: 'Ngozi A.', rating: 4, text: 'Transaction was smooth, though delivery took a day longer.', date: '2023-09-22' },
];