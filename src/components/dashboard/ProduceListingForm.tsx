
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Camera, Upload, ChevronDown } from "lucide-react";
import { toast } from "sonner";

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

const ProduceListingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Your produce has been listed successfully!");
    }, 1500);
  };

  const handleImageUpload = () => {
    // Simulate image upload
    if (uploadCount < 3) {
      setUploadCount(prev => prev + 1);
      toast.success("Image uploaded successfully!");
    } else {
      toast.error("Maximum 3 images can be uploaded.");
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity (in Quintals)</Label>
              <Input id="quantity" type="number" min="1" placeholder="e.g., 10" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Expected Price per Quintal (₹)</Label>
              <Input id="price" type="number" min="1" placeholder="e.g., 2500" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Pickup Location</Label>
            <Input id="location" placeholder="Village, District, State" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Provide details about quality, harvesting date, etc."
              rows={3}
            />
          </div>

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

          <div className="space-y-2">
            <Label htmlFor="quality">Quality Certification</Label>
            <div className="flex items-center gap-2">
              <Select>
                <SelectTrigger id="quality" className="flex-1">
                  <SelectValue placeholder="Select certification (if any)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="organic">Organic Certified</SelectItem>
                  <SelectItem value="fssai">FSSAI Certified</SelectItem>
                  <SelectItem value="agmark">AGMARK Certified</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
              
              <Button type="button" variant="outline" className="flex-shrink-0">
                <Upload className="h-4 w-4 mr-2" />
                <span>Upload</span>
              </Button>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-agri-primary hover:bg-agri-secondary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Listing...
              </>
            ) : (
              "List Produce"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProduceListingForm;
