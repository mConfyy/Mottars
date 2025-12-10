import React from 'react';
import { Layout } from '../components/Layout';
import { Button, Badge } from '../components/ui';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PlusCircle, Eye, MessageSquare, TrendingUp, CarFront } from 'lucide-react';
import { MOCK_CARS } from '../constants';
import { Link } from 'react-router-dom';
import { AppRoute } from '../types';

const data = [
  { name: 'Mon', views: 40 },
  { name: 'Tue', views: 30 },
  { name: 'Wed', views: 78 },
  { name: 'Thu', views: 50 },
  { name: 'Fri', views: 90 },
  { name: 'Sat', views: 120 },
  { name: 'Sun', views: 80 },
];

export const SellerDashboard = () => {
  // Filter cars owned by 's1' (our mock logged in seller)
  const myListings = MOCK_CARS.filter(c => c.sellerId === 's1');

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary">Seller Dashboard</h1>
            <p className="text-neutral-500">Welcome back, Mikano Motors.</p>
          </div>
          <Link to={AppRoute.CREATE_LISTING}>
             <Button icon={PlusCircle}>Create New Listing</Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex items-center justify-between">
              <div>
                 <p className="text-sm text-neutral-500 font-medium">Total Views</p>
                 <h3 className="text-3xl font-bold mt-1">24.5k</h3>
                 <span className="text-xs text-green-600 flex items-center mt-2 font-medium bg-green-50 px-2 py-1 rounded w-fit"><TrendingUp className="w-3 h-3 mr-1" /> +12% this week</span>
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
                 <h3 className="text-3xl font-bold mt-1">8</h3>
                 <span className="text-xs text-neutral-500 mt-2 block">3 unread</span>
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
               <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#888'}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#888'}} />
                      <Tooltip 
                        cursor={{fill: '#f5f5f5'}}
                        contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                      />
                      <Bar dataKey="views" fill="#1A1A1A" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>

            {/* Quick Actions / Recent Activity */}
            <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
               <h3 className="font-bold text-lg mb-4">Verification Status</h3>
               <div className="bg-green-50 border border-green-100 p-4 rounded-lg mb-6">
                  <div className="flex items-center gap-3 mb-2">
                     <div className="bg-green-100 p-1.5 rounded-full"><ShieldCheck className="w-5 h-5 text-green-700" /></div>
                     <span className="font-bold text-green-800">Verified Seller</span>
                  </div>
                  <p className="text-sm text-green-700">Your account is fully verified. You have access to all premium features.</p>
               </div>
               
               <h3 className="font-bold text-lg mb-4">Your Listings</h3>
               <div className="space-y-4">
                  {myListings.slice(0, 3).map(car => (
                     <div key={car.id} className="flex gap-3 items-center p-2 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-neutral-100">
                        <img src={car.images[0]} className="w-12 h-12 rounded object-cover" alt="" />
                        <div className="flex-1 min-w-0">
                           <p className="font-medium text-sm truncate">{car.year} {car.make} {car.model}</p>
                           <p className="text-xs text-neutral-500">Listed: 2 days ago</p>
                        </div>
                        <Badge variant={car.sellerId ? 'success' : 'neutral'}>Active</Badge>
                     </div>
                  ))}
                  <Button variant="ghost" className="w-full text-xs">View All Listings</Button>
               </div>
            </div>
        </div>
      </div>
    </Layout>
  );
};

const ShieldCheck = ({ className }: {className?: string}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
);