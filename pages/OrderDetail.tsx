"use client";

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { useStore } from '@/store/useStore';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ShoppingBag, MapPin, CreditCard, Clock, Printer, Share2, RotateCcw } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders, reorder } = useStore();
  
  const order = orders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Order not found</h2>
          <Button onClick={() => navigate('/user')} className="bg-orange-500">Back to Orders</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-orange-500 transition-colors"
            >
              <ChevronLeft size={16} />
              Back to Orders
            </button>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-xl">
                <Printer size={18} />
              </Button>
              <Button variant="outline" size="icon" className="rounded-xl">
                <Share2 size={18} />
              </Button>
            </div>
          </div>

          <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden">
            <CardHeader className="bg-gray-900 text-white p-8">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-orange-500 font-black uppercase tracking-widest text-xs mb-2">Order Receipt</p>
                  <h1 className="text-3xl font-black">#{order.id}</h1>
                  <p className="text-gray-400 text-sm mt-1">{new Date(order.timestamp).toLocaleString()}</p>
                </div>
                <Badge className={cn(
                  "border-none capitalize px-4 py-1.5 rounded-xl font-black text-xs",
                  order.status === 'delivered' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'
                )}>
                  {order.status.replace(/-/g, ' ')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              {/* Restaurant Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
                  <ShoppingBag size={32} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-gray-900">{order.restaurantName}</h2>
                  <p className="text-sm text-gray-500">Order from FlavorDash</p>
                </div>
              </div>

              <Separator className="bg-gray-100" />

              {/* Items Breakdown */}
              <div className="space-y-4">
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Order Summary</h3>
                <div className="space-y-3">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-orange-50 text-orange-600 rounded-md flex items-center justify-center text-xs font-black">
                          {item.quantity}
                        </span>
                        <span className="font-bold text-gray-900">{item.name}</span>
                      </div>
                      <span className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="bg-gray-100" />

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>${(order.total - 5).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Delivery Fee</span>
                  <span>$5.00</span>
                </div>
                <div className="flex justify-between text-xl font-black text-gray-900 pt-2">
                  <span>Total Paid</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>

              <Separator className="bg-gray-100" />

              {/* Delivery & Payment Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <MapPin size={14} /> Delivery Address
                  </h3>
                  <p className="text-sm text-gray-600 font-medium leading-relaxed">
                    452 Park Avenue, Manhattan,<br />New York, 10022
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <CreditCard size={14} /> Payment Method
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center text-[8px] font-black uppercase">Visa</div>
                    <p className="text-sm text-gray-600 font-medium">•••• 4242</p>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Button 
                  onClick={() => {
                    reorder(order.id);
                    navigate('/checkout');
                  }}
                  className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-lg shadow-lg shadow-orange-200 gap-2"
                >
                  <RotateCcw size={20} />
                  Reorder Items
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default OrderDetail;