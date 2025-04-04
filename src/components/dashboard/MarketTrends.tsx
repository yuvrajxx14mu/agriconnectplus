
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for market trends
const wheatData = [
  { date: "Apr 1", price: 2100 },
  { date: "Apr 2", price: 2150 },
  { date: "Apr 3", price: 2200 },
  { date: "Apr 4", price: 2180 },
  { date: "Apr 5", price: 2220 },
  { date: "Apr 6", price: 2250 },
  { date: "Apr 7", price: 2280 },
];

const riceData = [
  { date: "Apr 1", price: 3200 },
  { date: "Apr 2", price: 3220 },
  { date: "Apr 3", price: 3180 },
  { date: "Apr 4", price: 3250 },
  { date: "Apr 5", price: 3300 },
  { date: "Apr 6", price: 3280 },
  { date: "Apr 7", price: 3320 },
];

const pulsesData = [
  { date: "Apr 1", price: 6500 },
  { date: "Apr 2", price: 6450 },
  { date: "Apr 3", price: 6480 },
  { date: "Apr 4", price: 6520 },
  { date: "Apr 5", price: 6550 },
  { date: "Apr 6", price: 6600 },
  { date: "Apr 7", price: 6650 },
];

const maizeData = [
  { date: "Apr 1", price: 1750 },
  { date: "Apr 2", price: 1780 },
  { date: "Apr 3", price: 1800 },
  { date: "Apr 4", price: 1820 },
  { date: "Apr 5", price: 1840 },
  { date: "Apr 6", price: 1830 },
  { date: "Apr 7", price: 1860 },
];

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

const MarketTrends = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Price Trends</CardTitle>
        <CardDescription>
          7-day price trends for major commodities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="wheat">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="wheat">Wheat</TabsTrigger>
            <TabsTrigger value="rice">Rice</TabsTrigger>
            <TabsTrigger value="pulses">Pulses</TabsTrigger>
            <TabsTrigger value="maize">Maize</TabsTrigger>
          </TabsList>
          
          <TabsContent value="wheat" className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={wheatData}>
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
                  domain={['dataMin - 100', 'dataMax + 100']}
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
          </TabsContent>
          
          <TabsContent value="rice" className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={riceData}>
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
                  domain={['dataMin - 100', 'dataMax + 100']}
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
          </TabsContent>
          
          <TabsContent value="pulses" className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pulsesData}>
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
                  domain={['dataMin - 100', 'dataMax + 100']}
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
          </TabsContent>
          
          <TabsContent value="maize" className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={maizeData}>
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
                  domain={['dataMin - 100', 'dataMax + 100']}
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
          </TabsContent>
        </Tabs>

        <div className="mt-4 text-sm text-muted-foreground text-right">
          <p>Last updated: April 4, 2025</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketTrends;
