
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CircleCheck, FileText, Truck, IndianRupee, Bell, Clock, ShoppingBag, Layers, Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import FarmerDashboard from "./FarmerDashboard";

type UserRole = "farmer" | "fpo" | "buyer" | "supplier" | "admin";

interface DashboardProps {
  role?: UserRole;
}

const RoleBasedDashboard = ({ role = "farmer" }: DashboardProps) => {
  const navigate = useNavigate();
  
  // If user is a farmer, show the existing FarmerDashboard
  if (role === "farmer") {
    return <FarmerDashboard />;
  }

  // For other roles, show placeholder with role-specific content
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold capitalize">{role === "fpo" ? "FPO" : role} Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your latest activity</p>
        </div>
        
        {role === "fpo" && (
          <Button className="bg-agri-primary hover:bg-agri-secondary" onClick={() => navigate("/marketplace")}>
            <span>List New Produce</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
        
        {role === "buyer" && (
          <Button className="bg-agri-primary hover:bg-agri-secondary" onClick={() => navigate("/marketplace")}>
            <span>Browse Marketplace</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
        
        {role === "supplier" && (
          <Button className="bg-agri-primary hover:bg-agri-secondary">
            <span>Add New Product</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Stats Overview - Adapted for each role */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Common Stats */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {role === "fpo" && "Total Active Listings"}
              {role === "buyer" && "Active Bids Placed"}
              {role === "supplier" && "Active Products"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{role === "supplier" ? "24" : "5"}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {role === "fpo" && "Total Bids Received"}
              {role === "buyer" && "Successful Purchases"}
              {role === "supplier" && "Orders Received"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{role === "supplier" ? "18" : "12"}</div>
            <p className="text-xs text-muted-foreground">
              +3 from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {role === "fpo" && "Sold This Month"}
              {role === "buyer" && "This Month Purchases"}
              {role === "supplier" && "Monthly Revenue"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{role === "supplier" ? "87,450" : "1,25,320"}</div>
            <p className="text-xs text-muted-foreground">
              {role === "supplier" ? "32 orders completed" : "42 Quintals of produce"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {role === "fpo" && "Average Price Premium"}
              {role === "buyer" && "Price Savings"}
              {role === "supplier" && "Satisfaction Rating"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-agri-success">
              {role === "supplier" ? "4.8/5" : "+7.5%"}
            </div>
            <p className="text-xs text-muted-foreground">
              {role === "fpo" && "Above local mandi rates"}
              {role === "buyer" && "Below market average"}
              {role === "supplier" && "Based on 120 reviews"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Role-specific content sections */}
      {role === "fpo" && (
        <Tabs defaultValue="listings" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="listings">Your Listings</TabsTrigger>
            <TabsTrigger value="bids">Active Bids</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="members">Member Farmers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="listings" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Current Produce Listings</CardTitle>
                <CardDescription>
                  Monitor and manage your FPO's active produce listings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                          <Layers className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium">Organic Red Lentils</h4>
                          <p className="text-sm text-muted-foreground">100 quintals • Grade A</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">₹6,500/quintal</div>
                        <Badge>12 bids received</Badge>
                      </div>
                      <Button size="sm" variant="outline">Manage</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="bids" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Bids on Your Listings</CardTitle>
                <CardDescription>
                  Review and respond to bids from potential buyers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                          <Users className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium">Delhi Food Processors</h4>
                          <p className="text-sm text-muted-foreground">Bid on: Organic Red Lentils</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">₹6,700/quintal</div>
                        <Badge variant="secondary">+₹200 above base</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary">Accept</Button>
                        <Button size="sm" variant="outline">Reject</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>
                  Track the status of your recent sales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2].map((item) => (
                    <div key={item} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                          <FileText className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium">Transaction #AGC-{1000 + item}</h4>
                          <p className="text-sm text-muted-foreground">Organic Wheat • 50 quintals</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">₹1,25,000</div>
                        <Badge variant="outline">Payment Received</Badge>
                      </div>
                      <div>
                        <Button size="sm" variant="outline">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Member Farmers</CardTitle>
                <CardDescription>
                  View and manage your FPO member farmers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                          <Users className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium">Farmer #{item}</h4>
                          <p className="text-sm text-muted-foreground">Village Rajpur • 5 acres</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">Member since 2023</div>
                        <p className="text-sm text-muted-foreground">Wheat, Rice</p>
                      </div>
                      <Button size="sm" variant="outline">View Profile</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Buyer Dashboard Sections */}
      {role === "buyer" && (
        <Tabs defaultValue="marketplace" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="bids">My Bids</TabsTrigger>
            <TabsTrigger value="purchases">Purchase History</TabsTrigger>
            <TabsTrigger value="payments">Payment Status</TabsTrigger>
          </TabsList>
          
          <TabsContent value="marketplace" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Recommended For You</CardTitle>
                <CardDescription>
                  Top produce listings matching your preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                          <Layers className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium">Premium Wheat</h4>
                          <p className="text-sm text-muted-foreground">75 quintals • Grade A</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">₹2,800/quintal</div>
                        <Badge>4 days left</Badge>
                      </div>
                      <Button size="sm">View Listing</Button>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full" onClick={() => navigate("/marketplace")}>
                    View All Listings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="bids" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Your Active Bids</CardTitle>
                <CardDescription>
                  Track bids you've placed on produce listings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                          <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium">Organic Rice</h4>
                          <p className="text-sm text-muted-foreground">Bid: ₹3,500/quintal</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">Status: {item === 1 ? 'Highest Bid' : 'Outbid'}</div>
                        <Badge variant={item === 1 ? "outline" : "secondary"}>
                          {item === 1 ? 'Ends in 2 days' : 'Increase bid'}
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline">View Details</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="purchases" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Purchase History</CardTitle>
                <CardDescription>
                  View your past and pending purchases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                          <FileText className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium">Order #AGC-{2000 + item}</h4>
                          <p className="text-sm text-muted-foreground">Premium Wheat • 100 quintals</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">₹2,80,000</div>
                        <Badge variant="outline">
                          {item === 1 ? 'In Transit' : 'Delivered'}
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => navigate(`/logistics/trans-${item}`)}>
                        {item === 1 ? 'Track Shipment' : 'View Details'}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payments" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Payment Status</CardTitle>
                <CardDescription>
                  Track your transaction payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                          <IndianRupee className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium">Payment #{3000 + item}</h4>
                          <p className="text-sm text-muted-foreground">Order #AGC-{2000 + item}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">₹{item * 100000}</div>
                        <Badge variant={item === 1 ? "secondary" : "outline"}>
                          {item === 1 ? 'In Escrow' : 'Completed'}
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => navigate(`/payment/trans-${item}`)}>View Receipt</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Supplier Dashboard Sections */}
      {role === "supplier" && (
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="products">My Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Product Listings</CardTitle>
                <CardDescription>
                  Manage your product catalog
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                          <Package className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium">Premium Wheat Seeds</h4>
                          <p className="text-sm text-muted-foreground">10 kg pack • ₹1,200</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">Stock: 125 units</div>
                        <Badge variant="outline">
                          {item % 2 === 0 ? 'Low Stock' : 'In Stock'}
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline">Edit</Button>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    Add New Product
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  View and process incoming orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                          <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium">Order #{4000 + item}</h4>
                          <p className="text-sm text-muted-foreground">3 products • ₹3,250</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">Placed: 3 Apr 2025</div>
                        <Badge variant={item === 1 ? "secondary" : "outline"}>
                          {item === 1 ? 'New Order' : item === 2 ? 'Processing' : 'Shipped'}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View</Button>
                        {item === 1 && <Button size="sm">Process</Button>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Management</CardTitle>
                <CardDescription>
                  Update stock levels and manage inventory
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                          <Package className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium">Product #{item}</h4>
                          <p className="text-sm text-muted-foreground">SKU: INP-{1000 + item}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">Current Stock: {item * 25} units</div>
                        <Badge variant={item % 3 === 0 ? "secondary" : "outline"}>
                          {item % 3 === 0 ? 'Reorder' : 'Sufficient'}
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline">Update Stock</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Sales Analytics</CardTitle>
                <CardDescription>
                  View your sales performance and trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border rounded-md">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-2">Sales Analytics Charts</p>
                    <Button variant="outline">Generate Reports</Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Top Selling Product</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">Premium Wheat Seeds</div>
                      <p className="text-xs text-muted-foreground">
                        32% of total sales
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Monthly Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-agri-success">+12.5%</div>
                      <p className="text-xs text-muted-foreground">
                        Compared to last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Customer Satisfaction</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">4.8/5</div>
                      <p className="text-xs text-muted-foreground">
                        Based on 120 reviews
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Notifications Section - Common for all roles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Recent Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 pb-3 border-b">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <CircleCheck className="h-4 w-4 text-blue-700" />
              </div>
              <div>
                <p className="font-medium text-sm">
                  {role === "fpo" && "New bid received on your Organic Rice listing"}
                  {role === "buyer" && "Your bid for Premium Wheat was accepted"}
                  {role === "supplier" && "New order received for Organic Fertilizer"}
                </p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 pb-3 border-b">
              <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <Clock className="h-4 w-4 text-amber-700" />
              </div>
              <div>
                <p className="font-medium text-sm">
                  {role === "fpo" && "Your produce listing will expire in 2 days"}
                  {role === "buyer" && "Auction for Basmati Rice ends in 5 hours"}
                  {role === "supplier" && "Inventory alert: Wheat Seeds stock below 20 units"}
                </p>
                <p className="text-xs text-muted-foreground">5 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 pb-3">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <IndianRupee className="h-4 w-4 text-green-700" />
              </div>
              <div>
                <p className="font-medium text-sm">
                  {role === "fpo" && "Payment of ₹85,000 received for your Wheat sale"}
                  {role === "buyer" && "Payment of ₹1,25,000 processed for Premium Rice"}
                  {role === "supplier" && "Payment of ₹12,500 received for recent order"}
                </p>
                <p className="text-xs text-muted-foreground">Yesterday</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Truck className="h-4 w-4 text-purple-700" />
              </div>
              <div>
                <p className="font-medium text-sm">
                  {role === "fpo" && "Logistics arranged for your Maize sale"}
                  {role === "buyer" && "Your Organic Wheat order has been shipped"}
                  {role === "supplier" && "Order #5002 has been delivered to customer"}
                </p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <Button variant="outline" className="w-full">
              View All Notifications
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleBasedDashboard;
