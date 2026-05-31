"use client";

import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingBag, X, Plus, Minus, Trash2, Sparkles, Users } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from 'react-router-dom';
import GroupOrderModal from './GroupOrderModal';

const CartDrawer = () => {
  const { cart, isCartOpen, setCartOpen, updateQuantity, removeFromCart, addToCart } = useStore();
  const navigate = useNavigate();
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = cart.length > 0 ? 5 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    setCartOpen(false);
    navigate('/checkout');
  };

  const recommendations = [
    { id: 'rec1', name: 'Coke Zero', price: 2.50 },
    { id: 'rec2', name: 'Garlic Bread', price: 4.99 },
    { id: 'rec3', name: 'Extra Dip', price: 1.00 },
  ];

  return (
    <>
      <GroupOrderModal isOpen={isGroupModalOpen} onClose={() => setIsGroupModalOpen(false)} />
      <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
        <SheetContent className="w-full sm:max-w-md flex flex-col p-0 dark:bg-gray-950 dark:border-gray-800">
          <SheetHeader className="p-6 border-b dark:border-gray-800">
            <div className="flex items-center justify-between">
              <SheetTitle className="flex items-center gap-2 text-2xl font-bold dark:text-white">
                <ShoppingBag className="text-orange-500" />
                Your Cart
              </SheetTitle>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsGroupModalOpen(true)}
                className="rounded-xl font-bold gap-2 border-orange-200 text-orange-500 hover:bg-orange-50 dark:border-orange-500/20 dark:hover:bg-orange-500/10"
              >
                <Users size={16} />
                Group Order
              </Button>
            </div>
          </SheetHeader>

          <ScrollArea className="flex-1">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20 px-6">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center">
                  <ShoppingBag size={40} className="text-gray-300 dark:text-gray-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Your cart is empty</h3>
                <p className="text-gray-500 dark:text-gray-400">Add some delicious items from nearby restaurants to get started!</p>
                <Button 
                  onClick={() => setCartOpen(false)}
                  className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl"
                >
                  Browse Restaurants
                </Button>
              </div>
            ) : (
              <div className="p-6 space-y-8">
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 dark:text-white">{item.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-900 rounded-lg px-2 py-1">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-white dark:hover:bg-gray-800 rounded-md transition-colors dark:text-white"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-bold w-4 text-center dark:text-white">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-white dark:hover:bg-gray-800 rounded-md transition-colors dark:text-white"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-gray-50 dark:border-gray-800">
                  <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Sparkles size={16} className="text-orange-500" />
                    You might also like
                  </h4>
                  <div className="space-y-3">
                    {recommendations.map((rec) => (
                      <div key={rec.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                        <div>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">{rec.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">${rec.price.toFixed(2)}</p>
                        </div>
                        <Button 
                          onClick={() => addToCart(rec)}
                          variant="outline" 
                          size="sm" 
                          className="rounded-lg font-bold text-orange-500 border-orange-200 hover:bg-orange-50 dark:border-orange-500/20 dark:hover:bg-orange-500/10"
                        >
                          Add
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </ScrollArea>

          {cart.length > 0 && (
            <SheetFooter className="p-6 border-t dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex-col sm:flex-col gap-4">
              <div className="space-y-2 w-full">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <Separator className="my-2 dark:bg-gray-800" />
                <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Button 
                onClick={handleCheckout}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white h-14 text-lg font-bold rounded-xl shadow-lg shadow-orange-200 dark:shadow-none"
              >
                Proceed to Checkout
              </Button>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CartDrawer;