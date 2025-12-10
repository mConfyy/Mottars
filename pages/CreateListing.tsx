import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Button, Input } from '../components/ui';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../types';
import { Upload, X, Check, Image as ImageIcon, MapPin, Tag, Car, AlertCircle, ChevronDown, Camera } from 'lucide-react';

export const CreateListing = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newImage = URL.createObjectURL(e.target.files[0]);
      setImages([...images, newImage]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate(AppRoute.SELLER_DASHBOARD);
    }, 2000);
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-primary">Post ad</h1>
            <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50">Clear</Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 pb-20">
            {/* Section 1: Basic Info */}
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
                <Input label="Title*" placeholder="e.g. Toyota Camry 2018 Black" required />
                
                <div>
                   <label className="block text-sm font-medium text-neutral-700 mb-1.5">Category*</label>
                   <div className="relative">
                     <select className="w-full bg-white border border-neutral-200 rounded-lg py-3 px-4 text-primary focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none appearance-none">
                        <option>Cars</option>
                        <option>Buses & Microbuses</option>
                        <option>Trucks & Trailers</option>
                        <option>Heavy Equipment</option>
                        <option>Motorcycles</option>
                     </select>
                     <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                   </div>
                </div>

                <div>
                   <label className="block text-sm font-medium text-neutral-700 mb-1.5">Select Location*</label>
                   <div className="relative">
                     <select className="w-full bg-white border border-neutral-200 rounded-lg py-3 px-4 text-primary focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none appearance-none">
                        <option>Lagos</option>
                        <option>Abuja</option>
                        <option>Port Harcourt</option>
                        <option>Ibadan</option>
                        <option>Kano</option>
                     </select>
                     <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                   </div>
                </div>
            </div>

            {/* Section 2: Photos */}
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">Add photo</h3>
                    <span className="text-xs text-neutral-500">0 / 20</span>
                </div>
                <p className="text-sm text-neutral-500">First picture is the title picture. You can change the order of photos: just grab your photos and drag.</p>
                
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mt-4">
                     {images.map((img, idx) => (
                        <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-neutral-200 group">
                           <img src={img} className="w-full h-full object-cover" alt="upload" />
                           <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-3 h-3" /></button>
                           {idx === 0 && <span className="absolute bottom-0 left-0 right-0 bg-accent text-white text-[10px] text-center py-0.5 font-bold">MAIN</span>}
                        </div>
                     ))}
                     
                     <label className="aspect-square bg-green-50 border-2 border-dashed border-green-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-green-100 transition-colors">
                        <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center text-green-700 mb-1">
                            <Camera className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-green-700">Add Photo</span>
                        <input type="file" className="hidden" accept="image/png, image/jpeg" onChange={handleImageUpload} />
                     </label>
                </div>
                <p className="text-xs text-neutral-400 pt-2">Supported formats are *.jpg and *.png</p>
            </div>

            {/* Section 3: Item Details */}
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Make*</label>
                        <select className="w-full bg-white border border-neutral-200 rounded-lg py-3 px-3 outline-none">
                            <option>Toyota</option>
                            <option>Honda</option>
                            <option>Lexus</option>
                            <option>Mercedes-Benz</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Model*</label>
                        <select className="w-full bg-white border border-neutral-200 rounded-lg py-3 px-3 outline-none">
                            <option>Camry</option>
                            <option>Corolla</option>
                            <option>Highlander</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Year of Manufacture*</label>
                        <select className="w-full bg-white border border-neutral-200 rounded-lg py-3 px-3 outline-none">
                            <option>2020</option>
                            <option>2019</option>
                            <option>2018</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Condition*</label>
                        <select className="w-full bg-white border border-neutral-200 rounded-lg py-3 px-3 outline-none">
                            <option>Foreign Used</option>
                            <option>Nigerian Used</option>
                            <option>New</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Transmission*</label>
                        <select className="w-full bg-white border border-neutral-200 rounded-lg py-3 px-3 outline-none">
                            <option>Automatic</option>
                            <option>Manual</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Description*</label>
                    <textarea 
                        className="w-full border border-neutral-200 rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-none" 
                        placeholder="Describe your car here..."
                        required
                    ></textarea>
                </div>
            </div>

            {/* Section 4: Price */}
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
                <Input label="Price*" type="number" placeholder="Enter price in NGN" required />
                <div className="flex items-center gap-2">
                    <input type="checkbox" id="negotiable" className="w-4 h-4 text-accent border-neutral-300 rounded focus:ring-accent" />
                    <label htmlFor="negotiable" className="text-sm text-neutral-700">Negotiable</label>
                </div>
                
                 {/* Bulk Price Option (from screenshot) */}
                <div className="border-t border-neutral-100 pt-4">
                     <div className="flex justify-between items-center cursor-pointer group">
                         <span className="text-sm font-medium text-neutral-500 group-hover:text-primary transition-colors">Add bulk price</span>
                         <ChevronDown className="w-4 h-4 text-neutral-400" />
                     </div>
                </div>
            </div>

            {/* Section 5: Contact Info */}
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
                 <h3 className="font-bold text-lg">Contact Information</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <Input label="Name" defaultValue="Chinedu Autos" disabled className="bg-neutral-50" />
                     <Input label="Phone Number" defaultValue="+234 801 234 5678" />
                 </div>
                 <div className="flex items-center gap-2">
                    <input type="checkbox" id="whatsapp" defaultChecked className="w-4 h-4 text-accent border-neutral-300 rounded focus:ring-accent" />
                    <label htmlFor="whatsapp" className="text-sm text-neutral-700">Allow WhatsApp contact</label>
                </div>
            </div>

            {/* Section 6: Promote */}
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm text-center">
                 <h3 className="font-bold text-lg mb-2">Promote your ad</h3>
                 <p className="text-sm text-neutral-500 mb-6">Choose a promotion type for your ad to post it</p>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                     <div className="border-2 border-accent bg-orange-50 rounded-xl p-4 cursor-pointer relative">
                         <div className="absolute top-0 right-0 bg-accent text-white text-[10px] px-2 py-0.5 rounded-bl-lg font-bold">RECOMMENDED</div>
                         <h4 className="font-bold text-primary">Standard Ad</h4>
                         <p className="text-xs text-neutral-500 mt-1">Free</p>
                     </div>
                     <div className="border border-neutral-200 rounded-xl p-4 cursor-pointer hover:border-accent hover:bg-orange-50 transition-all opacity-60">
                         <h4 className="font-bold text-primary">Top Ad (7 Days)</h4>
                         <p className="text-xs text-neutral-500 mt-1">₦ 2,500</p>
                     </div>
                     <div className="border border-neutral-200 rounded-xl p-4 cursor-pointer hover:border-accent hover:bg-orange-50 transition-all opacity-60">
                         <h4 className="font-bold text-primary">Boost (30 Days)</h4>
                         <p className="text-xs text-neutral-500 mt-1">₦ 8,000</p>
                     </div>
                 </div>

                 <Button type="submit" className="w-full py-4 text-lg" isLoading={isLoading}>Post Ad</Button>
                 <p className="text-xs text-neutral-400 mt-4">By clicking Post Ad you agree to our Terms and Conditions.</p>
            </div>
        </form>
      </div>
    </Layout>
  );
};