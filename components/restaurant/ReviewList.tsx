"use client";

import React from 'react';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mockReviews = [
  {
    id: 'r1',
    userName: 'Sarah Jenkins',
    rating: 5,
    comment: 'The best burger I have had in a long time! The truffle fries were also incredible. Delivery was super fast.',
    timestamp: '2 days ago',
    likes: 12
  },
  {
    id: 'r2',
    userName: 'Michael Chen',
    rating: 4,
    comment: 'Great food, but the packaging could be better. The fries were a bit soggy by the time they arrived.',
    timestamp: '1 week ago',
    likes: 5
  },
  {
    id: 'r3',
    userName: 'Emily Rodriguez',
    rating: 5,
    comment: 'FlavorDash never disappoints. This place is a gem!',
    timestamp: '2 weeks ago',
    likes: 8
  }
];

const ReviewList = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black text-gray-900">Customer Reviews</h3>
        <div className="flex items-center gap-4">
          <select className="bg-transparent text-sm font-bold text-gray-500 outline-none cursor-pointer">
            <option>Newest First</option>
            <option>Highest Rated</option>
            <option>Most Helpful</option>
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {mockReviews.map((review) => (
          <div key={review.id} className="p-6 bg-white rounded-3xl border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 border-2 border-orange-100">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${review.userName}`} />
                  <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-gray-900">{review.userName}</p>
                  <p className="text-xs text-gray-400 font-medium">{review.timestamp}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg">
                <Star size={14} className="fill-orange-500 text-orange-500" />
                <span className="text-xs font-black text-orange-700">{review.rating}.0</span>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {review.comment}
            </p>
            
            <div className="flex items-center gap-6 pt-4 border-t border-gray-50">
              <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-orange-500 transition-colors">
                <ThumbsUp size={14} />
                Helpful ({review.likes})
              </button>
              <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-orange-500 transition-colors">
                <MessageSquare size={14} />
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <Button variant="outline" className="w-full rounded-2xl font-bold border-gray-200 h-12">
        Load More Reviews
      </Button>
    </div>
  );
};

import { Button } from "@/components/ui/button";
export default ReviewList;