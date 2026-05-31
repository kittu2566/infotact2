"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const restaurants = [
  { id: '1', name: 'The Burger House', cuisine: 'Burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400' },
  { id: '2', name: 'Pizza Palace', cuisine: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400' },
  { id: '13', name: 'Sushi Zen', cuisine: 'Japanese', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=400' },
  { id: '7', name: 'Royal Biryani', cuisine: 'Indian', image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&q=80&w=400' },
];

const SurpriseMe = () => {
  const [selected, setSelected] = useState<typeof restaurants[0] | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const navigate = useNavigate();

  const handleSurprise = () => {
    setIsSpinning(true);
    setSelected(null);
    
    setTimeout(() => {
      const random = restaurants[Math.floor(Math.random() * restaurants.length)];
      setSelected(random);
      setIsSpinning(false);
    }, 1500);
  };

  return (
    <section className="py-12 bg-orange-50 dark:bg-orange-500/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 shadow-xl border border-orange-100 dark:border-orange-500/10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-500 font-black text-xs uppercase tracking-widest mb-6">
              <Sparkles size={14} />
              Can't Decide?
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
              Let us pick for you!
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium">
              Spin the wheel of flavor and discover your next favorite meal. We'll suggest a top-rated restaurant near you.
            </p>
            <Button 
              onClick={handleSurprise}
              disabled={isSpinning}
              className="h-14 px-8 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-lg shadow-lg shadow-orange-200 dark:shadow-none gap-3"
            >
              {isSpinning ? <RefreshCw className="animate-spin" /> : <Sparkles />}
              {isSpinning ? "Picking..." : "Surprise Me!"}
            </Button>
          </div>

          <div className="w-full md:w-80 h-80 relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              {isSpinning ? (
                <motion.div
                  key="spinning"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="w-64 h-64 rounded-full border-8 border-dashed border-orange-500/20 flex items-center justify-center"
                >
                  <RefreshCw size={64} className="text-orange-500 animate-spin" />
                </motion.div>
              ) : selected ? (
                <motion.div
                  key="selected"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="w-full h-full bg-gray-50 dark:bg-gray-800 rounded-[2.5rem] overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col"
                >
                  <div className="h-40 overflow-hidden">
                    <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-black text-gray-900 dark:text-white text-xl">{selected.name}</h3>
                      <p className="text-sm text-gray-500 font-bold">{selected.cuisine}</p>
                    </div>
                    <button 
                      onClick={() => navigate(`/restaurant/${selected.id}`)}
                      className="flex items-center gap-2 text-orange-500 font-black text-sm hover:gap-3 transition-all"
                    >
                      Order Now <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-64 h-64 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-300"
                >
                  <Sparkles size={80} className="opacity-20" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SurpriseMe;