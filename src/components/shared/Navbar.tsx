
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Bell, User, LogOut, Home, BarChart2, ShoppingCart, Truck, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-agri-primary text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            <img 
              src="/placeholder.svg"
              alt="AgriConnect Plus Logo" 
              className="h-8 w-8" 
            />
            <Link to="/" className="text-xl font-bold">
              AgriConnect<span className="text-agri-light">Plus</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/dashboard" className="hover:text-agri-light transition-colors">
              Dashboard
            </Link>
            <Link to="/marketplace" className="hover:text-agri-light transition-colors">
              Marketplace
            </Link>
            <Link to="/services" className="hover:text-agri-light transition-colors">
              Services
            </Link>
            <Link to="/resources" className="hover:text-agri-light transition-colors">
              Resources
            </Link>
            
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-agri-secondary rounded-full">
                  <Bell size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-[300px] overflow-y-auto">
                  <div className="p-3 hover:bg-muted cursor-pointer border-b">
                    <p className="font-medium">New bid on your wheat listing</p>
                    <p className="text-sm text-muted-foreground">10 minutes ago</p>
                  </div>
                  <div className="p-3 hover:bg-muted cursor-pointer border-b">
                    <p className="font-medium">Market price update for rice</p>
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                  </div>
                  <div className="p-3 hover:bg-muted cursor-pointer">
                    <p className="font-medium">Weather alert: Rain expected</p>
                    <p className="text-sm text-muted-foreground">Yesterday</p>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-agri-secondary rounded-full">
                  <User size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                    <User size={16} />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                  <LogOut size={16} />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-3 pb-3">
              <Link 
                to="/dashboard" 
                className="flex items-center gap-2 px-4 py-2 hover:bg-agri-secondary rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home size={18} />
                <span>Dashboard</span>
              </Link>
              <Link 
                to="/marketplace" 
                className="flex items-center gap-2 px-4 py-2 hover:bg-agri-secondary rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingCart size={18} />
                <span>Marketplace</span>
              </Link>
              <Link 
                to="/services" 
                className="flex items-center gap-2 px-4 py-2 hover:bg-agri-secondary rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Truck size={18} />
                <span>Services</span>
              </Link>
              <Link 
                to="/resources" 
                className="flex items-center gap-2 px-4 py-2 hover:bg-agri-secondary rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FileText size={18} />
                <span>Resources</span>
              </Link>
              <Link 
                to="/profile" 
                className="flex items-center gap-2 px-4 py-2 hover:bg-agri-secondary rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User size={18} />
                <span>Profile</span>
              </Link>
              <div 
                className="flex items-center gap-2 px-4 py-2 hover:bg-agri-secondary rounded-md cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LogOut size={18} />
                <span>Logout</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
