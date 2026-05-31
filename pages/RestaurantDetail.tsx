"use client";

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import MenuSection from '@/components/restaurant/MenuSection';
import ReviewList from '@/components/restaurant/ReviewList';
import ReservationModal from '@/components/restaurant/ReservationModal';
import { Star, Clock, Info, Share2, Heart, ChevronLeft, Calendar, MessageSquare, Utensils } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CartDrawer from '@/components/cart/CartDrawer';
import { cn } from '@/lib/utils';

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'menu' | 'reviews'>('menu');
  const [activeCategory, setActiveCategory] = useState('Recommended');
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  const restaurant = {
    id: id || '1',
    name: "The Burger House",
    rating: 4.5,
    reviews: "2.5k+",
    deliveryTime: "25-30 min",
    cuisine: ["Burgers", "American", "Fast Food"],
    address: "123 Foodie Street, Manhattan, NY",
    offers: "50% OFF up to $10",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1200"
  };

  const categories = ['Recommended', 'Burgers', 'Sides', 'Appetizers', 'Salads', 'Pizza'];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <CartDrawer />
      <ReservationModal 
        isOpen={isReservationOpen} 
        onClose={() => setIsReservationOpen(false)} 
        restaurantName={restaurant.name}
        restaurantId={restaurant.id}
      />
      
      <main className="container mx-auto px-4 py-8">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 mb-6 transition-colors"
        >
          <ChevronLeft size={16} />
          Back to Home
        </button>

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="flex-1">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">{restaurant.name}</h1>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Share2 size={18} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Heart size={18} />
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded-md font-bold">
                <span>{restaurant.rating}</span>
                <Star size={12} className="fill-white" />
              </div>
              <span className="font-medium underline cursor-pointer">{restaurant.reviews} Ratings</span>
              <span className="text-gray-300">|</span>
              <span className="font-medium">{restaurant.cuisine.join(', ')}</span>
            </div>

            <div className="flex flex-wrap items-center gap-6 p-4 bg-gray-50 rounded-2xl border border-gray-100 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="text-gray-400" size={20} />
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Delivery</p>
                  <p className="text-sm font-bold text-gray-900">{restaurant.deliveryTime}</p>
                </div>
              </div>
              <div className="w-px h-8 bg-gray-200 hidden sm:block" />
              <div className="flex items-center gap-2">
                <Info className="text-gray-400" size={20} />
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Offers</p>
                  <p className="text-sm font-bold text-red-500">{restaurant.offers}</p>
                </div>
              </div>
              <div className="w-px h-8 bg-gray-200 hidden sm:block" />
              <Button 
                onClick={() => setIsReservationOpen(true)}
                className="bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold gap-2"
              >
                <Calendar size={18} />
                Book a Table
              </Button>
            </div>
          </div>
          
          <div className="w-full md:w-[400px] h-64 rounded-3xl overflow-hidden shadow-xl">
            <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-gray-100 mb-8">
          <button 
            onClick={() => setActiveTab('menu')}
            className={cn(
              "pb-4 text-lg font-black transition-all relative",
              activeTab === 'menu' ? "text-orange-500" : "text-gray-400 hover:text-gray-600"
            )}
          >
            <div className="flex items-center gap-2">
              <Utensils size={20} />
              Menu
            </div>
            {activeTab === 'menu' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500 rounded-full" />}
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={cn(
              "pb-4 text-lg font-black transition-all relative",
              activeTab === 'reviews' ? "text-orange-500" : "text-gray-400 hover:text-gray-600"
            )}
          >
            <div className="flex items-center gap-2">
              <MessageSquare size={20} />
              Reviews
            </div>
            {activeTab === 'reviews' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500 rounded-full" />}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {activeTab === 'menu' ? (
            <>
              <aside className="hidden lg:block space-y-4 sticky top-28 h-fit">
                <h3 className="font-bold text-gray-900 uppercase text-xs tracking-widest mb-4">Categories</h3>
                {categories.map((cat) => (
                  <button 
                    key={cat} 
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "block w-full text-left py-2 font-medium transition-colors",
                      activeCategory === cat ? "text-orange-500 font-black" : "text-gray-600 hover:text-orange-500"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </aside>
              <div className="lg:col-span-3">
                <MenuSection activeCategory={activeCategory} />
              </div>
            </>
          ) : (
            <div className="lg:col-span-4 max-w-4xl mx-auto w-full">
              <ReviewList />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

import { motion } from 'framer-motion';
export default RestaurantDetail;