"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, User } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'partner';
  timestamp: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  partnerName: string;
}

const ChatModal = ({ isOpen, onClose, partnerName }: Props) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hi! I've picked up your order and I'm on my way.", sender: 'partner', timestamp: '12:50 PM' }
  ]);
  const [inputText, setInputText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInputText("");

    // Simulate partner reply
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        text: "Got it! I'll be there in about 10 minutes.",
        sender: 'partner',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] h-[500px] flex flex-col p-0 rounded-3xl overflow-hidden">
        <DialogHeader className="p-4 border-b bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white">
              <User size={20} />
            </div>
            <div>
              <DialogTitle className="text-lg font-black">{partnerName}</DialogTitle>
              <p className="text-xs text-green-600 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                Online
              </p>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={cn(
                  "flex flex-col max-w-[80%]",
                  msg.sender === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                )}
              >
                <div className={cn(
                  "px-4 py-2 rounded-2xl text-sm font-medium",
                  msg.sender === 'user' 
                    ? "bg-orange-500 text-white rounded-tr-none" 
                    : "bg-gray-100 text-gray-900 rounded-tl-none"
                )}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 font-bold">{msg.timestamp}</span>
              </div>
            ))}
          </div>
        </ScrollArea>

        <form onSubmit={handleSend} className="p-4 border-t bg-white flex gap-2">
          <Input 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..." 
            className="rounded-xl h-12 border-gray-100 bg-gray-50"
          />
          <Button type="submit" size="icon" className="h-12 w-12 rounded-xl bg-orange-500 hover:bg-orange-600">
            <Send size={18} />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

import { cn } from '@/lib/utils';
export default ChatModal;