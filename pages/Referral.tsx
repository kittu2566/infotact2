"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { useStore } from '@/store/useStore';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Copy, Share2, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { showSuccess } from '@/utils/toast';
import { motion } from 'framer-motion';

const Referral = () => {
  const { referralCode } = useStore();

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    showSuccess("Referral code copied to clipboard!");
  };

  const steps = [
    { icon: Share2, title: 'Share your code', desc: 'Send your unique referral code to your friends.' },
    { icon: Users, title: 'Friends join', desc: 'They get $10 off their first order using your code.' },
    { icon: Gift, title: 'Get rewarded', desc: 'You earn 200 points for every successful referral.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-20 h-20 bg-orange-100 text-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Gift size={40} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Refer & Earn</h1>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Share the joy of delicious food with your friends and earn rewards for every successful referral.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {steps.map((step, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto text-orange-500">
                  <step.icon size={28} />
                </div>
                <h3 className="font-black text-gray-900">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-gray-900 text-white relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
            <CardContent className="p-12 relative z-10 text-center">
              <h2 className="text-3xl font-black mb-8">Your Referral Code</h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                <div className="flex-1 w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 font-black text-2xl tracking-widest text-orange-500">
                  {referralCode}
                </div>
                <Button 
                  onClick={handleCopy}
                  className="w-full sm:w-auto h-14 px-8 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black gap-2"
                >
                  <Copy size={20} />
                  Copy
                </Button>
              </div>
              <p className="mt-8 text-gray-400 text-sm font-medium">
                Share this code with your friends and they'll get <span className="text-white font-bold">$10 OFF</span> their first order!
              </p>
            </CardContent>
          </Card>

          <div className="mt-20">
            <h2 className="text-2xl font-black text-gray-900 mb-8 text-center">Recent Referrals</h2>
            <div className="space-y-4">
              {[
                { name: 'Alice Smith', status: 'Completed', date: '2 days ago', points: '+200' },
                { name: 'Bob Johnson', status: 'Pending', date: '5 hours ago', points: '0' },
              ].map((ref, i) => (
                <Card key={i} className="border-none shadow-sm rounded-2xl overflow-hidden">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-400">
                        {ref.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{ref.name}</p>
                        <p className="text-xs text-gray-500">{ref.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={cn(
                        "border-none font-bold",
                        ref.status === 'Completed' ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      )}>
                        {ref.status}
                      </Badge>
                      {ref.status === 'Completed' && (
                        <p className="text-xs font-black text-green-600 mt-1">{ref.points} Points</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Referral;