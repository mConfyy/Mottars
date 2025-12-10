export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  location: string;
  condition: 'New' | 'Foreign Used' | 'Nigerian Used';
  transmission: 'Automatic' | 'Manual';
  images: string[];
  description: string;
  sellerId: string;
  features: string[];
}

export interface Seller {
  id: string;
  name: string;
  isVerified: boolean;
  verificationStatus: 'unverified' | 'pending' | 'verified' | 'rejected';
  rating: number;
  reviewCount: number;
  joinedDate: string;
  logoUrl?: string;
  type: 'Private' | 'Dealer';
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAuthenticated: boolean;
  role: 'buyer' | 'seller';
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export enum AppRoute {
  HOME = '/',
  ALL_CARS = '/cars',
  CAR_DETAILS = '/car/:id',
  LOGIN = '/login',
  SELLER_DASHBOARD = '/seller/dashboard',
  CREATE_LISTING = '/seller/create',
  VERIFICATION = '/seller/verification',
}