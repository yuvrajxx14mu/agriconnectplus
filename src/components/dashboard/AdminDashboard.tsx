
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Users, Settings, ShieldAlert, Bell, Database, LineChart, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const currentDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Mock data for platform analytics
  const platformStats = {
    totalUsers: 524,
    activeFarmers: 342,
    activeBuyers: 98,
    activeSuppliers: 42,
    activeFPOs: 12,
    totalTransactions: 1250,
    totalListings: 856,
    activeListings: 213,
    totalValueTraded: "₹24,56,780"
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-muted-foreground">{currentDate}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center">
            <Bell className="mr-2 h-4 w-4" />
            <span>System Alerts</span>
          </Button>
          <Button className="bg-agri-primary hover:bg-agri-secondary flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>Platform Settings</span>
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium">Total Platform Users</CardTitle>
              <CardDescription>Active accounts across all roles</CardDescription>
            </div>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformStats.totalUsers}</div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Farmers</span>
                <span className="font-semibold">{platformStats.activeFarmers}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Buyers</span>
                <span className="font-semibold">{platformStats.activeBuyers}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Suppliers</span>
                <span className="font-semibold">{platformStats.activeSuppliers}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">FPOs</span>
                <span className="font-semibold">{platformStats.activeFPOs}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium">Trading Activity</CardTitle>
              <CardDescription>Listings and transactions</CardDescription>
            </div>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformStats.totalTransactions}</div>
            <p className="text-xs text-muted-foreground mb-4">
              Total transactions completed
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Total Listings</span>
                <span className="font-semibold">{platformStats.totalListings}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Active Listings</span>
                <span className="font-semibold">{platformStats.activeListings}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium">Financial Overview</CardTitle>
              <CardDescription>Total value traded on platform</CardDescription>
            </div>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformStats.totalValueTraded}</div>
            <div className="h-[80px] flex items-center justify-center">
              <p className="text-muted-foreground text-center">
                Monthly trading charts will appear here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Management Tabs */}
      <Tabs defaultValue="users" className="w-full mt-8">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="content">Content Management</TabsTrigger>
          <TabsTrigger value="quality">Quality Verification</TabsTrigger>
          <TabsTrigger value="reports">Reports & Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>User Management</span>
                <Button variant="outline" size="sm" className="h-8">
                  <Users className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </CardTitle>
              <CardDescription>
                Manage user accounts, roles, and permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-md">
                <div className="p-4 bg-muted/50">
                  <div className="grid grid-cols-12 text-sm font-medium">
                    <div className="col-span-3">User</div>
                    <div className="col-span-2">Role</div>
                    <div className="col-span-2">Joined</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-3">Actions</div>
                  </div>
                </div>
                
                {/* Mock user rows */}
                {[
                  { name: "Rajesh Kumar", role: "farmer", joined: "15 Feb 2023", status: "Active" },
                  { name: "Arjun Singh", role: "buyer", joined: "28 Mar 2023", status: "Active" },
                  { name: "Farmers Collective FPO", role: "fpo", joined: "03 Jan 2023", status: "Active" },
                  { name: "AgroChem Supplies", role: "supplier", joined: "12 Apr 2023", status: "Suspended" }
                ].map((user, idx) => (
                  <div key={idx} className="p-4 border-t">
                    <div className="grid grid-cols-12 items-center">
                      <div className="col-span-3 font-medium">{user.name}</div>
                      <div className="col-span-2 capitalize">{user.role}</div>
                      <div className="col-span-2 text-muted-foreground text-sm">{user.joined}</div>
                      <div className="col-span-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                          user.status === "Active" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-amber-100 text-amber-800"
                        }`}>
                          {user.status}
                        </span>
                      </div>
                      <div className="col-span-3 flex items-center space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                          {user.status === "Active" ? "Suspend" : "Activate"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center">
                <Button variant="outline" className="text-center">
                  View All Users
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="content" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Content Management</CardTitle>
              <CardDescription>
                Manage informational content and announcements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-4 hover:border-agri-secondary">
                  <div className="flex items-center mb-4">
                    <FileCheck className="h-5 w-5 text-agri-primary mr-2" />
                    <h3 className="font-medium">Government Schemes</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Manage agricultural scheme information
                  </p>
                  <Button variant="outline" size="sm">
                    Manage Content
                  </Button>
                </div>
                
                <div className="border rounded-md p-4 hover:border-agri-secondary">
                  <div className="flex items-center mb-4">
                    <Bell className="h-5 w-5 text-agri-primary mr-2" />
                    <h3 className="font-medium">Announcements</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Post platform-wide announcements
                  </p>
                  <Button variant="outline" size="sm">
                    Create Announcement
                  </Button>
                </div>
                
                <div className="border rounded-md p-4 hover:border-agri-secondary">
                  <div className="flex items-center mb-4">
                    <Database className="h-5 w-5 text-agri-primary mr-2" />
                    <h3 className="font-medium">Market Price Data</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Update mandi rates and market prices
                  </p>
                  <Button variant="outline" size="sm">
                    Update Data
                  </Button>
                </div>
                
                <div className="border rounded-md p-4 hover:border-agri-secondary">
                  <div className="flex items-center mb-4">
                    <ShieldAlert className="h-5 w-5 text-agri-primary mr-2" />
                    <h3 className="font-medium">Terms & Policies</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Manage platform terms and policies
                  </p>
                  <Button variant="outline" size="sm">
                    Edit Policies
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="quality" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Quality Verification Queue</CardTitle>
              <CardDescription>
                Review and approve quality assaying reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <div className="p-4 bg-muted/50">
                  <div className="grid grid-cols-12 text-sm font-medium">
                    <div className="col-span-2">ID</div>
                    <div className="col-span-2">Crop</div>
                    <div className="col-span-2">Farmer</div>
                    <div className="col-span-2">Submitted</div>
                    <div className="col-span-4">Actions</div>
                  </div>
                </div>
                
                {/* Mock quality verification requests */}
                {[
                  { id: "QV-1234", crop: "Wheat", farmer: "Rajesh K.", date: "2 hours ago" },
                  { id: "QV-1235", crop: "Rice", farmer: "Sunil M.", date: "1 day ago" },
                  { id: "QV-1236", crop: "Soybean", farmer: "Amit P.", date: "2 days ago" }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 border-t">
                    <div className="grid grid-cols-12 items-center">
                      <div className="col-span-2 font-medium">{item.id}</div>
                      <div className="col-span-2">{item.crop}</div>
                      <div className="col-span-2">{item.farmer}</div>
                      <div className="col-span-2 text-muted-foreground text-sm">{item.date}</div>
                      <div className="col-span-4 flex items-center space-x-2">
                        <Button variant="outline" size="sm">View Report</Button>
                        <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50">
                          Approve
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm text-yellow-800">
                  <ShieldAlert className="h-4 w-4 inline mr-2" />
                  Quality verification backlog: <strong>3 reports</strong> awaiting review
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Platform Analytics</CardTitle>
              <CardDescription>
                View detailed analytics and generate reports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center justify-center">
                  <BarChart3 className="h-8 w-8 mb-2 text-agri-primary" />
                  <span className="font-medium">Trading Volume Report</span>
                  <span className="text-sm text-muted-foreground mt-1">Daily, weekly, monthly analysis</span>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center justify-center">
                  <Users className="h-8 w-8 mb-2 text-agri-primary" />
                  <span className="font-medium">User Acquisition Report</span>
                  <span className="text-sm text-muted-foreground mt-1">Registration and engagement</span>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center justify-center">
                  <LineChart className="h-8 w-8 mb-2 text-agri-primary" />
                  <span className="font-medium">Financial Reports</span>
                  <span className="text-sm text-muted-foreground mt-1">Revenue and transactions</span>
                </Button>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-4">Custom Report Builder</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Report Type</label>
                    <select className="w-full border rounded p-2">
                      <option>User Activity</option>
                      <option>Transaction Summary</option>
                      <option>Commodity Prices</option>
                      <option>Regional Performance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Date Range</label>
                    <select className="w-full border rounded p-2">
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Last 90 days</option>
                      <option>Custom range</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Format</label>
                    <select className="w-full border rounded p-2">
                      <option>PDF</option>
                      <option>Excel</option>
                      <option>CSV</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button className="bg-agri-primary hover:bg-agri-secondary">
                    Generate Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
