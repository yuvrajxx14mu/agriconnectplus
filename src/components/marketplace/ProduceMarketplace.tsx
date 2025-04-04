
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Leaf, MapPin, Search, Filter, IndianRupee } from "lucide-react";

// Sample produce data
const sampleProduceListings = [
  {
    id: "1",
    title: "Premium Basmati Rice",
    cropCategory: "Rice",
    cropVariety: "Basmati",
    quantity: 50,
    price: 3200,
    location: "Amritsar, Punjab",
    quality: "Grade A",
    seller: "Gurpreet Singh",
    sellerType: "Farmer",
    listingType: "Auction",
    image: "/placeholder.svg",
    daysLeft: 3
  },
  {
    id: "2",
    title: "Organic Wheat",
    cropCategory: "Wheat",
    cropVariety: "Sharbati",
    quantity: 100,
    price: 2500,
    location: "Indore, Madhya Pradesh",
    quality: "Organic Certified",
    seller: "Madhya Pradesh Farmers Collective",
    sellerType: "FPO",
    listingType: "Fixed Price",
    image: "/placeholder.svg",
    daysLeft: 5
  },
  {
    id: "3",
    title: "Fresh Alphonso Mangoes",
    cropCategory: "Fruits",
    cropVariety: "Alphonso",
    quantity: 20,
    price: 9000,
    location: "Ratnagiri, Maharashtra",
    quality: "Premium",
    seller: "Konkan Farmers Group",
    sellerType: "FPO",
    listingType: "Auction",
    image: "/placeholder.svg",
    daysLeft: 2
  },
  {
    id: "4",
    title: "Yellow Corn",
    cropCategory: "Maize",
    cropVariety: "Yellow Dent",
    quantity: 150,
    price: 1800,
    location: "Davangere, Karnataka",
    quality: "Grade B",
    seller: "Ramesh K",
    sellerType: "Farmer",
    listingType: "Fixed Price",
    image: "/placeholder.svg",
    daysLeft: 7
  },
  {
    id: "5",
    title: "Raw Cotton",
    cropCategory: "Cotton",
    cropVariety: "Long Staple",
    quantity: 80,
    price: 6500,
    location: "Surat, Gujarat",
    quality: "Grade A",
    seller: "Gujarat Cotton Producers",
    sellerType: "FPO",
    listingType: "Auction",
    image: "/placeholder.svg",
    daysLeft: 4
  },
  {
    id: "6",
    title: "Organic Turmeric",
    cropCategory: "Spices",
    cropVariety: "Lakadong",
    quantity: 15,
    price: 12000,
    location: "Erode, Tamil Nadu",
    quality: "Organic Certified",
    seller: "Tamil Organic Farmers",
    sellerType: "FPO",
    listingType: "Fixed Price",
    image: "/placeholder.svg",
    daysLeft: 10
  }
];

const ProduceMarketplace = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [listings] = useState(sampleProduceListings);

  const filteredListings = listings.filter(listing => {
    const matchesSearch = !searchQuery || 
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.cropCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.cropVariety.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = !categoryFilter || listing.cropCategory === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:flex-1 relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by crop, variety, location..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              <SelectItem value="Rice">Rice</SelectItem>
              <SelectItem value="Wheat">Wheat</SelectItem>
              <SelectItem value="Maize">Maize</SelectItem>
              <SelectItem value="Pulses">Pulses</SelectItem>
              <SelectItem value="Oilseeds">Oilseeds</SelectItem>
              <SelectItem value="Fruits">Fruits</SelectItem>
              <SelectItem value="Vegetables">Vegetables</SelectItem>
              <SelectItem value="Spices">Spices</SelectItem>
              <SelectItem value="Cotton">Cotton</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={() => navigate("/dashboard")}>
          List New Produce
        </Button>
      </div>
      
      {/* Listings Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-lg text-muted-foreground">No produce listings found matching your criteria</p>
            <Button variant="link" onClick={() => {setSearchQuery(""); setCategoryFilter("");}}>
              Clear filters
            </Button>
          </div>
        ) : (
          filteredListings.map(listing => (
            <Card key={listing.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video bg-muted relative overflow-hidden">
                <img 
                  src={listing.image} 
                  alt={listing.title} 
                  className="w-full h-full object-cover"
                />
                <Badge 
                  className={`absolute top-2 right-2 ${
                    listing.listingType === "Auction" ? "bg-amber-500" : "bg-green-600"
                  }`}
                >
                  {listing.listingType}
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg line-clamp-1">{listing.title}</h3>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Leaf className="h-3 w-3" />
                    {listing.cropCategory}
                  </Badge>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span className="line-clamp-1">{listing.location}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Quantity</span>
                    <span className="font-medium">{listing.quantity} quintals</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Quality</span>
                    <span className="font-medium">{listing.quality}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <IndianRupee className="h-3 w-3" />
                      <span className="font-bold text-lg ml-1">
                        {listing.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-muted-foreground ml-1">/quintal</span>
                    </div>
                    <Badge variant={listing.listingType === "Auction" ? "secondary" : "outline"}>
                      {listing.listingType === "Auction" ? `${listing.daysLeft} days left` : "Buy Now"}
                    </Badge>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4"
                  onClick={() => navigate(`/trade/${listing.id}`)}
                >
                  {listing.listingType === "Auction" ? "Place Bid" : "Buy Now"}
                </Button>
                
                <div className="mt-3 text-xs text-muted-foreground flex items-center">
                  <span>Seller: {listing.seller}</span>
                  <Badge variant="secondary" className="ml-2 text-[10px]">
                    {listing.sellerType}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ProduceMarketplace;
