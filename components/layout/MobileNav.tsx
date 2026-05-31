"use client";

import React from 'react';
import { Home, Search, ShoppingBag, User, Heart, Tag } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useStore } from '@/store/useStore';

const MobileNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, setCartOpen } = useStore();
  
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Tag, label: 'Offers', path: '/offers' },
    { icon: ShoppingBag, label: 'Cart', onClick: () => setCartOpen(true) },
    { icon: Heart, label: 'Saved', path: '/user?tab=favorites' },
    { icon: User, label: 'Profile', path: '/user' },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-100 px-6 py-3 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <button
              key={item.label}
              onClick={item.onClick || (() => navigate(item.path!))}
              className="flex flex-col items-center gap-1 relative group"
            >
              <div className={cn(
                "p-2 rounded-2xl transition-all duration-300",
                isActive ? "bg-orange-500 text-white scale-110 shadow-lg shadow-orange-200" : "text-gray-400 hover:text-gray-600"
              )}>
                <Icon size={20} />
                {item.label === 'Cart' && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className={cn(
                "text-[10px] font-bold transition-colors",
                isActive ? "text-orange-600" : "text-gray-400"
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;