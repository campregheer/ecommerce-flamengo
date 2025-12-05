import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Product from "./pages/product";
import CartPage from "./pages/cart";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from 'react-toastify';
import Payment from "./pages/payment";
import 'react-toastify/dist/ReactToastify.css';
import Erro from "./pages/erro/erro";


function App() {

  return (
    <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produto/:id" element={<Product />} />
        <Route path="/carrinho" element={<CartPage />} />
        <Route path="/pagamento" element={<Payment />} />
        <Route path="*" element={<Erro />} />
      </Routes>
    <ToastContainer />
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;
