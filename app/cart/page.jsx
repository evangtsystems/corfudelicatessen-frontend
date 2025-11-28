"use client";

import { useCart } from "../../src/lib/cartContext";

export default function CartPage() {
  const { cartItems, updateCartGlobal, user } = useCart();

  const updateQty = async (id, qty) => {
    const updated = cartItems.map((i) =>
      i.productId === id ? { ...i, quantity: qty } : i
    );
    await updateCartGlobal(updated);
  };

  const removeItem = async (id) => {
    const updated = cartItems.filter((i) => i.productId !== id);
    await updateCartGlobal(updated);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * parseFloat(item.price || 0),
    0
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>Your Cart</h1>

      {cartItems.length === 0 && <p>Your cart is empty.</p>}

      {cartItems.map((item) => (
        <div
          key={item.productId}
          style={{
            background: "#fff",
            padding: 15,
            borderRadius: 8,
            marginBottom: 10,
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
          }}
        >
          <h3>{item.name}</h3>
          <p>Price: {item.price} €</p>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button onClick={() => updateQty(item.productId, Math.max(1, item.quantity - 1))}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQty(item.productId, item.quantity + 1)}>+</button>

            <button
              onClick={() => removeItem(item.productId)}
              style={{
                marginLeft: "auto",
                padding: "6px 12px",
                background: "red",
                color: "#fff",
                borderRadius: 6
              }}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {cartItems.length > 0 && (
        <div
          style={{
            marginTop: 20,
            padding: 15,
            background: "#fafafa",
            borderRadius: 8,
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
          }}
        >
          <h2>Total: {total.toFixed(2)} €</h2>
        </div>
      )}
    </div>
  );
}
