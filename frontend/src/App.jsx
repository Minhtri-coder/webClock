import "./App.css";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router";
import ListProductPage from "./pages/ListProductPage";
import ProductDetails from "./pages/ProductDetails";
import { CartProvider } from "./pages/Cartcontext";
import CartPage from "./pages/CartPage";
function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ListProductPage />} />
          <Route path="/productDetails" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
