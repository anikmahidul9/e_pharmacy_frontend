import { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../services/AuthService';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, [location]);

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    navigate('/login');
  };

  const getLinkClass = (path: string) => {
    return location.pathname === path
      ? 'text-blue-600 font-semibold px-3 py-2 text-sm'
      : 'text-gray-700 hover:text-blue-600 px-3 py-2 text-sm transition-colors';
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-blue-600 text-white py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              <span>Emergency: +1-234-567-8900</span>
            </div>
            <div className="hidden md:flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              <span>Free delivery within 5 miles</span>
            </div>
          </div>
          <div className="text-sm">
            <span>Mon-Sat: 8AM-10PM | Sun: 9AM-8PM</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xl">Rx</span>
                </div>
                <span className="text-2xl font-bold text-gray-800">MediCare</span>
              </div>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link to="/" className={getLinkClass('/')}>Home</Link>
                <Link to="/all-products" className={getLinkClass('/all-products')}>Products</Link>
                <Link to="/cart" className={getLinkClass('/cart')}>Cart</Link>
                <a href="#services" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm transition-colors">Services</a>
                <a href="#about" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm transition-colors">About Us</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm transition-colors">Contact</a>
              </div>
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {currentUser ? (
                <>
                  <span className="text-gray-700 text-sm">Welcome, {currentUser.username}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 text-sm transition-colors">
                  <User className="w-4 h-4 mr-1" />
                  Login
                </Link>
              )}
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm">
                Upload Prescription
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 text-blue-600 font-semibold text-base">Home</Link>
              <Link to="/all-products" className="block px-3 py-2 text-gray-700 text-base hover:text-blue-600">Products</Link>
              <Link to="/cart" className="block px-3 py-2 text-gray-700 text-base hover:text-blue-600">Cart</Link>
              <a href="#services" className="block px-3 py-2 text-gray-700 text-base hover:text-blue-600">Services</a>
              <a href="#about" className="block px-3 py-2 text-gray-700 text-base hover:text-blue-600">About Us</a>
              <a href="#contact" className="block px-3 py-2 text-gray-700 text-base hover:text-blue-600">Contact</a>
              <div className="px-3 py-2">
                {currentUser ? (
                  <>
                    <span className="block px-3 py-2 text-gray-700 text-base">Welcome, {currentUser.username}</span>
                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors text-base"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="w-full flex items-center justify-center text-gray-700 px-3 py-2 text-base mb-2 border border-gray-300 rounded-lg">
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Link>
                )}
                <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                Upload Prescription
              </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;

