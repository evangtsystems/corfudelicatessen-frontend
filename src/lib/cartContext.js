"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getApiBase } from "./apiBase";
import { getToken, getTokenPayload } from "./auth";

const CartContext = createContext(null);

// -----------------------
// SAFE LOCAL LOAD
// -----------------------
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

  // --- prevents race conditions ---
  const isUpdating = useRef(false);
  const updateQueue = useRef([]);
  const lastSyncedCart = useRef(null);
  const debounceTimer = useRef(null);

  // -----------------------------------------
  // 1️⃣ Load user from token once
  // -----------------------------------------
  useEffect(() => {
    setUser(getTokenPayload() || null);
  }, []);

  // -----------------------------------------
  // 2️⃣ Load local cart immediately
  // -----------------------------------------
  useEffect(() => {
    const local = loadCartSafe();
    setCartItems(local);
    setCartCount(calcCount(local));
    lastSyncedCart.current = JSON.stringify(local);
  }, []);

  // -----------------------------------------
  // 3️⃣ Multi-TAB sync
  // -----------------------------------------
  useEffect(() => {
    const sync = (e) => {
      if (e.key === "cart") {
        try {
          const updated = JSON.parse(e.newValue || "[]");
          setCartItems(updated);
          setCartCount(calcCount(updated));
        } catch {}
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  // -----------------------------------------
  // 4️⃣ When user logs in → load DB cart ALWAYS
  // -----------------------------------------
  useEffect(() => {
    if (!user) return;

    const loadDBCart = async () => {
      try {
        const res = await fetch(`${getApiBase()}/api/cart`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        const dbCart = await res.json();
        const items = Array.isArray(dbCart) ? dbCart : [];

        lastSyncedCart.current = JSON.stringify(items);
        setCartItems(items);
        setCartCount(calcCount(items));
        localStorage.setItem("cart", JSON.stringify(items));
      } catch (err) {
        console.error("❌ Failed to load DB cart:", err);
      }
    };

    loadDBCart();
  }, [user]);

  // -----------------------------------------
  // 5️⃣ Safe Atomic Cart Update (race-proof)
  // -----------------------------------------
  const processQueue = async () => {
    if (isUpdating.current) return;
    isUpdating.current = true;

    while (updateQueue.current.length > 0) {
      const nextCart = updateQueue.current.shift();
      await performCartUpdate(nextCart);
    }

    isUpdating.current = false;
  };

  const performCartUpdate = async (newCart) => {
    // update UI
    setCartItems(newCart);
    setCartCount(calcCount(newCart));
    localStorage.setItem("cart", JSON.stringify(newCart));

    // skip backend if not logged in
    if (!user) return;

    // debounce backend sync → reduce load
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(async () => {
      try {
        await fetch(`${getApiBase()}/api/cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({ items: newCart }),
        });

        lastSyncedCart.current = JSON.stringify(newCart);
      } catch (err) {
        console.error("❌ Failed to sync cart to DB:", err);
      }
    }, 200); // 200ms = fast but safe
  };

  const updateCartGlobal = async (newCart) => {
    updateQueue.current.push(newCart);
    await processQueue();
  };

  const clearCart = async () => updateCartGlobal([]);

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
