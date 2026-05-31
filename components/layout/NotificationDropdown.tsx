"use client";

import React from 'react';
import { Bell, Check, Info, AlertTriangle, CheckCheck } from 'lucide-react';
import { useStore } from '@/store/useStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from '@/lib/utils';

const NotificationDropdown = () => {
  const { notifications, markAsRead, markAllAsRead } = useStore();
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <Check className="text-green-500" size={16} />;
      case 'warning': return <AlertTriangle className="text-orange-500" size={16} />;
      default: return <Info className="text-blue-500" size={16} />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative cursor-pointer p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all group">
          <Bell className="text-gray-600 group-hover:scale-110 transition-transform" size={22} />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 bg-red-500 w-2.5 h-2.5 rounded-full border-2 border-white" />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 rounded-2xl p-0 shadow-xl border-gray-100 overflow-hidden" align="end">
        <DropdownMenuLabel className="font-black text-gray-900 p-4 flex justify-between items-center">
          Notifications
          <div className="flex items-center gap-2">
            {unreadCount > 0 && <span className="text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded-full">{unreadCount} New</span>}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                markAllAsRead();
              }}
              className="text-[10px] text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-1"
            >
              <CheckCheck size={12} />
              Mark all read
            </button>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="m-0 bg-gray-50" />
        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm font-medium">
              No notifications yet
            </div>
          ) : (
            notifications.map((n) => (
              <DropdownMenuItem 
                key={n.id} 
                onClick={() => markAsRead(n.id)}
                className={cn(
                  "p-4 cursor-pointer focus:bg-gray-50 flex gap-3 items-start border-b border-gray-50 last:border-0",
                  !n.read && "bg-orange-50/30"
                )}
              >
                <div className="mt-1">{getIcon(n.type)}</div>
                <div className="flex-1">
                  <p className="font-bold text-sm text-gray-900">{n.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{n.message}</p>
                  <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-wider">
                    {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {!n.read && <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />}
              </DropdownMenuItem>
            ))
          )}
        </ScrollArea>
        <DropdownMenuSeparator className="m-0 bg-gray-50" />
        <div className="p-3 text-center">
          <button className="text-xs font-black text-orange-500 hover:text-orange-600 uppercase tracking-widest">
            View All Notifications
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;