"use client";

import React, { useMemo } from 'react';
import RestaurantCard from './RestaurantCard';
import { Restaurant } from '@/types';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'The Burger House',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600',
    rating: 4.5,
    deliveryTime: '25-30 min',
    cuisine: ['Burgers', 'American', 'Fast Food'],
    priceForTwo: 30,
    offers: '50% OFF up to $10',
    isVeg: false
  },
  {
    id: '2',
    name: 'Pizza Palace',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600',
    rating: 4.2,
    deliveryTime: '35-40 min',
    cuisine: ['Pizza', 'Italian', 'Pasta'],
    priceForTwo: 45,
    offers: 'Free Delivery',
    isVeg: true
  },
  {
    id: '13',
    name: 'Sushi Zen',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    deliveryTime: '40-45 min',
    cuisine: ['Japanese', 'Sushi', 'Seafood'],
    priceForTwo: 80,
    offers: 'Premium Selection',
    isVeg: false
  },
  {
    id: '14',
    name: 'Taco Fiesta',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=600',
    rating: 4.4,
    deliveryTime: '20-25 min',
    cuisine: ['Mexican', 'Tacos', 'Burritos'],
    priceForTwo: 25,
    offers: 'Taco Tuesday: 20% OFF',
    isVeg: false
  },
  {
    id: '7',
    name: 'Royal Biryani House',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    deliveryTime: '30-35 min',
    cuisine: ['Biryani', 'Hyderabadi', 'Indian'],
    priceForTwo: 35,
    offers: 'Flat $100 OFF',
    isVeg: false
  },
  {
    id: '15',
    name: 'Sweet Dreams Bakery',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    deliveryTime: '15-20 min',
    cuisine: ['Desserts', 'Cakes', 'Bakery'],
    priceForTwo: 15,
    offers: 'Free Cookie on $20+',
    isVeg: true
  },
  {
    id: '19',
    name: 'Mediterranean Grill',
    image: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=600',
    rating: 4.6,
    deliveryTime: '30-35 min',
    cuisine: ['Mediterranean', 'Hummus', 'Falafel'],
    priceForTwo: 40,
    offers: 'Healthy Choice',
    isVeg: true
  },
  {
    id: '20',
    name: 'Pho Vietnam',
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&q=80&w=600',
    rating: 4.5,
    deliveryTime: '25-30 min',
    cuisine: ['Vietnamese', 'Pho', 'Noodles'],
    priceForTwo: 30,
    isVeg: false
  },
  {
    id: '21',
    name: 'The Steakhouse',
    image: 'https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    deliveryTime: '45-50 min',
    cuisine: ['Steakhouse', 'Grill', 'Fine Dining'],
    priceForTwo: 120,
    offers: 'Wine Pairing Available',
    isVeg: false
  },
  {
    id: '22',
    name: 'Dim Sum House',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=600',
    rating: 4.4,
    deliveryTime: '35-40 min',
    cuisine: ['Chinese', 'Dim Sum', 'Tea'],
    priceForTwo: 55,
    isVeg: false
  },
  {
    id: '23',
    name: 'Smoothie Bar',
    image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    deliveryTime: '10-15 min',
    cuisine: ['Beverages', 'Healthy', 'Juices'],
    priceForTwo: 20,
    offers: 'Freshly Pressed',
    isVeg: true
  },
  {
    id: '24',
    name: 'The Pasta Project',
    image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=600',
    rating: 4.3,
    deliveryTime: '30-35 min',
    cuisine: ['Italian', 'Pasta', 'Wine'],
    priceForTwo: 65,
    isVeg: true
  },
  {
    id: '25',
    name: 'Curry Leaf',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=600',
    rating: 4.5,
    deliveryTime: '25-30 min',
    cuisine: ['Indian', 'Curry', 'South Indian'],
    priceForTwo: 35,
    offers: '20% OFF',
    isVeg: true
  },
  {
    id: '26',
    name: 'Wok & Roll',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80&w=600',
    rating: 4.2,
    deliveryTime: '30-35 min',
    cuisine: ['Chinese', 'Noodles', 'Stir Fry'],
    priceForTwo: 40,
    isVeg: false
  },
  {
    id: '27',
    name: 'The Green Deli',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600',
    rating: 4.6,
    deliveryTime: '15-20 min',
    cuisine: ['Healthy', 'Salads', 'Sandwiches'],
    priceForTwo: 25,
    isVeg: true
  }
];

const RestaurantGrid = () => {
  const { searchQuery, activeFilter, setActiveFilter } = useStore();

  const filteredRestaurants = useMemo(() => {
    return mockRestaurants.filter((res) => {
      const matchesSearch = res.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           res.cuisine.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
      
      let matchesFilter = true;
      if (activeFilter === 'Rating 4.0+') matchesFilter = res.rating >= 4.0;
      if (activeFilter === 'Pure Veg') matchesFilter = res.isVeg === true;
      if (activeFilter === 'Fast Delivery') matchesFilter = parseInt(res.deliveryTime) <= 25;

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  const filters = ['All', 'Rating 4.0+', 'Pure Veg', 'Fast Delivery'];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              {searchQuery ? `Results for "${searchQuery}"` : 'Top restaurants in your area'}
            </h2>
            <p className="text-gray-500 font-medium">
              {filteredRestaurants.length} restaurants found
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm border",
                  activeFilter === filter 
                    ? "bg-orange-500 border-orange-500 text-white" 
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        
        {filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No restaurants found</h3>
            <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RestaurantGrid;