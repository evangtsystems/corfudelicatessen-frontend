"use client";

import { useEffect, useState } from "react";
import { getApiBase } from "../../src/lib/apiBase";
import { getToken } from "../../src/lib/auth";

export default function OrderSuccess({ searchParams }) {
  const orderId = searchParams?.orderId;
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!orderId) return;

    fetch(`${getApiBase()}/api/orders/mine`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((r) => r.json())
      .then((d) => {
        const found = d.orders?.find((o) => o._id === orderId);
        setOrder(found);
      });
  }, [orderId]);

  if (!order) {
    return (
      <p style={{ padding: 40, textAlign: "center" }}>
        Loading order...
      </p>
    );
  }

  return (
    <div
      style={{
        background: "#f4f6f8",
        minHeight: "100vh",
        padding: 20,
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: 14,
          padding: "22px 24px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          maxWidth: 520,
          margin: "60px auto",
          fontFamily: "system-ui, -apple-system, sans-serif",
          textAlign: "left",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 800 }}>
            🧾 Order received
          </div>

          <span
            style={{
              padding: "4px 12px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 700,
              background:
                order.status === "completed"
                  ? "#e6f7ed"
                  : order.status === "cancelled"
                  ? "#fdeaea"
                  : "#fff8e1",
              color:
                order.status === "completed"
                  ? "green"
                  : order.status === "cancelled"
                  ? "crimson"
                  : "#b8860b",
            }}
          >
            {order.status.toUpperCase()}
          </span>
        </div>

        {/* Email */}
        <div style={{ fontSize: 14, color: "#555", marginBottom: 10 }}>
          {order.customer?.email}
        </div>

        <div
          style={{
            height: 1,
            background: "#eee",
            margin: "16px 0",
          }}
        />

        {/* Total */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 14, color: "#666" }}>
            Σύνολο
          </span>

          <span
            style={{
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 0.3,
            }}
          >
            {order.total.toFixed(2)} €
          </span>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 24, textAlign: "center" }}>
          <a
            href="/shop"
            style={{
              padding: "10px 18px",
              background: "#d1b76e",
              color: "#1f3b2e",
              borderRadius: 8,
              textDecoration: "none",
              fontWeight: "bold",
              display: "inline-block",
            }}
          >
            Continue shopping
          </a>
        </div>
      </div>
    </div>
  );
}
