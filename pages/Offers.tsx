"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tag, Ticket, Clock, ArrowRight, Percent } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const offers = [
  {
    id: 'o1',
    title: '50% OFF on First Order',
    description: 'Get a massive discount on your very first order with FlavorDash.',
    code: 'WELCOME50',
    expiry: 'Valid for 7 days',
    color: 'bg-orange-500',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'o2',
    title: 'Free Delivery on $20+',
    description: 'Enjoy zero delivery fees on all orders above $20 from selected brands.',
    code: 'FREEDEL',
    expiry: 'Ends in 2 days',
    color: 'bg-blue-600',
    image: 'https://images.unsplash.com/photo-1526367790999-0150786486a9?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'o3',
    title: 'Buy 1 Get 1 Free',
    description: 'Double the deliciousness! Available at all Pizza Palace outlets.',
    code: 'BOGOPIZZA',
    expiry: 'Every Tuesday',
    color: 'bg-red-600',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'o4',
    title: '$10 Cashback on Visa',
    description: 'Pay using any Visa card and get $10 back in your FlavorDash wallet.',
    code: 'VISASAVE',
    expiry: 'Limited time offer',
    color: 'bg-green-600',
    image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=400'
  }
];

const Offers = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-orange-100 text-orange-600 mb-4 px-4 py-1 rounded-full font-bold">EXCLUSIVE DEALS</Badge>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Offers for you</h1>
            <p className="text-gray-500 text-lg">Save big on your favorite meals with these exclusive promo codes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden group h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img src={offer.image} alt={offer.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <div className={`${offer.color} text-white p-2 rounded-xl inline-flex mb-2`}>
                        <Percent size={20} />
                      </div>
                      <h3 className="text-xl font-black text-white">{offer.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-8 flex-1 flex flex-col">
                    <p className="text-gray-500 mb-6 leading-relaxed">{offer.description}</p>
                    
                    <div className="mt-auto space-y-6">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <div className="flex items-center gap-2">
                          <Ticket className="text-orange-500" size={18} />
                          <span className="font-black text-gray-900 tracking-widest">{offer.code}</span>
                        </div>
                        <button className="text-xs font-black text-orange-500 uppercase tracking-widest hover:text-orange-600">
                          Copy Code
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                          <Clock size={14} />
                          {offer.expiry}
                        </div>
                        <Button 
                          onClick={() => navigate('/')}
                          className="bg-gray-900 hover:bg-orange-500 text-white rounded-xl font-bold gap-2 transition-colors"
                        >
                          Use Now
                          <ArrowRight size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 p-12 bg-gray-900 rounded-[3rem] text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
            <h2 className="text-3xl font-black text-white mb-4">Want more deals?</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">Subscribe to our newsletter and get exclusive weekly offers delivered to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-6 py-4 rounded-2xl bg-white/10 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              />
              <Button className="bg-orange-500 hover:bg-orange-600 text-white h-14 px-8 rounded-2xl font-black">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Offers;