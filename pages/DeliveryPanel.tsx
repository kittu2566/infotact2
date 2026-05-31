"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { useStore } from '@/store/useStore';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, DollarSign, Clock, CheckCircle2, AlertCircle, Utensils, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";

const DeliveryPanel = () => {
  const { activeDeliveries, completeDelivery } = useStore();

  const stats = [
    { label: 'Today\'s Earnings', value: '$84.20', icon: DollarSign },
    { label: 'Deliveries', value: '12', icon: CheckCircle2 },
    { label: 'Online Time', value: '5h 20m', icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Delivery Dashboard</h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-bold text-green-600">You are currently online</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl font-bold border-gray-200">Go Offline</Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold">View Map</Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, i) => (
            <Card key={i} className="border-none shadow-md rounded-3xl bg-white">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500">
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Deliveries */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
              Active Jobs
              <Badge className="bg-orange-500 text-white border-none">{activeDeliveries.filter(d => d.status !== 'delivered').length}</Badge>
            </h2>
            
            {activeDeliveries.filter(d => d.status !== 'delivered').map((job) => (
              <Card key={job.id} className="border-none shadow-lg rounded-3xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6 border-b border-gray-50">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">New Order Available</p>
                        <h3 className="text-2xl font-black text-gray-900">{job.restaurantName}</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-green-600">${job.earnings.toFixed(2)}</p>
                        <p className="text-xs font-bold text-gray-400">Est. Earnings</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Utensils size={16} className="text-gray-400" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase">Pickup</p>
                          <p className="font-bold text-gray-900">{job.restaurantName}</p>
                        </div>
                      </div>
                      <div className="ml-4 w-0.5 h-6 bg-gray-100" />
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center flex-shrink-0">
                          <MapPin size={16} className="text-orange-500" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase">Dropoff</p>
                          <p className="font-bold text-gray-900">{job.customerAddress}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 flex gap-3">
                    <Button 
                      onClick={() => completeDelivery(job.id)}
                      className="flex-1 bg-gray-900 hover:bg-gray-800 text-white h-12 rounded-xl font-bold"
                    >
                      Accept Job
                    </Button>
                    <Button variant="outline" className="h-12 rounded-xl font-bold border-gray-200">
                      Decline
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Earnings History / Performance */}
          <div className="space-y-6">
            <h2 className="text-xl font-black text-gray-900">Performance</h2>
            <Card className="border-none shadow-lg rounded-3xl overflow-hidden">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                      <Star size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">4.9 Rating</p>
                      <p className="text-xs text-gray-500">Top 5% of partners</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-gray-500">Acceptance Rate</span>
                    <span className="text-gray-900">98%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="w-[98%] h-full bg-green-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-gray-500">On-time Delivery</span>
                    <span className="text-gray-900">94%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="w-[94%] h-full bg-orange-500" />
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-2 text-orange-500 bg-orange-50 p-3 rounded-xl">
                    <AlertCircle size={18} />
                    <p className="text-xs font-bold">Complete 5 more deliveries to earn a $20 bonus!</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DeliveryPanel;