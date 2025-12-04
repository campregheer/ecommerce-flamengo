import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Product from "./pages/product";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produto/:id" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
