
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Search, Filter, Star, ShoppingCart, Package, IndianRupee } from "lucide-react";

// Sample input products data
const sampleInputProducts = [
  {
    id: "1",
    title: "Premium Wheat Seeds",
    category: "Seeds",
    brand: "AgriGrow",
    price: 1200,
    quantity: "1 kg",
    rating: 4.5,
    reviews: 128,
    inStock: true,
    image: "/placeholder.svg",
    seller: "National Seeds Corporation Ltd.",
    verified: true
  },
  {
    id: "2",
    title: "Organic Fertilizer",
    category: "Fertilizers",
    brand: "EcoNutrient",
    price: 850,
    quantity: "10 kg",
    rating: 4.2,
    reviews: 87,
    inStock: true,
    image: "/placeholder.svg",
    seller: "Indian Organic Fertilizers",
    verified: true
  },
  {
    id: "3",
    title: "Broad Spectrum Insecticide",
    category: "Pesticides",
    brand: "CropShield",
    price: 560,
    quantity: "500 ml",
    rating: 4.0,
    reviews: 42,
    inStock: true,
    image: "/placeholder.svg",
    seller: "Plant Protection Solutions",
    verified: true
  },
  {
    id: "4",
    title: "Drip Irrigation Kit",
    category: "Equipment",
    brand: "WaterWise",
    price: 3250,
    quantity: "Complete set",
    rating: 4.8,
    reviews: 56,
    inStock: true,
    image: "/placeholder.svg",
    seller: "Modern Farm Equipment Co.",
    verified: true
  },
  {
    id: "5",
    title: "Hybrid Tomato Seeds",
    category: "Seeds",
    brand: "VegGrow",
    price: 350,
    quantity: "100 g",
    rating: 4.6,
    reviews: 93,
    inStock: true,
    image: "/placeholder.svg",
    seller: "Premier Seeds Inc.",
    verified: true
  },
  {
    id: "6",
    title: "Soil Health Testing Kit",
    category: "Equipment",
    brand: "SoilTech",
    price: 1600,
    quantity: "25 tests",
    rating: 4.3,
    reviews: 38,
    inStock: false,
    image: "/placeholder.svg",
    seller: "Agri Diagnostics Ltd.",
    verified: true
  }
];

const InputsMarketplace = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [products] = useState(sampleInputProducts);

  const filteredProducts = products.filter(product => {
    const matchesSearch = !searchQuery || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = !categoryFilter || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:flex-1 relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by product name, brand or category..." 
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
              <SelectItem value="Seeds">Seeds</SelectItem>
              <SelectItem value="Fertilizers">Fertilizers</SelectItem>
              <SelectItem value="Pesticides">Pesticides</SelectItem>
              <SelectItem value="Equipment">Equipment</SelectItem>
              <SelectItem value="Tools">Tools</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Products Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-lg text-muted-foreground">No products found matching your criteria</p>
            <Button variant="link" onClick={() => {setSearchQuery(""); setCategoryFilter("");}}>
              Clear filters
            </Button>
          </div>
        ) : (
          filteredProducts.map(product => (
            <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video bg-muted relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover"
                />
                <Badge 
                  variant="outline"
                  className="absolute top-2 right-2 bg-white/80"
                >
                  {product.category}
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="mb-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg line-clamp-1">{product.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{product.brand}</p>
                </div>
                
                <div className="flex items-center mt-1 mb-3">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">({product.reviews} reviews)</span>
                  
                  <div className="ml-auto">
                    <Badge variant={product.inStock ? "outline" : "secondary"}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                </div>
                
                <Separator />
                
                <div className="mt-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <IndianRupee className="h-3 w-3" />
                    <span className="font-bold text-lg ml-1">
                      {product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">/{product.quantity}</span>
                  </div>
                  <Badge className="bg-green-600">
                    Verified Seller
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Button variant="outline">
                    View Details
                  </Button>
                  <Button disabled={!product.inStock}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
                
                <div className="mt-3 text-xs text-muted-foreground">
                  Seller: {product.seller}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default InputsMarketplace;
