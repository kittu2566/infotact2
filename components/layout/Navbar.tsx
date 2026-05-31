"use client";

import React from 'react';
import { Search, MapPin, ShoppingCart, User, Menu, ChevronDown, LayoutDashboard, Truck, ShieldCheck, Tag, Calendar, Utensils, LogIn } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from '@/store/useStore';
import { useNavigate, Link } from 'react-router-dom';
import NotificationDropdown from './NotificationDropdown';
import ThemeToggle from './ThemeToggle';
import SearchDropdown from './SearchDropdown';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { cart, setCartOpen, user, setUser, searchQuery, setSearchQuery } = useStore();
  const navigate = useNavigate();
  
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-8">
        {/* Logo */}
        <div 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-300 shadow-lg shadow-orange-200">
            <span className="text-white font-black text-xl">F</span>
          </div>
          <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            Flavor<span className="text-orange-500">Dash</span>
          </span>
        </div>

        {/* Search & Location Bar */}
        <div className="hidden lg:flex flex-1 max-w-2xl items-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-inner relative transition-all focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500/50">
          <div className="flex items-center px-4 gap-2 border-r border-gray-200 dark:border-gray-800 min-w-[180px] cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <MapPin className="text-orange-500" size={18} />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 truncate">New York, USA</span>
            <ChevronDown size={14} className="text-gray-400" />
          </div>
          <div className="flex items-center flex-1 px-4 gap-3">
            <Search className="text-gray-400" size={18} />
            <Input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for restaurants or cuisines..." 
              className="border-none focus-visible:ring-0 bg-transparent h-12 text-sm font-medium placeholder:text-gray-400 dark:text-white"
            />
          </div>
          <SearchDropdown />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link to="/offers" className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors text-sm font-bold text-gray-600 dark:text-gray-400">
            <Tag size={18} className="text-orange-500" />
            Offers
          </Link>
          
          <ThemeToggle />
          <NotificationDropdown />

          <div 
            onClick={() => setCartOpen(true)}
            className="relative cursor-pointer p-3 bg-orange-50 dark:bg-orange-500/10 hover:bg-orange-100 dark:hover:bg-orange-500/20 rounded-2xl transition-all group"
          >
            <ShoppingCart className="text-orange-600 dark:text-orange-500 group-hover:scale-110 transition-transform" size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center border-2 border-white dark:border-gray-950 shadow-sm">
                {cartCount}
              </span>
            )}
          </div>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-2xl flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-gray-900 dark:bg-gray-800 flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <ChevronDown size={16} className="text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 rounded-2xl p-2 shadow-xl border-gray-100 dark:border-gray-800 dark:bg-gray-900" align="end">
                <DropdownMenuLabel className="font-black text-gray-900 dark:text-white px-3 py-2">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-50 dark:bg-gray-800" />
                <DropdownMenuItem onClick={() => navigate('/user')} className="rounded-xl px-3 py-2.5 cursor-pointer focus:bg-orange-50 dark:focus:bg-orange-500/10 focus:text-orange-600 dark:focus:text-orange-500 font-bold gap-3">
                  <User size={18} /> User Panel
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/owner')} className="rounded-xl px-3 py-2.5 cursor-pointer focus:bg-orange-50 dark:focus:bg-orange-500/10 focus:text-orange-600 dark:focus:text-orange-500 font-bold gap-3">
                  <Utensils size={18} /> Restaurant Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/delivery')} className="rounded-xl px-3 py-2.5 cursor-pointer focus:bg-orange-50 dark:focus:bg-orange-500/10 focus:text-orange-600 dark:focus:text-orange-500 font-bold gap-3">
                  <Truck size={18} /> Delivery Panel
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/admin')} className="rounded-xl px-3 py-2.5 cursor-pointer focus:bg-orange-50 dark:focus:bg-orange-500/10 focus:text-orange-600 dark:focus:text-orange-500 font-bold gap-3">
                  <ShieldCheck size={18} /> Admin Panel
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-50 dark:bg-gray-800" />
                <DropdownMenuItem onClick={handleLogout} className="rounded-xl px-3 py-2.5 cursor-pointer focus:bg-red-50 dark:focus:bg-red-500/10 focus:text-red-600 dark:focus:text-red-500 font-bold gap-3">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              onClick={() => navigate('/login')}
              className="bg-gray-900 dark:bg-gray-800 text-white rounded-xl font-bold px-6 h-12 gap-2 hover:bg-orange-500 transition-all"
            >
              <LogIn size={18} />
              Login
            </Button>
          )}
          
          <Button variant="ghost" size="icon" className="lg:hidden rounded-xl">
            <Menu size={24} />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;