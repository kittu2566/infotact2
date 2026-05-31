"use client";

import React from 'react';
import { Award, Gift, Zap, ArrowRight, Star } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

const RewardsSection = () => {
  const { user } = useStore();
  const points = user?.points || 0;
  const nextTier = 1000;
  const progress = (points / nextTier) * 100;

  const rewards = [
    { id: 'r1', title: '$5 Discount', cost: 500, icon: Gift, color: 'bg-blue-50 text-blue-600' },
    { id: 'r2', title: 'Free Delivery', cost: 300, icon: Zap, color: 'bg-orange-50 text-orange-600' },
    { id: 'r3', title: 'BOGO Coupon', cost: 800, icon: Star, color: 'bg-purple-50 text-purple-600' },
  ];

  return (
    <div className="space-y-8">
      <Card className="border-none shadow-xl bg-gray-900 text-white rounded-[2.5rem] overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
        <CardContent className="p-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <p className="text-orange-500 font-black uppercase tracking-widest text-xs mb-2">Loyalty Program</p>
              <h3 className="text-3xl font-black">FlavorDash Gold</h3>
            </div>
            <div className="text-right">
              <p className="text-4xl font-black text-orange-500">{points}</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Available Points</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-sm font-bold">
              <span className="text-gray-400">Progress to Platinum</span>
              <span className="text-white">{points} / {nextTier}</span>
            </div>
            <Progress value={progress} className="h-3 bg-white/10" />
            <p className="text-xs text-gray-500 font-medium">Earn {nextTier - points} more points to unlock Platinum benefits!</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rewards.map((reward) => (
          <Card key={reward.id} className="border-none shadow-md rounded-3xl hover:shadow-lg transition-all group">
            <CardContent className="p-6">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", reward.color)}>
                <reward.icon size={24} />
              </div>
              <h4 className="text-lg font-black text-gray-900 mb-1">{reward.title}</h4>
              <p className="text-sm text-gray-500 font-bold mb-6">{reward.cost} Points</p>
              <Button 
                disabled={points < reward.cost}
                className={cn(
                  "w-full rounded-xl font-bold h-11",
                  points >= reward.cost ? "bg-gray-900 text-white hover:bg-orange-500" : "bg-gray-100 text-gray-400"
                )}
              >
                Redeem
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-500 shadow-sm">
            <Award size={24} />
          </div>
          <div>
            <h4 className="font-black text-gray-900">Refer a Friend</h4>
            <p className="text-sm text-gray-500 font-medium">Get 200 points for every friend who joins!</p>
          </div>
        </div>
        <Button variant="ghost" className="text-orange-600 font-black gap-2 hover:bg-white">
          Invite <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
};

export default RewardsSection;