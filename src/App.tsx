
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MarketPrices from "./pages/MarketPrices";
import NotFound from "./pages/NotFound";
import Trade from "./pages/Trade";
import KycVerification from "./pages/KycVerification";
import QualityAssaying from "./pages/QualityAssaying";
import PaymentGateway from "./pages/PaymentGateway";
import Logistics from "./pages/Logistics";
import Marketplace from "./pages/Marketplace";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/market-prices" element={<MarketPrices />} />
          <Route path="/trade/:listingId" element={<Trade />} />
          <Route path="/kyc-verification" element={<KycVerification />} />
          <Route path="/quality-assaying" element={<QualityAssaying />} />
          <Route path="/payment/:transactionId" element={<PaymentGateway />} />
          <Route path="/logistics" element={<Logistics />} />
          <Route path="/logistics/:transactionId" element={<Logistics />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
