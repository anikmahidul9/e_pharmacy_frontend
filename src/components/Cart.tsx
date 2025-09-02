import React, { useEffect, useState } from 'react';
import { getCart, removeFromCart, clearCart } from '../services/CartService';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  productPrice: number;
  productImage: string;
}

interface Cart {
  items: CartItem[];
  totalPrice: number;
}

const Cart = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await getCart();
        console.log(cartData);
        setCart(cartData);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  const handleRemoveFromCart = async (productId: string) => {
    try {
      const updatedCart = await removeFromCart(productId);
      setCart(updatedCart);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      setCart(null);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-5">Your Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5">Your Cart</h1>
      <div className="flex flex-col">
        {cart.items.map((item) => (
          <div key={item.productId} className="flex items-center border-b py-4">
            <img src={item.productImage} alt={item.productName} className="w-20 h-20 object-cover rounded-md mr-4" />
            <div className="flex-grow">
              <h2 className="text-xl font-semibold">{item.productName}</h2>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.productPrice.toFixed(2)}</p>
            </div>
            <div className="flex items-center">
              <p className="text-lg font-semibold mr-4">${(item.productPrice * item.quantity).toFixed(2)}</p>
              <button
                onClick={() => handleRemoveFromCart(item.productId)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-end items-center mt-5">
          <p className="text-2xl font-bold">Total: ${cart.totalPrice.toFixed(2)}</p>
          <button
            onClick={handleClearCart}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg ml-4"
          >
            Clear Cart
          </button>
          <button
            onClick={() => navigate('/checkout')}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg ml-4"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
