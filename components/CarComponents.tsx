import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Gauge, SlidersHorizontal, Search, Star, ShieldCheck, X, ChevronDown, ImageOff } from 'lucide-react';
import { Car, Seller } from '../types';
import { AppRoute } from '../types';
import { Badge, Button } from './ui';
import { MOCK_CARS, BRANDS } from '../constants';

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=800";

export const CarCard: React.FC<{ car: Car, seller: Seller }> = ({ car, seller }) => {
  const [imgSrc, setImgSrc] = useState(car.images[0]);
  const [hasError, setHasError] = useState(false);

  // If the car prop changes, reset the image state
  useEffect(() => {
    setImgSrc(car.images[0]);
    setHasError(false);
  }, [car.images]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(price);
  };

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(FALLBACK_IMAGE);
    }
  };

  return (
    <Link to={AppRoute.CAR_DETAILS.replace(':id', car.id)} className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100">
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-200">
        <img 
          src={imgSrc} 
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={handleError}
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
  const [showFilters, setShowFilters] = useState(false);
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
    <div className="relative bg-[#07080B] py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
       {/* Speedometer Background Graphic */}
       <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* Main glow - slightly reduced blur for more definition */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#9C4021] opacity-10 blur-[80px] rounded-full translate-x-1/3 -translate-y-1/3"></div>
          
          {/* Abstract Speedometer Arc - INCREASED OPACITY and THICKNESS */}
          <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] opacity-20" viewBox="0 0 100 100">
             {/* Outer rim */}
             <path d="M 10 50 A 40 40 0 1 1 90 50" fill="none" stroke="#9C4021" strokeWidth="0.8" />
             
             {/* Tick marks ring */}
             <path d="M 15 50 A 35 35 0 1 1 85 50" fill="none" stroke="#9C4021" strokeWidth="2.5" strokeDasharray="1 3" />
             
             {/* Inner solid arc */}
             <path d="M 22 50 A 28 28 0 1 1 78 50" fill="none" stroke="#9C4021" strokeWidth="0.5" />
             
             {/* Needle - Brighter and Thicker */}
             <g>
               <line x1="50" y1="50" x2="70" y2="30" stroke="#E65C00" strokeWidth="1.5" strokeLinecap="round" />
               <circle cx="50" cy="50" r="3" fill="#E65C00" />
             </g>
             
             {/* Numbers suggestion */}
             <circle cx="20" cy="40" r="1" fill="#9C4021" opacity="0.8" />
             <circle cx="30" cy="25" r="1" fill="#9C4021" opacity="0.8" />
             <circle cx="50" cy="18" r="1" fill="#9C4021" opacity="0.8" />
             <circle cx="70" cy="25" r="1" fill="#9C4021" opacity="0.8" />
             <circle cx="80" cy="40" r="1" fill="#9C4021" opacity="0.8" />
          </svg>
       </div>

       <div className="relative max-w-4xl mx-auto text-center z-10">
         <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
           Premium Cars. <br className="hidden sm:block" />
           <span className="text-[#FF6600]">Simple Experience.</span>
         </h1>
         <p className="text-neutral-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
           Compare, negotiate, and secure your next car or rental in one seamless platform.
         </p>

         <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto" ref={wrapperRef}>
            <div className={`relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white shadow-2xl transition-all gap-2 ${showFilters ? 'rounded-t-2xl' : 'rounded-2xl'} p-2 z-20`}>
               <div className="flex-grow flex items-center relative">
                  <Search className="absolute left-3 w-6 h-6 text-neutral-400" />
                  <input 
                    type="text"
                    className="w-full bg-transparent border-none focus:ring-0 pl-12 pr-10 py-3 text-lg text-primary placeholder:text-neutral-400 outline-none"
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
                 <button 
                    type="button" 
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl sm:rounded-lg transition-colors font-medium ${showFilters ? 'bg-neutral-100 text-primary' : 'bg-transparent text-neutral-600 hover:text-primary hover:bg-neutral-50'}`}
                 >
                    <SlidersHorizontal className="w-5 h-5" />
                    <span className="sm:hidden lg:inline">Filters</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                 </button>
                 <button type="submit" className="flex-grow sm:flex-grow-0 bg-accent text-white px-8 py-3 rounded-xl font-bold hover:bg-accent-hover transition-colors shadow-lg whitespace-nowrap">
                   Search
                 </button>
               </div>
            </div>

            {/* Filter Panel */}
            {showFilters && (
                <div className="bg-white border-t border-neutral-100 p-6 rounded-b-2xl shadow-xl animate-in slide-in-from-top-2 fade-in relative z-10 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-neutral-500 mb-1.5 uppercase">Make</label>
                            <select className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-accent/20 outline-none">
                                <option value="">Any Make</option>
                                {BRANDS.map(b => <option key={b.name} value={b.name}>{b.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-neutral-500 mb-1.5 uppercase">Price Range</label>
                            <select className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-accent/20 outline-none">
                                <option value="">Any Price</option>
                                <option value="0-5m">Under ₦5m</option>
                                <option value="5m-15m">₦5m - ₦15m</option>
                                <option value="15m-30m">₦15m - ₦30m</option>
                                <option value="30m+">Above ₦30m</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-neutral-500 mb-1.5 uppercase">Year</label>
                            <select className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-accent/20 outline-none">
                                <option value="">Any Year</option>
                                <option value="2024">2024</option>
                                <option value="2023">2023</option>
                                <option value="2022">2022</option>
                                <option value="2021">2021</option>
                                <option value="2020">2020 & Older</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-neutral-50">
                        <button type="button" className="text-sm text-neutral-500 hover:text-primary">Reset all</button>
                        <Button size="sm" onClick={() => setShowFilters(false)}>Apply Filters</Button>
                    </div>
                </div>
            )}

            {/* Auto-suggest Dropdown */}
            {showSuggestions && suggestions.length > 0 && !showFilters && (
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
              <button key={tag} onClick={() => { setQuery(tag); onSearch(tag); }} className="bg-white/5 hover:bg-white/10 px-4 py-1.5 rounded-full transition-colors text-white border border-white/10">
                {tag}
              </button>
            ))}
         </div>
       </div>
    </div>
  );
};