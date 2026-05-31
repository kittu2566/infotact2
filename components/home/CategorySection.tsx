"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { id: '1', name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400' },
  { id: '2', name: 'Burgers', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=400' },
  { id: '3', name: 'Sushi', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=400' },
  { id: '4', name: 'Desserts', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=400' },
  { id: '5', name: 'Healthy', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400' },
  { id: '6', name: 'Pasta', image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=400' },
  { id: '7', name: 'Biryani', image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&q=80&w=400' },
  { id: '8', name: 'Chinese', image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80&w=400' },
];

const CategorySection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
              Inspiration for your first order
            </h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Explore the best cuisines in your city</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-orange-500 font-bold hover:text-orange-600 transition-colors group">
            View All Cuisines
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8">
          {categories.map((cat, index) => (
            <motion.div 
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.05,
                type: "spring",
                stiffness: 100
              }}
              onClick={() => navigate(`/cuisine/${cat.name}`)}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4">
                <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-orange-500/20 group-hover:scale-110 transition-all duration-500" />
                <div className="w-full h-full rounded-full overflow-hidden shadow-lg group-hover:shadow-orange-500/20 transition-all duration-500">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
                <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
              </div>
              <span className="text-base font-bold text-gray-700 dark:text-gray-300 group-hover:text-orange-500 transition-colors tracking-tight">
                {cat.name}
              </span>
            </motion.div>
          ))}
        </div>
        
        <button className="w-full mt-10 md:hidden flex items-center justify-center gap-2 py-4 bg-gray-50 dark:bg-gray-900 rounded-2xl text-gray-900 dark:text-white font-bold border border-gray-100 dark:border-gray-800">
          View All Cuisines
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
};

export default CategorySection;