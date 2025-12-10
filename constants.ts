import { Car, Seller, Review } from './types';

export const BRANDS = [
  { name: 'Toyota', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/1200px-Toyota_carlogo.svg.png' },
  { name: 'Honda', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Honda.svg/2560px-Honda.svg.png' },
  { name: 'Mercedes', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Benz_logo.svg/1024px-Mercedes-Benz_logo.svg.png' },
  { name: 'Lexus', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Lexus_logo_2024.svg/1200px-Lexus_logo_2024.svg.png' },
  { name: 'Ford', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_logo_flat.svg/2560px-Ford_logo_flat.svg.png' },
  { name: 'Hyundai', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Hyundai_Motor_Company_logo.svg/2560px-Hyundai_Motor_Company_logo.svg.png' },
];

export const MOCK_SELLERS: Record<string, Seller> = {
  's1': {
    id: 's1',
    name: 'Mikano Motors Verified',
    isVerified: true,
    rating: 4.8,
    reviewCount: 124,
    joinedDate: '2021-05-12',
    type: 'Dealer',
    logoUrl: 'https://picsum.photos/100/100?random=1'
  },
  's2': {
    id: 's2',
    name: 'Chinedu Autos',
    isVerified: false,
    rating: 4.2,
    reviewCount: 15,
    joinedDate: '2023-01-20',
    type: 'Private',
    logoUrl: 'https://picsum.photos/100/100?random=2'
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
      'https://images.unsplash.com/photo-1621007947382-bb3c3968e3bb?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=2069&auto=format&fit=crop',
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
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop',
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
      'https://images.unsplash.com/photo-1592750430926-526b75a27766?q=80&w=2069&auto=format&fit=crop',
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
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop',
    ],
    description: 'Luxury C300 with AMG package. Direct Belgium import.',
    features: ['AMG Kit', 'Burmester Sound', 'Leather Interior']
  },
];

export const MOCK_REVIEWS: Review[] = [
  { id: 'r1', author: 'Tunde B.', rating: 5, text: 'Great seller! The car was exactly as described.', date: '2023-10-15' },
  { id: 'r2', author: 'Ngozi A.', rating: 4, text: 'Transaction was smooth, though delivery took a day longer.', date: '2023-09-22' },
];