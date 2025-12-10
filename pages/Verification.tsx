import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Button, Input } from '../components/ui';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../types';
import { Upload, ShieldCheck, CheckCircle2, User, FileText } from 'lucide-react';

export const Verification = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate verification API call
    setTimeout(() => {
      setIsLoading(false);
      // Persist the pending state so Dashboard can read it
      localStorage.setItem('seller_verification_status', 'pending');
      setStep(3); // Success state
    }, 2000);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {step < 3 && (
              <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-primary mb-2">Verify your Identity</h1>
                <p className="text-neutral-500">To maintain a safe marketplace, all sellers must be verified. This usually takes 2-3 business days.</p>
              </div>
          )}

          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
            {step === 1 && (
              <form onSubmit={() => setStep(2)} className="p-8 space-y-6">
                <div className="flex items-center gap-4 mb-6 p-4 bg-blue-50 text-blue-800 rounded-lg border border-blue-100">
                   <User className="w-6 h-6 flex-shrink-0" />
                   <div>
                      <h3 className="font-bold text-sm">Step 1: Personal Information</h3>
                      <p className="text-xs opacity-80">Provide your legal details as they appear on your ID.</p>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input label="First Name" required placeholder="e.g. Chukwudi" />
                  <Input label="Last Name" required placeholder="e.g. Okonkwo" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Gender</label>
                      <select className="w-full bg-white border border-neutral-200 rounded-lg py-2.5 px-3 text-primary focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none">
                          <option>Select Gender</option>
                          <option>Male</option>
                          <option>Female</option>
                      </select>
                  </div>
                  <Input label="Date of Birth" type="date" required />
                </div>

                <Input label="Business Name (Optional)" placeholder="e.g. Chucks Auto World" />
                <Input label="Phone Number" type="tel" required placeholder="+234" />

                <div className="pt-4">
                  <Button type="submit" className="w-full py-3">Next: Document Upload</Button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit} className="p-8 space-y-6 animate-in slide-in-from-right-4 fade-in">
                <div className="flex items-center gap-4 mb-6 p-4 bg-orange-50 text-orange-800 rounded-lg border border-orange-100">
                   <FileText className="w-6 h-6 flex-shrink-0" />
                   <div>
                      <h3 className="font-bold text-sm">Step 2: Documentation</h3>
                      <p className="text-xs opacity-80">Upload a valid government issued ID.</p>
                   </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">ID Type</label>
                    <select className="w-full bg-white border border-neutral-200 rounded-lg py-2.5 px-3 text-primary focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none mb-4">
                        <option>Select ID Type</option>
                        <option>National ID Card (NIN)</option>
                        <option>Drivers License</option>
                        <option>International Passport</option>
                        <option>Voters Card</option>
                    </select>
                </div>
                
                <Input label="ID Number" required placeholder="Enter ID Number" />

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-700">Upload ID Image (Front)</label>
                    <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-neutral-50 transition-colors">
                        <Upload className="w-8 h-8 text-neutral-400 mb-2" />
                        <span className="text-sm text-neutral-500 font-medium">Click to upload or drag and drop</span>
                        <span className="text-xs text-neutral-400 mt-1">JPG, PNG up to 5MB</span>
                    </div>
                </div>

                <div className="pt-4 flex gap-3">
                   <Button type="button" variant="ghost" onClick={() => setStep(1)} className="flex-1">Back</Button>
                   <Button type="submit" className="flex-[2] py-3" isLoading={isLoading}>Submit for Verification</Button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="p-12 text-center animate-in zoom-in-95 fade-in">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                      <ShieldCheck className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary mb-4">Verification Submitted!</h2>
                  <p className="text-neutral-500 mb-8 max-w-md mx-auto">
                      Thank you for submitting your details. Our team will review your documents within <span className="font-semibold text-primary">2-3 business days</span>. 
                      You will be notified via email once approved.
                  </p>
                  <Button onClick={() => navigate(AppRoute.SELLER_DASHBOARD)} className="px-8">
                      Back to Dashboard
                  </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};