import React from 'react';
import { ShieldCheck, Truck, Clock, Award } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="bg-gradient-to-br from-blue-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Health, Our
                <span className="text-blue-600 block">Priority</span>
              </h1>
              <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                Get your medications delivered safely to your doorstep. Licensed pharmacists, 
                genuine medicines, and 24/7 support for all your healthcare needs.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105">
                Order Medicines
              </button>
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all">
                Consult Doctor
              </button>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              <div className="text-center">
                <ShieldCheck className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-700">FDA Approved</p>
              </div>
              <div className="text-center">
                <Truck className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-700">Free Delivery</p>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-700">24/7 Support</p>
              </div>
              <div className="text-center">
                <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-700">Licensed</p>
              </div>
            </div>
          </div>

          {/* Right content - Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://t4.ftcdn.net/jpg/02/57/02/39/360_F_257023906_UumIgLi6ECSyIGuWVNpuHLYPc3jZuiaE.jpg"
                alt="Pharmacist helping customer"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-200 rounded-full opacity-50"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-green-200 rounded-full opacity-50"></div>
            
            {/* Floating card */}
            <div className="absolute -bottom-8 left-8 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">100% Genuine</p>
                  <p className="text-sm text-gray-600">Verified Medicines</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;