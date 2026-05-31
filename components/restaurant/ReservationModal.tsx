"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, Users, Clock, CheckCircle2 } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { showSuccess } from '@/utils/toast';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  restaurantName: string;
  restaurantId: string;
}

const ReservationModal = ({ isOpen, onClose, restaurantName, restaurantId }: Props) => {
  const { addReservation } = useStore();
  const [date, setDate] = useState<Date>();
  const [guests, setGuests] = useState("2");
  const [time, setTime] = useState("19:00");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      addReservation({
        id: Math.random().toString(36).substr(2, 9),
        restaurantId,
        restaurantName,
        date: format(date, "PPP"),
        time,
        guests: parseInt(guests),
        status: 'confirmed'
      });
      
      setIsSubmitting(false);
      setIsSuccess(true);
      showSuccess("Table reserved successfully!");
      
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
      }, 2000);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-3xl">
        {isSuccess ? (
          <div className="py-12 flex flex-col items-center text-center space-y-4">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-600">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Reservation Confirmed!</h2>
            <p className="text-gray-500">We've sent the details to your email.</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-black text-gray-900">Book a Table</DialogTitle>
              <p className="text-sm text-gray-500">at {restaurantName}</p>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 py-4">
              <div className="space-y-2">
                <Label className="font-bold text-gray-700">Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal h-12 rounded-xl border-gray-200",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 rounded-2xl shadow-xl border-gray-100" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-bold text-gray-700">Guests</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <select 
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none font-medium"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-gray-700">Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <select 
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none font-medium"
                    >
                      {['12:00', '13:00', '14:00', '18:00', '19:00', '20:00', '21:00'].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={!date || isSubmitting}
                className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-lg shadow-lg shadow-orange-200"
              >
                {isSubmitting ? "Confirming..." : "Confirm Reservation"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReservationModal;