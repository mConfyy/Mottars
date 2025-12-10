
import React, { useState, useMemo } from 'react';
import { Layout } from '../components/Layout';
import { HeroSearch, CarCard } from '../components/CarComponents';
import { BRANDS, MOCK_CARS, MOCK_SELLERS } from '../constants';
import { ArrowRight, Star, X, ImageOff } from 'lucide-react';
import { Button } from '../components/ui';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../types';

export const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter cars based on search query
  const displayedCars = useMemo(() => {
    // Filter out cars with no images
    let cars = MOCK_CARS.filter(c => c.images && c.images.length > 0 && c.images[0]);
    
    if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        return cars.filter(car => 
            car.make.toLowerCase().includes(lowerQuery) || 
            car.model.toLowerCase().includes(lowerQuery) ||
            car.location.toLowerCase().includes(lowerQuery) ||
            car.year.toString().includes(lowerQuery) ||
            car.condition.toLowerCase().includes(lowerQuery)
        );
    }
    // Default: Show featured (first 4)
    return cars.slice(0, 4);
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
        // Scroll to results if searching
        setTimeout(() => {
            document.getElementById('listings-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
  };

  const handleBrandClick = (brandName: string) => {
    setSearchQuery(brandName);
    setTimeout(() => {
        document.getElementById('listings-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const clearLocalSearch = () => {
    setSearchQuery('');
  };

  return (
    <Layout>
      <HeroSearch onSearch={handleSearch} />
      
      {/* Featured Listings / Search Results */}
      <section id="listings-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-2">
                {searchQuery ? `Results for "${searchQuery}"` : "Featured Listings"}
            </h2>
            <p className="text-neutral-500">
                {searchQuery ? `Found ${displayedCars.length} vehicles matching your search.` : "Curated cars from top rated sellers."}
            </p>
          </div>
          
          <div className="hidden sm:flex items-center gap-2">
             {searchQuery && (
                 <Button variant="outline" onClick={clearLocalSearch} icon={X}>Clear Search</Button>
             )}
             <Link to={AppRoute.ALL_CARS}>
                <Button variant="ghost">View all cars <ArrowRight className="w-4 h-4 ml-2" /></Button>
             </Link>
          </div>
        </div>

        {displayedCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {displayedCars.map(car => (
              <CarCard key={car.id} car={car} seller={MOCK_SELLERS[car.sellerId]} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-neutral-50 rounded-xl border border-neutral-100">
            <h3 className="text-xl font-medium text-neutral-900">No cars found</h3>
            <p className="text-neutral-500 mt-2">Try adjusting your search terms.</p>
            {searchQuery && (
                 <Button variant="outline" className="mt-4" onClick={clearLocalSearch}>Clear Search</Button>
             )}
          </div>
        )}

        <div className="mt-12 text-center sm:hidden flex flex-col gap-3">
             {searchQuery && (
                 <Button variant="outline" onClick={clearLocalSearch} icon={X}>Clear Search</Button>
             )}
            <Link to={AppRoute.ALL_CARS}>
                <Button variant="outline" className="w-full">View all cars</Button>
            </Link>
        </div>
      </section>

      {/* Brands Scroll - Animated Gliding Marquee */}
      <div className="bg-neutral-50 border-y border-neutral-100 py-16 mb-8 overflow-hidden group">
        <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
           <h3 className="text-lg font-bold text-primary mb-1">Browse by Brand</h3>
           <p className="text-sm text-neutral-500">Find the perfect car from your favorite manufacturers</p>
        </div>
        
        <div className="relative flex overflow-hidden">
           {/* Inner container for animation - duplicated for seamless loop */}
           <div className="flex animate-scroll w-max hover:[animation-play-state:paused]">
               {/* First set of logos */}
               <div className="flex items-center gap-6 px-3">
                  {BRANDS.map((brand, i) => (
                    <BrandLogo key={`b1-${i}`} brand={brand} onClick={() => handleBrandClick(brand.name)} />
                  ))}
               </div>
               
               {/* Duplicate set of logos for infinite loop */}
               <div className="flex items-center gap-6 px-3">
                  {BRANDS.map((brand, i) => (
                    <BrandLogo key={`b2-${i}`} brand={brand} onClick={() => handleBrandClick(brand.name)} />
                  ))}
               </div>
           </div>
           
           {/* Fade overlay for smoother edge appearance */}
           <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-neutral-50 to-transparent pointer-events-none"></div>
           <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-neutral-50 to-transparent pointer-events-none"></div>
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

// Component for individual brand logo to handle errors
const BrandLogo = ({ brand, onClick }: { brand: { name: string, logo: string }, onClick: () => void }) => {
    const [error, setError] = useState(false);

    return (
        <div 
            onClick={onClick}
            className="group flex flex-col items-center justify-center w-[140px] h-[140px] bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-neutral-100"
        >
            <div className="w-16 h-16 flex items-center justify-center mb-3 transition-transform group-hover:scale-110 duration-300">
                {!error ? (
                    <img 
                        src={brand.logo} 
                        alt={brand.name} 
                        className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                        onError={() => setError(true)}
                    />
                ) : (
                    <div className="w-full h-full bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400">
                        <ImageOff className="w-8 h-8" />
                    </div>
                )}
            </div>
            <span className="text-sm font-bold text-primary group-hover:text-accent transition-colors">{brand.name}</span>
        </div>
    );
};

const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
)

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
)
