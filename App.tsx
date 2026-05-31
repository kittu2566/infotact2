import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RestaurantDetail from "./pages/RestaurantDetail";
import UserPanel from "./pages/UserPanel";
import AdminPanel from "./pages/AdminPanel";
import DeliveryPanel from "./pages/DeliveryPanel";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import Checkout from "./pages/Checkout";
import OrderTracking from "./pages/OrderTracking";
import OrderDetail from "./pages/OrderDetail";
import Offers from "./pages/Offers";
import Events from "./pages/Events";
import HelpCenter from "./pages/HelpCenter";
import Referral from "./pages/Referral";
import Pro from "./pages/Pro";
import Login from "./pages/Login";
import Cuisine from "./pages/Cuisine";
import OrderSuccess from "./pages/OrderSuccess";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cuisine/:type" element={<Cuisine />} />
          <Route path="/order-success/:id" element={<OrderSuccess />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          <Route path="/user" element={<UserPanel />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/delivery" element={<DeliveryPanel />} />
          <Route path="/owner" element={<RestaurantDashboard />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/track/:id" element={<OrderTracking />} />
          <Route path="/order/:id" element={<OrderDetail />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/events" element={<Events />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/referral" element={<Referral />} />
          <Route path="/pro" element={<Pro />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;