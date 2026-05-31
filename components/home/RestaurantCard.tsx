"use client";

import React from 'react';
import { Star, Clock, Heart } from 'lucide-react';
import { Restaurant } from '@/types';
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

interface Props {
  restaurant: Restaurant;
}

const RestaurantCard = ({ restaurant }: Props) => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useStore();
  const isFavorite = favorites.includes(restaurant.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(restaurant.id);
  };

  // Ensure we have a valid image URL
  const imageUrl = restaurant.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600";

  return (
    <div 
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
      className="group bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 border border-gray-100 dark:border-gray-800 cursor-pointer flex flex-col h-full"
    >
      <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img 
          src={imageUrl} 
          alt={restaurant.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {restaurant.offers && (
          <div className="absolute bottom-4 left-4">
            <Badge className="bg-orange-500 text-white border-none px-4 py-1.5 font-black text-xs rounded-xl shadow-lg">
              {restaurant.offers}
            </Badge>
          </div>
        )}
        
        <button 
          onClick={handleToggleFavorite}
          className={cn(
            "absolute top-4 right-4 p-2.5 backdrop-blur-md rounded-2xl transition-all shadow-sm",
            isFavorite ? "bg-red-500 text-white" : "bg-white/90 dark:bg-gray-800/90 text-gray-400 hover:text-red-500"
          )}
        >
          <Heart size={18} className={isFavorite ? "fill-white" : ""} />
        </button>
      </div>
      
      <div className="p-6 flex flex-col flex-1 text-left">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-black text-gray-900 dark:text-white truncate group-hover:text-orange-500 transition-colors">{restaurant.name}</h3>
          <div className="flex items-center gap-1 bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-lg">
            <Star size={14} className="fill-green-600 text-green-600" />
            <span className="text-xs font-black text-green-700 dark:text-green-500">{restaurant.rating}</span>
          </div>
        </div>
        
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 line-clamp-1">
          {restaurant.cuisine.join(' • ')}
        </p>
        
        <div className="mt-auto pt-4 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
              <Clock size={16} className="text-orange-500" />
              <span className="text-xs font-bold">{restaurant.deliveryTime}</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
            <span className="text-xs font-bold text-gray-600 dark:text-gray-400">${restaurant.priceForTwo} for two</span>
          </div>
          
          {restaurant.isVeg && (
            <div className="w-5 h-5 border-2 border-green-600 flex items-center justify-center p-[3px] rounded-sm">
              <div className="w-full h-full bg-green-600 rounded-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;