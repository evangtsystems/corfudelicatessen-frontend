"use client";

import { useState } from "react";
import { useCart } from "../../src/lib/cartContext";
import { getApiBase } from "../../src/lib/apiBase";
import { getToken } from "../../src/lib/auth";

export default function CheckoutPage() {
  const { cartItems, cartCount, clearCart } = useCart();
  const [msg, setMsg] = useState("");

  const placeOrder = async () => {
    const token = getToken();
    if (!token) {
      setMsg("Please login first.");
      return;
    }

    if (cartItems.length === 0) {
      setMsg("Your cart is empty.");
      return;
    }

    try {
      const res = await fetch(`${getApiBase()}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items: cartItems }),
      });

      const data = await res.json();

      if (data.success) {
        // ✅ CRITICAL: await FULL cart clear (state + storage + DB)
        await clearCart();

        // ✅ close floating cart if open
        window.dispatchEvent(new Event("close-cart"));

        // ✅ redirect only AFTER cart is fully cleared
        window.location.href = `/order-success?orderId=${data.orderId || ""}`;
      } else {
        setMsg("❌ Failed to place order");
      }
    } catch (err) {
      console.error(err);
      setMsg("❌ Network error");
    }
  };

  const total = cartItems.reduce(
    (sum, i) => sum + i.quantity * parseFloat(i.price || 0),
    0
  );

  return (
    <div
      style={{
        background: "#fff",
        padding: 20,
        borderRadius: 12,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        maxWidth: 600,
        margin: "40px auto",
      }}
    >
      <h1 style={{ color: "#1f3b2e", marginTop: 0 }}>
        Checkout ({cartCount})
      </h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((i) => (
            <div
              key={i.productId}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              <div>
                {i.name} × {i.quantity}
              </div>
              <div>
                {(parseFloat(i.price) * i.quantity).toFixed(2)} €
              </div>
            </div>
          ))}

          <div
            style={{
              borderTop: "1px solid #eee",
              marginTop: 12,
              paddingTop: 12,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <strong>Total</strong>
            <strong>{total.toFixed(2)} €</strong>
          </div>

          <button
            onClick={placeOrder}
            style={{
              marginTop: 16,
              padding: "12px 16px",
              border: "none",
              borderRadius: 8,
              background: "#d1b76e",
              color: "#1f3b2e",
              fontWeight: "bold",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Place order
          </button>

          {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
        </>
      )}
    </div>
  );
}
