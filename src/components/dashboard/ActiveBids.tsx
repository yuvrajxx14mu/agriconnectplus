
import { BarChart3, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Mock data for active bids
const activeBids = [
  {
    id: 1,
    crop: "Wheat",
    variety: "Durum",
    quantity: 15,
    bidPrice: 2250,
    marketPrice: 2200,
    buyer: "Agro Processors Ltd.",
    location: "Delhi",
    bidTime: "30 minutes ago",
    aboveMarket: true
  },
  {
    id: 2,
    crop: "Rice",
    variety: "Basmati",
    quantity: 25,
    bidPrice: 3250,
    marketPrice: 3300,
    buyer: "Global Foods Export",
    location: "Mumbai",
    bidTime: "2 hours ago",
    aboveMarket: false
  },
  {
    id: 3,
    crop: "Maize",
    variety: "Yellow",
    quantity: 18,
    bidPrice: 1880,
    marketPrice: 1850,
    buyer: "Farm Fresh Supplies",
    location: "Bangalore",
    bidTime: "5 hours ago",
    aboveMarket: true
  }
];

const ActiveBids = () => {
  const handleAcceptBid = (id: number) => {
    toast.success(`Bid #${id} accepted successfully!`);
  };

  const handleRejectBid = (id: number) => {
    toast.info(`Bid #${id} rejected.`);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle>Active Bids</CardTitle>
          <CardDescription>
            Latest bids on your listed produce
          </CardDescription>
        </div>
        <BarChart3 className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {activeBids.length > 0 ? (
          <div className="space-y-4">
            {activeBids.map((bid) => (
              <div 
                key={bid.id} 
                className="border rounded-lg p-4 hover:border-agri-secondary transition-colors animate-slide-in"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                    <div>
                      <h4 className="font-semibold">{bid.crop} - {bid.variety}</h4>
                      <p className="text-sm mt-1">
                        {bid.quantity} Quintals | {bid.buyer} | {bid.location}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-lg">₹{bid.bidPrice}</span>
                      <span className="text-sm text-muted-foreground">/quintal</span>
                      <div className="flex items-center">
                        {bid.aboveMarket ? (
                          <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-600 border-green-200">
                            <TrendingUp className="h-3 w-3" />
                            <span>+₹{bid.bidPrice - bid.marketPrice}</span>
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="flex items-center gap-1 bg-red-50 text-red-600 border-red-200">
                            <TrendingDown className="h-3 w-3" />
                            <span>-₹{bid.marketPrice - bid.bidPrice}</span>
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Bid received {bid.bidTime} | Market price: ₹{bid.marketPrice}/quintal
                  </div>

                  <div className="flex flex-col xs:flex-row gap-2 mt-1">
                    <Button 
                      onClick={() => handleAcceptBid(bid.id)}
                      className="bg-agri-primary hover:bg-agri-secondary text-white"
                      size="sm"
                    >
                      Accept Bid
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleRejectBid(bid.id)}
                      size="sm"
                      className="border-agri-primary text-agri-primary hover:bg-agri-muted"
                    >
                      Reject
                    </Button>
                    <Button 
                      variant="link" 
                      size="sm"
                      className="text-agri-primary hover:text-agri-secondary flex items-center"
                    >
                      View Details
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="text-muted-foreground mb-2">No active bids yet</div>
            <p className="text-sm text-muted-foreground">
              Bids placed on your listed produce will appear here
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActiveBids;
