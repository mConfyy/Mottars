import React, { useState, useMemo } from 'react';
import { Layout } from '../components/Layout';
import { HeroSearch, CarCard } from '../components/CarComponents';
import { BRANDS, MOCK_CARS, MOCK_SELLERS } from '../constants';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '../components/ui';
import { Link } from 'react-router-dom';
import { AppRoute } from '../types';

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Show only first 4 cars on home page
  const displayedCars = useMemo(() => {
    // Filter out cars with no images
    let cars = MOCK_CARS.filter(c => c.images && c.images.length > 0 && c.images[0]);
    
    if (searchQuery) {
      cars = cars.filter(car => 
        car.make.toLowerCase().includes(searchQuery.toLowerCase()) || 
        car.model.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return cars.slice(0, 4);
  }, [searchQuery]);

  return (
    <Layout>
      <HeroSearch onSearch={setSearchQuery} />
      
      {/* Featured Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-2">Featured Listings</h2>
            <p className="text-neutral-500">Curated cars from top rated sellers.</p>
          </div>
          <Link to={AppRoute.ALL_CARS}>
             <Button variant="ghost" className="hidden sm:flex">View all cars <ArrowRight className="w-4 h-4 ml-2" /></Button>
          </Link>
        </div>

        {displayedCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {displayedCars.map(car => (
              <CarCard key={car.id} car={car} seller={MOCK_SELLERS[car.sellerId]} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-medium text-neutral-900">No cars found</h3>
            <p className="text-neutral-500 mt-2">Try adjusting your search terms.</p>
          </div>
        )}

        <div className="mt-12 text-center sm:hidden">
            <Link to={AppRoute.ALL_CARS}>
                <Button variant="outline" className="w-full">View all cars</Button>
            </Link>
        </div>
      </section>

      {/* Brands Scroll - Animated Gliding Marquee */}
      <div className="bg-white border-y border-neutral-100 py-12 mb-8 overflow-hidden group">
        <div className="max-w-7xl mx-auto px-4 mb-8">
           <p className="text-center text-sm font-semibold text-neutral-400 uppercase tracking-wider">Trusted by top brands</p>
        </div>
        
        <div className="relative flex overflow-hidden">
           {/* Inner container for animation - duplicated for seamless loop */}
           <div className="flex animate-scroll w-max hover:[animation-play-state:paused]">
               {/* First set of logos */}
               <div className="flex items-center gap-12 md:gap-24 px-6 md:px-12">
                  {BRANDS.map((brand, i) => (
                    <div key={`b1-${i}`} className="flex flex-col items-center gap-3 opacity-50 hover:opacity-100 transition-opacity cursor-pointer min-w-[80px]">
                      <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center p-4 hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-neutral-100">
                        <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider">{brand.name}</span>
                    </div>
                  ))}
               </div>
               
               {/* Duplicate set of logos for infinite loop */}
               <div className="flex items-center gap-12 md:gap-24 px-6 md:px-12">
                  {BRANDS.map((brand, i) => (
                    <div key={`b2-${i}`} className="flex flex-col items-center gap-3 opacity-50 hover:opacity-100 transition-opacity cursor-pointer min-w-[80px]">
                      <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center p-4 hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-neutral-100">
                        <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider">{brand.name}</span>
                    </div>
                  ))}
               </div>
           </div>
        </div>
      </div>

      {/* Trust Section */}
      <section className="bg-white py-20 border-t border-neutral-100">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12 text-center">
               <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-accent mb-6">
                    <ShieldCheckIcon />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Verified Sellers</h3>
                  <p className="text-neutral-500 leading-relaxed">We rigorously verify every dealer and private seller ID to ensure your safety.</p>
               </div>
               <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                    <SearchIcon />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Detailed Inspections</h3>
                  <p className="text-neutral-500 leading-relaxed">Request a physical inspection from our certified mechanics before you pay.</p>
               </div>
               <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                    <Star className="w-8 h-8" fill="currentColor" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Transparent Pricing</h3>
                  <p className="text-neutral-500 leading-relaxed">No hidden fees. Negotiate directly with sellers via our secure platform.</p>
               </div>
            </div>
         </div>
      </section>
    </Layout>
  );
};

const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
)

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
)