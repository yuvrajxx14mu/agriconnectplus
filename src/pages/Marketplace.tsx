
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Leaf, MapPin, ArrowRight, Filter, Search, IndianRupee } from "lucide-react";
import ProduceMarketplace from "@/components/marketplace/ProduceMarketplace";
import InputsMarketplace from "@/components/marketplace/InputsMarketplace";

const Marketplace = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("produce");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-6 flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">AgriConnect Marketplace</h1>
            <p className="text-muted-foreground mt-1">
              Find quality produce and agricultural inputs
            </p>
          </div>
          <Button 
            className="bg-agri-primary hover:bg-agri-secondary"
            onClick={() => navigate("/dashboard")}
          >
            <span>My Dashboard</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="produce" className="w-full" onValueChange={(val) => setActiveTab(val)}>
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="produce">Produce Marketplace</TabsTrigger>
            <TabsTrigger value="inputs">Agricultural Inputs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="produce">
            <ProduceMarketplace />
          </TabsContent>
          
          <TabsContent value="inputs">
            <InputsMarketplace />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Marketplace;
