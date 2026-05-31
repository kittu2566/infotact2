"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Copy, Check, Share2 } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const GroupOrderModal = ({ isOpen, onClose }: Props) => {
  const [copied, setCopied] = useState(false);
  const groupLink = `https://flavordash.app/group/join/${Math.random().toString(36).substr(2, 9)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(groupLink);
    setCopied(true);
    showSuccess("Link copied! Share it with your friends.");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-3xl">
        <DialogHeader>
          <div className="w-12 h-12 bg-orange-50 dark:bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 mb-4">
            <Users size={24} />
          </div>
          <DialogTitle className="text-2xl font-black text-gray-900 dark:text-white">Start a Group Order</DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400">
            Share this link with your friends. They can add their favorite items directly to your cart!
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="flex gap-2">
            <div className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 truncate">
              {groupLink}
            </div>
            <Button 
              onClick={handleCopy}
              className="bg-gray-900 dark:bg-gray-800 text-white rounded-xl px-4 font-bold"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </Button>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">How it works</h4>
            <div className="space-y-3">
              {[
                "Share the link with your group",
                "Everyone adds what they want",
                "You review and place the final order"
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-bold text-gray-700 dark:text-gray-300">
                  <div className="w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-[10px]">
                    {i + 1}
                  </div>
                  {step}
                </div>
              ))}
            </div>
          </div>

          <Button 
            onClick={onClose}
            className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-lg shadow-lg shadow-orange-200 dark:shadow-none"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GroupOrderModal;