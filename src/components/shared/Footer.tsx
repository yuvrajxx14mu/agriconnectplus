
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-agri-primary text-white mt-auto">
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <img 
                src="/placeholder.svg"
                alt="AgriConnect Plus Logo" 
                className="h-6 w-6" 
              />
              AgriConnect<span className="text-agri-light">Plus</span>
            </h3>
            <p className="mb-4 text-gray-200 text-sm">
              Empowering Indian farmers with better market access, transparent pricing, and valuable support services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-agri-light transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-agri-light transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-agri-light transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-agri-light transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-200">
              <li>
                <Link to="/about" className="hover:text-agri-light transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/marketplace" className="hover:text-agri-light transition-colors">Marketplace</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-agri-light transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-agri-light transition-colors">Resources</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-agri-light transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Farmer Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Farmer Resources</h3>
            <ul className="space-y-2 text-gray-200">
              <li>
                <Link to="/weather" className="hover:text-agri-light transition-colors">Weather Updates</Link>
              </li>
              <li>
                <Link to="/market-prices" className="hover:text-agri-light transition-colors">Market Prices</Link>
              </li>
              <li>
                <Link to="/government-schemes" className="hover:text-agri-light transition-colors">Government Schemes</Link>
              </li>
              <li>
                <Link to="/crop-advisory" className="hover:text-agri-light transition-colors">Crop Advisory</Link>
              </li>
              <li>
                <Link to="/financial-services" className="hover:text-agri-light transition-colors">Financial Services</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-200">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>123 Agri Building, New Delhi 110001, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} />
                <span>+91 1800 XXX XXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} />
                <span>info@agriconnectplus.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-agri-secondary text-center text-sm text-gray-300">
          <p>&copy; {currentYear} AgriConnect Plus. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/terms" className="hover:text-agri-light transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-agri-light transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
