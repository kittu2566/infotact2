"use client";

import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { useStore } from '@/store/useStore';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Award, Clock, MapPin, Star, User, CreditCard, ShoppingBag, Heart, Settings, Bell, Shield, Gift, History, Wallet } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PaymentMethods from '@/components/user/PaymentMethods';
import OrderHistory from '@/components/user/OrderHistory';
import RestaurantCard from '@/components/home/RestaurantCard';
import RewardsSection from '@/components/user/RewardsSection';
import PointsHistory from '@/components/user/PointsHistory';
import AddressManagement from '@/components/user/AddressManagement';
import WalletSection from '@/components/user/WalletSection';
import MobileNav from '@/components/layout/MobileNav';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { showSuccess } from '@/utils/toast';
import { useSearchParams } from 'react-router-dom';

const UserPanel = () => {
  const { user, reservations, events, favorites } = useStore();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'orders';

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("Profile updated successfully!");
  };

  // Mock restaurants for favorites
  const favoriteRestaurants = [
    {
      id: '1',
      name: 'The Burger House',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600',
      rating: 4.5,
      deliveryTime: '25-30 min',
      cuisine: ['Burgers', 'American'],
      priceForTwo: 30,
      isVeg: false
    },
    {
      id: '2',
      name: 'Pizza Palace',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600',
      rating: 4.2,
      deliveryTime: '35-40 min',
      cuisine: ['Pizza', 'Italian'],
      priceForTwo: 45,
      isVeg: true
    }
  ].filter(r => favorites.includes(r.id));

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Profile Sidebar */}
          <div className="w-full md:w-80 space-y-6">
            <Card className="border-none shadow-xl shadow-orange-500/5 overflow-hidden rounded-3xl">
              <div className="h-24 bg-gradient-to-r from-orange-400 to-orange-600" />
              <CardContent className="relative pt-12 text-center">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-white shadow-lg">
                  <img src={`https://i.pravatar.cc/150?u=${user?.id}`} alt="Profile" />
                </div>
                <h2 className="text-2xl font-black text-gray-900">{user?.name}</h2>
                <p className="text-gray-500 text-sm mb-4">{user?.email}</p>
                <div className="flex items-center justify-center gap-2 bg-orange-50 text-orange-600 py-2 px-4 rounded-2xl font-bold">
                  <Award size={18} />
                  <span>{user?.points} Points</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg rounded-3xl">
              <CardHeader>
                <CardTitle className="text-sm font-black uppercase tracking-widest text-gray-400">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Total Orders</span>
                  <span className="font-black text-gray-900">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Wallet Balance</span>
                  <span className="font-black text-orange-600">${user?.walletBalance.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Member Since</span>
                  <span className="font-black text-gray-900">Jan 2024</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            <Tabs defaultValue={defaultTab} className="w-full">
              <TabsList className="bg-white p-1 rounded-2xl border border-gray-100 h-14 mb-8 shadow-sm overflow-x-auto flex-nowrap justify-start">
                <TabsTrigger value="orders" className="rounded-xl px-6 font-bold data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                  My Orders
                </TabsTrigger>
                <TabsTrigger value="wallet" className="rounded-xl px-6 font-bold data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                  Wallet
                </TabsTrigger>
                <TabsTrigger value="favorites" className="rounded-xl px-6 font-bold data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                  Favorites
                </TabsTrigger>
                <TabsTrigger value="rewards" className="rounded-xl px-6 font-bold data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                  Rewards
                </TabsTrigger>
                <TabsTrigger value="points" className="rounded-xl px-6 font-bold data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                  Points History
                </TabsTrigger>
                <TabsTrigger value="addresses" className="rounded-xl px-6 font-bold data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                  Addresses
                </TabsTrigger>
                <TabsTrigger value="reservations" className="rounded-xl px-6 font-bold data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                  Reservations
                </TabsTrigger>
                <TabsTrigger value="events" className="rounded-xl px-6 font-bold data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                  Events
                </TabsTrigger>
                <TabsTrigger value="payments" className="rounded-xl px-6 font-bold data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                  Payments
                </TabsTrigger>
                <TabsTrigger value="settings" className="rounded-xl px-6 font-bold data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="orders" className="space-y-6">
                <OrderHistory />
              </TabsContent>

              <TabsContent value="wallet" className="space-y-6">
                <WalletSection />
              </TabsContent>

              <TabsContent value="favorites" className="space-y-6">
                {favoriteRestaurants.length === 0 ? (
                  <Card className="border-dashed border-2 border-gray-200 bg-transparent py-12 text-center rounded-3xl">
                    <Heart className="mx-auto text-gray-300 mb-4" size={48} />
                    <h3 className="text-xl font-bold text-gray-900">No favorites yet</h3>
                    <p className="text-gray-500">Save your favorite restaurants to find them easily!</p>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {favoriteRestaurants.map((res) => (
                      <RestaurantCard key={res.id} restaurant={res} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="rewards" className="space-y-6">
                <RewardsSection />
              </TabsContent>

              <TabsContent value="points" className="space-y-6">
                <PointsHistory />
              </TabsContent>

              <TabsContent value="addresses" className="space-y-6">
                <AddressManagement />
              </TabsContent>

              <TabsContent value="reservations" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {reservations.length === 0 ? (
                    <Card className="col-span-full border-dashed border-2 border-gray-200 bg-transparent py-12 text-center rounded-3xl">
                      <Calendar className="mx-auto text-gray-300 mb-4" size={48} />
                      <h3 className="text-xl font-bold text-gray-900">No active reservations</h3>
                      <p className="text-gray-500">Book a table at your favorite restaurant today!</p>
                    </Card>
                  ) : (
                    reservations.map((res) => (
                      <Card key={res.id} className="border-none shadow-md rounded-3xl overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="text-lg font-black text-gray-900">{res.restaurantName}</h4>
                              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                <Clock size={14} />
                                <span>{res.date} at {res.time}</span>
                              </div>
                            </div>
                            <Badge className="bg-green-100 text-green-700 border-none capitalize">{res.status}</Badge>
                          </div>
                          <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
                            <div className="flex items-center gap-1 text-sm font-bold text-gray-700">
                              <User size={14} />
                              <span>{res.guests} Guests</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="events" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {events.map((event) => (
                    <Card key={event.id} className="border-none shadow-md rounded-3xl overflow-hidden group">
                      <div className="h-48 overflow-hidden">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <CardContent className="p-6">
                        <Badge className="bg-orange-100 text-orange-600 border-none mb-3">{event.category}</Badge>
                        <h4 className="text-xl font-black text-gray-900 mb-2">{event.title}</h4>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar size={14} />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <MapPin size={14} />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                          <span className="text-lg font-black text-gray-900">${event.price}</span>
                          <button className="bg-gray-900 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-orange-500 transition-colors">
                            Book Spot
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="payments" className="space-y-6">
                <PaymentMethods />
              </TabsContent>

              <TabsContent value="settings" className="space-y-8">
                <Card className="border-none shadow-md rounded-3xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-black flex items-center gap-2">
                      <User className="text-orange-500" size={20} />
                      Profile Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSaveProfile} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="font-bold">Full Name</Label>
                          <Input defaultValue={user?.name} className="rounded-xl h-12" />
                        </div>
                        <div className="space-y-2">
                          <Label className="font-bold">Email Address</Label>
                          <Input defaultValue={user?.email} className="rounded-xl h-12" />
                        </div>
                        <div className="space-y-2">
                          <Label className="font-bold">Phone Number</Label>
                          <Input defaultValue="+1 (555) 000-0000" className="rounded-xl h-12" />
                        </div>
                        <div className="space-y-2">
                          <Label className="font-bold">Location</Label>
                          <Input defaultValue="New York, USA" className="rounded-xl h-12" />
                        </div>
                      </div>
                      <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold px-8 h-12">
                        Save Changes
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-none shadow-md rounded-3xl">
                    <CardHeader>
                      <CardTitle className="text-xl font-black flex items-center gap-2">
                        <Bell className="text-blue-500" size={20} />
                        Notifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-gray-900">Email Notifications</p>
                          <p className="text-xs text-gray-500">Receive order updates via email</p>
                        </div>
                        <div className="w-12 h-6 bg-orange-500 rounded-full relative cursor-pointer">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-gray-900">SMS Alerts</p>
                          <p className="text-xs text-gray-500">Get real-time delivery status</p>
                        </div>
                        <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-md rounded-3xl">
                    <CardHeader>
                      <CardTitle className="text-xl font-black flex items-center gap-2">
                        <Shield className="text-green-500" size={20} />
                        Security
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full rounded-xl font-bold border-gray-200 h-12">
                        Change Password
                      </Button>
                      <Button variant="outline" className="w-full rounded-xl font-bold border-gray-200 h-12">
                        Two-Factor Authentication
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <MobileNav />
    </div>
  );
};

export default UserPanel;