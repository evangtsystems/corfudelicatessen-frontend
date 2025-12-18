"use client";

import { useEffect, useState } from "react";
import { getApiBase } from "../../src/lib/apiBase";
import { getToken } from "../../src/lib/auth";
import { useCart } from "../../src/lib/cartContext";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(null);

  const { cartItems, updateCartGlobal } = useCart();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetch(`${getApiBase()}/api/orders/mine`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => r.json())
      .then((d) => {
        setOrders(d.orders || []);
        setLoading(false);
      });
  }, []);

  const handleReorder = (order) => {
    const merged = [...cartItems];

    order.items.forEach((item) => {
      const existing = merged.find(
        (i) => i.productId === item.productId
      );

      if (existing) {
        existing.quantity += item.quantity;
      } else {
        merged.push({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        });
      }
    });

    updateCartGlobal(merged);
    window.dispatchEvent(new Event("open-cart"));

  };

  if (loading) {
    return <p style={{ padding: 40 }}>Loading orders…</p>;
  }

  return (
    <div
      style={{
        background: "#f4f6f8",
        minHeight: "100vh",
        padding: 20,
      }}
    >
      <h1 style={{ marginBottom: 20 }}>🧾 Οι παραγγελίες μου</h1>

      {orders.length === 0 && (
        <p>Δεν έχετε πραγματοποιήσει κάποια παραγγελία.</p>
      )}

      {/* ORDER LIST */}
      {orders.map((o) => {
        const statusMap = {
          pending: {
            label: "Υπό επιβεβαίωση",
            bg: "#fff2cc",
            text: "#8a6d00",
          },
          completed: {
            label: "Ολοκληρώθηκε",
            bg: "#e9f7ef",
            text: "#1e7f43",
          },
          cancelled: {
            label: "Ακυρώθηκε",
            bg: "#fdeaea",
            text: "#a61d24",
          },
        };

        const s = statusMap[o.status];

        return (
          <div
            key={o._id}
            onClick={() => setActive(o)}
            style={{
              background: "#f8f9fa",
              borderRadius: 14,
              padding: "18px 20px",
              marginBottom: 14,
              boxShadow: "0 8px 22px rgba(0,0,0,0.08)",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 16 }}>
                Παραγγελία #{o._id.slice(-6)}
              </div>

              <div
                style={{
                  padding: "6px 12px",
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 700,
                  background: s.bg,
                  color: s.text,
                }}
              >
                {s.label}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 15,
              }}
            >
              <span>Σύνολο</span>
              <strong>{o.total.toFixed(2)} €</strong>
            </div>
          </div>
        );
      })}

      {/* 🔥 MODAL — EXACT ADMIN STYLE + REORDER */}
      {active && (
        <div
          onClick={() => setActive(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: 14,
              width: "520px",
              maxWidth: "92vw",
              padding: 24,
              boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            {/* Header */}
            <h2 style={{ margin: 0, marginBottom: 6 }}>
              📦 Order details
            </h2>

            <div style={{ fontSize: 14, color: "#666", marginBottom: 14 }}>
              <div>
                <b>Order ID:</b> {active._id}
              </div>

              <div>
                <b>Status:</b>{" "}
                {active.status === "pending"
                  ? "Υπό επιβεβαίωση"
                  : active.status === "completed"
                  ? "Ολοκληρώθηκε"
                  : "Ακυρώθηκε"}
              </div>
            </div>

            {/* Items */}
            <div
              style={{
                border: "1px solid #eee",
                borderRadius: 10,
                overflow: "hidden",
                marginBottom: 16,
              }}
            >
              {active.items.map((i) => (
                <div
                  key={i.productId}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    borderBottom: "1px solid #eee",
                    fontSize: 14,
                  }}
                >
                  <div>
                    <b>{i.name}</b>
                    <div style={{ fontSize: 12, color: "#666" }}>
                      Qty: {i.quantity}
                    </div>
                  </div>

                  <div style={{ fontWeight: "bold" }}>
                    {(i.price * i.quantity).toFixed(2)} €
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 18,
              }}
            >
              <span>Total</span>
              <span>{active.total.toFixed(2)} €</span>
            </div>

            {/* Footer */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <button
               onClick={() => {
  setActive(null);          // 🔥 close modal first
  handleReorder(active);   // then open cart
}}

                style={{
                  padding: "8px 14px",
                  borderRadius: 8,
                  border: "1px solid #d1b76e",
                  background: "#fff",
                  color: "#1f3b2e",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                🔁 Reorder
              </button>

              <button
                onClick={() => setActive(null)}
                style={{
                  padding: "8px 14px",
                  borderRadius: 8,
                  border: "none",
                  background: "#1f3b2e",
                  color: "#fff",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
