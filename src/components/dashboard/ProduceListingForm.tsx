
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Camera, Upload, ChevronDown, ArrowLeft, ArrowRight, Info, Calendar, MapPin, FileText } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const cropCategories = [
  { value: "wheat", label: "Wheat" },
  { value: "rice", label: "Rice" },
  { value: "maize", label: "Maize" },
  { value: "pulses", label: "Pulses" },
  { value: "vegetables", label: "Vegetables" },
  { value: "fruits", label: "Fruits" },
  { value: "cotton", label: "Cotton" },
  { value: "sugarcane", label: "Sugarcane" },
  { value: "spices", label: "Spices" },
  { value: "other", label: "Other" }
];

const cropGrades = [
  { value: "grade_a", label: "Grade A" },
  { value: "grade_b", label: "Grade B" },
  { value: "grade_c", label: "Grade C" },
  { value: "faq", label: "FAQ (Fair Average Quality)" },
  { value: "organic_certified", label: "Organic Certified" },
  { value: "premium", label: "Premium Quality" },
  { value: "standard", label: "Standard Quality" },
];

const ProduceListingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [listingType, setListingType] = useState("auction");

  const steps = [
    { name: "Basic Details", description: "Crop category, variety, and quantity" },
    { name: "Quality & Location", description: "Grade, assaying and location details" },
    { name: "Photos & Pricing", description: "Upload images and set pricing" },
    { name: "Review & Submit", description: "Review all details and submit listing" }
  ];

  const handleImageUpload = () => {
    // Simulate image upload
    if (uploadCount < 3) {
      setUploadCount(prev => prev + 1);
      toast.success("Image uploaded successfully!");
    } else {
      toast.error("Maximum 3 images can be uploaded.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Your produce has been listed successfully!");
      setCurrentStep(0);
      setUploadCount(0);
    }, 1500);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>List Your Produce</CardTitle>
        <CardDescription>
          Enter details about your produce to list it on the marketplace
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Steps Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, idx) => (
              <div key={idx} className="flex-1 text-center">
                <div className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center font-medium 
                  ${idx === currentStep ? 'bg-agri-primary text-white' : 
                    idx < currentStep ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {idx + 1}
                </div>
                <span className={`mt-2 text-xs hidden md:inline-block ${idx === currentStep ? 'font-semibold' : ''}`}>
                  {step.name}
                </span>
              </div>
            ))}
          </div>
          <div className="hidden md:flex justify-between">
            {steps.map((step, idx) => (
              <div key={idx} className="flex-1 text-center">
                <span className="text-xs text-muted-foreground">{step.description}</span>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Step 1: Basic Details */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Crop Category</Label>
                <Select required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select crop category" />
                  </SelectTrigger>
                  <SelectContent>
                    {cropCategories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="variety">Variety/Type</Label>
                <Input id="variety" placeholder="e.g., Basmati, Durum" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity (in Quintals)</Label>
                  <Input id="quantity" type="number" min="1" placeholder="e.g., 10" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="harvest_date">Harvest Date</Label>
                  <div className="relative">
                    <Input
                      id="harvest_date"
                      type="date"
                      placeholder="Select date"
                    />
                    <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Provide details about quality, harvesting date, etc."
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Step 2: Quality & Location */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="grade">Quality Grade</Label>
                <Select>
                  <SelectTrigger id="grade">
                    <SelectValue placeholder="Select quality grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {cropGrades.map((grade) => (
                      <SelectItem key={grade.value} value={grade.value}>
                        {grade.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="assaying">Quality Assaying Report</Label>
                  <span className="text-xs text-muted-foreground">(Optional)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Input 
                    id="assaying"
                    placeholder="Upload assaying report or enter report ID"
                  />
                  <Button type="button" variant="outline" className="flex-shrink-0 whitespace-nowrap">
                    <FileText className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  An assaying report can increase buyer confidence and potentially fetch better prices
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location_type">Pickup Location Type</Label>
                <Select>
                  <SelectTrigger id="location_type">
                    <SelectValue placeholder="Select location type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="farm_gate">Farm Gate</SelectItem>
                    <SelectItem value="warehouse">Warehouse</SelectItem>
                    <SelectItem value="apmc">APMC Market</SelectItem>
                    <SelectItem value="fpo_center">FPO Collection Center</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Full Address</Label>
                <div className="relative">
                  <Input 
                    id="location" 
                    placeholder="Village, District, State, PIN" 
                    required 
                  />
                  <MapPin className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          )}
                  
          {/* Step 3: Photos & Pricing */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Upload Images (Max. 3)</Label>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleImageUpload}
                    className="h-24 w-24 flex flex-col items-center justify-center border-dashed"
                  >
                    <Camera className="h-6 w-6 mb-1" />
                    <span className="text-xs">Add Photo</span>
                  </Button>
                  
                  {Array.from({ length: uploadCount }).map((_, index) => (
                    <div 
                      key={index} 
                      className="h-24 w-24 bg-muted rounded flex items-center justify-center"
                    >
                      <Camera className="h-6 w-6 text-muted-foreground" />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Clear images help buyers make better decisions
                </p>
              </div>

              <div className="space-y-2 pt-4">
                <Label>Listing Type</Label>
                <Tabs defaultValue="auction" className="w-full" onValueChange={setListingType}>
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="auction">Auction</TabsTrigger>
                    <TabsTrigger value="fixed">Fixed Price</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="auction">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="starting_price">Starting Price per Quintal (₹)</Label>
                        <Input id="starting_price" type="number" min="1" placeholder="e.g., 2500" required />
                        <p className="text-xs text-muted-foreground">
                          This is the minimum bid price. Higher bids will be automatically accepted.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="auction_duration">Auction Duration</Label>
                        <Select>
                          <SelectTrigger id="auction_duration">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">3 days</SelectItem>
                            <SelectItem value="5">5 days</SelectItem>
                            <SelectItem value="7">7 days</SelectItem>
                            <SelectItem value="10">10 days</SelectItem>
                            <SelectItem value="14">14 days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="fixed">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fixed_price">Fixed Price per Quintal (₹)</Label>
                        <Input id="fixed_price" type="number" min="1" placeholder="e.g., 2800" required />
                        <p className="text-xs text-muted-foreground">
                          This is the exact price at which buyers can purchase your produce.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="listing_duration">Listing Duration</Label>
                        <Select>
                          <SelectTrigger id="listing_duration">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7">7 days</SelectItem>
                            <SelectItem value="14">14 days</SelectItem>
                            <SelectItem value="30">30 days</SelectItem>
                            <SelectItem value="60">60 days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Review Your Listing Details</h3>
                <p className="text-sm text-muted-foreground">
                  Please verify all information before submitting your produce listing
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  <div className="space-y-1">
                    <span className="text-sm text-muted-foreground">Category:</span>
                    <p className="font-medium">Wheat</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm text-muted-foreground">Variety:</span>
                    <p className="font-medium">Sharbati</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm text-muted-foreground">Quantity:</span>
                    <p className="font-medium">10 Quintals</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm text-muted-foreground">Harvest Date:</span>
                    <p className="font-medium">10 Apr 2025</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  <div className="space-y-1">
                    <span className="text-sm text-muted-foreground">Quality Grade:</span>
                    <p className="font-medium">Grade A</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm text-muted-foreground">Location Type:</span>
                    <p className="font-medium">Farm Gate</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm text-muted-foreground">Address:</span>
                    <p className="font-medium">Village Rajpur, District Indore, Madhya Pradesh, 452001</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm text-muted-foreground">Assaying Report:</span>
                    <p className="font-medium text-muted-foreground">Not provided</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  <div className="space-y-1">
                    <span className="text-sm text-muted-foreground">Listing Type:</span>
                    <p className="font-medium capitalize">{listingType}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm text-muted-foreground">
                      {listingType === 'auction' ? 'Starting Price:' : 'Fixed Price:'}
                    </span>
                    <p className="font-medium">₹2,500 per Quintal</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm text-muted-foreground">Duration:</span>
                    <p className="font-medium">7 days</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm text-muted-foreground">Photos Uploaded:</span>
                    <p className="font-medium">{uploadCount} photos</p>
                  </div>
                </div>

                <div className="mt-4 bg-blue-50 p-4 rounded-md">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-800">Terms & Conditions</h4>
                      <p className="text-xs text-blue-700 mt-1">
                        By submitting this listing, you agree to the platform's terms and conditions related to produce quality, trade facilitation, and payment processing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {currentStep > 0 ? (
              <Button type="button" variant="outline" onClick={handlePrevious}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            ) : (
              <div></div>
            )}

            {currentStep < steps.length - 1 ? (
              <Button type="button" onClick={handleNext}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                type="submit" 
                className="bg-agri-primary hover:bg-agri-secondary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Listing...
                  </>
                ) : (
                  "Submit Listing"
                )}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProduceListingForm;
