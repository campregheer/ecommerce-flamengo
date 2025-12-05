import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Product from "./pages/product";
import CartPage from "./pages/cart";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produto/:id" element={<Product />} />
        <Route path="/carrinho" element={<CartPage />} />
      </Routes>
    <ToastContainer />
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;
