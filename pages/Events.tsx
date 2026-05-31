"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { useStore } from '@/store/useStore';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { showSuccess } from '@/utils/toast';

const Events = () => {
  const { events } = useStore();

  const handleBook = (title: string) => {
    showSuccess(`Spot booked for ${title}! Check your email for details.`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <Badge className="bg-purple-100 text-purple-600 mb-4 px-4 py-1 rounded-full font-bold uppercase tracking-wider">Exclusive Experiences</Badge>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Dining Events</h1>
              <p className="text-gray-500 text-lg max-w-2xl">Discover unique culinary workshops, tastings, and festivals happening in your city.</p>
            </div>
            <div className="flex gap-2">
              {['All', 'Workshop', 'Tasting', 'Festival'].map((cat) => (
                <Button key={cat} variant="outline" className="rounded-xl font-bold border-gray-200 hover:bg-white">
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden group h-full flex flex-col">
                  <div className="relative h-56 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 backdrop-blur-md text-gray-900 border-none font-black px-3 py-1 rounded-lg">
                        {event.category}
                      </Badge>
                    </div>
                    <div className="absolute bottom-6 left-6">
                      <h3 className="text-xl font-black text-white">{event.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-8 flex-1 flex flex-col">
                    <p className="text-gray-500 mb-6 leading-relaxed line-clamp-2">{event.description}</p>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                        <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                          <Calendar size={16} />
                        </div>
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                        <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                          <MapPin size={16} />
                        </div>
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Price</p>
                        <p className="text-2xl font-black text-gray-900">${event.price}</p>
                      </div>
                      <Button 
                        onClick={() => handleBook(event.title)}
                        className="bg-gray-900 hover:bg-orange-500 text-white rounded-2xl font-black px-8 h-12 gap-2 transition-all"
                      >
                        Book Spot
                        <ArrowRight size={18} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Host Section */}
          <div className="mt-20 p-12 bg-orange-500 rounded-[3rem] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-xl text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-black mb-4">Host your own event?</h2>
                <p className="text-orange-100 text-lg mb-8">Are you a chef or a restaurant owner? Share your passion with our community and host your own culinary experience.</p>
                <Button className="bg-white text-orange-500 hover:bg-gray-100 h-14 px-10 rounded-2xl font-black text-lg">
                  Become a Host
                </Button>
              </div>
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-16 h-16 rounded-full border-4 border-orange-500 overflow-hidden bg-white">
                    <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="Host" />
                  </div>
                ))}
                <div className="w-16 h-16 rounded-full border-4 border-orange-500 bg-orange-400 flex items-center justify-center font-black text-white">
                  +12
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Events;