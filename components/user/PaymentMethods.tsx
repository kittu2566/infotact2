"use client";

import React from 'react';
import { useStore } from '@/store/useStore';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus, Trash2, MoreVertical } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const PaymentMethods = () => {
  const { paymentMethods, removePaymentMethod } = useStore();

  const handleDelete = (id: string) => {
    removePaymentMethod(id);
    showSuccess("Payment method removed.");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-black text-gray-900">Saved Cards</h3>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold gap-2">
          <Plus size={18} /> Add New
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paymentMethods.map((pm) => (
          <Card key={pm.id} className="border-none shadow-md rounded-3xl overflow-hidden group">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-8">
                <div className={`w-12 h-8 rounded flex items-center justify-center font-black text-[10px] uppercase ${
                  pm.type === 'visa' ? 'bg-blue-600 text-white' : 'bg-orange-500 text-white'
                }`}>
                  {pm.type}
                </div>
                <button 
                  onClick={() => handleDelete(pm.id)}
                  className="text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              
              <div className="space-y-1">
                <p className="text-lg font-black text-gray-900 tracking-widest">•••• •••• •••• {pm.last4}</p>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Expires {pm.expiry}</p>
                  {pm.isDefault && (
                    <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest bg-orange-50 px-2 py-1 rounded-lg">
                      Default
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gray-50 p-6 rounded-3xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-center py-12">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-300 mb-4 shadow-sm">
          <CreditCard size={24} />
        </div>
        <h4 className="font-bold text-gray-900">Secure Payments</h4>
        <p className="text-sm text-gray-500 max-w-xs mt-1">
          Your payment information is encrypted and stored securely. We never share your full card details.
        </p>
      </div>
    </div>
  );
};

export default PaymentMethods;