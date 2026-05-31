"use client";

import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft, Clock, ShieldCheck } from 'lucide-react';
import { showSuccess } from '@/utils/toast';
import { cn } from '@/lib/utils';

const WalletSection = () => {
  const { user, walletHistory, addWalletFunds } = useStore();
  const [amount, setAmount] = useState("");

  const handleAddFunds = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return;

    addWalletFunds(val);
    showSuccess(`$${val.toFixed(2)} added to your wallet!`);
    setAmount("");
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Balance Card */}
        <Card className="lg:col-span-2 border-none shadow-xl bg-gray-900 text-white rounded-[2.5rem] overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
          <CardContent className="p-8 relative z-10">
            <div className="flex justify-between items-start mb-12">
              <div>
                <p className="text-orange-500 font-black uppercase tracking-widest text-xs mb-2">FlavorDash Wallet</p>
                <h3 className="text-4xl font-black">${user?.walletBalance.toFixed(2)}</h3>
                <p className="text-gray-400 text-sm mt-1">Available Balance</p>
              </div>
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                <Wallet size={28} className="text-orange-500" />
              </div>
            </div>

            <form onSubmit={handleAddFunds} className="flex gap-3">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                <Input 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount" 
                  className="pl-8 h-14 rounded-2xl bg-white/10 border-white/10 text-white focus-visible:ring-orange-500/50"
                />
              </div>
              <Button type="submit" className="h-14 px-8 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black gap-2">
                <Plus size={20} /> Add Funds
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Security Info */}
        <Card className="border-none shadow-md rounded-[2.5rem] bg-orange-50 p-8 flex flex-col justify-center">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-500 mb-4 shadow-sm">
            <ShieldCheck size={24} />
          </div>
          <h4 className="font-black text-gray-900 mb-2">Secure Wallet</h4>
          <p className="text-sm text-gray-500 leading-relaxed">
            Your funds are protected by industry-standard encryption. Use your balance for faster checkouts and instant refunds.
          </p>
        </Card>
      </div>

      {/* Transaction History */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-gray-900">Transaction History</h3>
        {walletHistory.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-500 font-medium">No transactions yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {walletHistory.map((tx) => (
              <Card key={tx.id} className="border-none shadow-sm rounded-2xl overflow-hidden hover:bg-gray-50 transition-colors">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center",
                      tx.type === 'credit' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                    )}>
                      {tx.type === 'credit' ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{tx.reason}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                        <Clock size={12} />
                        <span>{new Date(tx.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className={cn(
                    "text-lg font-black",
                    tx.type === 'credit' ? "text-green-600" : "text-red-600"
                  )}>
                    {tx.type === 'credit' ? '+' : '-'}${tx.amount.toFixed(2)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletSection;