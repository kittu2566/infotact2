"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, Utensils, TrendingUp, DollarSign, MoreVertical, Edit, Trash2, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";

const AdminPanel = () => {
  const stats = [
    { label: 'Total Revenue', value: '$124,592', icon: DollarSign, color: 'bg-green-50 text-green-600' },
    { label: 'Active Users', value: '12,402', icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'Restaurants', value: '482', icon: Utensils, color: 'bg-orange-50 text-orange-600' },
    { label: 'Growth', value: '+12.5%', icon: TrendingUp, color: 'bg-purple-50 text-purple-600' },
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'Alice Smith', restaurant: 'The Burger House', amount: '$34.50', status: 'completed' },
    { id: 'ORD-002', customer: 'Bob Johnson', restaurant: 'Pizza Palace', amount: '$22.00', status: 'pending' },
    { id: 'ORD-003', customer: 'Charlie Brown', restaurant: 'Sushi Zen', amount: '$85.20', status: 'processing' },
    { id: 'ORD-004', customer: 'Diana Prince', restaurant: 'Green Garden', amount: '$15.75', status: 'completed' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500">Manage your platform operations and analytics.</p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold">
            Export Report
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <Card key={i} className="border-none shadow-md rounded-3xl">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders Table */}
          <Card className="lg:col-span-2 border-none shadow-lg rounded-3xl overflow-hidden">
            <CardHeader className="p-6 border-b border-gray-50">
              <CardTitle className="text-xl font-black">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="font-bold">Order ID</TableHead>
                    <TableHead className="font-bold">Customer</TableHead>
                    <TableHead className="font-bold">Restaurant</TableHead>
                    <TableHead className="font-bold">Amount</TableHead>
                    <TableHead className="font-bold">Status</TableHead>
                    <TableHead className="text-right font-bold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-gray-50/50 transition-colors">
                      <TableCell className="font-bold text-gray-900">{order.id}</TableCell>
                      <TableCell className="text-gray-600">{order.customer}</TableCell>
                      <TableCell className="text-gray-600">{order.restaurant}</TableCell>
                      <TableCell className="font-bold text-gray-900">{order.amount}</TableCell>
                      <TableCell>
                        <Badge className={`
                          ${order.status === 'completed' ? 'bg-green-100 text-green-700' : ''}
                          ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                          ${order.status === 'processing' ? 'bg-blue-100 text-blue-700' : ''}
                          border-none capitalize
                        `}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="rounded-lg">
                          <MoreVertical size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Quick Actions / Top Restaurants */}
          <Card className="border-none shadow-lg rounded-3xl overflow-hidden">
            <CardHeader className="p-6 border-b border-gray-50">
              <CardTitle className="text-xl font-black">Top Restaurants</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {[
                { name: 'The Burger House', orders: 1240, rating: 4.8 },
                { name: 'Pizza Palace', orders: 980, rating: 4.5 },
                { name: 'Sushi Zen', orders: 850, rating: 4.9 },
              ].map((res, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center font-black text-gray-400">
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{res.name}</p>
                      <p className="text-xs text-gray-500">{res.orders} orders this month</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-orange-500 font-black">
                    <Star size={14} className="fill-orange-500" />
                    <span>{res.rating}</span>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full rounded-xl font-bold border-gray-200 mt-4">
                View All Restaurants
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;