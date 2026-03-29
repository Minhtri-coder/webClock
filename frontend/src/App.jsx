import "./App.css";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router";
import ListProductPage from "./pages/ListProductPage";
import ProductDetails from "./pages/ProductDetails";
import { CartProvider } from "./pages/Cartcontext";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import SuccessPage from "./pages/SuccessPage";
import AdminPage from "./pages/AdminPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import PrivateRoute from "./components/ui/PrivateRoute";
import Product from "./pages/pageAdmins/Products";
import Dashboard from "./pages/Dashboard";
import Order from "./pages/pageAdmins/Orders";
import AdminProductCreate from "./pages/pageAdmins/AdminProductCreate";
import AdminProductUpdate from "./pages/pageAdmins/AdminProductUpdate";
import AdminDetailsProduct from "./pages/pageAdmins/AdminDetailsProduct";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ListProductPage />} />
          <Route path="/productDetails" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/success" element={<SuccessPage />} />

          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminPage />
              </PrivateRoute>
            }
          >
            <Route path="listproduct" element={<Product />} />
            <Route index element={<Dashboard />} />
            <Route path="order" element={<Order />} />
            <Route path="products/create" element={<AdminProductCreate />} />
            <Route path="products/update" element={<AdminProductUpdate />} />
            <Route path="products/details" element={<AdminDetailsProduct />} />
          </Route>
          <Route path="/admin/login" element={<AdminLoginPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
