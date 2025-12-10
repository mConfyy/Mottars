import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Button, Input } from '../components/ui';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../types';
import { Upload, X, Check, Image as ImageIcon } from 'lucide-react';

export const CreateListing = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Mock upload by creating object URL
      const newImage = URL.createObjectURL(e.target.files[0]);
      setImages([...images, newImage]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate(AppRoute.SELLER_DASHBOARD);
    }, 2000);
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Progress Bar */}
        <div className="mb-8">
           <div className="flex items-center justify-between text-sm font-medium text-neutral-500 mb-2">
              <span className={step >= 1 ? 'text-accent' : ''}>1. Car Details</span>
              <span className={step >= 2 ? 'text-accent' : ''}>2. Photos</span>
              <span className={step >= 3 ? 'text-accent' : ''}>3. Review</span>
           </div>
           <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent transition-all duration-300 ease-out"
                style={{ width: `${(step / 3) * 100}%` }}
              />
           </div>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm">
            {step === 1 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 fade-in">
                    <h2 className="text-2xl font-bold">Car Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Make" placeholder="e.g. Toyota" />
                        <Input label="Model" placeholder="e.g. Camry" />
                        <Input label="Year" type="number" placeholder="2020" />
                        <Input label="Mileage (km)" type="number" placeholder="0" />
                        
                        <div className="md:col-span-2">
                             <label className="block text-sm font-medium text-neutral-700 mb-1.5">Condition</label>
                             <div className="grid grid-cols-3 gap-3">
                                {['New', 'Foreign Used', 'Nigerian Used'].map(opt => (
                                    <button key={opt} className="border border-neutral-200 rounded-lg py-2 text-sm hover:border-accent hover:text-accent focus:ring-2 focus:ring-accent/20 focus:border-accent">
                                        {opt}
                                    </button>
                                ))}
                             </div>
                        </div>

                        <Input label="Price (NGN)" type="number" placeholder="0.00" className="md:col-span-2" />
                        
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Description</label>
                            <textarea className="w-full border border-neutral-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent" rows={4} placeholder="Describe the car's condition, features, and history..."></textarea>
                        </div>
                    </div>
                    <div className="flex justify-end pt-4">
                        <Button onClick={handleNext}>Next: Upload Photos</Button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 fade-in">
                    <h2 className="text-2xl font-bold">Upload Photos</h2>
                    <p className="text-neutral-500 text-sm">Add at least 3 photos to get better visibility. First photo will be the cover.</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {images.map((img, idx) => (
                            <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group border border-neutral-200">
                                <img src={img} alt="upload" className="w-full h-full object-cover" />
                                <button 
                                    onClick={() => removeImage(idx)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                                {idx === 0 && <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs text-center py-1">Cover</span>}
                            </div>
                        ))}
                        
                        <label className="border-2 border-dashed border-neutral-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-accent hover:bg-neutral-50 transition-colors aspect-square">
                            <Upload className="w-6 h-6 text-neutral-400 mb-2" />
                            <span className="text-xs text-neutral-500">Add Photo</span>
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                        </label>
                    </div>

                    <div className="flex justify-between pt-4">
                        <Button variant="ghost" onClick={handleBack}>Back</Button>
                        <Button onClick={handleNext} disabled={images.length === 0}>Next: Review</Button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 fade-in">
                    <div className="text-center py-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                           <Check className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold">Ready to Publish!</h2>
                        <p className="text-neutral-500">Your listing looks great. It will be visible to thousands of buyers instantly.</p>
                    </div>

                    <div className="bg-neutral-50 p-4 rounded-xl flex gap-4 border border-neutral-100">
                        {images.length > 0 ? (
                             <img src={images[0]} className="w-24 h-20 object-cover rounded-lg" alt="Cover" />
                        ) : (
                             <div className="w-24 h-20 bg-neutral-200 rounded-lg flex items-center justify-center"><ImageIcon className="text-neutral-400" /></div>
                        )}
                        <div>
                            <h3 className="font-bold">2020 Toyota Camry</h3>
                            <p className="text-accent font-bold">₦ 12,500,000</p>
                            <p className="text-xs text-neutral-500 mt-1">Lagos • Foreign Used</p>
                        </div>
                    </div>

                    <div className="flex justify-between pt-4">
                        <Button variant="ghost" onClick={handleBack}>Back</Button>
                        <Button onClick={handleSubmit} isLoading={isLoading}>Publish Listing</Button>
                    </div>
                </div>
            )}
        </div>
      </div>
    </Layout>
  );
};