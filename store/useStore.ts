import { create } from 'zustand';
import { CartItem, UserProfile, Reservation, DiningEvent, DeliveryJob, Order, PaymentMethod, Restaurant, Review, WalletTransaction } from '@/types';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  timestamp: string;
  read: boolean;
}

interface PointsTransaction {
  id: string;
  amount: number;
  reason: string;
  type: 'earn' | 'spend';
  timestamp: string;
}

interface Address {
  id: string;
  label: string;
  address: string;
  isDefault: boolean;
}

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  status: 'available' | 'out-of-stock';
}

interface AppState {
  // Auth & User
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  pointsHistory: PointsTransaction[];
  walletHistory: WalletTransaction[];
  referralCode: string;
  addresses: Address[];
  
  // Search & Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  reorder: (orderId: string) => void;

  // Orders
  orders: Order[];
  placeOrder: (order: Order, useWallet?: boolean) => void;
  cancelOrder: (id: string) => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Review) => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (id: string) => void;

  // Notifications
  notifications: Notification[];
  addNotification: (notif: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;

  // Payment Methods
  paymentMethods: PaymentMethod[];
  addPaymentMethod: (pm: PaymentMethod) => void;
  removePaymentMethod: (id: string) => void;

  // Reservations
  reservations: Reservation[];
  addReservation: (res: Reservation) => void;

  // Events
  events: DiningEvent[];
  
  // Delivery
  activeDeliveries: DeliveryJob[];
  completeDelivery: (id: string) => void;

  // Address Actions
  addAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;

  // Wallet Actions
  addWalletFunds: (amount: number) => void;
  
  // Restaurant Management
  restaurantMenu: MenuItem[];
  toggleItemStatus: (id: string) => void;
}

export const useStore = create<AppState>((set) => ({
  // Start with no user logged in
  user: null,
  setUser: (user) => set({ user }),
  pointsHistory: [
    { id: 'p1', amount: 100, reason: 'Order #ORD-8821', type: 'earn', timestamp: new Date(Date.now() - 86400000).toISOString() },
    { id: 'p2', amount: 50, reason: 'Table Reservation', type: 'earn', timestamp: new Date(Date.now() - 172800000).toISOString() },
    { id: 'p3', amount: 20, reason: 'Review Shared', type: 'earn', timestamp: new Date(Date.now() - 259200000).toISOString() },
  ],
  walletHistory: [
    { id: 'w1', amount: 10.00, type: 'credit', reason: 'Refund for Order #ORD-7712', timestamp: new Date(Date.now() - 432000000).toISOString() },
    { id: 'w2', amount: 5.00, type: 'debit', reason: 'Used for Order #ORD-8821', timestamp: new Date(Date.now() - 86400000).toISOString() },
  ],
  referralCode: 'FLAVOR-JD-2024',
  addresses: [
    { id: 'a1', label: 'Home', address: '452 Park Avenue, Manhattan, New York, 10022', isDefault: true },
    { id: 'a2', label: 'Office', address: '120 Broadway, New York, NY 10271', isDefault: false }
  ],
  
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  activeFilter: 'All',
  setActiveFilter: (filter) => set({ activeFilter: filter }),

  cart: [],
  isCartOpen: false,
  setCartOpen: (open) => set({ isCartOpen: open }),
  
  addToCart: (item) => set((state) => {
    const existingItem = state.cart.find((i) => i.id === item.id);
    if (existingItem) {
      return {
        cart: state.cart.map((i) => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      };
    }
    return { cart: [...state.cart, { ...item, quantity: 1 }] };
  }),

  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter((i) => i.id !== id)
  })),

  updateQuantity: (id, delta) => set((state) => ({
    cart: state.cart.map((i) => 
      i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i
    ).filter((i) => i.quantity > 0)
  })),

  clearCart: () => set({ cart: [] }),

  reorder: (orderId) => set((state) => {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return state;
    return {
      cart: order.items.map(item => ({ ...item })),
      isCartOpen: true
    };
  }),

  orders: [
    {
      id: 'ORD-8821',
      restaurantName: 'The Burger House',
      items: [{ id: 'm1', name: 'Classic Cheeseburger', price: 12.99, quantity: 2 }],
      total: 30.98,
      status: 'delivered',
      timestamp: new Date(Date.now() - 86400000).toISOString()
    }
  ],
  placeOrder: (order, useWallet = false) => set((state) => {
    const newWalletBalance = useWallet && state.user 
      ? state.user.walletBalance - order.total 
      : state.user?.walletBalance || 0;

    const newWalletHistory = useWallet 
      ? [{ id: Math.random().toString(36).substr(2, 9), amount: order.total, type: 'debit' as const, reason: `Payment for Order #${order.id}`, timestamp: new Date().toISOString() }, ...state.walletHistory]
      : state.walletHistory;

    return {
      orders: [order, ...state.orders],
      cart: [],
      user: state.user ? { ...state.user, points: state.user.points + 100, walletBalance: newWalletBalance } : null,
      walletHistory: newWalletHistory,
      pointsHistory: [
        { id: Math.random().toString(36).substr(2, 9), amount: 100, reason: `Order #${order.id}`, type: 'earn', timestamp: new Date().toISOString() },
        ...state.pointsHistory
      ]
    };
  }),
  cancelOrder: (id) => set((state) => ({
    orders: state.orders.map(o => o.id === id ? { ...o, status: 'cancelled' } : o)
  })),

  reviews: [],
  addReview: (review) => set((state) => ({
    reviews: [review, ...state.reviews],
    user: state.user ? { ...state.user, points: state.user.points + 20 } : null,
    pointsHistory: [
      { id: Math.random().toString(36).substr(2, 9), amount: 20, reason: 'Review Shared', type: 'earn', timestamp: new Date().toISOString() },
      ...state.pointsHistory
    ]
  })),

  favorites: ['1', '2'],
  toggleFavorite: (id) => set((state) => ({
    favorites: state.favorites.includes(id) 
      ? state.favorites.filter(favId => favId !== id)
      : [...state.favorites, id]
  })),

  notifications: [
    {
      id: 'n1',
      title: 'Welcome to FlavorDash!',
      message: 'Start exploring the best restaurants in your city.',
      type: 'info',
      timestamp: new Date().toISOString(),
      read: false
    },
    {
      id: 'n2',
      title: 'New Offer Available!',
      message: 'Get 50% off on your next order with code FLAVOR50.',
      type: 'success',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false
    }
  ],
  addNotification: (notif) => set((state) => ({
    notifications: [
      { ...notif, id: Math.random().toString(36).substr(2, 9), timestamp: new Date().toISOString(), read: false },
      ...state.notifications
    ]
  })),
  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
  })),
  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, read: true }))
  })),

  paymentMethods: [
    { id: 'pm1', type: 'visa', last4: '4242', expiry: '12/25', isDefault: true },
    { id: 'pm2', type: 'mastercard', last4: '8888', expiry: '08/26', isDefault: false }
  ],
  addPaymentMethod: (pm) => set((state) => ({
    paymentMethods: [...state.paymentMethods, pm]
  })),
  removePaymentMethod: (id) => set((state) => ({
    paymentMethods: state.paymentMethods.filter(pm => pm.id !== id)
  })),

  reservations: [],
  addReservation: (res) => set((state) => ({ 
    reservations: [...state.reservations, res],
    user: state.user ? { ...state.user, points: state.user.points + 50 } : null,
    pointsHistory: [
      { id: Math.random().toString(36).substr(2, 9), amount: 50, reason: 'Table Reservation', type: 'earn', timestamp: new Date().toISOString() },
      ...state.pointsHistory
    ]
  })),

  events: [
    {
      id: 'e1',
      title: 'Italian Pasta Workshop',
      description: 'Learn to make authentic pasta from scratch with Chef Mario.',
      date: '2024-06-15',
      location: 'Little Italy, NY',
      price: 75,
      image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=600',
      category: 'Workshop'
    },
    {
      id: 'e2',
      title: 'Wine Tasting Evening',
      description: 'Sample premium wines from around the world with expert sommeliers.',
      date: '2024-06-20',
      location: 'SoHo, NY',
      price: 120,
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=600',
      category: 'Tasting'
    },
    {
      id: 'e3',
      title: 'Street Food Festival',
      description: 'A weekend celebration of the best street food vendors in the city.',
      date: '2024-07-05',
      location: 'Central Park, NY',
      price: 15,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600',
      category: 'Festival'
    }
  ],

  activeDeliveries: [
    {
      id: 'd1',
      orderId: 'ORD-9921',
      restaurantName: 'The Burger House',
      customerAddress: '452 Park Ave, NY',
      status: 'pending',
      earnings: 12.50,
      distance: '2.4 km'
    }
  ],
  completeDelivery: (id) => set((state) => ({
    activeDeliveries: state.activeDeliveries.map(d => 
      d.id === id ? { ...d, status: 'delivered' } : d
    )
  })),

  addAddress: (address) => set((state) => ({
    addresses: [...state.addresses, address]
  })),
  removeAddress: (id) => set((state) => ({
    addresses: state.addresses.filter(a => a.id !== id)
  })),
  setDefaultAddress: (id) => set((state) => ({
    addresses: state.addresses.map(a => ({ ...a, isDefault: a.id === id }))
  })),

  addWalletFunds: (amount) => set((state) => ({
    user: state.user ? { ...state.user, walletBalance: state.user.walletBalance + amount } : null,
    walletHistory: [
      { id: Math.random().toString(36).substr(2, 9), amount, type: 'credit', reason: 'Added funds', timestamp: new Date().toISOString() },
      ...state.walletHistory
    ]
  })),

  restaurantMenu: [
    { id: 'm1', name: 'Classic Cheeseburger', price: 12.99, category: 'Burgers', status: 'available' },
    { id: 'm2', name: 'Truffle Fries', price: 6.50, category: 'Sides', status: 'available' },
    { id: 'm3', name: 'Margherita Pizza', price: 18.00, category: 'Pizza', status: 'out-of-stock' },
  ],
  toggleItemStatus: (id) => set((state) => ({
    restaurantMenu: state.restaurantMenu.map(item => 
      item.id === id 
        ? { ...item, status: item.status === 'available' ? 'out-of-stock' : 'available' } 
        : item
    )
  })),
}));