"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getApiBase } from "./apiBase";
import { getToken, getTokenPayload } from "./auth";

const CartContext = createContext(null);

const loadCartSafe = () => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("cart");
    return raw ? JSON.parse(raw) : [];
  } catch {
    localStorage.setItem("cart", "[]");
    return [];
  }
};

const calcCount = (items) =>
  items.reduce((sum, x) => sum + (x.quantity || 0), 0);

export function CartProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // 1️⃣ Load user from token once
  useEffect(() => {
    const payload = getTokenPayload();
    setUser(payload || null);
  }, []);

  // 2️⃣ Load local cart immediately on first mount
  useEffect(() => {
    const local = loadCartSafe();
    setCartItems(local);
    setCartCount(calcCount(local));
  }, []);

  // 3️⃣ If logged in → ALWAYS load cart from DB (NO MERGE)
  useEffect(() => {
    if (!user) return;

    const loadDBCart = async () => {
      try {
        const res = await fetch(`${getApiBase()}/api/cart`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });

        const dbCart = await res.json();
        const items = Array.isArray(dbCart) ? dbCart : [];

        setCartItems(items);
        setCartCount(calcCount(items));
        localStorage.setItem("cart", JSON.stringify(items));

      } catch (err) {
        console.error("❌ Failed to load DB cart:", err);
      }
    };

    loadDBCart();
  }, [user]);

  // 4️⃣ Global update function
  const updateCartGlobal = async (newCart) => {
    setCartItems(newCart);
    setCartCount(calcCount(newCart));
    localStorage.setItem("cart", JSON.stringify(newCart));

    if (user) {
      try {
        await fetch(`${getApiBase()}/api/cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({ items: newCart }),
        });
      } catch (err) {
        console.error("❌ Failed to sync cart to DB:", err);
      }
    }
  };

  const clearCart = async () => {
    await updateCartGlobal([]);
  };

  return (
    <CartContext.Provider
      value={{
        user,
        setUser,
        cartItems,
        cartCount,
        updateCartGlobal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
