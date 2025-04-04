
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { FileText, Camera, Upload, Check, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const KycVerification = () => {
  const [activeTab, setActiveTab] = useState("aadhaar");
  const [isLoading, setIsLoading] = useState(false);
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [documentUploaded, setDocumentUploaded] = useState(false);
  const navigate = useNavigate();

  const sendOtp = () => {
    if (aadhaarNumber.length !== 12) {
      toast.error("Please enter a valid 12-digit Aadhaar number");
      return;
    }
    
    setIsLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      toast.success("OTP sent to your registered mobile number");
    }, 1500);
  };

  const verifyOtp = () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    
    setIsLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Aadhaar verification successful!");
      
      // Update user's KYC status in database (demo)
      updateKycStatus();
    }, 1500);
  };

  const updateKycStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Update the profile with kyc_verified status
        await supabase
          .from('profiles')
          .update({ kyc_verified: true })
          .eq('id', user.id);
        
        toast.success("KYC verification complete!");
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error updating KYC status:", error);
      toast.error("Failed to update verification status");
    }
  };

  const handleFileUpload = () => {
    setIsLoading(true);
    
    // Simulate file upload with progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          setDocumentUploaded(true);
          toast.success("Document uploaded successfully!");
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const formatAadhaar = (value: string) => {
    // Format as XXXX-XXXX-XXXX
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,4})(\d{0,4})(\d{0,4})$/);
    
    if (match) {
      const formatted = [match[1], match[2], match[3]]
        .filter(Boolean)
        .join('-');
      return formatted;
    }
    
    return value;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold">KYC Verification</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Complete Your KYC</CardTitle>
              <CardDescription>
                Verify your identity to unlock full access to trading features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="aadhaar">Aadhaar Verification</TabsTrigger>
                  <TabsTrigger value="documents">Document Upload</TabsTrigger>
                </TabsList>
                
                <TabsContent value="aadhaar" className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="aadhaar">Aadhaar Number</Label>
                      <Input 
                        id="aadhaar"
                        placeholder="XXXX-XXXX-XXXX"
                        value={formatAadhaar(aadhaarNumber)}
                        onChange={(e) => setAadhaarNumber(e.target.value.replace(/[^0-9-]/g, ''))}
                        maxLength={14}
                        disabled={otpSent || isLoading}
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter your 12-digit Aadhaar number to verify via OTP
                      </p>
                    </div>
                    
                    {!otpSent ? (
                      <Button 
                        onClick={sendOtp} 
                        disabled={aadhaarNumber.replace(/-/g, '').length !== 12 || isLoading}
                        className="w-full bg-agri-primary hover:bg-agri-secondary"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending OTP...
                          </>
                        ) : "Send OTP"}
                      </Button>
                    ) : (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="otp">Enter OTP</Label>
                          <Input 
                            id="otp"
                            placeholder="6-digit OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                            maxLength={6}
                            disabled={isLoading}
                          />
                          <p className="text-xs text-muted-foreground">
                            OTP sent to your registered mobile number
                          </p>
                        </div>
                        
                        <div className="flex space-x-3">
                          <Button 
                            onClick={verifyOtp} 
                            disabled={otp.length !== 6 || isLoading}
                            className="flex-1 bg-agri-primary hover:bg-agri-secondary"
                          >
                            {isLoading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Verifying...
                              </>
                            ) : "Verify OTP"}
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            onClick={() => {
                              setOtpSent(false);
                              setOtp("");
                            }}
                            disabled={isLoading}
                          >
                            Resend OTP
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="documents" className="space-y-6">
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <FileText className="h-6 w-6 text-agri-primary mt-1" />
                          <div>
                            <h4 className="font-medium">Identity Proof</h4>
                            <p className="text-sm text-muted-foreground">
                              Upload your PAN Card, Voter ID, or Passport
                            </p>
                          </div>
                        </div>
                        {documentUploaded ? (
                          <div className="bg-green-100 text-green-700 rounded-full p-1">
                            <Check className="h-5 w-5" />
                          </div>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex items-center"
                            onClick={handleFileUpload}
                            disabled={isLoading}
                          >
                            <Upload className="h-4 w-4 mr-1" />
                            <span>Upload</span>
                          </Button>
                        )}
                      </div>
                      
                      {isLoading && (
                        <div className="mt-3 space-y-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-agri-primary h-2.5 rounded-full" 
                              style={{ width: `${uploadProgress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-center text-muted-foreground">
                            Uploading... {uploadProgress}%
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <Camera className="h-6 w-6 text-agri-primary mt-1" />
                          <div>
                            <h4 className="font-medium">Recent Photograph</h4>
                            <p className="text-sm text-muted-foreground">
                              Upload a clear, recent photograph of yourself
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center"
                          onClick={handleFileUpload}
                          disabled={isLoading}
                        >
                          <Upload className="h-4 w-4 mr-1" />
                          <span>Upload</span>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <FileText className="h-6 w-6 text-agri-primary mt-1" />
                          <div>
                            <h4 className="font-medium">Address Proof</h4>
                            <p className="text-sm text-muted-foreground">
                              Upload utility bill, bank statement, or other address proof
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center"
                          onClick={handleFileUpload}
                          disabled={isLoading}
                        >
                          <Upload className="h-4 w-4 mr-1" />
                          <span>Upload</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-md bg-blue-50 p-4 flex items-start space-x-3 text-blue-800">
                    <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium">Document verification may take up to 24 hours</p>
                      <p>We'll notify you once your documents have been verified.</p>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-agri-primary hover:bg-agri-secondary"
                    onClick={() => {
                      toast.success("Documents submitted for verification!");
                      navigate("/profile");
                    }}
                  >
                    Submit Documents
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default KycVerification;
