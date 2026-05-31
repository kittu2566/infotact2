"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import DailySpecials from '@/components/home/DailySpecials';
import CategorySection from '@/components/home/CategorySection';
import TopBrands from '@/components/home/TopBrands';
import Collections from '@/components/home/Collections';
import RestaurantGrid from '@/components/home/RestaurantGrid';
import TrendingSection from '@/components/home/TrendingSection';
import SurpriseMe from '@/components/home/SurpriseMe';
import MobileNav from '@/components/layout/MobileNav';
import { Smartphone, ShieldCheck, Zap, Star, Sparkles, ArrowRight } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col pb-20 lg:pb-0">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <DailySpecials />
        
        {/* Pro Promotion Banner */}
        <section className="py-6 bg-orange-500">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Sparkles size={24} />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-black">Get FlavorDash Pro</h3>
                  <p className="text-sm text-orange-100 font-medium">Unlimited free delivery and exclusive member-only deals.</p>
                </div>
              </div>
              <Button 
                onClick={() => navigate('/pro')}
                className="bg-white text-orange-500 hover:bg-gray-100 rounded-xl font-black px-8 h-12 gap-2"
              >
                Learn More
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white dark:bg-gray-950 border-b border-gray-50 dark:border-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex items-start gap-4 text-left">
                <div className="w-14 h-14 bg-orange-50 dark:bg-orange-500/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Zap className="text-orange-500" size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white mb-1">Lightning Fast</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">Average delivery time of 25 minutes to your doorstep.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 text-left">
                <div className="w-14 h-14 bg-green-50 dark:bg-green-500/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="text-green-600" size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white mb-1">Safe & Secure</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">Contactless delivery and secure payment options for peace of mind.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 text-left">
                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Star className="text-blue-600" size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white mb-1">Top Rated</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">Only the best restaurants with 4+ star ratings are featured.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CategorySection />
        <SurpriseMe />
        <TrendingSection />
        <Collections />
        <TopBrands />
        <RestaurantGrid />
        
        {/* App Download Section */}
        <section className="py-24 bg-gray-900 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-500/5 skew-x-12 translate-x-20" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
              <div className="flex-1 text-center lg:text-left">
                <Badge className="bg-orange-500 text-white mb-6 px-4 py-1 rounded-full font-bold">MOBILE APP</Badge>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                  Your favorite food, <br />
                  <span className="text-orange-500">just a tap away.</span>
                </h2>
                <p className="text-xl text-gray-400 mb-10 max-w-xl">
                  Download the FlavorDash app for exclusive offers, real-time tracking, and a smoother ordering experience.
                </p>
                
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12">
                  <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-gray-100 transition-all">
                    <Smartphone size={24} />
                    App Store
                  </button>
                  <button className="bg-gray-800 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-gray-700 transition-all border border-gray-700">
                    <Smartphone size={24} />
                    Google Play
                  </button>
                </div>
                
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-gray-900 bg-gray-800" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">Joined by 50k+ users this month</p>
                </div>
              </div>
              
              <div className="flex-1 relative">
                <div className="relative z-10 animate-float">
                  <img 
                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600" 
                    alt="Mobile App" 
                    className="w-72 md:w-96 rounded-[3.5rem] shadow-2xl border-[12px] border-gray-800 mx-auto"
                  />
                </div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/20 blur-3xl rounded-full" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-500/20 blur-3xl rounded-full" />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6 text-left">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-sm">F</span>
                </div>
                <span className="text-xl font-black text-gray-900 dark:text-white">FlavorDash</span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                The world's fastest food delivery service. Bringing your favorite meals from the kitchen to your table in minutes.
              </p>
            </div>
            <div className="text-left">
              <h4 className="font-black text-gray-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Company</h4>
              <ul className="space-y-4 text-sm font-bold text-gray-500 dark:text-gray-400">
                <li className="hover:text-orange-500 cursor-pointer transition-colors">About Us</li>
                <li className="hover:text-orange-500 cursor-pointer transition-colors">Careers</li>
                <li className="hover:text-orange-500 cursor-pointer transition-colors">Blog</li>
                <li className="hover:text-orange-500 cursor-pointer transition-colors">Contact</li>
              </ul>
            </div>
            <div className="text-left">
              <h4 className="font-black text-gray-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Legal</h4>
              <ul className="space-y-4 text-sm font-bold text-gray-500 dark:text-gray-400">
                <li className="hover:text-orange-500 cursor-pointer transition-colors">Terms of Service</li>
                <li className="hover:text-orange-500 cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-orange-500 cursor-pointer transition-colors">Cookie Policy</li>
              </ul>
            </div>
            <div className="text-left">
              <h4 className="font-black text-gray-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Newsletter</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Get the latest offers and news.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="flex-1 px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
                <button className="bg-gray-900 dark:bg-gray-800 text-white px-4 py-2 rounded-xl font-bold text-sm">Join</button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-100 dark:border-gray-900 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400 text-xs font-bold">
            <p>© 2024 FlavorDash. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <MobileNav />
    </div>
  );
};

export default Index;