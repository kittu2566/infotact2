"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, ArrowRight, Github, Chrome, Sparkles, UserPlus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStore } from '@/store/useStore';
import { showSuccess } from '@/utils/toast';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate a brief loading state for realism
    setTimeout(() => {
      setUser({ 
        id: Math.random().toString(36).substr(2, 9), 
        name: email.split('@')[0] || 'Guest User', 
        email: email || 'guest@example.com', 
        role: 'user', 
        points: 100, 
        walletBalance: 50.00 
      });
      showSuccess("Welcome to FlavorDash!");
      setIsSubmitting(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white dark:bg-gray-950">
      {/* Left Side: Visual/Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gray-900">
        <img 
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200" 
          alt="Food Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
        
        <div className="relative z-10 p-16 flex flex-col justify-between h-full">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
              <span className="text-white font-black text-2xl">F</span>
            </div>
            <span className="text-3xl font-black text-white tracking-tight">FlavorDash</span>
          </div>

          <div className="max-w-md text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-5xl font-black text-white mb-6 leading-tight">
                The fastest way to <br />
                <span className="text-orange-500">satisfy your cravings.</span>
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed">
                Join thousands of foodies and get access to exclusive deals, real-time tracking, and the best restaurants in town.
              </p>
            </motion.div>
          </div>

          <div className="flex items-center gap-4 text-gray-500 text-sm font-bold">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-gray-900 bg-gray-800" />
              ))}
            </div>
            <span>Trusted by 50k+ users worldwide</span>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Welcome Back</h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Enter your details to access your account</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-12 rounded-xl font-bold gap-2 border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900">
              <Chrome size={18} /> Google
            </Button>
            <Button variant="outline" className="h-12 rounded-xl font-bold gap-2 border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900">
              <Github size={18} /> Github
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-100 dark:border-gray-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-gray-950 px-2 text-gray-400 font-bold">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2 text-left">
              <Label className="font-bold text-gray-700 dark:text-gray-300">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-14 rounded-2xl border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus-visible:ring-orange-500/20"
                  required
                />
              </div>
            </div>

            <div className="space-y-2 text-left">
              <div className="flex justify-between items-center">
                <Label className="font-bold text-gray-700 dark:text-gray-300">Password</Label>
                <button type="button" className="text-xs font-bold text-orange-500 hover:text-orange-600">Forgot password?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 h-14 rounded-2xl border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus-visible:ring-orange-500/20"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-lg shadow-lg shadow-orange-200 dark:shadow-none group"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
              {!isSubmitting && <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />}
            </Button>
          </form>

          <div className="pt-4 text-center space-y-4">
            <p className="text-sm text-gray-500 font-medium">
              Don't have an account? <button className="text-orange-500 font-black hover:underline">Create one for free</button>
            </p>
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <Sparkles size={14} className="text-orange-500" />
              Join for exclusive rewards
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;