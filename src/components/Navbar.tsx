import React, { useState } from 'react';
import { Menu, X, Phone, MapPin } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
                <a href="#home" className="text-blue-600 font-semibold px-3 py-2 text-sm">Home</a>
                <a href="#products" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm transition-colors">Products</a>
                <a href="#services" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm transition-colors">Services</a>
                <a href="#about" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm transition-colors">About Us</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm transition-colors">Contact</a>
              </div>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
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
              <a href="#home" className="block px-3 py-2 text-blue-600 font-semibold text-base">Home</a>
              <a href="#products" className="block px-3 py-2 text-gray-700 text-base hover:text-blue-600">Products</a>
              <a href="#services" className="block px-3 py-2 text-gray-700 text-base hover:text-blue-600">Services</a>
              <a href="#about" className="block px-3 py-2 text-gray-700 text-base hover:text-blue-600">About Us</a>
              <a href="#contact" className="block px-3 py-2 text-gray-700 text-base hover:text-blue-600">Contact</a>
              <div className="px-3 py-2">
                <button className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
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