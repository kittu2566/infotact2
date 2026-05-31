"use client";

import React from 'react';
import { motion } from 'framer-motion';

const brands = [
  { id: 'b1', name: "McDonald's", logo: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=100&h=100', time: '20 min' },
  { id: 'b2', name: "Burger King", logo: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=100&h=100', time: '25 min' },
  { id: 'b3', name: "Domino's", logo: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=100&h=100', time: '30 min' },
  { id: 'b4', name: "KFC", logo: 'https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?auto=format&fit=crop&q=80&w=100&h=100', time: '22 min' },
  { id: 'b5', name: "Subway", logo: 'https://images.unsplash.com/photo-1550507992-eb63ffee0847?auto=format&fit=crop&q=80&w=100&h=100', time: '15 min' },
  { id: 'b6', name: "Pizza Hut", logo: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=80&w=100&h=100', time: '35 min' },
  { id: 'b7', name: "Starbucks", logo: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=100&h=100', time: '10 min' },
];

const TopBrands = () => {
  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight mb-8">Top brands for you</h2>
        
        <div className="flex gap-8 overflow-x-auto pb-4 no-scrollbar">
          {brands.map((brand) => (
            <motion.div 
              key={brand.id}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center min-w-[100px] cursor-pointer group"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-gray-100 shadow-sm overflow-hidden mb-3 group-hover:shadow-md transition-shadow">
                <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-bold text-gray-900 text-center">{brand.name}</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{brand.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopBrands;