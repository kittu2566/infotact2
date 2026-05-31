"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, MessageSquare, Clock, ChevronLeft, CheckCircle2, Utensils, Bike, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import ChatModal from '@/components/tracking/ChatModal';

const OrderTracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'placed' | 'preparing' | 'out-for-delivery' | 'delivered'>('placed');
  const [progress, setProgress] = useState(25);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [markerPos, setMarkerPos] = useState({ x: 20, y: 80 });

  // Simulate marker movement
  useEffect(() => {
    if (status === 'out-for-delivery') {
      const interval = setInterval(() => {
        setMarkerPos(prev => ({
          x: Math.min(prev.x + 0.5, 80),
          y: Math.max(prev.y - 0.5, 20)
        }));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [status]);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStatus('preparing');
      setProgress(50);
    }, 5000);

    const timer2 = setTimeout(() => {
      setStatus('out-for-delivery');
      setProgress(75);
    }, 15000);

    const timer3 = setTimeout(() => {
      setStatus('delivered');
      setProgress(100);
    }, 45000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const steps = [
    { id: 'placed', label: 'Order Placed', icon: CheckCircle2, time: '12:30 PM' },
    { id: 'preparing', label: 'Preparing Food', icon: Utensils, time: '12:35 PM' },
    { id: 'out-for-delivery', label: 'Out for Delivery', icon: Bike, time: '12:50 PM' },
    { id: 'delivered', label: 'Delivered', icon: Home, time: '1:05 PM' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <ChatModal 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        partnerName="Alex Johnson" 
      />
      
      <main className="container mx-auto px-4 py-8">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-orange-500 mb-6 transition-colors"
        >
          <ChevronLeft size={16} />
          Back to Home
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-none shadow-lg rounded-3xl overflow-hidden dark:bg-gray-900">
              <div className="bg-orange-500 p-8 text-white">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-orange-100 font-bold uppercase text-xs tracking-widest mb-2">Order ID: {id}</p>
                    <h1 className="text-3xl font-black">
                      {status === 'placed' && "We've received your order!"}
                      {status === 'preparing' && "Chef is working their magic..."}
                      {status === 'out-for-delivery' && "Your food is on the way!"}
                      {status === 'delivered' && "Enjoy your meal!"}
                    </h1>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl text-center min-w-[100px]">
                    <p className="text-[10px] font-bold uppercase text-orange-100">Est. Arrival</p>
                    <p className="text-xl font-black">15-20 min</p>
                  </div>
                </div>
                <div className="relative h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="absolute top-0 left-0 h-full bg-white"
                  />
                </div>
              </div>
              
              <CardContent className="p-8">
                <div className="relative space-y-8">
                  <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-100 dark:bg-gray-800" />
                  {steps.map((step, index) => {
                    const isCompleted = steps.findIndex(s => s.id === status) >= index;
                    const isActive = step.id === status;
                    return (
                      <div key={step.id} className="flex items-center gap-6 relative z-10">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-500 ${
                          isCompleted ? 'bg-orange-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                        }`}>
                          <step.icon size={16} />
                        </div>
                        <div className="flex-1">
                          <p className={`font-black ${isCompleted ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>{step.label}</p>
                          {isActive && <p className="text-xs text-orange-500 font-bold animate-pulse">In Progress...</p>}
                        </div>
                        {isCompleted && <span className="text-xs font-bold text-gray-400">{step.time}</span>}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg rounded-3xl h-[400px] relative overflow-hidden bg-gray-200 dark:bg-gray-800">
              <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover opacity-50 grayscale"
                alt="Map"
              />
              <div className="absolute inset-0">
                {/* Destination Marker */}
                <div className="absolute top-[20%] left-[80%] -translate-x-1/2 -translate-y-1/2">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Home size={20} className="text-blue-600" />
                  </div>
                </div>

                {/* Delivery Marker */}
                <motion.div 
                  animate={{ left: `${markerPos.x}%`, top: `${markerPos.y}%` }}
                  transition={{ type: "tween", ease: "linear" }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="relative">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center"
                    >
                      <div className="w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow-lg" />
                    </motion.div>
                    <Badge className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white whitespace-nowrap">
                      Your Delivery Partner
                    </Badge>
                  </div>
                </motion.div>
              </div>
            </Card>
          </div>

          {/* Delivery Partner Info */}
          <div className="space-y-6">
            <Card className="border-none shadow-lg rounded-3xl overflow-hidden dark:bg-gray-900">
              <CardContent className="p-6">
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Delivery Partner</h3>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img src="https://i.pravatar.cc/150?u=delivery" alt="Partner" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-gray-900 dark:text-white">Alex Johnson</h4>
                    <div className="flex items-center gap-1 text-orange-500 font-bold text-sm">
                      <CheckCircle2 size={14} />
                      <span>Verified Partner</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="rounded-xl font-bold gap-2 h-12 border-gray-200 dark:border-gray-800">
                    <Phone size={18} /> Call
                  </Button>
                  <Button 
                    onClick={() => setIsChatOpen(true)}
                    variant="outline" 
                    className="rounded-xl font-bold gap-2 h-12 border-gray-200 dark:border-gray-800"
                  >
                    <MessageSquare size={18} /> Chat
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg rounded-3xl overflow-hidden dark:bg-gray-900">
              <CardContent className="p-6">
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Order Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-400">
                      <Utensils size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase">Restaurant</p>
                      <p className="font-bold text-gray-900 dark:text-white">The Burger House</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-400">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase">Delivery To</p>
                      <p className="font-bold text-gray-900 dark:text-white">452 Park Ave, NY</p>
                    </div>
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

export default OrderTracking;