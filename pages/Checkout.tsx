"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { useStore } from '@/store/useStore';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { CreditCard, MapPin, ShieldCheck, Lock, ChevronLeft, Tag, Wallet } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';
import { cn } from '@/lib/utils';

const Checkout = () => {
  const { cart, paymentMethods, placeOrder, user } = useStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentType, setPaymentType] = useState<string>("wallet");

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = 5.00;
  const total = subtotal + deliveryFee - discount;

  const canUseWallet = (user?.walletBalance || 0) >= total;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'FLAVOR50') {
      setDiscount(subtotal * 0.5);
      showSuccess("Promo code applied! 50% discount added.");
    } else {
      showError("Invalid promo code.");
    }
  };

  const handlePayment = () => {
    if (cart.length === 0) return;
    if (paymentType === 'wallet' && !canUseWallet) {
      showError("Insufficient wallet balance. Please add funds or use a card.");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const orderId = `ORD-${Math.floor(Math.random() * 10000)}`;
      const newOrder = {
        id: orderId,
        items: [...cart],
        total: total,
        status: 'placed' as const,
        timestamp: new Date().toISOString(),
        restaurantName: "The Burger House"
      };
      
      placeOrder(newOrder, paymentType === 'wallet');
      setIsProcessing(false);
      navigate(`/order-success/${orderId}`);
    }, 2000);
  };

  if (cart.length === 0 && !isProcessing) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Your cart is empty</h2>
          <Button onClick={() => navigate('/')} className="bg-orange-500">Go back to shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-orange-500 mb-6 transition-colors"
        >
          <ChevronLeft size={16} />
          Back
        </button>

        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <Card className="border-none shadow-md rounded-3xl dark:bg-gray-900">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="w-10 h-10 bg-orange-50 dark:bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500">
                  <MapPin size={20} />
                </div>
                <CardTitle className="text-xl font-black dark:text-white">Delivery Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border-2 border-orange-500 bg-orange-50/50 dark:bg-orange-500/5 rounded-2xl">
                  <p className="font-bold text-gray-900 dark:text-white">Home</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">452 Park Avenue, Manhattan, New York, 10022</p>
                </div>
                <Button variant="outline" className="w-full rounded-xl border-dashed border-2 dark:border-gray-800">
                  Add New Address
                </Button>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="border-none shadow-md rounded-3xl dark:bg-gray-900">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                  <CreditCard size={20} />
                </div>
                <CardTitle className="text-xl font-black dark:text-white">Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentType} onValueChange={setPaymentType} className="space-y-4">
                  {/* Wallet Option */}
                  <div className={cn(
                    "flex items-center justify-between p-4 border rounded-2xl transition-all",
                    paymentType === 'wallet' ? "border-orange-500 bg-orange-50/30 dark:bg-orange-500/5" : "border-gray-100 dark:border-gray-800"
                  )}>
                    <div className="flex items-center gap-4">
                      <RadioGroupItem value="wallet" id="wallet" />
                      <Label htmlFor="wallet" className="flex items-center gap-3 cursor-pointer">
                        <div className="w-12 h-8 bg-orange-500 rounded flex items-center justify-center text-white">
                          <Wallet size={18} />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white">FlavorDash Wallet</p>
                          <p className={cn(
                            "text-xs font-bold",
                            canUseWallet ? "text-green-600" : "text-red-500"
                          )}>
                            Balance: ${user?.walletBalance.toFixed(2)}
                          </p>
                        </div>
                      </Label>
                    </div>
                    {!canUseWallet && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => navigate('/user?tab=wallet')}
                        className="text-xs font-black text-orange-500 uppercase tracking-widest"
                      >
                        Add Funds
                      </Button>
                    )}
                  </div>

                  {/* Saved Cards */}
                  {paymentMethods.map((pm) => (
                    <div key={pm.id} className={cn(
                      "flex items-center justify-between p-4 border rounded-2xl transition-all",
                      paymentType === pm.id ? "border-orange-500 bg-orange-50/30 dark:bg-orange-500/5" : "border-gray-100 dark:border-gray-800"
                    )}>
                      <div className="flex items-center gap-4">
                        <RadioGroupItem value={pm.id} id={pm.id} />
                        <Label htmlFor={pm.id} className="flex items-center gap-3 cursor-pointer">
                          <div className="w-12 h-8 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center font-bold text-[10px] uppercase dark:text-white">
                            {pm.type}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 dark:text-white">•••• •••• •••• {pm.last4}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Expires {pm.expiry}</p>
                          </div>
                        </Label>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
                <Button variant="outline" className="w-full mt-6 rounded-xl border-dashed border-2 dark:border-gray-800">
                  Add New Card
                </Button>
              </CardContent>
            </Card>

            {/* Promo Code */}
            <Card className="border-none shadow-md rounded-3xl dark:bg-gray-900">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="w-10 h-10 bg-purple-50 dark:bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500">
                  <Tag size={20} />
                </div>
                <CardTitle className="text-xl font-black dark:text-white">Promo Code</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Input 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code (e.g. FLAVOR50)" 
                    className="rounded-xl h-12 dark:bg-gray-800 dark:border-gray-700"
                  />
                  <Button 
                    onClick={handleApplyPromo}
                    className="bg-gray-900 dark:bg-gray-800 text-white rounded-xl px-8 font-bold"
                  >
                    Apply
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="border-none shadow-xl rounded-3xl sticky top-28 dark:bg-gray-900">
              <CardHeader>
                <CardTitle className="text-xl font-black dark:text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">{item.quantity}x {item.name}</span>
                      <span className="font-bold text-gray-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <Separator className="bg-gray-50 dark:bg-gray-800" />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600 font-bold">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-black text-gray-900 dark:text-white pt-2">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    onClick={handlePayment}
                    disabled={isProcessing || (paymentType === 'wallet' && !canUseWallet)}
                    className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-lg shadow-lg shadow-orange-200 dark:shadow-none"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      `Pay $${total.toFixed(2)}`
                    )}
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest pt-4">
                  <Lock size={12} />
                  Secure SSL Encryption
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;