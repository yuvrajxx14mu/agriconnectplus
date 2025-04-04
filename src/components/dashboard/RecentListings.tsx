
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertCircle } from "lucide-react";

// Mock data for recent listings
const recentListings = [
  {
    id: 1,
    crop: "Wheat",
    variety: "Durum",
    quantity: 15,
    price: 2200,
    location: "Amritsar, Punjab",
    status: "active",
    listedOn: "2 hours ago",
    bids: 3
  },
  {
    id: 2,
    crop: "Rice",
    variety: "Basmati",
    quantity: 25,
    price: 3300,
    location: "Karnal, Haryana",
    status: "active",
    listedOn: "5 hours ago",
    bids: 7
  },
  {
    id: 3,
    crop: "Pulses",
    variety: "Moong Dal",
    quantity: 10,
    price: 6600,
    location: "Nagpur, Maharashtra",
    status: "pending",
    listedOn: "Yesterday",
    bids: 0
  },
  {
    id: 4,
    crop: "Maize",
    variety: "Yellow",
    quantity: 30,
    price: 1850,
    location: "Davanagere, Karnataka",
    status: "sold",
    listedOn: "3 days ago",
    bids: 5,
    soldPrice: 1900
  }
];

const RecentListings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Listings</CardTitle>
        <CardDescription>
          Your recently listed produce and their current status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentListings.map((listing) => (
            <div 
              key={listing.id} 
              className="border rounded-lg p-4 hover:border-agri-secondary transition-colors"
            >
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{listing.crop} - {listing.variety}</h4>
                    <Badge variant={
                      listing.status === "active" ? "default" : 
                      listing.status === "pending" ? "secondary" : 
                      "outline"
                    }>
                      {listing.status === "active" ? "Active" : 
                       listing.status === "pending" ? "Pending" : 
                       "Sold"}
                    </Badge>
                  </div>
                  <p className="text-sm mt-1">
                    {listing.quantity} Quintals | ₹{listing.price}/quintal | {listing.location}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Clock size={14} />
                    <span>Listed {listing.listedOn}</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  {listing.status === "sold" ? (
                    <div className="text-sm text-agri-success font-medium">
                      Sold at ₹{listing.soldPrice}/quintal
                    </div>
                  ) : (
                    <div className="text-sm">
                      <span className="font-medium">{listing.bids}</span> {listing.bids === 1 ? 'bid' : 'bids'} received
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <button className="text-sm text-agri-primary hover:underline">
                      View Details
                    </button>
                    {listing.status === "pending" && (
                      <div className="flex items-center gap-1 text-sm text-amber-600">
                        <AlertCircle size={14} />
                        <span>Awaiting verification</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentListings;
