
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import UserProfileCard from "@/components/shared/UserProfileCard";
import { Phone, Mail, User, Shield, Upload, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission delay
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Profile information updated successfully!");
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">My Profile</h1>
          
          {/* Profile Summary Card */}
          <UserProfileCard 
            name="Rajesh Singh"
            role="Wheat & Rice Farmer"
            location="Amritsar, Punjab"
            phone="+91 9812XXXXXX"
            email="rajesh.singh@example.com"
          />
          
          {/* Profile Management Tabs */}
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid grid-cols-1 md:grid-cols-4 mb-6">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="farm">Farm Details</TabsTrigger>
              <TabsTrigger value="bank">Bank & Payments</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>
            
            {/* Personal Information Tab */}
            <TabsContent value="personal" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input 
                          id="fullName" 
                          placeholder="Enter your full name" 
                          defaultValue="Rajesh Singh"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 border border-r-0 border-input rounded-l-md bg-muted text-muted-foreground text-sm">
                            +91
                          </span>
                          <Input 
                            id="phone" 
                            className="rounded-l-none" 
                            placeholder="9812XXXXXX" 
                            defaultValue="9812XXXXXX"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="Enter your email" 
                          defaultValue="rajesh.singh@example.com"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="aadhar">Aadhaar Number</Label>
                        <Input 
                          id="aadhar" 
                          placeholder="XXXX-XXXX-XXXX" 
                          defaultValue="7891-XXXX-XXXX"
                        />
                        <p className="text-xs text-muted-foreground">
                          Last 4 digits visible for security
                        </p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input 
                        id="address" 
                        placeholder="Village/Street address" 
                        defaultValue="123 Wheat Lane, Amritsar"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="village">Village/Town</Label>
                        <Input 
                          id="village" 
                          placeholder="Village/Town" 
                          defaultValue="Rajpur"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="district">District</Label>
                        <Input 
                          id="district" 
                          placeholder="District" 
                          defaultValue="Amritsar"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input 
                          id="state" 
                          placeholder="State" 
                          defaultValue="Punjab"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="pincode">PIN Code</Label>
                        <Input 
                          id="pincode" 
                          placeholder="PIN Code" 
                          defaultValue="143001"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        type="submit" 
                        className="bg-agri-primary hover:bg-agri-secondary"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Farm Details Tab */}
            <TabsContent value="farm" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Farm Details</CardTitle>
                  <CardDescription>
                    Information about your farm and agricultural activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="farmSize">Farm Size (in Acres)</Label>
                        <Input 
                          id="farmSize" 
                          type="number" 
                          placeholder="Enter farm size" 
                          defaultValue="5.5"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="ownership">Land Ownership</Label>
                        <select 
                          id="ownership" 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          defaultValue="owned"
                        >
                          <option value="owned">Own Land</option>
                          <option value="leased">Leased Land</option>
                          <option value="mixed">Mixed</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Primary Crops</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="wheat" className="w-4 h-4" defaultChecked />
                          <Label htmlFor="wheat">Wheat</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="rice" className="w-4 h-4" defaultChecked />
                          <Label htmlFor="rice">Rice</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="pulses" className="w-4 h-4" />
                          <Label htmlFor="pulses">Pulses</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="vegetables" className="w-4 h-4" />
                          <Label htmlFor="vegetables">Vegetables</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="fruits" className="w-4 h-4" />
                          <Label htmlFor="fruits">Fruits</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="sugarcane" className="w-4 h-4" />
                          <Label htmlFor="sugarcane">Sugarcane</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="cotton" className="w-4 h-4" />
                          <Label htmlFor="cotton">Cotton</Label>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <Label>Certifications & Documents</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                        <div className="border rounded-md p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">Land Records</h4>
                              <p className="text-sm text-muted-foreground">Upload your land ownership documents</p>
                            </div>
                            <Button variant="outline" size="sm" className="flex items-center">
                              <Upload className="h-4 w-4 mr-1" />
                              <span>Upload</span>
                            </Button>
                          </div>
                        </div>
                        
                        <div className="border rounded-md p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">Organic Certification</h4>
                              <p className="text-sm text-muted-foreground">If you practice organic farming</p>
                            </div>
                            <Button variant="outline" size="sm" className="flex items-center">
                              <Upload className="h-4 w-4 mr-1" />
                              <span>Upload</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button className="bg-agri-primary hover:bg-agri-secondary">
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Bank & Payments Tab */}
            <TabsContent value="bank" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Bank & Payment Information</CardTitle>
                  <CardDescription>
                    Manage your bank accounts and payment preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="accountName">Account Holder Name</Label>
                        <Input 
                          id="accountName" 
                          placeholder="Name as per bank records" 
                          defaultValue="Rajesh Singh"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input 
                          id="accountNumber" 
                          placeholder="Enter your bank account number" 
                          defaultValue="XXXX XXXX 5678"
                        />
                        <p className="text-xs text-muted-foreground">
                          Your account details are securely encrypted
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bankName">Bank Name</Label>
                        <Input 
                          id="bankName" 
                          placeholder="Enter your bank name" 
                          defaultValue="State Bank of India"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="ifsc">IFSC Code</Label>
                        <Input 
                          id="ifsc" 
                          placeholder="Enter IFSC code" 
                          defaultValue="SBIN0001234"
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium">Payment Preferences</h3>
                      
                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Shield className="h-5 w-5 text-agri-primary" />
                            <Label htmlFor="escrow" className="font-medium">
                              Use Escrow for Payments
                            </Label>
                          </div>
                          <Switch id="escrow" defaultChecked />
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 ml-7">
                          Secure payments held in escrow until order fulfillment
                        </p>
                      </div>
                      
                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Phone className="h-5 w-5 text-agri-primary" />
                            <Label htmlFor="upi" className="font-medium">
                              Enable UPI Payments
                            </Label>
                          </div>
                          <Switch id="upi" defaultChecked />
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 ml-7">
                          Receive payments directly via UPI
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button className="bg-agri-primary hover:bg-agri-secondary">
                        Save Payment Information
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Preferences Tab */}
            <TabsContent value="preferences" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Notification & App Preferences</CardTitle>
                  <CardDescription>
                    Customize your notification settings and app experience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notification Settings</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="bidNotifications" className="font-medium">
                              Bid Notifications
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Get alerts when you receive bids on your listings
                            </p>
                          </div>
                          <Switch id="bidNotifications" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="marketUpdates" className="font-medium">
                              Market Price Updates
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Daily updates on market prices for your crops
                            </p>
                          </div>
                          <Switch id="marketUpdates" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="weatherAlerts" className="font-medium">
                              Weather Alerts
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Severe weather warnings for your area
                            </p>
                          </div>
                          <Switch id="weatherAlerts" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="smsNotifications" className="font-medium">
                              SMS Notifications
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Receive important updates via SMS
                            </p>
                          </div>
                          <Switch id="smsNotifications" defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Language & Display</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="language">Preferred Language</Label>
                          <select 
                            id="language" 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            defaultValue="en"
                          >
                            <option value="en">English</option>
                            <option value="hi">हिंदी (Hindi)</option>
                            <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
                            <option value="gu">ગુજરાતી (Gujarati)</option>
                            <option value="mr">मराठी (Marathi)</option>
                            <option value="ta">தமிழ் (Tamil)</option>
                            <option value="te">తెలుగు (Telugu)</option>
                            <option value="bn">বাংলা (Bengali)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Privacy & Security</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="locationSharing" className="font-medium">
                              Share Farm Location
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Allow buyers to see your general farm location
                            </p>
                          </div>
                          <Switch id="locationSharing" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="analytics" className="font-medium">
                              Share Analytics Data
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Help improve the platform with anonymous usage data
                            </p>
                          </div>
                          <Switch id="analytics" defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button className="bg-agri-primary hover:bg-agri-secondary">
                        Save Preferences
                      </Button>
                    </div>
                  </form>
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

export default Profile;
