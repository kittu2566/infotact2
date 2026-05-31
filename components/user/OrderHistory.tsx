"use client";

import React, { useState, useMemo } from 'react';
import { useStore } from '@/store/useStore';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Clock, ChevronRight, MapPin, Star, RotateCcw, ReceiptText, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReviewModal from './ReviewModal';
import { cn } from '@/lib/utils';
import { showSuccess } from '@/utils/toast';

const OrderHistory = () => {
  const { orders, reorder } = useStore();
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState<{id: string, name: string} | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredOrders = useMemo(() => {
    if (statusFilter === 'All') return orders;
    return orders.filter(o => o.status === statusFilter.toLowerCase().replace(/ /g, '-'));
  }, [orders, statusFilter]);

  const handleReorder = (orderId: string) => {
    reorder(orderId);
    showSuccess("Items added to cart!");
  };

  if (orders.length === 0) {
    return (
      <Card className="border-dashed border-2 border-gray-200 bg-transparent py-12 text-center rounded-3xl">
        <ShoppingBag className="mx-auto text-gray-300 mb-4" size={48} />
        <h3 className="text-xl font-bold text-gray-900">No orders yet</h3>
        <p className="text-gray-500">Hungry? Start exploring restaurants nearby!</p>
        <Button 
          onClick={() => navigate('/')}
          className="mt-6 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold"
        >
          Order Now
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {selectedOrder && (
        <ReviewModal 
          isOpen={!!selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
          restaurantName={selectedOrder.name}
          orderId={selectedOrder.id}
        />
      )}

      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-xl text-xs font-bold text-gray-500 mr-2">
          <Filter size={14} />
          Filter
        </div>
        {['All', 'Delivered', 'Placed', 'Preparing', 'Cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={cn(
              "px-4 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap",
              statusFilter === status 
                ? "bg-orange-500 text-white shadow-md shadow-orange-200 dark:shadow-none" 
                : "bg-white dark:bg-gray-900 text-gray-500 border border-gray-100 dark:border-gray-800 hover:bg-gray-50"
            )}
          >
            {status}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-gray-500 font-medium">No {statusFilter.toLowerCase()} orders found.</p>
        </div>
      ) : (
        filteredOrders.map((order) => (
          <Card key={order.id} className="border-none shadow-md rounded-3xl overflow-hidden group hover:shadow-lg transition-shadow dark:bg-gray-900">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Order #{order.id}</p>
                      <h4 className="text-xl font-black text-gray-900 dark:text-white">{order.restaurantName}</h4>
                    </div>
                    <Badge className={cn(
                      "border-none capitalize px-3 py-1 rounded-lg font-bold",
                      order.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    )}>
                      {order.status.replace(/-/g, ' ')}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock size={14} />
                      <span>{new Date(order.timestamp).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <ShoppingBag size={14} />
                      <span>{order.items.length} Items</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin size={14} />
                      <span>Home</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {order.items.map((item, i) => (
                      <Badge key={i} variant="secondary" className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-none whitespace-nowrap">
                        {item.quantity}x {item.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-gray-50 dark:border-gray-800 pt-6 md:pt-0 md:pl-6 min-w-[160px] gap-3">
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-400 uppercase">Total Amount</p>
                    <p className="text-2xl font-black text-gray-900 dark:text-white">${order.total.toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <Button 
                      onClick={() => navigate(`/order/${order.id}`)}
                      className="w-full bg-gray-900 dark:bg-gray-800 hover:bg-orange-500 text-white rounded-xl font-bold gap-2 transition-colors"
                    >
                      <ReceiptText size={16} />
                      View Receipt
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline"
                        onClick={() => handleReorder(order.id)}
                        className="rounded-xl font-bold gap-2 border-gray-200 dark:border-gray-800 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200"
                      >
                        <RotateCcw size={14} />
                        Reorder
                      </Button>
                      {order.status === 'delivered' && (
                        <Button 
                          variant="outline"
                          onClick={() => setSelectedOrder({ id: order.id, name: order.restaurantName })}
                          className="rounded-xl font-bold gap-2 border-gray-200 dark:border-gray-800 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200"
                        >
                          <Star size={14} />
                          Rate
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default OrderHistory;