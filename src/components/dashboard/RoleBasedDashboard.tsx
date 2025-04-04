
import React from "react";
import FarmerDashboard from "./FarmerDashboard";
import AdminDashboard from "./AdminDashboard";
import { PackageIcon, BarChart3, Users, ShoppingBag, Truck } from "lucide-react";

interface RoleBasedDashboardProps {
  role: "farmer" | "fpo" | "buyer" | "supplier" | "admin";
}

const RoleBasedDashboard = ({ role }: RoleBasedDashboardProps) => {
  switch (role) {
    case "farmer":
      return <FarmerDashboard />;
    case "fpo":
      return (
        <div>
          <h2 className="text-2xl font-bold mb-4">FPO Dashboard</h2>
          <p>Welcome to the FPO Dashboard. Here, FPO users can manage their collective activities, member profiles, and aggregate produce listings.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-md">
              <BarChart3 className="h-6 w-6 text-gray-500 mb-2" />
              <h3 className="font-semibold text-lg">Member Contributions</h3>
              <p className="text-sm text-gray-600">Track contributions from individual members.</p>
            </div>
            <div className="p-4 border rounded-md">
              <Users className="h-6 w-6 text-gray-500 mb-2" />
              <h3 className="font-semibold text-lg">Member Profiles</h3>
              <p className="text-sm text-gray-600">Manage and view member profiles.</p>
            </div>
            <div className="p-4 border rounded-md">
              <PackageIcon className="h-6 w-6 text-gray-500 mb-2" />
              <h3 className="font-semibold text-lg">Aggregate Produce</h3>
              <p className="text-sm text-gray-600">View combined produce listings.</p>
            </div>
          </div>
        </div>
      );
    case "buyer":
      return (
        <div>
          <h2 className="text-2xl font-bold mb-4">Buyer/Trader Dashboard</h2>
          <p>Welcome to the Buyer/Trader Dashboard. Here, buyers can view market trends, manage bids, and track purchases.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-md">
              <ShoppingBag className="h-6 w-6 text-gray-500 mb-2" />
              <h3 className="font-semibold text-lg">Marketplace Activity</h3>
              <p className="text-sm text-gray-600">View recent listings and market trends.</p>
            </div>
            <div className="p-4 border rounded-md">
              <BarChart3 className="h-6 w-6 text-gray-500 mb-2" />
              <h3 className="font-semibold text-lg">Bidding Stats</h3>
              <p className="text-sm text-gray-600">Track your bidding success rate.</p>
            </div>
            <div className="p-4 border rounded-md">
              <Truck className="h-6 w-6 text-gray-500 mb-2" />
              <h3 className="font-semibold text-lg">Purchase History</h3>
              <p className="text-sm text-gray-600">View your purchase history and track shipments.</p>
            </div>
          </div>
        </div>
      );
    case "supplier":
      return (
        <div>
          <h2 className="text-2xl font-bold mb-4">Input Supplier Dashboard</h2>
          <p>Welcome to the Input Supplier Dashboard. Here, suppliers can manage their product listings, track inventory, and view orders.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-md">
              <PackageIcon className="h-6 w-6 text-gray-500 mb-2" />
              <h3 className="font-semibold text-lg">Product Listings</h3>
              <p className="text-sm text-gray-600">Manage your product listings and inventory.</p>
            </div>
            <div className="p-4 border rounded-md">
              <Truck className="h-6 w-6 text-gray-500 mb-2" />
              <h3 className="font-semibold text-lg">Order Management</h3>
              <p className="text-sm text-gray-600">Track and manage incoming orders.</p>
            </div>
            <div className="p-4 border rounded-md">
              <BarChart3 className="h-6 w-6 text-gray-500 mb-2" />
              <h3 className="font-semibold text-lg">Sales Analytics</h3>
              <p className="text-sm text-gray-600">View sales analytics and performance.</p>
            </div>
          </div>
        </div>
      );
    case "admin":
      return <AdminDashboard />;
    default:
      return <p>Please select a role to view the dashboard.</p>;
  }
};

export default RoleBasedDashboard;
