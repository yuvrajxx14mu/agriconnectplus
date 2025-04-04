
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { CreditCard, Phone, IndianRupee, Wallet, Bank, Shield, Clock, CheckCircle2, ArrowRight, Truck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

const PaymentGateway = () => {
  const { transactionId } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [listing, setListing] = useState<any>(null);
  const [buyer, setBuyer] = useState<any>(null);
  const [seller, setSeller] = useState<any>(null);
  const [activePayMethod, setActivePayMethod] = useState("upi");
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    upi: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: ""
  });

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
              listing:produce_listings(
                *,
                crop_category:crop_categories(name),
                crop_variety:crop_varieties(name)
              ),
              buyer:profiles(*),
              seller:profiles(*)
            `)
            .eq('id', transactionId)
            .single();
          
          if (transactionError) throw transactionError;
          
          setTransaction(transactionData);
          setListing(transactionData.listing);
          setBuyer(transactionData.buyer);
          setSeller(transactionData.seller);
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

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value
    });
  };

  const handlePaymentSubmit = () => {
    // Validate payment details
    if (activePayMethod === "upi" && !paymentDetails.upi) {
      toast.error("Please enter a valid UPI ID");
      return;
    }
    
    if (activePayMethod === "card") {
      if (!paymentDetails.cardNumber || !paymentDetails.cardName || !paymentDetails.cardExpiry || !paymentDetails.cardCvv) {
        toast.error("Please fill in all card details");
        return;
      }
    }
    
    setProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      processPayment();
    }, 2000);
  };

  const processPayment = async () => {
    try {
      // Update transaction status
      const { error } = await supabase
        .from('transactions')
        .update({ 
          status: 'processing',
          payment_method: activePayMethod as any
        })
        .eq('id', transactionId);
      
      if (error) throw error;
      
      // Simulate payment confirmation
      setTimeout(() => {
        setProcessingPayment(false);
        setPaymentSuccess(true);
        
        // Update transaction in local state
        setTransaction({
          ...transaction,
          status: 'processing',
          payment_method: activePayMethod
        });
        
        toast.success("Payment processed successfully!");
      }, 1500);
    } catch (error: any) {
      console.error("Error processing payment:", error);
      setProcessingPayment(false);
      toast.error(error.message || "Failed to process payment");
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

  if (paymentSuccess || transaction.status !== 'pending') {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="border-green-200">
              <CardHeader className="pb-4 text-center">
                <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-2" />
                <CardTitle className="text-xl">Payment Successful!</CardTitle>
                <CardDescription>
                  Your payment has been processed successfully
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-md bg-muted p-4">
                  <div className="grid grid-cols-2 gap-y-2">
                    <p className="text-sm text-muted-foreground">Transaction ID:</p>
                    <p className="text-sm font-medium">{transaction.id.substring(0, 8)}</p>
                    
                    <p className="text-sm text-muted-foreground">Amount Paid:</p>
                    <p className="text-sm font-medium">{formatCurrency(transaction.total_amount)}</p>
                    
                    <p className="text-sm text-muted-foreground">Payment Method:</p>
                    <p className="text-sm font-medium capitalize">{transaction.payment_method}</p>
                    
                    <p className="text-sm text-muted-foreground">Date & Time:</p>
                    <p className="text-sm font-medium">{format(new Date(), 'dd MMM yyyy, h:mm a')}</p>
                    
                    <p className="text-sm text-muted-foreground">Status:</p>
                    <p className="text-sm font-medium capitalize">{transaction.status}</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 text-blue-800 rounded-md p-4">
                  <div className="flex">
                    <Shield className="h-5 w-5 flex-shrink-0 mr-2 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-medium">Your payment is being held in escrow</p>
                      <p className="text-sm">Funds will be released to the seller once you confirm receipt of produce.</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h3 className="font-medium">Next Steps:</h3>
                  <ol className="mt-2 space-y-2">
                    <li className="flex items-start space-x-2">
                      <div className="bg-green-100 text-green-700 rounded-full min-w-6 h-6 flex items-center justify-center mt-0.5">1</div>
                      <p>Coordinate with the seller for pickup/delivery.</p>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="bg-green-100 text-green-700 rounded-full min-w-6 h-6 flex items-center justify-center mt-0.5">2</div>
                      <p>Verify the produce quality upon receipt.</p>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="bg-green-100 text-green-700 rounded-full min-w-6 h-6 flex items-center justify-center mt-0.5">3</div>
                      <p>Confirm delivery to release payment to the seller.</p>
                    </li>
                  </ol>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Button 
                  className="bg-agri-primary hover:bg-agri-secondary w-full sm:w-auto"
                  onClick={() => navigate("/dashboard")}
                >
                  Go to Dashboard
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto"
                  onClick={() => window.print()}
                >
                  Print Receipt
                </Button>
              </CardFooter>
            </Card>
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
          <h1 className="text-3xl font-bold">Complete Your Payment</h1>
          
          {/* Transaction Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Transaction Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">
                    {listing.crop_category.name} - {listing.crop_variety.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {transaction.quantity_quintals} quintals at {formatCurrency(transaction.price_per_quintal)}/quintal
                  </p>
                </div>
                <p className="font-bold text-lg">
                  {formatCurrency(transaction.total_amount)}
                </p>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-y-2">
                <p className="text-sm text-muted-foreground">Seller:</p>
                <p className="text-sm">{seller.full_name}</p>
                
                <p className="text-sm text-muted-foreground">Buyer:</p>
                <p className="text-sm">{buyer.full_name}</p>
                
                <p className="text-sm text-muted-foreground">Transaction ID:</p>
                <p className="text-sm">{transaction.id.substring(0, 8)}</p>
                
                <p className="text-sm text-muted-foreground">Date:</p>
                <p className="text-sm">{format(new Date(transaction.created_at), 'dd MMM yyyy')}</p>
              </div>
              
              <div className="rounded-md bg-agri-primary/10 p-4 flex items-start space-x-2">
                <Shield className="h-5 w-5 flex-shrink-0 mt-0.5 text-agri-primary" />
                <div>
                  <p className="font-medium text-agri-primary">Secure Escrow Payment</p>
                  <p className="text-sm">Your payment will be held securely until you confirm receipt of the produce.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle>Choose Payment Method</CardTitle>
              <CardDescription>
                Select your preferred method of payment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activePayMethod} onValueChange={setActivePayMethod} className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="upi" className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>UPI</span>
                  </TabsTrigger>
                  <TabsTrigger value="card" className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Card</span>
                  </TabsTrigger>
                  <TabsTrigger value="bank" className="flex items-center space-x-2">
                    <Bank className="h-4 w-4" />
                    <span>Bank Transfer</span>
                  </TabsTrigger>
                </TabsList>
                
                {/* UPI Tab */}
                <TabsContent value="upi" className="mt-0 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="upi">UPI ID</Label>
                    <Input 
                      id="upi" 
                      name="upi"
                      placeholder="yourname@upi" 
                      value={paymentDetails.upi}
                      onChange={handlePaymentChange}
                      disabled={processingPayment}
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter your UPI ID to make a quick, secure payment
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 py-2">
                    <div className="border rounded-md p-3 flex flex-col items-center justify-center">
                      <img src="/bank_logos/gpay.svg" alt="Google Pay" className="h-8 w-8 mb-1" />
                      <p className="text-xs">Google Pay</p>
                    </div>
                    <div className="border rounded-md p-3 flex flex-col items-center justify-center">
                      <img src="/bank_logos/phonepe.svg" alt="PhonePe" className="h-8 w-8 mb-1" />
                      <p className="text-xs">PhonePe</p>
                    </div>
                    <div className="border rounded-md p-3 flex flex-col items-center justify-center">
                      <img src="/bank_logos/paytm.svg" alt="Paytm" className="h-8 w-8 mb-1" />
                      <p className="text-xs">Paytm</p>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Card Tab */}
                <TabsContent value="card" className="mt-0 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input 
                      id="cardNumber" 
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456" 
                      value={paymentDetails.cardNumber}
                      onChange={handlePaymentChange}
                      maxLength={19}
                      disabled={processingPayment}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input 
                        id="cardName" 
                        name="cardName"
                        placeholder="Name on card" 
                        value={paymentDetails.cardName}
                        onChange={handlePaymentChange}
                        disabled={processingPayment}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="cardExpiry">Expiry Date</Label>
                        <Input 
                          id="cardExpiry" 
                          name="cardExpiry"
                          placeholder="MM/YY" 
                          value={paymentDetails.cardExpiry}
                          onChange={handlePaymentChange}
                          maxLength={5}
                          disabled={processingPayment}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cardCvv">CVV</Label>
                        <Input 
                          id="cardCvv" 
                          name="cardCvv"
                          type="password" 
                          maxLength={3}
                          placeholder="123" 
                          value={paymentDetails.cardCvv}
                          onChange={handlePaymentChange}
                          disabled={processingPayment}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      We accept all major credit and debit cards
                    </p>
                    <div className="flex space-x-1">
                      <img src="/bank_logos/visa.svg" alt="Visa" className="h-6" />
                      <img src="/bank_logos/mastercard.svg" alt="Mastercard" className="h-6" />
                      <img src="/bank_logos/rupay.svg" alt="RuPay" className="h-6" />
                    </div>
                  </div>
                </TabsContent>
                
                {/* Bank Transfer Tab */}
                <TabsContent value="bank" className="mt-0 space-y-4">
                  <div className="bg-muted p-4 rounded-md">
                    <h3 className="font-medium mb-2">Bank Transfer Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-3">
                        <p className="text-muted-foreground">Account Name:</p>
                        <p className="col-span-2">AgriConnect Escrow Services</p>
                      </div>
                      <div className="grid grid-cols-3">
                        <p className="text-muted-foreground">Account Number:</p>
                        <p className="col-span-2">1234567890</p>
                      </div>
                      <div className="grid grid-cols-3">
                        <p className="text-muted-foreground">IFSC Code:</p>
                        <p className="col-span-2">AGRI0001234</p>
                      </div>
                      <div className="grid grid-cols-3">
                        <p className="text-muted-foreground">Bank:</p>
                        <p className="col-span-2">State Bank of India</p>
                      </div>
                      <div className="grid grid-cols-3">
                        <p className="text-muted-foreground">Reference:</p>
                        <p className="col-span-2 font-medium">{transaction.id.substring(0, 8)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground">
                      Please use your Transaction ID as the payment reference. Your transaction will be updated once we receive your payment (may take 1-2 business days).
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="flex items-center justify-between w-full py-2 px-4 bg-muted rounded-md">
                <p className="font-medium">Total Amount:</p>
                <p className="font-bold text-xl">{formatCurrency(transaction.total_amount)}</p>
              </div>
              
              <Button 
                onClick={handlePaymentSubmit} 
                disabled={processingPayment || activePayMethod === "bank"}
                className="w-full bg-agri-primary hover:bg-agri-secondary"
              >
                {processingPayment ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : activePayMethod === "bank" ? (
                  "I've Made the Bank Transfer"
                ) : (
                  <>
                    Pay Now {formatCurrency(transaction.total_amount)}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentGateway;
