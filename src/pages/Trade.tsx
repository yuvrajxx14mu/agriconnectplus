import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { 
  Check, 
  X, 
  AlertTriangle, 
  ChevronDown, 
  Loader2, 
  PlusCircle, 
  MinusCircle, 
  File, 
  Smartphone, 
  Calendar, 
  Tag, 
  MapPin, 
  Truck, 
  Info, 
  ShieldCheck, 
  BarChart4, 
  Users 
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

const Trade = () => {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState("");
  const [bidQuantity, setBidQuantity] = useState("");
  const [bidMessage, setBidMessage] = useState("");
  const [submittingBid, setSubmittingBid] = useState(false);
  const [bids, setBids] = useState<any[]>([]);
  const [activeBid, setActiveBid] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (listingId) {
        // Fetch listing details
        const { data: listingData, error: listingError } = await supabase
          .from('produce_listings')
          .select(`
            *,
            seller:profiles(full_name, phone_number, district, state),
            crop_category:crop_categories(name),
            crop_variety:crop_varieties(name),
            location:locations(name, district, state)
          `)
          .eq('id', listingId)
          .single();
        
        if (listingError) {
          console.error("Error fetching listing:", listingError);
          toast.error("Failed to load listing details");
          navigate("/market-prices");
          return;
        }
        
        setListing(listingData);
        
        // Fetch bids for this listing
        const { data: bidsData, error: bidsError } = await supabase
          .from('bids')
          .select(`
            *,
            bidder:profiles(full_name)
          `)
          .eq('listing_id', listingId)
          .order('created_at', { ascending: false });
        
        if (bidsError) {
          console.error("Error fetching bids:", bidsError);
        } else {
          setBids(bidsData || []);
        }
      }
      
      setIsLoading(false);
    };
    
    fetchData();
  }, [listingId, navigate]);

  const handleBidSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please log in to place a bid");
      navigate("/auth");
      return;
    }
    
    if (!bidAmount || !bidQuantity) {
      toast.error("Please enter both price and quantity");
      return;
    }
    
    const price = parseFloat(bidAmount);
    const quantity = parseFloat(bidQuantity);
    
    if (isNaN(price) || price <= 0) {
      toast.error("Please enter a valid price");
      return;
    }
    
    if (isNaN(quantity) || quantity <= 0 || quantity > listing.quantity_quintals) {
      toast.error(`Quantity must be between 1 and ${listing.quantity_quintals} quintals`);
      return;
    }
    
    setSubmittingBid(true);
    
    try {
      // Submit bid to database
      const { data, error } = await supabase
        .from('bids')
        .insert({
          listing_id: listingId,
          bidder_id: user.id,
          bid_price_per_quintal: price,
          quantity_quintals: quantity,
          message: bidMessage || null,
          valid_until: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString() // Valid for 2 days
        })
        .select();
      
      if (error) {
        throw error;
      }
      
      // Add the new bid to the list with bidder info
      const newBid = {
        ...data[0],
        bidder: {
          full_name: user.user_metadata?.full_name || 'You'
        }
      };
      
      setBids([newBid, ...bids]);
      setBidAmount("");
      setBidQuantity("");
      setBidMessage("");
      
      toast.success("Your bid has been placed successfully!");
    } catch (error: any) {
      console.error("Error submitting bid:", error);
      toast.error(error.message || "Failed to submit bid");
    } finally {
      setSubmittingBid(false);
    }
  };

  const handleAcceptBid = async (bid: any) => {
    setActiveBid(bid);
    
    try {
      // Update bid status to accepted
      const { error: bidError } = await supabase
        .from('bids')
        .update({ status: 'accepted' })
        .eq('id', bid.id);
      
      if (bidError) throw bidError;
      
      // Create a transaction
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          listing_id: listingId,
          bid_id: bid.id,
          buyer_id: bid.bidder_id,
          seller_id: listing.seller_id,
          price_per_quintal: bid.bid_price_per_quintal,
          quantity_quintals: bid.quantity_quintals,
          total_amount: bid.bid_price_per_quintal * bid.quantity_quintals,
          status: 'pending'
        });
      
      if (transactionError) throw transactionError;
      
      // Update listing status if full quantity is sold
      if (bid.quantity_quintals >= listing.quantity_quintals) {
        const { error: listingError } = await supabase
          .from('produce_listings')
          .update({ status: 'sold' })
          .eq('id', listingId);
        
        if (listingError) throw listingError;
      }
      
      toast.success("Bid accepted! Transaction created successfully.");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error accepting bid:", error);
      toast.error(error.message || "Failed to accept bid");
      setActiveBid(null);
    }
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <Skeleton className="h-80 w-full" />
                <Skeleton className="h-40 w-full" />
              </div>
              <div className="space-y-6">
                <Skeleton className="h-60 w-full" />
                <Skeleton className="h-40 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto text-center space-y-4">
            <h1 className="text-2xl font-bold">Listing Not Found</h1>
            <p>The requested produce listing could not be found.</p>
            <Button onClick={() => navigate("/market-prices")}>
              Back to Market Prices
            </Button>
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
            <div>
              <h1 className="text-3xl font-bold">
                {listing.crop_category?.name} - {listing.crop_variety?.name}
              </h1>
              <p className="text-muted-foreground">
                Listed by {listing.seller?.full_name} from {listing.pickup_district}, {listing.pickup_state}
              </p>
            </div>
            <Badge className="text-sm px-3 py-1 self-start md:self-auto" variant={
              listing.status === 'active' ? 'default' : 
              listing.status === 'sold' ? 'destructive' : 
              listing.status === 'verified' ? 'success' : 'secondary'
            }>
              {listing.status?.toUpperCase()}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {/* Produce Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Produce Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Category</p>
                      <div className="flex items-center space-x-2">
                        <Leaf className="h-4 w-4 text-agri-primary" />
                        <p className="font-medium">{listing.crop_category?.name}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Variety</p>
                      <p className="font-medium">{listing.crop_variety?.name}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Available Quantity</p>
                      <p className="font-medium">{listing.quantity_quintals} quintals</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Expected Price</p>
                      <div className="flex items-center space-x-2">
                        <IndianRupee className="h-4 w-4 text-agri-primary" />
                        <p className="font-medium">
                          {formatCurrency(listing.expected_price_per_quintal)}/quintal
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Harvest Date</p>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-agri-primary" />
                        <p className="font-medium">
                          {listing.harvest_date ? format(new Date(listing.harvest_date), 'dd MMM yyyy') : 'Not specified'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Quality Grade</p>
                      <Badge variant={
                        listing.quality_grade === 'premium' ? 'default' : 
                        listing.quality_grade === 'standard' ? 'outline' : 
                        'secondary'
                      }>
                        {listing.quality_grade ? listing.quality_grade.toUpperCase() : 'Not graded'}
                      </Badge>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h3 className="font-medium">Description</h3>
                    <p className="text-sm">{listing.description || "No description provided."}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-medium">Pickup Details</h3>
                    <div className="flex items-start space-x-2">
                      <Truck className="h-4 w-4 text-agri-primary mt-1" />
                      <p className="text-sm">
                        {listing.pickup_address ? listing.pickup_address + ', ' : ''}
                        {listing.pickup_district}, {listing.pickup_state}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Images and Quality Certificates */}
              <Card>
                <CardHeader>
                  <CardTitle>Photos & Certifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {listing.images && listing.images.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {listing.images.map((image: string, index: number) => (
                        <div 
                          key={index} 
                          className="aspect-square bg-muted rounded-md overflow-hidden"
                        >
                          <img 
                            src={image} 
                            alt={`${listing.crop_category?.name} ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No images available for this produce</p>
                    </div>
                  )}
                  
                  {listing.quality_certificate_url && (
                    <div className="mt-4">
                      <h3 className="font-medium mb-2">Quality Certificate</h3>
                      <a 
                        href={listing.quality_certificate_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center space-x-1"
                      >
                        <File className="h-5 w-5 text-muted-foreground" />
                        <span>View Quality Certificate</span>
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              {/* Bid Form */}
              {listing.status === 'active' || listing.status === 'verified' ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Place Your Bid</CardTitle>
                    <CardDescription>
                      Enter your offer details below
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleBidSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="bidAmount" className="text-sm font-medium">
                          Your Price (₹ per quintal)
                        </label>
                        <div className="relative">
                          <IndianRupee className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="bidAmount"
                            type="number"
                            placeholder="Enter your price"
                            className="pl-10"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                            min={1}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="bidQuantity" className="text-sm font-medium">
                          Quantity (quintals)
                        </label>
                        <Input
                          id="bidQuantity"
                          type="number"
                          placeholder={`Max: ${listing.quantity_quintals} quintals`}
                          value={bidQuantity}
                          onChange={(e) => setBidQuantity(e.target.value)}
                          min={1}
                          max={listing.quantity_quintals}
                          step="0.1"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="bidMessage" className="text-sm font-medium">
                          Message (Optional)
                        </label>
                        <Textarea
                          id="bidMessage"
                          placeholder="Any specific requirements or questions"
                          value={bidMessage}
                          onChange={(e) => setBidMessage(e.target.value)}
                          rows={3}
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-agri-primary hover:bg-agri-secondary"
                        disabled={submittingBid}
                      >
                        {submittingBid ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : "Submit Bid"}
                      </Button>
                      
                      <p className="text-xs text-center text-muted-foreground">
                        By placing a bid, you agree to the platform's terms and conditions
                      </p>
                    </form>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Listing {listing.status === 'sold' ? 'Sold' : 'Unavailable'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center py-4">
                      {listing.status === 'sold' 
                        ? "This produce has been sold and is no longer available for bidding."
                        : "This listing is currently not available for bidding."}
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => navigate("/market-prices")}
                    >
                      Browse Other Listings
                    </Button>
                  </CardContent>
                </Card>
              )}
              
              {/* Seller Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Seller Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium text-lg">{listing.seller?.full_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {listing.seller?.district}, {listing.seller?.state}
                    </p>
                  </div>
                  
                  {listing.seller?.phone_number && (
                    <Button variant="outline" className="w-full">
                      <Smartphone className="h-5 w-5 text-muted-foreground" />
                      Call Seller
                    </Button>
                  )}
                  
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message Seller
                  </Button>
                </CardContent>
              </Card>
              
              {/* Market Price Trends */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <BarChart4 className="mr-2 h-4 w-4 text-agri-primary" />
                    Market Price Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span>Current Market Price:</span>
                      <span className="font-medium">{formatCurrency(2850)}/quintal</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Week Average:</span>
                      <span>{formatCurrency(2780)}/quintal</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Month Average:</span>
                      <span>{formatCurrency(2650)}/quintal</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-green-600 font-medium">Price Trend:</span>
                      <span className="text-green-600 font-medium">+7.5% ↑</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Bids Tab */}
          <Card>
            <CardHeader>
              <CardTitle>
                Bids & Offers
                {bids.length > 0 && <Badge className="ml-2">{bids.length}</Badge>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {bids.length > 0 ? (
                <div className="space-y-4">
                  {user && user.id === listing.seller_id && (
                    <div className="bg-muted rounded-md p-3 text-sm">
                      <p>As the seller, you can review and accept bids below. Once accepted, a trade will be initiated.</p>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    {bids.map((bid) => (
                      <div key={bid.id} className="border rounded-md p-4">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div>
                            <div className="flex items-center">
                              <p className="font-medium">{bid.bidder?.full_name}</p>
                              {bid.status && (
                                <Badge className="ml-2" variant={
                                  bid.status === 'accepted' ? 'default' : 
                                  bid.status === 'rejected' ? 'destructive' : 
                                  bid.status === 'expired' ? 'outline' : 'secondary'
                                }>
                                  {bid.status}
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-4 mt-2">
                              <div className="flex items-center space-x-1">
                                <IndianRupee className="h-4 w-4 text-agri-primary" />
                                <span className="font-medium">{formatCurrency(bid.bid_price_per_quintal)}/quintal</span>
                              </div>
                              <span className="text-muted-foreground">•</span>
                              <div className="flex items-center space-x-1">
                                <ShoppingBag className="h-4 w-4 text-agri-primary" />
                                <span>{bid.quantity_quintals} quintals</span>
                              </div>
                              <span className="text-muted-foreground">•</span>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4 text-agri-primary" />
                                <span className="text-sm text-muted-foreground">
                                  {format(new Date(bid.created_at), 'dd MMM, h:mm a')}
                                </span>
                              </div>
                            </div>
                            {bid.message && (
                              <p className="mt-2 text-sm">{bid.message}</p>
                            )}
                          </div>
                          
                          {user && user.id === listing.seller_id && bid.status === 'pending' && (
                            <div className="flex space-x-2 self-start">
                              <Button 
                                variant="default" 
                                size="sm" 
                                className="bg-agri-primary hover:bg-agri-secondary"
                                onClick={() => handleAcceptBid(bid)}
                                disabled={!!activeBid}
                              >
                                {activeBid && activeBid.id === bid.id ? (
                                  <>
                                    <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                                    Processing...
                                  </>
                                ) : "Accept Bid"}
                              </Button>
                              <Button variant="outline" size="sm">
                                Reject
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No bids have been placed for this listing yet.</p>
                  {listing.status === 'active' && (
                    <p className="mt-2">Be the first to place a bid!</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Trade;
