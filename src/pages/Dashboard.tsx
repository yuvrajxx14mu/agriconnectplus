
import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import RoleBasedDashboard from "@/components/dashboard/RoleBasedDashboard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InfoIcon } from "lucide-react";

type UserRole = "farmer" | "fpo" | "buyer" | "supplier" | "admin";

const Dashboard = () => {
  // This would typically come from auth context, but for demo we'll use local state
  const [userRole, setUserRole] = useState<UserRole>("farmer");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Demo role switcher - In a real app this would be determined by authentication */}
        <div className="bg-blue-50 p-3 rounded-md mb-6 flex items-start gap-2">
          <InfoIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-blue-800 mb-1">
              <span className="font-semibold">Demo Mode:</span> Select different user roles to view their respective dashboards
            </p>
            <Select value={userRole} onValueChange={(value) => setUserRole(value as UserRole)}>
              <SelectTrigger className="w-[200px] h-8 text-sm bg-white">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="farmer">Farmer</SelectItem>
                <SelectItem value="fpo">FPO User</SelectItem>
                <SelectItem value="buyer">Buyer/Trader</SelectItem>
                <SelectItem value="supplier">Input Supplier</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-blue-700 mt-1">
              In a production app, this would be determined by your login credentials
            </p>
          </div>
        </div>
        
        <RoleBasedDashboard role={userRole} />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
