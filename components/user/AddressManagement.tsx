"use client";

import React from 'react';
import { useStore } from '@/store/useStore';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Plus, Trash2, Home, Briefcase, MoreVertical } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const AddressManagement = () => {
  const { addresses, removeAddress, setDefaultAddress } = useStore();

  const handleDelete = (id: string) => {
    removeAddress(id);
    showSuccess("Address removed.");
  };

  const handleSetDefault = (id: string) => {
    setDefaultAddress(id);
    showSuccess("Default address updated.");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-black text-gray-900">Saved Addresses</h3>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold gap-2">
          <Plus size={18} /> Add New
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr) => (
          <Card key={addr.id} className="border-none shadow-md rounded-3xl overflow-hidden group">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500">
                    {addr.label === 'Home' ? <Home size={20} /> : <Briefcase size={20} />}
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900">{addr.label}</h4>
                    {addr.isDefault && (
                      <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Default</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  {!addr.isDefault && (
                    <button 
                      onClick={() => handleSetDefault(addr.id)}
                      className="text-xs font-bold text-gray-400 hover:text-orange-500 transition-colors"
                    >
                      Set Default
                    </button>
                  )}
                  <button 
                    onClick={() => handleDelete(addr.id)}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{addr.address}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AddressManagement;