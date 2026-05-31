"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, MessageCircle, Phone, Mail, HelpCircle } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const faqs = [
  {
    q: "How do I track my order?",
    a: "Once your order is placed, you can track it in real-time from the 'My Orders' section in your profile or by clicking the tracking link in your confirmation email."
  },
  {
    q: "What is the FlavorDash Guarantee?",
    a: "We guarantee that your food will arrive fresh and on time. If there's an issue with your order, we'll provide a full refund or a replacement immediately."
  },
  {
    q: "How can I earn points?",
    a: "You earn 100 points for every order, 50 points for table reservations, and 20 points for sharing reviews. These points can be redeemed for discounts and free delivery."
  },
  {
    q: "Can I cancel my order?",
    a: "Orders can be cancelled within 2 minutes of placement. After that, the restaurant starts preparing your food, and cancellation may not be possible."
  }
];

const HelpCenter = () => {
  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("Message sent! Our support team will get back to you within 24 hours.");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">How can we help?</h1>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input 
                placeholder="Search for articles, topics..." 
                className="pl-12 h-14 rounded-2xl border-none shadow-lg bg-white focus-visible:ring-orange-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card className="border-none shadow-md rounded-3xl text-center p-6 hover:shadow-lg transition-all cursor-pointer group">
              <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle size={24} />
              </div>
              <h3 className="font-black text-gray-900">Live Chat</h3>
              <p className="text-xs text-gray-500 mt-1">Average response: 2m</p>
            </Card>
            <Card className="border-none shadow-md rounded-3xl text-center p-6 hover:shadow-lg transition-all cursor-pointer group">
              <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Phone size={24} />
              </div>
              <h3 className="font-black text-gray-900">Call Us</h3>
              <p className="text-xs text-gray-500 mt-1">Available 24/7</p>
            </Card>
            <Card className="border-none shadow-md rounded-3xl text-center p-6 hover:shadow-lg transition-all cursor-pointer group">
              <div className="w-12 h-12 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <h3 className="font-black text-gray-900">Email Support</h3>
              <p className="text-xs text-gray-500 mt-1">Response within 24h</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-2">
                <HelpCircle className="text-orange-500" size={24} />
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-none bg-white rounded-2xl px-6 shadow-sm">
                    <AccordionTrigger className="hover:no-underline font-bold text-gray-900 py-4">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-500 leading-relaxed pb-4">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div>
              <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden">
                <CardHeader className="bg-gray-900 text-white p-8">
                  <CardTitle className="text-2xl font-black">Send us a message</CardTitle>
                  <p className="text-gray-400 text-sm mt-2">Can't find what you're looking for? Drop us a line.</p>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleContact} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Subject</label>
                      <Input placeholder="Order Issue, Feedback, etc." className="rounded-xl h-12" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Message</label>
                      <Textarea placeholder="Describe your issue in detail..." className="rounded-xl min-h-[120px]" required />
                    </div>
                    <Button type="submit" className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-lg shadow-lg shadow-orange-200">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HelpCenter;