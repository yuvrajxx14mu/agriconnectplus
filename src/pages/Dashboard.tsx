
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import FarmerDashboard from "@/components/dashboard/FarmerDashboard";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <FarmerDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
