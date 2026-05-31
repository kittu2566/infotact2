"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const specials = [
  { id: 's1', name: '50% OFF Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=200', brand: 'Pizza Palace' },
  { id: 's2', name: 'Free Drink', image: 'https://images.unsplash.com/photo-1543253687-c931c8e01820?auto=format&fit=crop&q=80&w=200', brand: 'Burger House' },
  { id: 's3', name: 'BOGO Sushi', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=200', brand: 'Sushi Zen' },
  { id: 's4', name: 'New Dessert', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=200', brand: 'Sweet Dreams' },
  { id: 's5', name: 'Vegan Bowl', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=200', brand: 'Green Deli' },
  { id: 's6', name: 'Spicy Tacos', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=200', brand: 'Taco Fiesta' },
];

const DailySpecials = () => {
  return (
    <section className="py-8 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
          {/* Add Story Button */}
          <div className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group">
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-200 dark:border-gray-800 flex items-center justify-center group-hover:border-orange-500 transition-colors">
              <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-400 group-hover:text-orange-500 transition-colors">
                <Plus size={24} />
              </div>
            </div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Your Story</span>
          </div>

          {specials.map((special, index) => (
            <motion.div
              key={special.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group"
            >
              <div className="relative p-1 rounded-full bg-gradient-to-tr from-orange-500 via-red-500 to-purple-500 group-hover:rotate-12 transition-transform duration-500">
                <div className="w-[72px] h-[72px] rounded-full border-2 border-white dark:border-gray-950 overflow-hidden">
                  <img src={special.image} alt={special.name} className="w-full h-full object-cover" />
                </div>
                {index < 2 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-gray-950" />
                )}
              </div>
              <span className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-widest truncate max-w-[80px]">
                {special.brand}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DailySpecials;