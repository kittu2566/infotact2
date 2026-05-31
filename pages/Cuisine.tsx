"use client";

import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import RestaurantCard from '@/components/home/RestaurantCard';
import { ChevronLeft, Search, SlidersHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useStore } from '@/store/useStore';

const Cuisine = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const { searchQuery } = useStore();

  // Mock data for specific cuisines
  const restaurants = [
    {
      id: '1',
      name: 'The Burger House',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600',
      rating: 4.5,
      deliveryTime: '25-30 min',
      cuisine: ['Burgers', 'American'],
      priceForTwo: 30,
      isVeg: false
    },
    {
      id: '2',
      name: 'Pizza Palace',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600',
      rating: 4.2,
      deliveryTime: '35-40 min',
      cuisine: ['Pizza', 'Italian'],
      priceForTwo: 45,
      isVeg: true
    },
    {
      id: '13',
      name: 'Sushi Zen',
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=600',
      rating: 4.8,
      deliveryTime: '40-45 min',
      cuisine: ['Japanese', 'Sushi'],
      priceForTwo: 80,
      isVeg: false
    }
  ];

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(res => 
      res.cuisine.some(c => c.toLowerCase() === type?.toLowerCase())
    );
  }, [type]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-orange-500 mb-8 transition-colors"
        >
          <ChevronLeft size={16} />
          Back to Home
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white capitalize mb-2">
              Best {type} in Town
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              Discover {filteredRestaurants.length} top-rated {type} spots near you.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl font-bold border-gray-200 dark:border-gray-800 gap-2">
              <SlidersHorizontal size={18} /> Filters
            </Button>
          </div>
        </div>

        {filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRestaurants.map((res) => (
              <RestaurantCard key={res.id} restaurant={res} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">No {type} restaurants found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try exploring other cuisines or adjusting your location.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cuisine;