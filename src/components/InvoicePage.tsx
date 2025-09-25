import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  productImage: string;
}

interface Order {
  id: string;
  userId: string;
  createdAt: string;
  status: string;
  items: OrderItem[];
  totalPrice: number;
}

// This would typically be in a service file
const getOrderDetails = async (orderId: string, token: string | null) => {
  if (!token) {
    throw new Error('Authentication token not found');
  }
  const response = await fetch(`/api/orders/${orderId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch order details');
  }
  return response.json();
};

const InvoicePage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const invoiceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem('token');
        if (orderId) {
          const orderDetails = await getOrderDetails(orderId, token);
          setOrder(orderDetails);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const downloadPdf = () => {
    const input = invoiceRef.current;
    if (!input) {
      console.error("Invoice ref is null, cannot download PDF.");
      return;
    }

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight(); // Keep this if it's used elsewhere or for calculation
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / canvasHeight;
      const width = pdfWidth;
      const height = width / ratio;

      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save(`invoice-${orderId}.pdf`);
    });
  };

  if (loading) return <div className="text-center p-10">Loading invoice...</div>;
  if (error) return <div className="text-center p-10 text-red-500">Error: {error}</div>;
  if (!order) return <div className="text-center p-10">Order not found.</div>;

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div ref={invoiceRef} className="bg-white shadow-lg rounded-lg p-8 sm:p-12 mb-8">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800">Invoice</h1>
            <div className="text-right">
              <p className="text-lg font-semibold">Pharmaci Inc.</p>
              <p className="text-sm text-gray-500">123 Health St, Wellness City</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-10 text-sm">
            <div>
              <p className="font-semibold text-gray-700 mb-1">Billed To</p>
              <p className="text-gray-600">User ID: {order.userId}</p> {/* Replace with user name if available */}
            </div>
            <div className="text-right">
              <p><span className="font-semibold text-gray-700">Order ID:</span> {order.id}</p>
              <p><span className="font-semibold text-gray-700">Order Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
              <p><span className="font-semibold text-gray-700">Status:</span> <span className="font-bold text-green-600">{order.status}</span></p>
            </div>
          </div>

          <table className="w-full text-left table-auto mb-10">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-sm font-bold text-gray-600 uppercase">Product</th>
                <th className="px-6 py-3 text-sm font-bold text-gray-600 uppercase text-center">Quantity</th>
                <th className="px-6 py-3 text-sm font-bold text-gray-600 uppercase text-right">Price</th>
                <th className="px-6 py-3 text-sm font-bold text-gray-600 uppercase text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item: OrderItem) => (
                <tr key={item.productId} className="border-b">
                  <td className="px-6 py-4 flex items-center">
                    <img src={item.productImage} alt={item.productName} className="w-16 h-16 object-cover rounded-md mr-4" />
                    <span className="font-semibold">{item.productName}</span>
                  </td>
                  <td className="px-6 py-4 text-center">{item.quantity}</td>
                  <td className="px-6 py-4 text-right">${item.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right font-semibold">${(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end">
            <div className="w-full md:w-1/3">
              <div className="flex justify-between text-lg font-semibold">
                <p className="text-gray-700">Subtotal</p>
                <p>${order.totalPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-lg font-semibold mt-2">
                <p className="text-gray-700">Tax (0%)</p>
                <p>$0.00</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between text-2xl font-bold text-gray-800">
                <p>Total</p>
                <p>${order.totalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <button onClick={downloadPdf} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
