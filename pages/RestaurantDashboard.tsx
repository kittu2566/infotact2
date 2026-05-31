"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { useStore } from '@/store/useStore';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  ShoppingBag, 
  Star, 
  DollarSign, 
  Plus, 
  Settings, 
  Utensils,
  Edit,
  Trash2,
  LayoutDashboard,
  Menu as MenuIcon,
  Power,
  BarChart3
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';
import { showSuccess } from '@/utils/toast';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const data = [
  { name: 'Mon', revenue: 4000, orders: 24 },
  { name: 'Tue', revenue: 3000, orders: 18 },
  { name: 'Wed', revenue: 2000, orders: 12 },
  { name: 'Thu', revenue: 2780, orders: 20 },
  { name: 'Fri', revenue: 1890, orders: 15 },
  { name: 'Sat', revenue: 2390, orders: 25 },
  { name: 'Sun', revenue: 3490, orders: 30 },
];

const RestaurantDashboard = () => {
  const { restaurantMenu, toggleItemStatus } = useStore();

  const stats = [
    { label: 'Total Revenue', value: '$12,450', icon: DollarSign, color: 'bg-green-50 text-green-600' },
    { label: 'Active Orders', value: '8', icon: ShoppingBag, color: 'bg-orange-50 text-orange-600' },
    { label: 'Avg. Rating', value: '4.8', icon: Star, color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Growth', value: '+12%', icon: TrendingUp, color: 'bg-blue-50 text-blue-600' },
  ];

  const recentOrders = [
    { id: 'ORD-9921', items: '2x Classic Burger, 1x Fries', total: '$34.50', status: 'preparing', time: '5m ago' },
    { id: 'ORD-9920', items: '1x Margherita Pizza', total: '$18.00', status: 'ready', time: '12m ago' },
    { id: 'ORD-9919', items: '3x Tacos, 1x Coke', total: '$22.50', status: 'out-for-delivery', time: '25m ago' },
  ];

  const handleToggle = (id: string, name: string) => {
    toggleItemStatus(id);
    showSuccess(`${name} status updated.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">The Burger House</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage your restaurant operations and menu.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl font-bold border-gray-200 dark:border-gray-800 gap-2">
              <Settings size={18} /> Settings
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold gap-2">
              <Plus size={18} /> Add Item
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="bg-white dark:bg-gray-900 p-1 rounded-2xl border border-gray-100 dark:border-gray-800 h-14 shadow-sm">
            <TabsTrigger value="overview" className="rounded-xl px-8 font-bold data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              <LayoutDashboard size={18} className="mr-2" /> Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-xl px-8 font-bold data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              <BarChart3 size={18} className="mr-2" /> Analytics
            </TabsTrigger>
            <TabsTrigger value="menu" className="rounded-xl px-8 font-bold data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              <MenuIcon size={18} className="mr-2" /> Menu
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <Card key={i} className="border-none shadow-md rounded-3xl dark:bg-gray-900">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color}`}>
                      <stat.icon size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                      <p className="text-2xl font-black text-gray-900 dark:text-white">{stat.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-2 border-none shadow-lg rounded-3xl overflow-hidden dark:bg-gray-900">
                <CardHeader className="p-6 border-b border-gray-50 dark:border-gray-800">
                  <CardTitle className="text-xl font-black dark:text-white">Revenue Trend</CardTitle>
                </CardHeader>
                <CardContent className="p-6 h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600}} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg rounded-3xl overflow-hidden dark:bg-gray-900">
                <CardHeader className="p-6 border-b border-gray-50 dark:border-gray-800">
                  <CardTitle className="text-xl font-black dark:text-white">Top Selling Items</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {[
                    { name: 'Classic Cheeseburger', sales: 450, trend: '+15%' },
                    { name: 'Truffle Fries', sales: 320, trend: '+8%' },
                    { name: 'Spicy Wings', sales: 280, trend: '+12%' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-400">
                          <Utensils size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white">{item.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{item.sales} sold</p>
                        </div>
                      </div>
                      <span className="text-xs font-black text-green-600 bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-lg">
                        {item.trend}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-none shadow-lg rounded-3xl dark:bg-gray-900 p-6">
                <CardTitle className="text-xl font-black mb-6 dark:text-white">Daily Orders</CardTitle>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip cursor={{fill: 'transparent'}} />
                      <Bar dataKey="orders" fill="#f97316" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              <Card className="border-none shadow-lg rounded-3xl dark:bg-gray-900 p-6">
                <CardTitle className="text-xl font-black mb-6 dark:text-white">Customer Satisfaction</CardTitle>
                <div className="space-y-6">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-4">
                      <div className="flex items-center gap-1 w-12">
                        <span className="font-bold dark:text-white">{star}</span>
                        <Star size={14} className="fill-yellow-500 text-yellow-500" />
                      </div>
                      <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-orange-500" 
                          style={{ width: `${star === 5 ? 85 : star === 4 ? 10 : 5}%` }} 
                        />
                      </div>
                      <span className="text-xs font-bold text-gray-400 w-8">{star === 5 ? '85%' : star === 4 ? '10%' : '5%'}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="menu" className="space-y-6">
            <Card className="border-none shadow-lg rounded-3xl overflow-hidden dark:bg-gray-900">
              <CardHeader className="p-6 border-b border-gray-50 dark:border-gray-800 flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-black dark:text-white">Menu Items</CardTitle>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold gap-2">
                  <Plus size={18} /> Add New Item
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-gray-50 dark:bg-gray-800/50">
                    <TableRow>
                      <TableHead className="font-bold">Item Name</TableHead>
                      <TableHead className="font-bold">Category</TableHead>
                      <TableHead className="font-bold">Price</TableHead>
                      <TableHead className="font-bold">Status</TableHead>
                      <TableHead className="text-right font-bold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {restaurantMenu.map((item) => (
                      <TableRow key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                        <TableCell className="font-bold text-gray-900 dark:text-white">{item.name}</TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-400">{item.category}</TableCell>
                        <TableCell className="font-bold text-gray-900 dark:text-white">${item.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge className={cn(
                            "border-none capitalize",
                            item.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          )}>
                            {item.status.replace(/-/g, ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleToggle(item.id, item.name)}
                              className={cn(
                                "rounded-lg transition-colors",
                                item.status === 'available' ? "text-red-500 hover:bg-red-50" : "text-green-500 hover:bg-green-50"
                              )}
                            >
                              <Power size={16} />
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-lg text-blue-500 hover:bg-blue-50">
                              <Edit size={16} />
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-lg text-red-500 hover:bg-red-50">
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default RestaurantDashboard;