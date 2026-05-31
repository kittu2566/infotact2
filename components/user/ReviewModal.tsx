"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from 'lucide-react';
import { showSuccess } from '@/utils/toast';
import { cn } from '@/lib/utils';
import { useStore } from '@/store/useStore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  restaurantName: string;
  orderId: string;
}

const ReviewModal = ({ isOpen, onClose, restaurantName, orderId }: Props) => {
  const { addReview, user } = useStore();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !user) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      addReview({
        id: Math.random().toString(36).substr(2, 9),
        userId: user.id,
        userName: user.name,
        rating,
        comment,
        timestamp: new Date().toISOString(),
        restaurantId: '1' // Mocked for now
      });
      
      showSuccess("Thank you for your review! You earned 20 points.");
      setIsSubmitting(false);
      onClose();
      setRating(0);
      setComment("");
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-gray-900">Rate your experience</DialogTitle>
          <p className="text-sm text-gray-500">How was your meal from {restaurantName}?</p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="transition-transform hover:scale-110 active:scale-95"
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(star)}
              >
                <Star 
                  size={40} 
                  className={cn(
                    "transition-colors",
                    (hover || rating) >= star ? "fill-orange-500 text-orange-500" : "text-gray-200"
                  )} 
                />
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Write a comment (optional)</label>
            <Textarea 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us what you liked or what could be better..."
              className="rounded-2xl border-gray-100 bg-gray-50 focus-visible:ring-orange-500/20 min-h-[120px]"
            />
          </div>

          <Button 
            type="submit" 
            disabled={rating === 0 || isSubmitting}
            className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-lg shadow-lg shadow-orange-200"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;