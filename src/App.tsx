

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Authpage from './components/Authpage';
import { Routes, Route } from 'react-router-dom';
import Products from './components/Products';
import AllProducts from './components/AllProducts';
import Cart from './components/Cart';
import CheckoutPage from './components/CheckoutPage';
import InvoicePage from './components/InvoicePage';
import AddProduct from './components/AddProduct';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Authpage />} />
        <Route path='/products' element={<Products/>} />
        <Route path='/all-products' element={<AllProducts/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/checkout' element={<CheckoutPage/>} />
        <Route path='/invoice/:orderId' element={<InvoicePage/>} />
        <Route path='/add-product' element={<AddProduct/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
