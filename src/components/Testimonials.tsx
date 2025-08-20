import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Regular Customer",
      image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg",
      rating: 5,
      text: "MediCare has been a lifesaver for me. Their delivery service is incredibly reliable, and I never have to worry about running out of my medications. The pharmacists are knowledgeable and always available to answer questions."
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Healthcare Professional",
      image: "https://images.pexels.com/photos/3786164/pexels-photo-3786164.jpeg",
      rating: 5,
      text: "As a doctor, I recommend MediCare to my patients with confidence. Their commitment to quality and patient safety is outstanding. The prescription verification process is thorough and professional."
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Senior Citizen",
      image: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg",
      rating: 5,
      text: "The convenience of having medications delivered to my door is incredible. The customer service team is patient and helpful, especially when I have questions about my prescriptions. Highly recommended!"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Family Man",
      image: "https://images.pexels.com/photos/3778966/pexels-photo-3778966.jpeg",
      rating: 5,
      text: "MediCare makes managing my family's health needs so much easier. From prescription refills to over-the-counter medications, everything is available in one place with great prices and fast delivery."
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers 
            have to say about their experience with MediCare.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative">
            {/* Quote Icon */}
            <Quote className="w-12 h-12 text-blue-600 opacity-20 absolute top-6 left-6" />
            
            <div className="relative z-10">
              {/* Rating */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg md:text-xl text-gray-700 text-center mb-8 leading-relaxed italic">
                "{testimonials[currentIndex].text}"
              </blockquote>

              {/* Customer Info */}
              <div className="flex items-center justify-center space-x-4">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="text-center">
                  <h4 className="text-lg font-bold text-gray-900">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-gray-600">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">50,000+</div>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
            <p className="text-gray-600">Delivery Success</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">4.9/5</div>
            <p className="text-gray-600">Customer Rating</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">24/7</div>
            <p className="text-gray-600">Support Available</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;