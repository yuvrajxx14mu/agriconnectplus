
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Camera, Upload, Scale, Droplets, BarChart3, FileText, Search, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const QualityAssaying = () => {
  const [activeTab, setActiveTab] = useState("request");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    produceType: "",
    variety: "",
    quantity: "",
    location: "",
    preferredDate: "",
    contact: "",
    notes: ""
  });
  const [selfTestResults, setSelfTestResults] = useState<any>(null);
  const navigate = useNavigate();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate request submission
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Quality assaying request submitted successfully!");
      
      // Reset form
      setFormData({
        produceType: "",
        variety: "",
        quantity: "",
        location: "",
        preferredDate: "",
        contact: "",
        notes: ""
      });
    }, 1500);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate search
    setTimeout(() => {
      setIsLoading(false);
      
      if (searchValue.length > 2) {
        // Dummy search results
        setSearchResults([
          {
            id: "cert-1234",
            produceType: "Wheat",
            variety: "HD-2967",
            date: "2023-04-15",
            grade: "premium",
            moisture: "10.2%",
            foreign_matter: "0.4%",
            damaged_grains: "0.8%",
            assayer: "AgriQuality Labs"
          },
          {
            id: "cert-5678",
            produceType: "Rice",
            variety: "Basmati-1121",
            date: "2023-03-22",
            grade: "standard",
            moisture: "12.5%",
            foreign_matter: "0.8%",
            damaged_grains: "1.1%",
            assayer: "FarmTest Inc."
          }
        ]);
      } else {
        setSearchResults([]);
        toast.error("Please enter at least 3 characters to search");
      }
    }, 1000);
  };

  const handleFileUpload = () => {
    setIsLoading(true);
    
    // Simulate file upload with progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          toast.success("Sample images uploaded successfully!");
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleSelfTest = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate AI-based analysis
    setTimeout(() => {
      setIsLoading(false);
      setSelfTestResults({
        moisture: "11.2%",
        foreignMatter: "0.7%",
        damagedGrains: "1.2%",
        estimatedGrade: "standard",
        confidence: 78,
        notes: "Images suggest standard quality wheat. For official certification, please request professional assaying."
      });
      toast.success("Preliminary quality assessment completed!");
    }, 2500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold">Quality Assaying & Grading</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-1 md:grid-cols-3 mb-6">
              <TabsTrigger value="request">Request Assaying</TabsTrigger>
              <TabsTrigger value="self">Self Assessment</TabsTrigger>
              <TabsTrigger value="verify">Verify Certificate</TabsTrigger>
            </TabsList>
            
            {/* Request Assaying Tab */}
            <TabsContent value="request" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Request Professional Assaying</CardTitle>
                  <CardDescription>
                    Schedule an assayer to evaluate your produce quality
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRequestSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="produceType">Produce Type</Label>
                        <Select required>
                          <SelectTrigger id="produceType">
                            <SelectValue placeholder="Select produce type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wheat">Wheat</SelectItem>
                            <SelectItem value="rice">Rice</SelectItem>
                            <SelectItem value="maize">Maize</SelectItem>
                            <SelectItem value="pulses">Pulses</SelectItem>
                            <SelectItem value="vegetables">Vegetables</SelectItem>
                            <SelectItem value="fruits">Fruits</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="variety">Variety</Label>
                        <Input 
                          id="variety" 
                          name="variety"
                          placeholder="e.g., Basmati, Durum" 
                          value={formData.variety}
                          onChange={handleFormChange}
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity (in Quintals)</Label>
                        <Input 
                          id="quantity" 
                          name="quantity"
                          type="number" 
                          min="1" 
                          placeholder="e.g., 10" 
                          value={formData.quantity}
                          onChange={handleFormChange}
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="location">Assaying Location</Label>
                        <Input 
                          id="location" 
                          name="location"
                          placeholder="Village, District, State" 
                          value={formData.location}
                          onChange={handleFormChange}
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="preferredDate">Preferred Date</Label>
                        <Input 
                          id="preferredDate" 
                          name="preferredDate"
                          type="date" 
                          value={formData.preferredDate}
                          onChange={handleFormChange}
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="contact">Contact Number</Label>
                        <Input 
                          id="contact" 
                          name="contact"
                          placeholder="Your contact number" 
                          value={formData.contact}
                          onChange={handleFormChange}
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <textarea 
                        id="notes" 
                        name="notes"
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                        placeholder="Any specific requirements or information for the assayer"
                        value={formData.notes}
                        onChange={(e: any) => handleFormChange(e)}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <Label>Assaying Service Options</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                        <div className="border rounded-md p-4 cursor-pointer">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="font-medium">Basic Assaying</h4>
                              <p className="text-sm text-muted-foreground">
                                Physical parameters, moisture, foreign matter
                              </p>
                            </div>
                            <p className="font-medium">₹500</p>
                          </div>
                        </div>
                        
                        <div className="border-2 border-agri-primary rounded-md p-4 cursor-pointer bg-blue-50">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="font-medium text-agri-primary">Comprehensive</h4>
                              <p className="text-sm text-muted-foreground">
                                All basic parameters + lab testing for quality metrics
                              </p>
                            </div>
                            <p className="font-medium">₹1,200</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-md bg-blue-50 p-4 flex items-start space-x-3 text-blue-800">
                      <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium">Your produce will be assayed by certified professionals</p>
                        <p>The assaying fee will be collected at the time of inspection. Results will be digitally available within 24 hours.</p>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-agri-primary hover:bg-agri-secondary"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting Request...
                        </>
                      ) : "Schedule Assaying"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Self Assessment Tab */}
            <TabsContent value="self" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>AI-Assisted Quality Assessment</CardTitle>
                  <CardDescription>
                    Get a preliminary quality assessment by uploading photos of your produce
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md bg-blue-50 p-4 mb-6 flex items-start space-x-3 text-blue-800">
                    <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium">This is a preliminary assessment only</p>
                      <p>For official quality certification to use in trading, please request a professional assaying service.</p>
                    </div>
                  </div>
                
                  <form onSubmit={handleSelfTest} className="space-y-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="selfProduceType">Produce Type</Label>
                          <Select required>
                            <SelectTrigger id="selfProduceType">
                              <SelectValue placeholder="Select produce type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="wheat">Wheat</SelectItem>
                              <SelectItem value="rice">Rice</SelectItem>
                              <SelectItem value="maize">Maize</SelectItem>
                              <SelectItem value="pulses">Pulses</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="selfVariety">Variety</Label>
                          <Input 
                            id="selfVariety" 
                            placeholder="e.g., Basmati, Durum" 
                            required 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="block mb-3">Upload Clear Photos</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={handleFileUpload}
                            disabled={isLoading}
                            className="h-24 flex flex-col items-center justify-center border-dashed"
                          >
                            <Camera className="h-6 w-6 mb-1" />
                            <span className="text-xs">Side View</span>
                          </Button>
                          
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={handleFileUpload}
                            disabled={isLoading}
                            className="h-24 flex flex-col items-center justify-center border-dashed"
                          >
                            <Camera className="h-6 w-6 mb-1" />
                            <span className="text-xs">Close-up</span>
                          </Button>
                          
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={handleFileUpload}
                            disabled={isLoading}
                            className="h-24 flex flex-col items-center justify-center border-dashed"
                          >
                            <Camera className="h-6 w-6 mb-1" />
                            <span className="text-xs">Bulk Sample</span>
                          </Button>
                        </div>
                        
                        {isLoading && uploadProgress > 0 && uploadProgress < 100 && (
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
                        
                        <p className="text-xs text-muted-foreground mt-2">
                          Upload clear, well-lit photos for more accurate assessment
                        </p>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-agri-primary hover:bg-agri-secondary"
                      disabled={isLoading || uploadProgress < 100}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : "Analyze Produce Quality"}
                    </Button>
                  </form>
                  
                  {selfTestResults && (
                    <div className="mt-6 space-y-4">
                      <Separator />
                      
                      <div className="pt-3">
                        <h3 className="font-medium text-lg flex items-center">
                          <CheckCircle2 className="mr-2 h-5 w-5 text-green-600" />
                          Preliminary Assessment Results
                        </h3>
                        
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-y-4">
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Estimated Grade</p>
                            <Badge variant={
                              selfTestResults.estimatedGrade === 'premium' ? 'default' : 
                              selfTestResults.estimatedGrade === 'standard' ? 'outline' : 
                              'secondary'
                            }>
                              {selfTestResults.estimatedGrade.toUpperCase()}
                            </Badge>
                          </div>
                          
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Confidence</p>
                            <p className="font-medium">{selfTestResults.confidence}%</p>
                          </div>
                          
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Moisture Content</p>
                            <div className="flex items-center space-x-1">
                              <Droplets className="h-4 w-4 text-agri-primary" />
                              <p className="font-medium">{selfTestResults.moisture}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Foreign Matter</p>
                            <p className="font-medium">{selfTestResults.foreignMatter}</p>
                          </div>
                          
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Damaged Grains</p>
                            <p className="font-medium">{selfTestResults.damagedGrains}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 text-sm p-3 bg-gray-50 rounded-md">
                          <p className="font-medium">Notes:</p>
                          <p>{selfTestResults.notes}</p>
                        </div>
                        
                        <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                          <Button 
                            className="bg-agri-primary hover:bg-agri-secondary"
                            onClick={() => {
                              setActiveTab("request");
                              window.scrollTo(0, 0);
                            }}
                          >
                            Request Professional Assaying
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => {
                              setSelfTestResults(null);
                              setUploadProgress(0);
                            }}
                          >
                            Start New Assessment
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Verify Certificate Tab */}
            <TabsContent value="verify" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Verify Quality Certificate</CardTitle>
                  <CardDescription>
                    Check the authenticity of a quality certificate
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSearch} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="certificateId">Certificate ID or Lot Number</Label>
                      <div className="flex space-x-2">
                        <Input 
                          id="certificateId" 
                          placeholder="Enter certificate ID or lot number" 
                          value={searchValue}
                          onChange={(e) => setSearchValue(e.target.value)}
                          required 
                        />
                        <Button 
                          type="submit" 
                          disabled={isLoading}
                          className="bg-agri-primary hover:bg-agri-secondary"
                        >
                          {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Search className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                  
                  {searchResults.length > 0 && (
                    <div className="mt-6 space-y-4">
                      <Separator />
                      
                      <div className="rounded-md border-2 border-green-500 p-4 flex items-start space-x-3 text-green-700 bg-green-50">
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Certificate is valid and authentic</p>
                          <p className="text-sm">This certificate was issued by a certified assaying agency</p>
                        </div>
                      </div>
                      
                      {searchResults.map((result) => (
                        <Card key={result.id}>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle>{result.produceType} - {result.variety}</CardTitle>
                                <CardDescription>
                                  Certificate ID: {result.id}
                                </CardDescription>
                              </div>
                              <Badge variant={
                                result.grade === 'premium' ? 'default' : 
                                result.grade === 'standard' ? 'outline' : 
                                'secondary'
                              }>
                                {result.grade.toUpperCase()}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="space-y-1">
                                  <p className="text-sm text-muted-foreground">Issuing Agency</p>
                                  <p className="font-medium">{result.assayer}</p>
                                </div>
                                
                                <div className="space-y-1">
                                  <p className="text-sm text-muted-foreground">Issue Date</p>
                                  <p className="font-medium">{new Date(result.date).toLocaleDateString()}</p>
                                </div>
                                
                                <div className="space-y-1">
                                  <p className="text-sm text-muted-foreground">Moisture</p>
                                  <div className="flex items-center space-x-1">
                                    <Droplets className="h-4 w-4 text-agri-primary" />
                                    <p className="font-medium">{result.moisture}</p>
                                  </div>
                                </div>
                                
                                <div className="space-y-1">
                                  <p className="text-sm text-muted-foreground">Foreign Matter</p>
                                  <p className="font-medium">{result.foreign_matter}</p>
                                </div>
                              </div>
                              
                              <div className="flex space-x-2 mt-4">
                                <Button variant="outline" size="sm" className="flex items-center">
                                  <FileText className="h-4 w-4 mr-1" />
                                  <span>View Full Certificate</span>
                                </Button>
                                <Button variant="outline" size="sm" className="flex items-center">
                                  <BarChart3 className="h-4 w-4 mr-1" />
                                  <span>Compare with Standards</span>
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                  
                  {searchValue && searchResults.length === 0 && !isLoading && (
                    <div className="mt-6 text-center py-8 text-muted-foreground">
                      <p>No certificate found with the provided ID or lot number.</p>
                      <p className="mt-2">Please check the ID and try again.</p>
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

export default QualityAssaying;
