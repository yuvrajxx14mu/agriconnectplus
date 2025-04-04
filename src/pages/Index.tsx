
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, BarChart3, TrendingUp, ShoppingCart, Users, CreditCard, Truck, PieChart, Filter } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const Index = () => {
  const [selectedCrop, setSelectedCrop] = useState("all");

  // Mock data for market prices
  const marketPrices = [
    { id: 1, crop: "Wheat", variety: "Sharbati", price: 2250, change: "+120", location: "Delhi" },
    { id: 2, crop: "Rice", variety: "Basmati", price: 3300, change: "+200", location: "Karnal" },
    { id: 3, crop: "Maize", variety: "Yellow", price: 1870, change: "+50", location: "Ludhiana" },
    { id: 4, crop: "Pulses", variety: "Moong Dal", price: 6600, change: "-100", location: "Nagpur" },
    { id: 5, crop: "Cotton", variety: "J-34", price: 5700, change: "+150", location: "Ahmedabad" },
  ];

  const filteredPrices = selectedCrop === "all" 
    ? marketPrices 
    : marketPrices.filter(item => item.crop.toLowerCase() === selectedCrop);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-agri-primary to-agri-secondary text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Empowering Indian Farmers with Better Markets
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-2xl">
                AgriConnect Plus helps farmers sell directly to buyers, get better prices, and access valuable support services - all in one platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="bg-white text-agri-primary hover:bg-gray-100">
                  <Link to="/dashboard">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img 
                src="/placeholder.svg" 
                alt="Farmers using AgriConnect Plus" 
                className="rounded-lg shadow-xl max-h-[400px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How AgriConnect Plus Benefits You</h2>
            <p className="text-lg text-gray-600">
              Our platform is designed with Indian farmers at the center, providing tools and services that maximize your profits and simplify your operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-t-4 border-t-agri-primary hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-agri-muted p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-agri-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Better Prices</h3>
                <p className="text-gray-600">
                  Get up to 15% better prices by connecting directly with a wider pool of buyers and reducing intermediaries.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-t-agri-primary hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-agri-muted p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-agri-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Wider Market Access</h3>
                <p className="text-gray-600">
                  Connect with buyers from across states and sectors, including processors, exporters, and retailers.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-t-agri-primary hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-agri-muted p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <CreditCard className="h-6 w-6 text-agri-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Faster Payments</h3>
                <p className="text-gray-600">
                  Secure payment systems ensure you receive your money quickly and directly to your bank account.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-t-agri-primary hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-agri-muted p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Truck className="h-6 w-6 text-agri-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Logistics Support</h3>
                <p className="text-gray-600">
                  Access verified transport and warehousing services to simplify product movement and storage.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Market Insights Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Market Insights</h2>
              <p className="text-lg text-gray-600 mt-2">
                Real-time price information to help you make informed decisions
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-2">
              <span className="text-sm text-gray-500">Filter by crop:</span>
              <select 
                className="border rounded-md px-3 py-1 text-sm"
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
              >
                <option value="all">All Crops</option>
                <option value="wheat">Wheat</option>
                <option value="rice">Rice</option>
                <option value="maize">Maize</option>
                <option value="pulses">Pulses</option>
                <option value="cotton">Cotton</option>
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Crop
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Variety
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price (₹/Quintal)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Change
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Market
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPrices.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{item.crop}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.variety}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold">₹{item.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.change.startsWith("+") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {item.change.startsWith("+") ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingUp className="h-3 w-3 mr-1 transform rotate-180" />
                        )}
                        {item.change}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.location}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 text-center">
            <Button variant="outline" asChild className="border-agri-primary text-agri-primary hover:bg-agri-muted">
              <Link to="/market-prices">
                <span>View All Market Prices</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Features</h2>
            <p className="text-lg text-gray-600">
              AgriConnect Plus offers a comprehensive suite of tools designed specifically for Indian farmers
            </p>
          </div>
          
          <Tabs defaultValue="marketplace" className="w-full">
            <TabsList className="grid grid-cols-1 md:grid-cols-4 mb-8 max-w-3xl mx-auto">
              <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
              <TabsTrigger value="advisory">Advisory</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="logistics">Logistics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="marketplace" className="animate-fade-in">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2">
                  <img 
                    src="/placeholder.svg" 
                    alt="Marketplace Interface" 
                    className="rounded-lg shadow-md"
                  />
                </div>
                
                <div className="lg:w-1/2 space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold">Transparent Marketplace</h3>
                  <p className="text-lg text-gray-600">
                    List your produce, receive competitive bids, and connect with a wide network of buyers from across India.
                  </p>
                  
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-agri-primary text-white p-1 mt-1">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Easy produce listing with quality parameters and photos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-agri-primary text-white p-1 mt-1">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Real-time bidding with instant notifications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-agri-primary text-white p-1 mt-1">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Direct connection to institutional buyers and exporters</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-agri-primary text-white p-1 mt-1">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Transparent pricing and market information</span>
                    </li>
                  </ul>
                  
                  <Button asChild className="bg-agri-primary hover:bg-agri-secondary">
                    <Link to="/marketplace">
                      <span>Explore Marketplace</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="advisory" className="animate-fade-in">
              <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                <div className="lg:w-1/2">
                  <img 
                    src="/placeholder.svg" 
                    alt="Advisory Services" 
                    className="rounded-lg shadow-md"
                  />
                </div>
                
                <div className="lg:w-1/2 space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold">Advisory & Information Services</h3>
                  <p className="text-lg text-gray-600">
                    Access critical information and expert advice to improve your farming practices and decision-making.
                  </p>
                  
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-agri-primary text-white p-1 mt-1">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Localized weather forecasts and alerts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-agri-primary text-white p-1 mt-1">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Crop management best practices in local languages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-agri-primary text-white p-1 mt-1">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Expert support for pest management and disease control</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-agri-primary text-white p-1 mt-1">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Information on government schemes and subsidies</span>
                    </li>
                  </ul>
                  
                  <Button asChild className="bg-agri-primary hover:bg-agri-secondary">
                    <Link to="/advisory">
                      <span>Access Advisory Services</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="financial" className="animate-fade-in">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2">
                  <img 
                    src="/placeholder.svg" 
                    alt="Financial Services" 
                    className="rounded-lg shadow-md"
                  />
                </div>
                
                <div className="lg:w-1/2 space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold">Financial Services</h3>
                  <p className="text-lg text-gray-600">
                    Access to credit, insurance, and other financial services tailored for agricultural needs.
                  </p>
                  
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-agri-primary text-white p-1 mt-1">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Information on Kisan Credit Card (KCC) schemes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-agri-primary text-white p-1 mt-1">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Crop insurance (PMFBY) facilitation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-agri-primary text-white p-1 mt-1">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Warehouse receipt financing options</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-agri-primary text-white p-1 mt-1">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Equipment financing and input loans</span>
                    </li>
                  </ul>
                  
                  <Button asChild className="bg-agri-primary hover:bg-agri-secondary">
                    <Link to="/financial-services">
                      <span>Explore Financial Services</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="logistics" className="animate-fade-in">
              <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                <div className="lg:w-1/2">
                  <img 
                    src="/placeholder.svg" 
                    alt="Logistics Services" 
                    className="rounded-lg shadow-md"
                  />
                </div>
                
                <div className="lg:w-1/2 space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold">Logistics Support</h3>
                  <p className="text-lg text-gray-600">
                    Streamline transportation and storage with our network of verified logistics partners.
                  </p>
                  
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-agri-primary text-white p-1 mt-1">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Directory of verified transport providers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-agri-primary text-white p-1 mt-1">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Access to warehousing facilities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-agri-primary text-white p-1 mt-1">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Real-time shipment tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-agri-primary text-white p-1 mt-1">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Competitive freight quotes directly through the platform</span>
                    </li>
                  </ul>
                  
                  <Button asChild className="bg-agri-primary hover:bg-agri-secondary">
                    <Link to="/logistics">
                      <span>Find Logistics Partners</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Farmer Success Stories</h2>
            <p className="text-lg text-gray-600">
              Hear from farmers who have transformed their businesses with AgriConnect Plus
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <img 
                      src="/placeholder.svg" 
                      alt="Farmer" 
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Sukhbir Singh</h3>
                    <p className="text-sm text-gray-500">Wheat Farmer, Punjab</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "I received 12% higher prices for my wheat crop compared to the local mandi. The direct connection to buyers and transparent bidding system made all the difference."
                </p>
                <div className="flex mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <img 
                      src="/placeholder.svg" 
                      alt="Farmer" 
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Lakshmi Devi</h3>
                    <p className="text-sm text-gray-500">Rice Farmer, Andhra Pradesh</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "The platform simplified everything for me. I can now list my produce, find buyers, and arrange transport all from my phone. Payments are also much faster!"
                </p>
                <div className="flex mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <img 
                      src="/placeholder.svg" 
                      alt="Farmer" 
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Ramesh Patel</h3>
                    <p className="text-sm text-gray-500">Cotton Farmer, Gujarat</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "The weather alerts and market price information have been invaluable. I've made better decisions about when to harvest and sell my cotton, increasing my profits by nearly 20%."
                </p>
                <div className="flex mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-agri-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Farming Business?</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
            Join thousands of farmers across India who are already benefiting from our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-agri-primary hover:bg-gray-100">
              <Link to="/dashboard">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
