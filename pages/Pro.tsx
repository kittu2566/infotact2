"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Zap, Truck, Star, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { showSuccess } from '@/utils/toast';

const Pro = () => {
  const benefits = [
    { icon: Truck, title: 'Unlimited Free Delivery', desc: 'Zero delivery fees on all orders above $15.' },
    { icon: Zap, title: 'Priority Support', desc: 'Skip the queue and get instant help from our top agents.' },
    { icon: Star, title: 'Exclusive Discounts', desc: 'Access to "Pro-only" deals and up to 30% extra off.' },
    { icon: ShieldCheck, title: 'FlavorDash Guarantee+', desc: 'Extended protection and instant refunds for any issue.' },
  ];

  const handleSubscribe = () => {
    showSuccess("Welcome to FlavorDash Pro! Your benefits are now active.");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-500 font-black text-xs uppercase tracking-widest mb-6"
            >
              <Sparkles size={14} />
              Premium Membership
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
              FlavorDash <span className="text-orange-500">Pro</span>
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Elevate your dining experience with exclusive benefits, faster delivery, and massive savings.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="space-y-8">
              {benefits.map((benefit, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-orange-500 flex-shrink-0">
                    <benefit.icon size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-1">{benefit.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{benefit.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-orange-500 blur-[100px] opacity-20 rounded-full" />
              <Card className="relative border-none shadow-2xl rounded-[3rem] overflow-hidden bg-gray-900 text-white p-12">
                <div className="text-center space-y-8">
                  <div>
                    <p className="text-orange-500 font-black uppercase tracking-widest text-sm mb-2">Annual Plan</p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-6xl font-black">$9.99</span>
                      <span className="text-gray-400 font-bold">/ month</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-4">Billed annually at $119.88</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm font-bold">
                      <CheckCircle2 className="text-green-500" size={20} />
                      <span>Save $40 compared to monthly</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-bold">
                      <CheckCircle2 className="text-green-500" size={20} />
                      <span>Cancel anytime</span>
                    </div>
                  </div>

                  <Button 
                    onClick={handleSubscribe}
                    className="w-full h-16 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-xl shadow-lg shadow-orange-500/20 group"
                  >
                    Get Pro Now
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">
                    7-Day Free Trial Included
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Comparison Table */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-[3rem] p-12">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-12 text-center">Why go Pro?</h2>
            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-1" />
              <div className="text-center font-black text-gray-400 uppercase tracking-widest text-xs">Free</div>
              <div className="text-center font-black text-orange-500 uppercase tracking-widest text-xs">Pro</div>
              
              {[
                { label: 'Delivery Fee', free: '$2.99 - $5.99', pro: 'Always $0' },
                { icon: true, label: 'Priority Delivery', free: false, pro: true },
                { icon: true, label: 'Exclusive Offers', free: false, pro: true },
                { label: 'Points Multiplier', free: '1x', pro: '2x' },
              ].map((row, i) => (
                <React.Fragment key={i}>
                  <div className="font-bold text-gray-700 dark:text-gray-300">{row.label}</div>
                  <div className="text-center text-gray-500">
                    {typeof row.free === 'boolean' ? (row.free ? <CheckCircle2 className="mx-auto text-green-500" size={20} /> : '—') : row.free}
                  </div>
                  <div className="text-center font-black text-gray-900 dark:text-white">
                    {typeof row.pro === 'boolean' ? (row.pro ? <CheckCircle2 className="mx-auto text-orange-500" size={20} /> : '—') : row.pro}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pro;