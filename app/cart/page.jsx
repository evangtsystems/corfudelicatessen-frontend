"use client";

import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const updateQty = (id, qty) => {
    const newCart = cart.map(item =>
      item.productId === id ? { ...item, quantity: qty } : item
    );
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeItem = (id) => {
    const newCart = cart.filter(item => item.productId !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.quantity * parseFloat(item.price || 0),
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "#1f3b2e" }}>Your Cart</h1>

      {cart.length === 0 && <p>Your cart is empty.</p>}

      {cart.map((item) => (
        <div
          key={item.productId}
          style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "10px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ margin: 0 }}>{item.name}</h3>
          <p>Price: {item.price} €</p>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              onClick={() => updateQty(item.productId, Math.max(1, item.quantity - 1))}
              style={{ padding: "6px 10px" }}
            >
              -
            </button>

            <span>{item.quantity}</span>

            <button
              onClick={() => updateQty(item.productId, item.quantity + 1)}
              style={{ padding: "6px 10px" }}
            >
              +
            </button>

            <button
              onClick={() => removeItem(item.productId)}
              style={{
                marginLeft: "auto",
                padding: "6px 12px",
                background: "red",
                color: "#fff",
                borderRadius: "6px",
              }}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            background: "#fafafa",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Total: {total.toFixed(2)} €</h2>
        </div>
      )}
    </div>
  );
}

