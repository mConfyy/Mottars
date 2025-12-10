import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Gauge, SlidersHorizontal, Search, Star, ShieldCheck, X } from 'lucide-react';
import { Car, Seller } from '../types';
import { AppRoute } from '../types';
import { Badge } from './ui';
import { MOCK_CARS } from '../constants';

export const CarCard: React.FC<{ car: Car, seller: Seller }> = ({ car, seller }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <Link to={AppRoute.CAR_DETAILS.replace(':id', car.id)} className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={car.images[0]} 
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 flex gap-2">
           <Badge variant={car.condition === 'New' ? 'success' : 'neutral'}>{car.condition}</Badge>
        </div>
        {seller.isVerified && (
           <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 text-xs font-semibold text-primary shadow-sm">
             <ShieldCheck className="w-3 h-3 text-accent" />
             Verified Seller
           </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg text-primary line-clamp-1">{car.year} {car.make} {car.model}</h3>
            <div className="flex items-center text-neutral-500 text-sm mt-1">
              <MapPin className="w-3 h-3 mr-1" />
              {car.location}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 my-3 text-xs text-neutral-600 bg-neutral-50 p-2 rounded-lg">
           <div className="flex items-center gap-1">
             <Gauge className="w-3 h-3" />
             {car.mileage.toLocaleString()} km
           </div>
           <div className="w-px h-3 bg-neutral-300" />
           <div>{car.transmission}</div>
           <div className="w-px h-3 bg-neutral-300" />
           <div>{car.condition}</div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-neutral-50">
           <span className="text-xl font-bold text-accent">{formatPrice(car.price)}</span>
        </div>
      </div>
    </Link>
  );
};

interface SearchProps {
  onSearch: (query: string) => void;
}

export const HeroSearch = ({ onSearch }: SearchProps) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length > 1) {
      const uniqueModels = Array.from(new Set(MOCK_CARS
        .map(c => `${c.make} ${c.model}`)
        .filter(s => s.toLowerCase().includes(val.toLowerCase()))
      ));
      setSuggestions(uniqueModels.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (s: string) => {
    setQuery(s);
    setShowSuggestions(false);
    onSearch(s);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setQuery('');
    setShowSuggestions(false);
    onSearch('');
  };

  return (
    <div className="relative bg-neutral-900 py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
       {/* Abstract Background Decoration - Adjusted opacity and colors */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent rounded-full blur-[100px] mix-blend-screen" />
          <div className="absolute top-1/2 -left-24 w-72 h-72 bg-blue-600 rounded-full blur-[100px] mix-blend-screen" />
       </div>

       <div className="relative max-w-4xl mx-auto text-center z-10">
         <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
           Premium Cars. <br className="hidden sm:block" />
           <span className="text-accent">Simple Experience.</span>
         </h1>
         <p className="text-neutral-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
           Compare, negotiate, and secure your next car or rental in one seamless platform.
         </p>

         <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto" ref={wrapperRef}>
            <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-2xl shadow-2xl p-2 focus-within:ring-4 focus-within:ring-accent/20 transition-all gap-2">
               <div className="flex-grow flex items-center relative">
                  <Search className="absolute left-3 w-6 h-6 text-neutral-400" />
                  <input 
                    type="text"
                    className="w-full bg-transparent border-none focus:ring-0 pl-12 pr-10 py-3 text-lg text-primary placeholder:text-neutral-400"
                    placeholder="Search by make, model, or keyword..."
                    value={query}
                    onChange={handleInputChange}
                    onFocus={() => query.length > 1 && setShowSuggestions(true)}
                  />
                  {query && (
                    <button type="button" onClick={clearSearch} className="absolute right-2 p-1 text-neutral-400 hover:text-neutral-600">
                      <X className="w-5 h-5" />
                    </button>
                  )}
               </div>
               
               <div className="flex items-center gap-2 sm:border-l sm:border-neutral-200 sm:pl-2">
                 <button type="button" className="flex items-center justify-center gap-2 px-4 py-3 bg-neutral-100 sm:bg-transparent rounded-xl sm:rounded-none text-neutral-600 hover:text-primary transition-colors font-medium">
                    <SlidersHorizontal className="w-5 h-5" />
                    <span className="sm:hidden lg:inline">Filters</span>
                 </button>
                 <button type="submit" className="flex-grow sm:flex-grow-0 bg-accent text-white px-8 py-3 rounded-xl font-bold hover:bg-accent-hover transition-colors shadow-lg whitespace-nowrap">
                   Search
                 </button>
               </div>
            </div>

            {/* Auto-suggest Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-neutral-100 overflow-hidden z-20 animate-in fade-in slide-in-from-top-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => selectSuggestion(suggestion)}
                    className="w-full text-left px-6 py-3 hover:bg-neutral-50 flex items-center gap-3 transition-colors border-b border-neutral-50 last:border-0"
                  >
                    <Search className="w-4 h-4 text-neutral-400" />
                    <span className="text-primary font-medium">{suggestion}</span>
                  </button>
                ))}
              </div>
            )}
         </form>
         
         <div className="mt-10 flex flex-wrap justify-center gap-3 text-sm text-neutral-400">
            <span className="py-1">Popular:</span>
            {['Toyota Camry', 'Lexus RX', 'Mercedes C300', 'Honda Accord'].map(tag => (
              <button key={tag} onClick={() => { setQuery(tag); onSearch(tag); }} className="bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-full transition-colors text-white border border-white/5">
                {tag}
              </button>
            ))}
         </div>
       </div>
    </div>
  );
};