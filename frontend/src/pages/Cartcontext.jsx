import React, { createContext, useEffect, useState } from "react";

export const Cartcontext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [errorId, setErrorId] = useState(null);
  const SHIPPING_FEE = 30000;

  useEffect(() => {
    const stored = localStorage.getItem("cart");

    if (stored) {
      try {
        setCartItems(JSON.parse(stored));
      } catch (error) {
        setCartItems([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItem));
  }, [cartItem]);

  const addToCart = (product, quantity = 1) => {
    if (product.countInStock === 0) {
      setErrorMsg("Sản phẩm đã hết hàng.");
      return true; // trả true để báo lỗi
    }
    let isExist = false;

    setCartItems((prev) => {
      const exist = prev.find((item) => item._id === product._id);
      if (exist) {
        isExist = true;
        setErrorMsg("Sản phẩm đã có trong giỏ hàng.");
        return prev;
      }
      return [...prev, { ...product, quantity }];
    });
    return isExist;
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity - 1 } // giảm số
          : item,
      ),
    );

    // Lấy sản phẩm mới và kiểm tra quantity
    const item = cartItem.find((i) => i._id === id);
    if (item && item.quantity === 1) {
      // nếu giảm về 0, chờ 2 giây rồi xoá
      setTimeout(() => {
        setCartItems((prev) => prev.filter((i) => i._id !== id));
      }, 2000);
    }
  };
  const totalItems = cartItem.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItem.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const totalprice = subtotal + SHIPPING_FEE;

  return (
    <Cartcontext.Provider
      value={{
        cartItem,
        addToCart,
        totalItems,
        subtotal,
        setIsOpen,
        isOpen,
        removeFromCart,
        errorMsg,
        setErrorId,
        errorId,
        decreaseQty,
        setCartItems,
        totalprice,
        SHIPPING_FEE,
      }}
    >
      {children}
    </Cartcontext.Provider>
  );
};
