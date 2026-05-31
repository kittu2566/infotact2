"use client";

import React, { useMemo } from 'react';
import { useStore } from '@/store/useStore';
import { useNavigate } from 'react-router-dom';
import { Star, Clock, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const mockRestaurants = [
  { id: '1', name: 'The Burger House', rating: 4.5, time: '25-30 min', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=100' },
  { id: '2', name: 'Pizza Palace', rating: 4.2, time: '35-40 min', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=100' },
  { id: '13', name: 'Sushi Zen', rating: 4.8, time: '40-45 min', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=100' },
];

const SearchDropdown = () => {
  const { searchQuery, setSearchQuery } = useStore();
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return mockRestaurants.filter(r => 
      r.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  if (results.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50"
      >
        <div className="p-2">
          {results.map((res) => (
            <div
              key={res.id}
              onClick={() => {
                navigate(`/restaurant/${res.id}`);
                setSearchQuery("");
              }}
              className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl cursor-pointer transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <img src={res.image} alt={res.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">{res.name}</h4>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Star size={12} className="fill-orange-500 text-orange-500" />
                    <span>{res.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{res.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div 
          onClick={() => {
            navigate('/');
            setSearchQuery(searchQuery);
          }}
          className="p-3 bg-gray-50 dark:bg-gray-800/50 text-center border-t border-gray-100 dark:border-gray-800 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <p className="text-xs font-black text-orange-500 uppercase tracking-widest">View all results</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchDropdown;