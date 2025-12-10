import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button, Modal, Badge, Input } from '../components/ui';
import { MOCK_CARS, MOCK_SELLERS, MOCK_REVIEWS } from '../constants';
import { MapPin, Calendar, Gauge, ShieldCheck, MessageCircle, Phone, CheckCircle2, ChevronLeft, Share2, ArrowLeft, Send, X } from 'lucide-react';
import { AppRoute } from '../types';

export const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = MOCK_CARS.find(c => c.id === id);
  const seller = car ? MOCK_SELLERS[car.sellerId] : null;
  
  const [isOfferModalOpen, setOfferModalOpen] = useState(false);
  const [offerSent, setOfferSent] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{sender: 'me' | 'seller', text: string, time: string}[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isChatOpen && chatHistory.length === 0) {
      setChatHistory([
        { sender: 'seller', text: `Hello! I see you're interested in the ${car?.year} ${car?.make} ${car?.model}. How can I help you today?`, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
      ]);
    }
  }, [isChatOpen, car]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // Added check for valid images array
  if (!car || !seller || !car.images || car.images.length === 0) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-neutral-900">Listing Not Found or Invalid</h2>
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
  
  const handleCall = () => {
      window.location.href = "tel:+2348000000000"; // Mock number
  };
  
  const handleMessage = () => {
      setIsChatOpen(true);
  };

  const sendChatMessage = (e: React.FormEvent) => {
      e.preventDefault();
      if (!chatMessage.trim()) return;
      
      const newMsg = { sender: 'me' as const, text: chatMessage, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
      setChatHistory(prev => [...prev, newMsg]);
      setChatMessage('');

      // Simulate reply
      setTimeout(() => {
          setChatHistory(prev => [...prev, { 
              sender: 'seller', 
              text: "Thanks for your message! Is there a specific time you'd like to inspect the car?", 
              time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
          }]);
      }, 1500);
  };

  const isAuthenticated = localStorage.getItem('auth') === 'true';

  return (
    <Layout>
      {/* Floating Back Button for Mobile */}
      <div className="fixed top-20 left-4 z-30 md:hidden">
         <button 
           onClick={() => navigate(-1)} 
           className="p-3 bg-white/90 backdrop-blur shadow-lg rounded-full text-primary hover:bg-white border border-neutral-100"
         >
           <ArrowLeft className="w-5 h-5" />
         </button>
      </div>

      <div className="bg-white pb-32 md:pb-12 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          
          {/* Desktop Back Button */}
          <div className="hidden md:flex mb-6">
             <button 
                onClick={() => navigate(-1)}
                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:text-primary hover:bg-neutral-100 transition-colors"
             >
                <ChevronLeft className="w-4 h-4 mr-1.5" /> 
                Back to search results
             </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Col: Images & Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Gallery */}
              <div className="bg-neutral-100 rounded-2xl overflow-hidden shadow-sm border border-neutral-100">
                <div className="aspect-[16/10] bg-neutral-200 relative">
                  <img src={car.images[selectedImage]} alt={car.make} className="w-full h-full object-cover" />
                  <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white text-primary transition-all shadow-sm">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
                {car.images.length > 1 && (
                  <div className="flex gap-2 p-2 overflow-x-auto bg-white">
                    {car.images.map((img, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setSelectedImage(idx)} 
                        className={`relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all ${selectedImage === idx ? 'ring-2 ring-accent ring-offset-2' : 'opacity-70 hover:opacity-100'}`}
                      >
                        <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Title & Key Specs */}
              <div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-primary mb-2">{car.year} {car.make} {car.model}</h1>
                    <div className="flex items-center text-neutral-500">
                        <MapPin className="w-4 h-4 mr-1" /> {car.location}
                    </div>
                  </div>
                  <div className="md:text-right">
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
                         <Button variant="outline" className="w-full" icon={MessageCircle} onClick={handleMessage}>Message</Button>
                         <Button variant="outline" className="w-full" icon={Phone} onClick={handleCall}>Call</Button>
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
      
      {/* Mobile Sticky Action Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-4 md:hidden z-40 flex gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <Button variant="outline" className="flex-1 border-neutral-300" icon={MessageCircle} onClick={handleMessage}>Message</Button>
          <Button variant="primary" className="flex-1" icon={Phone} onClick={handleCall}>Call Seller</Button>
      </div>

      {/* Offer Modal */}
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

      {/* Chat Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsChatOpen(false)} />
            <div className="relative bg-white w-full max-w-md h-[600px] max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Chat Header */}
                <div className="bg-primary p-4 flex items-center justify-between text-white shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <img src={seller.logoUrl} alt={seller.name} className="w-10 h-10 rounded-full border-2 border-white/20 object-cover" />
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-primary rounded-full"></span>
                        </div>
                        <div>
                            <h3 className="font-bold text-sm">{seller.name}</h3>
                            <p className="text-xs text-neutral-400">Online now</p>
                        </div>
                    </div>
                    <button onClick={() => setIsChatOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50">
                    {/* Car Context */}
                    <div className="flex justify-center mb-4">
                         <div className="bg-white p-2 rounded-lg shadow-sm border border-neutral-100 flex items-center gap-3 max-w-[90%]">
                             <img src={car.images[0]} className="w-12 h-12 object-cover rounded" />
                             <div className="text-xs">
                                 <p className="font-bold text-primary">{car.year} {car.make} {car.model}</p>
                                 <p className="text-accent font-bold">{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(car.price)}</p>
                             </div>
                         </div>
                    </div>

                    {chatHistory.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'me' ? 'bg-accent text-white rounded-tr-none' : 'bg-white text-neutral-700 border border-neutral-200 rounded-tl-none shadow-sm'}`}>
                                <p>{msg.text}</p>
                                <span className={`text-[10px] block mt-1 ${msg.sender === 'me' ? 'text-white/70' : 'text-neutral-400'}`}>{msg.time}</span>
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                {/* Chat Input */}
                <form onSubmit={sendChatMessage} className="p-3 bg-white border-t border-neutral-100 shrink-0 flex gap-2">
                    <input 
                        type="text" 
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-neutral-100 border-0 rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-accent/20 outline-none"
                    />
                    <button 
                        type="submit" 
                        disabled={!chatMessage.trim()}
                        className="bg-accent text-white p-3 rounded-full hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
      )}
    </Layout>
  );
};