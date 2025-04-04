
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Truck, Package, MapPin, CalendarDays, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

const Logistics = () => {
  const { transactionId } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      if (transactionId) {
        try {
          // Fetch transaction details
          const { data: transactionData, error: transactionError } = await supabase
            .from('transactions')
            .select(`
              *,
              listing:produce_listings(*,
                crop_category:crop_categories(name),
                crop_variety:crop_varieties(name)
              ),
              buyer:profiles!transactions_buyer_id_fkey(*),
              seller:profiles!transactions_seller_id_fkey(*)
            `)
            .eq('id', transactionId)
            .single();
          
          if (transactionError) throw transactionError;
          
          setTransaction(transactionData);
        } catch (error: any) {
          console.error("Error fetching transaction:", error);
          toast.error("Failed to load transaction details");
          navigate("/dashboard");
          return;
        }
      }
      
      setIsLoading(false);
    };
    
    fetchData();
  }, [transactionId, navigate]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto space-y-8">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-80 w-full" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-2xl font-bold">Transaction Not Found</h1>
            <p>The requested transaction could not be found.</p>
            <Button onClick={() => navigate("/dashboard")}>
              Back to Dashboard
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
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold">Logistics & Delivery</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Transaction Details</CardTitle>
              <CardDescription>
                View logistics information for this transaction
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium">Shipping Information</h3>
                  <div className="mt-2 space-y-2">
                    <p className="text-sm font-medium">
                      {transaction?.buyer?.full_name || 'Buyer Name'}
                    </p>
                    <p className="text-sm">
                      {transaction?.buyer?.address || 'No address'},
                      {transaction?.buyer?.district ? `, ${transaction?.buyer?.district}` : ''}, 
                      {transaction?.buyer?.state || ''}
                    </p>
                    <p className="text-sm">
                      {transaction?.buyer?.phone_number || 'No phone number'}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">Order Summary</h3>
                  <div className="mt-2 space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Transaction ID:</span> {transaction.id.substring(0, 8)}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Date:</span> {format(new Date(transaction.created_at), 'dd MMM yyyy')}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Quantity:</span> {transaction.quantity_quintals} quintals
                    </p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Tracking</h3>
                <div className="rounded-md bg-blue-50 p-4 flex items-start space-x-3 text-blue-800">
                  <Truck className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Your order is on its way!</p>
                    <p className="text-sm">
                      Estimated Delivery: {format(new Date(), 'dd MMM yyyy')}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="trackingId">Tracking ID</Label>
                  <Input 
                    id="trackingId" 
                    placeholder="Enter tracking ID" 
                    defaultValue="AGRI1234567890"
                    disabled
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Logistics;
