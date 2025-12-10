import React from 'react';
import { Layout } from '../components/Layout';
import { Button, Badge } from '../components/ui';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PlusCircle, Eye, MessageSquare, TrendingUp, CarFront, AlertTriangle, ShieldAlert, Clock, CheckCircle2 } from 'lucide-react';
import { MOCK_CARS, MOCK_SELLERS } from '../constants';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../types';

export const SellerDashboard = () => {
  const navigate = useNavigate();
  // Simulate getting current user. For demo, we are 's1' (Verified) or 's2' (Unverified).
  const currentSellerId = 's2'; 
  const seller = MOCK_SELLERS[currentSellerId];
  // Filter cars to match seller ID AND ensure they have valid images
  const myListings = MOCK_CARS.filter(c => c.sellerId === currentSellerId && c.images && c.images.length > 0 && c.images[0]);

  // Check localStorage for any status updates from the Verification page flow
  const storedStatus = localStorage.getItem('seller_verification_status');
  // If we have a stored status, use it; otherwise fallback to the mock seller's default status
  const verificationStatus = storedStatus || seller.verificationStatus;
  
  const isVerified = verificationStatus === 'verified';
  const isPending = verificationStatus === 'pending';
  const isUnverified = verificationStatus === 'unverified';

  const handleCreateListing = () => {
    if (isVerified) {
        navigate(AppRoute.CREATE_LISTING);
    } else {
        // If pending, maybe show a toast, but for now redirect to status or block
        if (isPending) {
            alert("Verification is in progress. You will be able to post once approved.");
        } else {
            navigate(AppRoute.VERIFICATION);
        }
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary">Seller Dashboard</h1>
            <p className="text-neutral-500">Welcome back, {seller.name}.</p>
          </div>
          <Button icon={PlusCircle} onClick={handleCreateListing} disabled={!isVerified}>Create New Listing</Button>
        </div>

        {/* Verification Alerts Logic */}
        
        {/* Case 1: Unverified */}
        {isUnverified && (
            <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl mb-8 flex items-start sm:items-center gap-4">
                <div className="bg-orange-100 p-2 rounded-full text-orange-600 flex-shrink-0">
                    <ShieldAlert className="w-6 h-6" />
                </div>
                <div className="flex-grow">
                    <h3 className="font-bold text-orange-900">Account Verification Required</h3>
                    <p className="text-sm text-orange-800 mt-1">
                        You must verify your identity before you can post listings on Mottars.
                    </p>
                </div>
                <Link to={AppRoute.VERIFICATION}>
                    <Button variant="primary" size="sm" className="whitespace-nowrap bg-orange-600 hover:bg-orange-700">Verify Now</Button>
                </Link>
            </div>
        )}

        {/* Case 2: Pending */}
        {isPending && (
             <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-xl mb-8 flex items-start sm:items-center gap-4">
                <div className="bg-yellow-100 p-2 rounded-full text-yellow-700 flex-shrink-0">
                    <Clock className="w-6 h-6" />
                </div>
                <div className="flex-grow">
                    <h3 className="font-bold text-yellow-900">Verification In Progress</h3>
                    <p className="text-sm text-yellow-800 mt-1">
                        Your documents have been submitted and are under review. This usually takes 2-3 business days.
                    </p>
                </div>
                <Badge variant="warning">Pending Approval</Badge>
            </div>
        )}

        {/* Case 3: Verified (Optional success message if just verified, or persistent badge) */}
        {isVerified && (
             <div className="bg-green-50 border border-green-100 p-4 rounded-xl mb-8 flex items-start sm:items-center gap-4">
                <div className="bg-green-100 p-2 rounded-full text-green-700 flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="flex-grow">
                    <h3 className="font-bold text-green-900">Verification Complete</h3>
                    <p className="text-sm text-green-800 mt-1">
                        Your account is fully verified. You can now post unlimited listings.
                    </p>
                </div>
            </div>
        )}


        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex items-center justify-between">
              <div>
                 <p className="text-sm text-neutral-500 font-medium">Total Views</p>
                 <h3 className="text-3xl font-bold mt-1">0</h3>
                 <span className="text-xs text-neutral-400 flex items-center mt-2 font-medium bg-neutral-50 px-2 py-1 rounded w-fit">Start selling to see stats</span>
              </div>
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                 <Eye className="w-6 h-6" />
              </div>
           </div>

           <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex items-center justify-between">
              <div>
                 <p className="text-sm text-neutral-500 font-medium">Active Listings</p>
                 <h3 className="text-3xl font-bold mt-1">{myListings.length}</h3>
              </div>
              <div className="w-12 h-12 bg-orange-50 text-accent rounded-full flex items-center justify-center">
                 <CarFront className="w-6 h-6" />
              </div>
           </div>

           <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex items-center justify-between">
              <div>
                 <p className="text-sm text-neutral-500 font-medium">New Messages</p>
                 <h3 className="text-3xl font-bold mt-1">0</h3>
              </div>
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center">
                 <MessageSquare className="w-6 h-6" />
              </div>
           </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
            {/* Analytics Chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
               <h3 className="font-bold text-lg mb-6">Profile Views Analytics</h3>
               <div className="h-64 w-full flex items-center justify-center bg-neutral-50 rounded-lg border border-dashed border-neutral-200">
                  <p className="text-neutral-400 text-sm">No data available yet</p>
               </div>
            </div>

            {/* Quick Actions / Recent Activity */}
            <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
               <h3 className="font-bold text-lg mb-4">Your Listings</h3>
               {myListings.length > 0 ? (
                   <div className="space-y-4">
                      {myListings.slice(0, 3).map(car => (
                         <div key={car.id} className="flex gap-3 items-center p-2 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-neutral-100">
                            <img src={car.images[0]} className="w-12 h-12 rounded object-cover" alt="" />
                            <div className="flex-1 min-w-0">
                               <p className="font-medium text-sm truncate">{car.year} {car.make} {car.model}</p>
                               <p className="text-xs text-neutral-500">Listed: Just now</p>
                            </div>
                            <Badge variant={car.sellerId ? 'success' : 'neutral'}>Active</Badge>
                         </div>
                      ))}
                      <Button variant="ghost" className="w-full text-xs">View All Listings</Button>
                   </div>
               ) : (
                   <div className="text-center py-8">
                       <p className="text-neutral-500 text-sm mb-4">You haven't posted any cars yet.</p>
                       <Button size="sm" variant="outline" onClick={handleCreateListing} disabled={!isVerified}>Post your first car</Button>
                   </div>
               )}
            </div>
        </div>
      </div>
    </Layout>
  );
};