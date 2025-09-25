import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { useNavigate } from 'react-router-dom';
import { getCart } from '../services/CartService'; // Assuming this service exists and works

const stripePromise = loadStripe('pk_test_51S2mucBaBNeAZ5bSbCWlkr3jkHn3C1zxNWASrDpoOWqcVgg5w9wQGW1xrm24mGoNKpvTL1yzAu9ZWxN7wNJd7x5b00sujR09kg');

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

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await getCart();
        setCart(cartData);
      } catch (error) {
        console.error('Error fetching cart:', error);
        // Optionally, redirect or show an error message
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleSuccessfulCheckout = async (paymentMethodId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/payment/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ paymentMethodId }),
      });

      if (response.ok) {
        const order = await response.json();
        navigate(`/invoice/${order.id}`);
      } else {
        console.error('Payment failed');
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred during checkout:', error);
      alert('An error occurred. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center p-10">Loading your cart...</div>;
  }

  if (!cart || cart.items.length === 0) {
    return <div className="text-center p-10">Your cart is empty. Add items to proceed to checkout.</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left Column: Payment Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Payment Details</h2>
            <Elements stripe={stripePromise}>
              <CheckoutForm 
                onSuccessfulCheckout={handleSuccessfulCheckout} 
                amount={cart.totalPrice} 
              />
            </Elements>
          </div>

          {/* Right Column: Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
            <div className="space-y-4">
              {cart.items.map((item: CartItem) => (
                <div key={item.productId} className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{item.productName}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">${(item.productPrice * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <hr className="my-6" />
            <div className="flex justify-between font-bold text-xl">
              <p>Total</p>
              <p>${cart.totalPrice.toFixed(2)}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
