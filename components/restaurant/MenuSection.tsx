"use client";

import React, { useState, useMemo } from 'react';
import { useStore } from '@/store/useStore';
import { Button } from "@/components/ui/button";
import { Plus, Star, Search } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const menuItems = [
  { id: 'm1', name: 'Classic Cheeseburger', price: 12.99, description: 'Juicy beef patty with cheddar, lettuce, tomato, and our secret sauce.', category: 'Burgers', isVeg: false, rating: 4.8 },
  { id: 'm2', name: 'Truffle Fries', price: 6.50, description: 'Crispy golden fries tossed in truffle oil and parmesan cheese.', category: 'Sides', isVeg: true, rating: 4.9 },
  { id: 'm3', name: 'Margherita Pizza', price: 18.00, description: 'Fresh mozzarella, basil, and tomato sauce on a thin crust.', category: 'Pizza', isVeg: true, rating: 4.7 },
  { id: 'm4', name: 'Spicy Chicken Wings', price: 10.99, description: '8 pieces of wings tossed in our signature buffalo sauce.', category: 'Appetizers', isVeg: false, rating: 4.5 },
  { id: 'm5', name: 'Garden Salad', price: 9.00, description: 'Mixed greens with cucumber, cherry tomatoes, and balsamic vinaigrette.', category: 'Salads', isVeg: true, rating: 4.3 },
  { id: 'm6', name: 'Double Bacon Burger', price: 15.99, description: 'Two patties, crispy bacon, caramelized onions, and BBQ sauce.', category: 'Burgers', isVeg: false, rating: 4.9 },
  { id: 'm7', name: 'Garlic Bread', price: 5.50, description: 'Toasted baguette with garlic butter and herbs.', category: 'Sides', isVeg: true, rating: 4.6 },
  { id: 'm8', name: 'Pepperoni Feast', price: 20.00, description: 'Loaded with spicy pepperoni and extra mozzarella.', category: 'Pizza', isVeg: false, rating: 4.8 },
];

interface Props {
  activeCategory: string;
}

const MenuSection = ({ activeCategory }: Props) => {
  const { addToCart, setCartOpen } = useStore();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesCategory = activeCategory === 'Recommended' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleAdd = (item: any) => {
    addToCart({ id: item.id, name: item.name, price: item.price });
    setCartOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <Input 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search in menu..." 
          className="pl-12 h-14 rounded-2xl border-gray-100 bg-gray-50 focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
        />
      </div>

      <div className="space-y-12">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{activeCategory}</h2>
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-shadow group">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {item.isVeg ? (
                        <div className="w-4 h-4 border border-green-600 flex items-center justify-center p-[2px]">
                          <div className="w-full h-full bg-green-600 rounded-full" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 border border-red-600 flex items-center justify-center p-[2px]">
                          <div className="w-full h-full bg-red-600 rounded-full" />
                        </div>
                      )}
                      {item.rating > 4.5 && (
                        <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 border-none text-[10px] font-bold">
                          <Star size={10} className="fill-yellow-700 mr-1" /> BESTSELLER
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                    <p className="text-sm font-semibold text-gray-700 mb-2">${item.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                  </div>
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <img 
                      src={`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=200&h=200`} 
                      alt={item.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <Button 
                      onClick={() => handleAdd(item)}
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white hover:bg-gray-50 text-red-500 border border-gray-200 shadow-md font-bold px-6 h-9 rounded-lg"
                    >
                      ADD
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-500 font-medium">No items found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuSection;