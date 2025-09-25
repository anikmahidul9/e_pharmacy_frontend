import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { useState } from 'react';

const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

interface CheckoutFormProps {
  onSuccessfulCheckout: (paymentMethodId: string) => void;
  amount: number;
}

const CheckoutForm = ({ onSuccessfulCheckout, amount }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [name, setName] = useState('');
  const [zip, setZip] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

    if (!cardNumberElement) {
      setError("Card number element not found");
      setProcessing(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardNumberElement,
      billing_details: {
        name: name,
        address: {
          postal_code: zip,
        },
      },
    });

    if (error) {
      setError(error.message || "An unexpected error occurred");
      setProcessing(false);
    } else {
      setError(null);
      onSuccessfulCheckout(paymentMethod.id);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name on Card</label>
        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm" required />
      </div>

      <div>
        <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">Card Number</label>
        <div className="mt-1 p-3 border border-gray-300 rounded-md shadow-sm bg-white">
          <CardNumberElement id="card-number" options={ELEMENT_OPTIONS} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700">Expiry Date</label>
          <div className="mt-1 p-3 border border-gray-300 rounded-md shadow-sm bg-white">
            <CardExpiryElement id="expiry-date" options={ELEMENT_OPTIONS} />
          </div>
        </div>
        <div className="md:col-span-1">
          <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">CVC</label>
          <div className="mt-1 p-3 border border-gray-300 rounded-md shadow-sm bg-white">
            <CardCvcElement id="cvc" options={ELEMENT_OPTIONS} />
          </div>
        </div>
        <div className="md:col-span-1">
          <label htmlFor="zip" className="block text-sm font-medium text-gray-700">ZIP Code</label>
          <input id="zip" type="text" value={zip} onChange={(e) => setZip(e.target.value)} placeholder="94110" className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm" required />
        </div>
      </div>

      {error && <div className="text-red-600 text-sm text-center my-2">{error}</div>}

      <button type="submit" disabled={!stripe || processing} className="w-full flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 disabled:bg-gray-400">
        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        {processing ? 'Processing...' : `Pay ${amount.toFixed(2)}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
