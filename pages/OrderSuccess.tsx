"use client";

import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, ShoppingBag, MapPin, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import confetti from 'canvas-confetti';

const OrderSuccess = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f97316', '#fb923c', '#ffffff']
    });
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-500/20"
        >
          <CheckCircle2 size={48} className="text-white" />
        </motion.div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Order Placed Successfully!
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400">
            Your delicious meal is being prepared. Order ID: <span className="text-orange-500 font-black">#{id}</span>
          </p>
        </div>

        <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-gray-50 dark:bg-gray-900 p-8">
          <CardContent className="p-0 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center mx-auto text-orange-500 shadow-sm">
                  <ShoppingBag size={20} />
                </div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Restaurant</p>
                <p className="font-bold text-gray-900 dark:text-white">The Burger House</p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center mx-auto text-blue-500 shadow-sm">
                  <MapPin size={20} />
                </div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Delivery To</p>
                <p className="font-bold text-gray-900 dark:text-white">452 Park Ave, NY</p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center mx-auto text-yellow-500 shadow-sm">
                  <Star size={20} />
                </div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Points Earned</p>
                <p className="font-bold text-gray-900 dark:text-white">+100 Points</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate(`/track/${id}`)}
            className="h-14 px-8 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-lg shadow-lg shadow-orange-200 dark:shadow-none gap-2"
          >
            Track Order
            <ArrowRight size={20} />
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/')}
            className="h-14 px-8 rounded-2xl font-black text-lg border-gray-200 dark:border-gray-800"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;