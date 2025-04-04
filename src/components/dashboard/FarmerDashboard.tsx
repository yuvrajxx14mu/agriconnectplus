
import { ArrowRightIcon, CloudRain, Droplets, Thermometer, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarketTrends from "./MarketTrends";
import ProduceListingForm from "./ProduceListingForm";
import RecentListings from "./RecentListings";
import ActiveBids from "./ActiveBids";

const FarmerDashboard = () => {
  const currentDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome, Rajesh!</h1>
          <p className="text-muted-foreground">{currentDate}</p>
        </div>
        <Button className="bg-agri-primary hover:bg-agri-secondary">
          <span>List New Produce</span>
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Active Listings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              +1 from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Bids Received
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground">
              +3 from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Sold This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹45,320</div>
            <p className="text-xs text-muted-foreground">
              25 Quintals of produce
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Average Price Premium
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-agri-success">+8.2%</div>
            <p className="text-xs text-muted-foreground">
              Above local mandi rates
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Weather & Market Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Weather Updates</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription>Amritsar, Punjab</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CloudRain className="h-8 w-8 text-agri-primary" />
                  <div>
                    <div className="text-2xl font-bold">28°C</div>
                    <div className="text-sm text-muted-foreground">Partly Cloudy</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm">High: 32°C</div>
                  <div className="text-sm">Low: 24°C</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2 border-t">
                <div className="flex flex-col items-center">
                  <Droplets className="h-5 w-5 text-blue-500 mb-1" />
                  <div className="text-sm font-medium">65%</div>
                  <div className="text-xs text-muted-foreground">Humidity</div>
                </div>
                <div className="flex flex-col items-center">
                  <CloudRain className="h-5 w-5 text-blue-700 mb-1" />
                  <div className="text-sm font-medium">20%</div>
                  <div className="text-xs text-muted-foreground">Rain</div>
                </div>
                <div className="flex flex-col items-center">
                  <Thermometer className="h-5 w-5 text-orange-500 mb-1" />
                  <div className="text-sm font-medium">30°C</div>
                  <div className="text-xs text-muted-foreground">Feels like</div>
                </div>
              </div>
              <div className="pt-2 border-t">
                <h4 className="text-sm font-medium mb-2">5-Day Forecast</h4>
                <div className="grid grid-cols-5 gap-1 text-center">
                  {["Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
                    <div key={day} className="text-xs">
                      <div className="font-medium">{day}</div>
                      <CloudRain className="h-4 w-4 mx-auto my-1" />
                      <div>{30 - i}°</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="lg:col-span-2">
          <MarketTrends />
        </div>
      </div>

      {/* Marketplace Activity */}
      <Tabs defaultValue="listings" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="listings">Your Listings</TabsTrigger>
          <TabsTrigger value="bids">Active Bids</TabsTrigger>
          <TabsTrigger value="new">New Listing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="listings" className="mt-0">
          <RecentListings />
        </TabsContent>
        
        <TabsContent value="bids" className="mt-0">
          <ActiveBids />
        </TabsContent>
        
        <TabsContent value="new" className="mt-0">
          <ProduceListingForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FarmerDashboard;
