import React from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';

const Products = () => {
  const categories = [
    {
      name: "Prescription Medicines",
      description: "Doctor prescribed medications",
      image: "https://agewellmedical.com/wp-content/uploads/doctor-writing-a-prescription.jpg",
      color: "bg-blue-100 text-blue-600"
    },
    {
      name: "Over-the-Counter",
      description: "Self-medication solutions",
      image: "https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg",
      color: "bg-green-100 text-green-600"
    },
    {
      name: "Health Supplements",
      description: "Vitamins and wellness products",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg",
      color: "bg-purple-100 text-purple-600"
    },
    {
      name: "Personal Care",
      description: "Beauty and hygiene products",
      image: "https://t4.ftcdn.net/jpg/02/99/06/03/360_F_299060393_2kkwSCSx36oUXfrdEDrYkP2PlDAteMHW.jpg",
      color: "bg-pink-100 text-pink-600"
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      category: "Pain Relief",
      price: 12.99,
      originalPrice: 15.99,
      image: "https://images.pexels.com/photos/3683081/pexels-photo-3683081.jpeg",
      rating: 4.8,
      reviews: 324,
      inStock: true
    },
    {
      id: 2,
      name: "Vitamin D3 Capsules",
      category: "Supplements",
      price: 24.99,
      originalPrice: 29.99,
      image: "https://idsb.tmgrup.com.tr/ly/uploads/images/2020/04/03/28587.jpg",
      rating: 4.9,
      reviews: 189,
      inStock: true
    },
    {
      id: 3,
      name: "Digital Thermometer",
      category: "Medical Devices",
      price: 18.99,
      originalPrice: 22.99,
      image: "https://images.pexels.com/photos/3786164/pexels-photo-3786164.jpeg",
      rating: 4.7,
      reviews: 245,
      inStock: false
    },
    {
      id: 4,
      name: "Hand Sanitizer 250ml",
      category: "Personal Care",
      price: 8.99,
      originalPrice: 10.99,
      image: "https://cdn.todaysrdh.com/wp-content/uploads/2024/04/hand-hygiene-rdh.jpg?strip=all&lossy=1&ssl=1",
      rating: 4.6,
      reviews: 456,
      inStock: true
    }
  ];

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Product Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find everything you need for your health and wellness from our extensive 
            collection of medicines and healthcare products.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group cursor-pointer transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-6">
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 ${category.color}`}>
                    {category.name}
                  </div>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Products */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              Featured Products
            </h3>
            <button className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
              View All Products →
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-semibold">Out of Stock</span>
                    </div>
                  )}
                  <button className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors">
                    <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="text-sm text-blue-600 font-semibold mb-1">
                    {product.category}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {product.name}
                  </h4>

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-green-600">
                        ${product.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    disabled={!product.inStock}
                    className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all ${
                      product.inStock
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;