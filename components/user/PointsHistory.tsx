"use client";

import React from 'react';
import { useStore } from '@/store/useStore';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const PointsHistory = () => {
  const { pointsHistory } = useStore();

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-black text-gray-900 mb-6">Points History</h3>
      {pointsHistory.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
          <p className="text-gray-500 font-medium">No transactions yet. Start ordering to earn points!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {pointsHistory.map((item) => (
            <Card key={item.id} className="border-none shadow-sm rounded-2xl overflow-hidden hover:bg-gray-50 transition-colors">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    item.type === 'earn' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                  )}>
                    {item.type === 'earn' ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{item.reason}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                      <Clock size={12} />
                      <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className={cn(
                  "text-lg font-black",
                  item.type === 'earn' ? "text-green-600" : "text-red-600"
                )}>
                  {item.type === 'earn' ? '+' : '-'}{item.amount}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PointsHistory;