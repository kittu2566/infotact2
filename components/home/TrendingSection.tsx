"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Star, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const trendingRestaurants = [
  {
    id: '1',
    name: 'The Burger House',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400',
    rating: 4.8,
    time: '20-25 min',
    trend: 'Up 15% this week'
  },
  {
    id: '13',
    name: 'Sushi Zen',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    time: '30-35 min',
    trend: 'Most ordered today'
  },
  {
    id: '7',
    name: 'Royal Biryani',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=400',
    rating: 4.7,
    time: '25-30 min',
    trend: 'Top rated in NY'
  }
];

const TrendingSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-500">
            <TrendingUp size={24} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Trending Near You</h2>
            <p className="text-sm text-gray-500 font-medium">What everyone's eating right now</p>
          </div>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar">
          {trendingRestaurants.map((res, index) => (
            <motion.div
              key={res.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(`/restaurant/${res.id}`)}
              className="min-w-[280px] md:min-w-[320px] group cursor-pointer"
            >
              <div className="relative h-48 rounded-[2rem] overflow-hidden mb-4 shadow-lg group-hover:shadow-xl transition-all duration-500">
                <img src={res.image} alt={res.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Star size={12} className="fill-orange-500 text-orange-500" />
                  <span className="text-xs font-black text-gray-900">{res.rating}</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <span className="text-white font-black text-lg">{res.name}</span>
                  <div className="flex items-center gap-1 text-white/90 text-xs font-bold">
                    <Clock size={12} />
                    {res.time}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black text-red-500 uppercase tracking-widest bg-red-50 w-fit px-3 py-1 rounded-lg">
                <TrendingUp size={10} />
                {res.trend}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;