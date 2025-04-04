
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type MarketPrice = Database['public']['Tables']['market_prices']['Row'] & {
  crop_categories: { name: string } | null;
  crop_varieties: { name: string } | null;
  locations: { name: string; district: string; state: string } | null;
};

// Custom tooltip for the chart
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-md rounded">
        <p className="font-medium">{label}</p>
        <p className="text-agri-primary">₹{payload[0].value}/quintal</p>
      </div>
    );
  }
  return null;
};

// Function to fetch market prices from Supabase
const fetchMarketPrices = async (cropCategoryId: string) => {
  const today = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(today.getMonth() - 1);
  
  const { data, error } = await supabase
    .from('market_prices')
    .select(`
      *,
      crop_categories(name),
      crop_varieties(name),
      locations(name, district, state)
    `)
    .eq('crop_category_id', cropCategoryId)
    .gte('date', format(oneMonthAgo, 'yyyy-MM-dd'))
    .order('date', { ascending: true });
  
  if (error) {
    console.error("Error fetching market prices:", error);
    throw error;
  }
  
  // Transform data for chart
  const chartData = (data as MarketPrice[]).map(price => ({
    date: format(new Date(price.date), 'MMM dd'),
    price: price.modal_price,
    location: price.locations?.name || 'Unknown',
    min: price.min_price,
    max: price.max_price
  }));
  
  return {
    prices: data as MarketPrice[],
    chartData
  };
};

// Function to fetch crop categories
const fetchCropCategories = async () => {
  const { data, error } = await supabase
    .from('crop_categories')
    .select('*')
    .order('name');
  
  if (error) {
    console.error("Error fetching crop categories:", error);
    throw error;
  }
  
  return data;
};

const MarketPrices = () => {
  const [selectedCropId, setSelectedCropId] = useState<string | null>(null);
  const [selectedLocationFilter, setSelectedLocationFilter] = useState<string>("all");
  
  // Fetch crop categories
  const { 
    data: cropCategories, 
    isLoading: isLoadingCategories 
  } = useQuery({
    queryKey: ['cropCategories'],
    queryFn: fetchCropCategories
  });
  
  // Set default selected crop when categories are loaded
  useEffect(() => {
    if (cropCategories && cropCategories.length > 0 && !selectedCropId) {
      setSelectedCropId(cropCategories[0].id);
    }
  }, [cropCategories, selectedCropId]);
  
  // Fetch market prices for selected crop
  const { 
    data: marketPricesData, 
    isLoading: isLoadingPrices 
  } = useQuery({
    queryKey: ['marketPrices', selectedCropId],
    queryFn: () => selectedCropId ? fetchMarketPrices(selectedCropId) : null,
    enabled: !!selectedCropId
  });
  
  // Get unique locations for filtering
  const locations = marketPricesData?.prices
    ? [...new Set(marketPricesData.prices.map(price => price.locations?.name || 'Unknown'))]
    : [];
  
  // Filter chart data by selected location
  const filteredChartData = marketPricesData?.chartData
    ? selectedLocationFilter === "all"
      ? marketPricesData.chartData
      : marketPricesData.chartData.filter(item => 
          item.location === selectedLocationFilter
        )
    : [];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Market Price Trends</h1>
            <p className="text-muted-foreground">
              Track the latest prices for agricultural commodities across different markets
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Filter Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Commodity</label>
                  {isLoadingCategories ? (
                    <Skeleton className="h-10 w-full" />
                  ) : (
                    <Select
                      value={selectedCropId || undefined}
                      onValueChange={(value) => setSelectedCropId(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select commodity" />
                      </SelectTrigger>
                      <SelectContent>
                        {cropCategories?.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
                
                {locations.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Market Location</label>
                    <Select
                      value={selectedLocationFilter}
                      onValueChange={setSelectedLocationFilter}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        {locations.map(location => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>
                  {isLoadingPrices || !selectedCropId
                    ? "Loading price data..."
                    : `Price Trends: ${cropCategories?.find(c => c.id === selectedCropId)?.name || ''}`
                  }
                </CardTitle>
                <CardDescription>
                  30-day price trends {selectedLocationFilter !== "all" ? `for ${selectedLocationFilter}` : "across all markets"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingPrices ? (
                  <div className="h-[350px] flex items-center justify-center">
                    <Skeleton className="h-[300px] w-full" />
                  </div>
                ) : filteredChartData.length > 0 ? (
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={filteredChartData}>
                        <XAxis 
                          dataKey="date" 
                          stroke="#888888" 
                          fontSize={12} 
                          tickLine={false} 
                          axisLine={false} 
                        />
                        <YAxis
                          stroke="#888888"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `₹${value}`}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                          type="monotone"
                          dataKey="price"
                          stroke="#2E7D32"
                          strokeWidth={2}
                          dot={{ r: 4, fill: "#2E7D32" }}
                          activeDot={{ r: 6, fill: "#2E7D32" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-[350px] flex items-center justify-center text-muted-foreground">
                    No price data available for the selected criteria. 
                    {!marketPricesData?.prices?.length && (
                      <p className="mt-2">Try seeding some market price data in your database.</p>
                    )}
                  </div>
                )}
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Recent Price Updates</h3>
                  {isLoadingPrices ? (
                    <div className="space-y-2">
                      {[1, 2, 3].map(i => (
                        <Skeleton key={i} className="h-12 w-full" />
                      ))}
                    </div>
                  ) : marketPricesData?.prices && marketPricesData.prices.length > 0 ? (
                    <div className="border rounded-md">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Price</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Price</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modal Price</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {marketPricesData.prices
                            .filter(price => 
                              selectedLocationFilter === "all" || 
                              price.locations?.name === selectedLocationFilter
                            )
                            .slice(0, 10)
                            .map((price, index) => (
                              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-4 py-2 text-sm text-gray-900">
                                  {format(new Date(price.date), 'dd MMM yyyy')}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-900">
                                  {price.locations?.name || 'Unknown'} 
                                  {price.locations?.district && `, ${price.locations.district}`}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-900">₹{price.min_price}</td>
                                <td className="px-4 py-2 text-sm text-gray-900">₹{price.max_price}</td>
                                <td className="px-4 py-2 text-sm font-medium text-agri-primary">₹{price.modal_price}</td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No price data available
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MarketPrices;
