"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const collections = [
  {
    id: 'c1',
    title: 'Newly Opened',
    count: '12 Places',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'c2',
    title: 'Best of Live Music',
    count: '8 Places',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'c3',
    title: 'Top Trending Spots',
    count: '15 Places',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'c4',
    title: 'Pocket Friendly',
    count: '20 Places',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=400',
  }
];

const Collections = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-2">Collections</h2>
            <p className="text-gray-500 font-medium">Explore curated lists of top restaurants, cafes, and bars</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-orange-500 font-bold hover:text-orange-600 transition-colors group">
            All collections in New York
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative h-80 rounded-2xl overflow-hidden cursor-pointer group"
            >
              <img 
                src={collection.image} 
                alt={collection.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-xl font-black text-white mb-1">{collection.title}</h3>
                <div className="flex items-center gap-2 text-white/80 text-sm font-bold">
                  <span>{collection.count}</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;