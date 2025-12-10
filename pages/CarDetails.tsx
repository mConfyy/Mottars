import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button, Modal, Badge, Input } from '../components/ui';
import { MOCK_CARS, MOCK_SELLERS, MOCK_REVIEWS } from '../constants';
import { MapPin, Calendar, Gauge, ShieldCheck, MessageCircle, Phone, CheckCircle2, ChevronLeft, Share2 } from 'lucide-react';
import { AppRoute } from '../types';

export const CarDetails = () => {
  const { id } = useParams();
  const car = MOCK_CARS.find(c => c.id === id);
  const seller = car ? MOCK_SELLERS[car.sellerId] : null;
  
  const [isOfferModalOpen, setOfferModalOpen] = useState(false);
  const [offerSent, setOfferSent] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!car || !seller) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-neutral-900">Listing Not Found</h2>
          <Link to={AppRoute.HOME}><Button variant="secondary" className="mt-4">Back to Home</Button></Link>
        </div>
      </Layout>
    );
  }

  const handleSubmitOffer = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
        setOfferSent(true);
        setTimeout(() => {
            setOfferModalOpen(false);
            setOfferSent(false); // Reset for demo
        }, 3000);
    }, 1000);
  };

  const isAuthenticated = localStorage.getItem('auth') === 'true';

  return (
    <Layout>
      <div className="bg-white pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to={AppRoute.HOME} className="inline-flex items-center text-sm text-neutral-500 hover:text-primary mb-6">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to search
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Col: Images & Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Gallery */}
              <div className="bg-neutral-100 rounded-2xl overflow-hidden">
                <div className="aspect-[16/10] bg-neutral-200 relative">
                  <img src={car.images[selectedImage]} alt={car.make} className="w-full h-full object-cover" />
                  <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white text-primary transition-all shadow-sm">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
                {car.images.length > 1 && (
                  <div className="flex gap-2 p-2 overflow-x-auto">
                    {car.images.map((img, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setSelectedImage(idx)} 
                        className={`relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 ${selectedImage === idx ? 'ring-2 ring-accent' : 'opacity-70 hover:opacity-100'}`}
                      >
                        <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Title & Key Specs */}
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-primary mb-2">{car.year} {car.make} {car.model}</h1>
                    <div className="flex items-center text-neutral-500">
                        <MapPin className="w-4 h-4 mr-1" /> {car.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-accent">
                        {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(car.price)}
                    </p>
                    {car.condition === 'Foreign Used' && <Badge variant="success">Foreign Used</Badge>}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-neutral-50 rounded-2xl border border-neutral-100">
                    <div className="space-y-1">
                        <span className="text-xs text-neutral-500 uppercase tracking-wide">Mileage</span>
                        <p className="font-semibold flex items-center gap-2"><Gauge className="w-4 h-4 text-neutral-400" /> {car.mileage.toLocaleString()} km</p>
                    </div>
                    <div className="space-y-1">
                        <span className="text-xs text-neutral-500 uppercase tracking-wide">Transmission</span>
                        <p className="font-semibold">{car.transmission}</p>
                    </div>
                    <div className="space-y-1">
                        <span className="text-xs text-neutral-500 uppercase tracking-wide">Year</span>
                        <p className="font-semibold flex items-center gap-2"><Calendar className="w-4 h-4 text-neutral-400" /> {car.year}</p>
                    </div>
                     <div className="space-y-1">
                        <span className="text-xs text-neutral-500 uppercase tracking-wide">Condition</span>
                        <p className="font-semibold">{car.condition}</p>
                    </div>
                </div>
              </div>

              {/* Description & Features */}
              <div>
                <h3 className="text-xl font-bold mb-4">Description</h3>
                <p className="text-neutral-600 leading-relaxed mb-8">{car.description}</p>
                
                <h3 className="text-xl font-bold mb-4">Features</h3>
                <div className="flex flex-wrap gap-2">
                    {car.features.map(f => (
                        <span key={f} className="bg-white border border-neutral-200 px-3 py-1.5 rounded-full text-sm text-neutral-700">
                            {f}
                        </span>
                    ))}
                </div>
              </div>

               {/* Reviews */}
               <div className="border-t border-neutral-100 pt-8">
                  <h3 className="text-xl font-bold mb-6">Seller Reviews</h3>
                  <div className="space-y-6">
                     {MOCK_REVIEWS.map(review => (
                        <div key={review.id} className="bg-neutral-50 p-4 rounded-xl">
                           <div className="flex justify-between mb-2">
                              <span className="font-semibold">{review.author}</span>
                              <span className="text-xs text-neutral-400">{review.date}</span>
                           </div>
                           <div className="flex gap-1 mb-2">
                             {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-neutral-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                             ))}
                           </div>
                           <p className="text-sm text-neutral-600">{review.text}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Right Col: Sticky Sidebar */}
            <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                    {/* Seller Card */}
                    <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
                       <div className="flex items-center gap-4 mb-6">
                          <img src={seller.logoUrl} alt={seller.name} className="w-16 h-16 rounded-full object-cover border border-neutral-100" />
                          <div>
                             <h4 className="font-bold text-lg flex items-center gap-2">
                                {seller.name}
                                {seller.isVerified && <ShieldCheck className="w-5 h-5 text-accent" />}
                             </h4>
                             <p className="text-sm text-neutral-500">{seller.type} Seller</p>
                             <div className="flex items-center gap-1 mt-1 text-sm font-medium">
                                <span className="text-yellow-500">★</span> {seller.rating} ({seller.reviewCount} reviews)
                             </div>
                          </div>
                       </div>
                       
                       <div className="grid grid-cols-2 gap-3">
                         <Button variant="outline" className="w-full" icon={MessageCircle}>Message</Button>
                         <Button variant="outline" className="w-full" icon={Phone}>Call</Button>
                       </div>
                    </div>

                    {/* CTA Card */}
                    <div className="bg-primary rounded-2xl p-6 text-white shadow-xl">
                        <h3 className="font-bold text-xl mb-2">Interested in this car?</h3>
                        <p className="text-neutral-400 text-sm mb-6">Negotiate the best price or schedule an inspection securely.</p>
                        
                        <Button 
                            className="w-full bg-accent hover:bg-accent-hover text-white border-none py-4 text-lg" 
                            onClick={() => setOfferModalOpen(true)}
                        >
                            Make an Offer
                        </Button>
                        <p className="text-center text-xs text-neutral-500 mt-4 flex items-center justify-center gap-1">
                           <ShieldCheck className="w-3 h-3" /> Protected by Mottars SafePay
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isOfferModalOpen} onClose={() => setOfferModalOpen(false)} title={offerSent ? "Offer Sent!" : "Make an Offer"}>
         {offerSent ? (
            <div className="text-center py-8">
               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                  <CheckCircle2 className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-bold mb-2">Success!</h3>
               <p className="text-neutral-500">Your offer has been sent to {seller.name}. You will be notified when they respond.</p>
            </div>
         ) : isAuthenticated ? (
            <form onSubmit={handleSubmitOffer} className="space-y-4">
               <div className="bg-neutral-50 p-4 rounded-lg flex items-center gap-4 mb-4">
                  <img src={car.images[0]} className="w-16 h-12 object-cover rounded" />
                  <div>
                     <p className="font-bold text-sm">{car.make} {car.model}</p>
                     <p className="text-xs text-neutral-500">Listed at: {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(car.price)}</p>
                  </div>
               </div>
               
               <Input label="Your Offer (NGN)" type="number" placeholder="Enter amount" required autoFocus />
               <div className="space-y-1">
                  <label className="text-sm font-medium">Message (Optional)</label>
                  <textarea className="w-full border border-neutral-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-accent/20 outline-none" rows={3} placeholder="I'm interested in this car..." />
               </div>

               <Button type="submit" className="w-full py-3" size="lg">Submit Offer</Button>
            </form>
         ) : (
            <div className="text-center py-6">
                <p className="mb-6 text-neutral-600">You need to sign in to make an offer.</p>
                <Link to={AppRoute.LOGIN}>
                    <Button className="w-full mb-3">Sign In / Register</Button>
                </Link>
                <Button variant="ghost" onClick={() => setOfferModalOpen(false)}>Cancel</Button>
            </div>
         )}
      </Modal>
    </Layout>
  );
};