
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Truck, Calendar, MapPin, Clock, IndianRupee, User, Phone, Package, Info, Search, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { format, addDays } from "date-fns";

const Logistics = () => {
  const { transactionId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(transactionId ? "book" : "providers");
  const [isLoading, setIsLoading] = useState(true);
  const [processingBooking, setProcessingBooking] = useState(false);
  const [transaction, setTransaction] = useState<any>(null);
  const [providers, setProviders] = useState<any[]>([]);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProviders, setFilteredProviders] = useState<any[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [bookingDetails, setBookingDetails] = useState({
    pickupDate: "",
    pickupAddress: "",
    deliveryAddress: "",
    vehicleType: "",
    notes: ""
  });
  const [trackingQuery, setTrackingQuery] = useState("");
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [trackingLoading, setTrackingLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        // Fetch logistics providers
        const { data: providersData, error: providersError } = await supabase
          .from('logistics_providers')
          .select('*')
          .eq('verified', true);
        
        if (providersError) throw providersError;
        
        setProviders(providersData || []);
        setFilteredProviders(providersData || []);
        
        // If transaction ID is provided, fetch that specific transaction
        if (transactionId) {
          const { data: transactionData, error: transactionError } = await supabase
            .from('transactions')
            .select(`
              *,
              listing:produce_listings(
                *,
                seller:profiles(*)
              ),
              buyer:profiles(*)
            `)
            .eq('id', transactionId)
            .single();
          
          if (transactionError) throw transactionError;
          
          setTransaction(transactionData);
          
          // Pre-fill booking details
          if (transactionData.listing && transactionData.buyer) {
            setBookingDetails({
              ...bookingDetails,
              pickupAddress: `${transactionData.listing.pickup_address || ''}, ${transactionData.listing.pickup_district}, ${transactionData.listing.pickup_state}`,
              deliveryAddress: `${transactionData.buyer.address || ''}, ${transactionData.buyer.district || ''}, ${transactionData.buyer.state || ''}`,
              pickupDate: format(addDays(new Date(), 2), 'yyyy-MM-dd')
            });
          }
        }
      } catch (error: any) {
        console.error("Error fetching data:", error);
        toast.error(error.message || "Failed to load data");
      }
      
      setIsLoading(false);
    };
    
    fetchData();
  }, [transactionId]);

  useEffect(() => {
    // Filter providers based on search query
    if (searchQuery.trim() === "") {
      setFilteredProviders(providers);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = providers.filter(provider => 
        provider.company_name.toLowerCase().includes(query) || 
        (provider.operating_states && provider.operating_states.some((state: string) => state.toLowerCase().includes(query)))
      );
      setFilteredProviders(filtered);
    }
  }, [searchQuery, providers]);

  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingDetails({
      ...bookingDetails,
      [name]: value
    });
  };

  const handleProviderSelect = (provider: any) => {
    setSelectedProvider(provider);
    setActiveTab("book");
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProvider) {
      toast.error("Please select a logistics provider");
      return;
    }
    
    if (!bookingDetails.pickupDate || !bookingDetails.pickupAddress || !bookingDetails.deliveryAddress || !bookingDetails.vehicleType) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setProcessingBooking(true);
    
    try {
      // Calculate estimated price
      const estimatedPrice = calculateEstimatedPrice();
      
      // Create booking
      const { data: bookingData, error: bookingError } = await supabase
        .from('logistics_bookings')
        .insert({
          provider_id: selectedProvider.id,
          transaction_id: transactionId || null,
          pickup_address: bookingDetails.pickupAddress,
          delivery_address: bookingDetails.deliveryAddress,
          pickup_date: new Date(bookingDetails.pickupDate).toISOString(),
          expected_delivery_date: addDays(new Date(bookingDetails.pickupDate), 2).toISOString(),
          price: estimatedPrice,
          vehicle_type: bookingDetails.vehicleType,
          status: 'pending'
        })
        .select();
      
      if (bookingError) throw bookingError;
      
      // If we have a transaction ID, update the transaction with logistics details
      if (transactionId) {
        const { error: transactionError } = await supabase
          .from('transactions')
          .update({ logistics_id: bookingData[0].id })
          .eq('id', transactionId);
        
        if (transactionError) throw transactionError;
      }
      
      // Success!
      setTimeout(() => {
        setProcessingBooking(false);
        setBookingSuccess(true);
        toast.success("Logistics booking confirmed!");
      }, 1500);
    } catch (error: any) {
      console.error("Error making booking:", error);
      setProcessingBooking(false);
      toast.error(error.message || "Failed to create booking");
    }
  };

  const handleTrackingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trackingQuery) {
      toast.error("Please enter a booking ID");
      return;
    }
    
    setTrackingLoading(true);
    
    // Simulate tracking lookup
    setTimeout(() => {
      setTrackingLoading(false);
      
      // Dummy tracking result
      setTrackingResult({
        id: trackingQuery,
        status: "in_transit",
        provider: "Express Logistics Ltd.",
        vehicle: "DL 5C AB 1234",
        driver: "Ramesh Kumar",
        contact: "9876543210",
        pickup_date: "2023-04-15T09:30:00Z",
        expected_delivery: "2023-04-17T18:00:00Z",
        current_location: "Sonipat, Haryana",
        destination: "Ghaziabad, Uttar Pradesh",
        updates: [
          { time: "2023-04-15T09:30:00Z", status: "Picked up from source", location: "Amritsar, Punjab" },
          { time: "2023-04-15T18:45:00Z", status: "In transit", location: "Ludhiana, Punjab" },
          { time: "2023-04-16T08:15:00Z", status: "Reached hub", location: "Karnal, Haryana" },
          { time: "2023-04-16T14:30:00Z", status: "In transit", location: "Sonipat, Haryana" }
        ]
      });
    }, 1500);
  };

  const calculateEstimatedPrice = () => {
    if (!selectedProvider) return 0;
    
    const baseRate = selectedProvider.average_rate_per_km || 40;
    let vehicleMultiplier = 1;
    
    switch (bookingDetails.vehicleType) {
      case "small":
        vehicleMultiplier = 1;
        break;
      case "medium":
        vehicleMultiplier = 1.5;
        break;
      case "large":
        vehicleMultiplier = 2.2;
        break;
      case "refrigerated":
        vehicleMultiplier = 2.5;
        break;
      default:
        vehicleMultiplier = 1;
    }
    
    // Calculate estimated distance (dummy calculation)
    const estimatedDistance = 150;
    
    return Math.round(baseRate * estimatedDistance * vehicleMultiplier);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto space-y-8">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-8 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
            <Skeleton className="h-60 w-full" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (bookingSuccess) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="border-green-200">
              <CardHeader className="pb-4 text-center">
                <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-2" />
                <CardTitle className="text-xl">Booking Confirmed!</CardTitle>
                <CardDescription>
                  Your logistics booking has been confirmed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-md bg-muted p-4">
                  <div className="grid grid-cols-2 gap-y-2">
                    <p className="text-sm text-muted-foreground">Booking ID:</p>
                    <p className="text-sm font-medium">LB-{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
                    
                    <p className="text-sm text-muted-foreground">Provider:</p>
                    <p className="text-sm font-medium">{selectedProvider?.company_name}</p>
                    
                    <p className="text-sm text-muted-foreground">Vehicle Type:</p>
                    <p className="text-sm font-medium capitalize">{bookingDetails.vehicleType}</p>
                    
                    <p className="text-sm text-muted-foreground">Pickup Date:</p>
                    <p className="text-sm font-medium">{format(new Date(bookingDetails.pickupDate), 'dd MMM yyyy')}</p>
                    
                    <p className="text-sm text-muted-foreground">Estimated Delivery:</p>
                    <p className="text-sm font-medium">{format(addDays(new Date(bookingDetails.pickupDate), 2), 'dd MMM yyyy')}</p>
                    
                    <p className="text-sm text-muted-foreground">Total Amount:</p>
                    <p className="text-sm font-medium">{formatCurrency(calculateEstimatedPrice())}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium">Pickup Address:</h3>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-agri-primary mt-1" />
                    <p className="text-sm">{bookingDetails.pickupAddress}</p>
                  </div>
                  
                  <h3 className="font-medium">Delivery Address:</h3>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-agri-primary mt-1" />
                    <p className="text-sm">{bookingDetails.deliveryAddress}</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 text-blue-800 rounded-md p-4">
                  <div className="flex">
                    <Info className="h-5 w-5 flex-shrink-0 mr-2 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-medium">Booking Details Sent</p>
                      <p className="text-sm">The logistics provider will contact you soon to confirm details. You'll receive updates via SMS and email.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Button 
                className="bg-agri-primary hover:bg-agri-secondary w-full sm:w-auto"
                onClick={() => navigate("/dashboard")}
              >
                Go to Dashboard
              </Button>
              <Button 
                variant="outline" 
                className="w-full sm:w-auto"
                onClick={() => setActiveTab("track")}
              >
                Track Shipment
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl font-bold">Logistics Services</h1>
            
            {transactionId && transaction && (
              <div className="flex items-center space-x-2">
                <Badge>Transaction: {transactionId.substring(0, 8)}</Badge>
                <Badge variant="outline" className="capitalize">
                  {transaction.status}
                </Badge>
              </div>
            )}
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-1 md:grid-cols-3 mb-6">
              <TabsTrigger value="providers">Logistics Providers</TabsTrigger>
              <TabsTrigger value="book">Book Transport</TabsTrigger>
              <TabsTrigger value="track">Track Shipment</TabsTrigger>
            </TabsList>
            
            {/* Logistics Providers Tab */}
            <TabsContent value="providers" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Find Logistics Providers</CardTitle>
                  <CardDescription>
                    Browse verified logistics providers for your produce
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Search by name or location..." 
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  {filteredProviders.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No logistics providers found matching your search criteria.</p>
                      <p className="mt-2">Try adjusting your search terms.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredProviders.map((provider) => (
                        <div key={provider.id} className="border rounded-md p-4">
                          <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div>
                              <div className="flex items-center">
                                <Truck className="h-5 w-5 text-agri-primary mr-2" />
                                <h3 className="font-medium text-lg">{provider.company_name}</h3>
                                {provider.verified && (
                                  <Badge className="ml-2" variant="outline">Verified</Badge>
                                )}
                              </div>
                              
                              <div className="mt-2 space-y-1 text-sm">
                                <div className="flex items-start space-x-2">
                                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                                  <span>
                                    Operating in: {provider.operating_states?.join(", ") || "Multiple states"}
                                  </span>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <Truck className="h-4 w-4 text-muted-foreground mt-0.5" />
                                  <span>
                                    Fleet Size: {provider.fleet_size || "N/A"} vehicles
                                  </span>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <IndianRupee className="h-4 w-4 text-muted-foreground mt-0.5" />
                                  <span>
                                    Avg. Rate: {provider.average_rate_per_km ? `₹${provider.average_rate_per_km}/km` : "Varies by distance & weight"}
                                  </span>
                                </div>
                                {provider.has_refrigerated && (
                                  <div className="flex items-center space-x-2">
                                    <Badge variant="outline" className="text-xs">Refrigerated Transport Available</Badge>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <Button 
                                onClick={() => handleProviderSelect(provider)}
                                className="bg-agri-primary hover:bg-agri-secondary"
                              >
                                Select & Book
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Book Transport Tab */}
            <TabsContent value="book" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Book Transportation</CardTitle>
                  <CardDescription>
                    {selectedProvider 
                      ? `Booking with ${selectedProvider.company_name}`
                      : "Enter your transportation requirements"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleBookingSubmit} className="space-y-6">
                    {!selectedProvider && !transactionId && (
                      <div className="rounded-md bg-amber-50 p-4 text-amber-800 flex items-start space-x-3">
                        <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">No provider selected</p>
                          <p className="text-sm">Please select a logistics provider first or browse the available providers.</p>
                          <Button 
                            variant="link" 
                            className="h-auto p-0 text-amber-800 underline"
                            onClick={() => setActiveTab("providers")}
                          >
                            Browse Providers
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {selectedProvider && (
                      <div className="flex items-center space-x-3 py-2 px-4 bg-muted rounded-md">
                        <Truck className="h-5 w-5 text-agri-primary" />
                        <div>
                          <p className="font-medium">{selectedProvider.company_name}</p>
                          <p className="text-sm text-muted-foreground">
                            Avg. Rate: {selectedProvider.average_rate_per_km ? `₹${selectedProvider.average_rate_per_km}/km` : "Varies"}
                          </p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="ml-auto"
                          onClick={() => setActiveTab("providers")}
                        >
                          Change
                        </Button>
                      </div>
                    )}
                    
                    {transaction && (
                      <div className="rounded-md bg-blue-50 p-4 text-blue-800">
                        <h3 className="font-medium">Transaction Details</h3>
                        <div className="mt-2 grid grid-cols-2 gap-y-1 text-sm">
                          <p className="text-muted-foreground">Produce:</p>
                          <p>{transaction.listing?.crop_category?.name || 'N/A'}</p>
                          
                          <p className="text-muted-foreground">Quantity:</p>
                          <p>{transaction.quantity_quintals} quintals</p>
                          
                          <p className="text-muted-foreground">Seller:</p>
                          <p>{transaction.listing?.seller?.full_name || 'N/A'}</p>
                          
                          <p className="text-muted-foreground">Buyer:</p>
                          <p>{transaction.buyer?.full_name || 'N/A'}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="pickupDate">Pickup Date</Label>
                        <Input 
                          id="pickupDate" 
                          name="pickupDate"
                          type="date" 
                          min={format(new Date(), 'yyyy-MM-dd')}
                          value={bookingDetails.pickupDate}
                          onChange={handleBookingChange}
                          required 
                          disabled={processingBooking}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="pickupAddress">Pickup Address</Label>
                          <Input 
                            id="pickupAddress" 
                            name="pickupAddress"
                            placeholder="Enter complete pickup address" 
                            value={bookingDetails.pickupAddress}
                            onChange={handleBookingChange}
                            required 
                            disabled={processingBooking}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="deliveryAddress">Delivery Address</Label>
                          <Input 
                            id="deliveryAddress" 
                            name="deliveryAddress"
                            placeholder="Enter complete delivery address" 
                            value={bookingDetails.deliveryAddress}
                            onChange={handleBookingChange}
                            required 
                            disabled={processingBooking}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="vehicleType">Vehicle Type</Label>
                        <Select required
                          onValueChange={(value) => setBookingDetails({...bookingDetails, vehicleType: value})}
                          disabled={processingBooking}>
                          <SelectTrigger id="vehicleType">
                            <SelectValue placeholder="Select vehicle type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Small Pickup (Up to 2 tons)</SelectItem>
                            <SelectItem value="medium">Medium Truck (2-5 tons)</SelectItem>
                            <SelectItem value="large">Large Truck (5-10 tons)</SelectItem>
                            {selectedProvider?.has_refrigerated && (
                              <SelectItem value="refrigerated">Refrigerated Truck</SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="notes">Additional Notes (Optional)</Label>
                        <textarea 
                          id="notes" 
                          name="notes"
                          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                          placeholder="Special handling instructions or requirements"
                          value={bookingDetails.notes}
                          onChange={(e: any) => handleBookingChange(e)}
                          disabled={processingBooking}
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="rounded-md bg-muted p-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Estimated Cost</p>
                        <p className="text-sm text-muted-foreground">Based on distance and vehicle type</p>
                      </div>
                      <p className="font-bold text-xl">
                        {selectedProvider ? formatCurrency(calculateEstimatedPrice()) : "N/A"}
                      </p>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-agri-primary hover:bg-agri-secondary"
                      disabled={!selectedProvider || processingBooking}
                    >
                      {processingBooking ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : "Confirm Booking"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Track Shipment Tab */}
            <TabsContent value="track" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Track Your Shipment</CardTitle>
                  <CardDescription>
                    Enter your booking ID to track your shipment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleTrackingSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="trackingId">Booking ID or Transaction ID</Label>
                      <div className="flex space-x-2">
                        <Input 
                          id="trackingId" 
                          placeholder="Enter your booking ID" 
                          value={trackingQuery}
                          onChange={(e) => setTrackingQuery(e.target.value)}
                          required 
                        />
                        <Button 
                          type="submit" 
                          disabled={trackingLoading}
                          className="bg-agri-primary hover:bg-agri-secondary"
                        >
                          {trackingLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Search className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        You can enter either the booking ID (LB-XXXXXX) or your transaction ID
                      </p>
                    </div>
                  </form>
                  
                  {trackingResult && (
                    <div className="mt-6 space-y-4">
                      <Separator />
                      
                      <div className="bg-muted p-4 rounded-md flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Booking ID: {trackingResult.id}</h3>
                          <p className="text-sm text-muted-foreground">{trackingResult.provider}</p>
                        </div>
                        <Badge className="capitalize" variant={
                          trackingResult.status === 'delivered' ? 'default' : 
                          trackingResult.status === 'in_transit' ? 'secondary' : 
                          'outline'
                        }>
                          {trackingResult.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Shipment Details</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-y-2 text-sm">
                              <p className="text-muted-foreground">Vehicle:</p>
                              <p>{trackingResult.vehicle}</p>
                              
                              <p className="text-muted-foreground">Driver:</p>
                              <div className="flex items-center space-x-1">
                                <User className="h-3 w-3" />
                                <p>{trackingResult.driver}</p>
                              </div>
                              
                              <p className="text-muted-foreground">Contact:</p>
                              <div className="flex items-center space-x-1">
                                <Phone className="h-3 w-3" />
                                <p>{trackingResult.contact}</p>
                              </div>
                              
                              <p className="text-muted-foreground">Pickup Date:</p>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <p>{format(new Date(trackingResult.pickup_date), 'dd MMM yyyy, h:mm a')}</p>
                              </div>
                              
                              <p className="text-muted-foreground">Expected Delivery:</p>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <p>{format(new Date(trackingResult.expected_delivery), 'dd MMM yyyy, h:mm a')}</p>
                              </div>
                            </div>
                            
                            <div className="pt-2 space-y-2">
                              <p className="text-sm font-medium">Current Location:</p>
                              <div className="flex items-start space-x-2 text-sm">
                                <MapPin className="h-4 w-4 text-agri-primary mt-0.5" />
                                <p>{trackingResult.current_location}</p>
                              </div>
                              <p className="text-sm font-medium">Destination:</p>
                              <div className="flex items-start space-x-2 text-sm">
                                <MapPin className="h-4 w-4 text-agri-primary mt-0.5" />
                                <p>{trackingResult.destination}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Tracking Updates</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {trackingResult.updates.map((update: any, index: number) => (
                                <div key={index} className="flex items-start space-x-3">
                                  <div className="flex flex-col items-center">
                                    <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-agri-primary' : 'bg-muted-foreground'}`}></div>
                                    {index < trackingResult.updates.length - 1 && (
                                      <div className="w-0.5 h-full bg-muted-foreground/30 my-1"></div>
                                    )}
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-sm font-medium">{update.status}</p>
                                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                      <Clock className="h-3 w-3" />
                                      <span>{format(new Date(update.time), 'dd MMM yyyy, h:mm a')}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                      <MapPin className="h-3 w-3" />
                                      <span>{update.location}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Logistics;
