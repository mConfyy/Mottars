import React, { useState, useMemo, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { CarCard } from '../components/CarComponents';
import { MOCK_CARS, MOCK_SELLERS } from '../constants';
import { AppRoute } from '../types';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const AllCars = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  // Update state if URL param changes
  useEffect(() => {
    const query = searchParams.get('search');
    if (query !== null) {
        setSearchQuery(query);
    }
  }, [searchParams]);

  const filteredCars = useMemo(() => {
    // Filter out cars with no images
    let cars = MOCK_CARS.filter(c => c.images && c.images.length > 0 && c.images[0]);
    
    if (!searchQuery) return cars;
    
    const lowerQuery = searchQuery.toLowerCase();

    return cars.filter(car => 
      car.make.toLowerCase().includes(lowerQuery) || 
      car.model.toLowerCase().includes(lowerQuery) ||
      car.location.toLowerCase().includes(lowerQuery) ||
      car.year.toString().includes(lowerQuery) ||
      car.condition.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

  return (
    <Layout>
      <div className="bg-neutral-50 min-h-screen pb-12">
        {/* Simple Header */}
        <div className="bg-white border-b border-neutral-200 sticky top-16 z-30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
                <Link to={AppRoute.HOME} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-neutral-600" />
                </Link>
                <h1 className="text-xl font-bold text-primary">All Vehicles</h1>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
                <p className="text-neutral-500 mb-4">Showing {filteredCars.length} results {searchQuery && `for "${searchQuery}"`}</p>
                {/* Re-use search input logic style, simplified */}
                <input 
                    type="text" 
                    placeholder="Search make, model, year, or location..." 
                    className="w-full md:w-1/3 p-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-accent/20 outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCars.map(car => (
                <CarCard key={car.id} car={car} seller={MOCK_SELLERS[car.sellerId]} />
                ))}
            </div>
            ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-neutral-200">
                <h3 className="text-xl font-medium text-neutral-900">No cars found</h3>
                <p className="text-neutral-500 mt-2">Try adjusting your search terms.</p>
            </div>
            )}
        </div>
      </div>
    </Layout>
  );
};