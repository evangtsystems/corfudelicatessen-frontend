"use client";
import { useEffect, useState } from "react";
import { getApiBase } from "../../../src/lib/apiBase";
import { getToken } from "../../../src/lib/auth";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    fetch(`${getApiBase()}/api/orders`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((r) => r.json())
      .then((d) => setOrders(d.orders || []));
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`${getApiBase()}/api/orders/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ status }),
    });

    setOrders((o) =>
      o.map((x) => (x._id === id ? { ...x, status } : x))
    );
    setActive((a) => (a ? { ...a, status } : a));
  };

  const resendEmail = async (id) => {
    await fetch(`${getApiBase()}/api/orders/${id}/resend`, {
      method: "POST",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    alert("Email sent");
  };

  return (
    <div style={{ padding: 20, background: "#f4f6f8", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: 20 }}>📦 Παραγγελίες</h1>

     {orders.map((o) => {
  const statusMap = {
    pending: {
      label: "Υπό επιβεβαίωση",
      bg: "#fff2cc",
      text: "#8a6d00",
      bar: "#e0b400",
    },
    completed: {
      label: "Ολοκληρώθηκε",
      bg: "#e9f7ef",
      text: "#1e7f43",
      bar: "#2ecc71",
    },
    cancelled: {
      label: "Ακυρώθηκε",
      bg: "#fdeaea",
      text: "#a61d24",
      bar: "#e74c3c",
    },
  };

  const s = statusMap[o.status];

  return (
    <div
      key={o._id}
      onClick={() => setActive(o)}
      style={{
        display: "flex",
        background: "#fdfdfd",              // ❗ NOT pure white
        borderRadius: 16,
        marginBottom: 14,
        cursor: "pointer",
        boxShadow: "0 8px 22px rgba(0,0,0,0.08)",
        overflow: "hidden",
      }}
    >
      {/* STATUS BAR */}
      <div
        style={{
          width: 8,
          background: s.bar,
        }}
      />

      {/* CONTENT */}
      <div
        style={{
          flex: 1,
          padding: "18px 20px",              // ❗ more padding = calmer
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#f8f9fa",            // ❗ soft canvas
        }}
      >
        {/* LEFT */}
        <div>
          <div
            style={{
              fontSize: 18,                  // ❗ BIGGER PRIMARY TEXT
              fontWeight: 700,
              marginBottom: 6,
              color: "#1f2933",
            }}
          >
            {o.customer?.companyName ||
              o.customer?.email ||
              "Unknown customer"}
          </div>

          <div
            style={{
              fontSize: 15,                  // ❗ readable secondary
              color: "#4b5563",
              marginBottom: 6,
            }}
          >
            {o.customer?.email}
          </div>

          <div
            style={{
              fontSize: 13,
              color: "#6b7280",
            }}
          >
            Order #{o._id.slice(-6)} · Click to view details
          </div>
        </div>

        {/* RIGHT */}
        <div
          style={{
            textAlign: "right",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 10,
          }}
        >
          <div
            style={{
              fontSize: 20,                  // ❗ total must dominate
              fontWeight: 800,
              color: "#111827",
            }}
          >
            {o.total.toFixed(2)} €
          </div>

          <div
            style={{
              padding: "8px 14px",           // ❗ bigger pill
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
      </div>
    </div>
  );
})}




      {/* 🔥 MODAL */}
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
                <b>Customer:</b>{" "}
                {active.customer?.companyName ||
                  active.customer?.email}
              </div>
              <div>
                <b>Email:</b> {active.customer?.email}
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
                alignItems: "center",
                gap: 12,
              }}
            >
              <select
                value={active.status}
                onChange={(e) =>
                  updateStatus(active._id, e.target.value)
                }
                style={{
                  padding: "6px 10px",
                  borderRadius: 8,
                  border: "1px solid #ccc",
                  fontWeight: "bold",
                  background:
                    active.status === "completed"
                      ? "#e6f7ed"
                      : active.status === "cancelled"
                      ? "#fdeaea"
                      : "#fff8e1",
                }}
              >
                <option value="pending">🕒 Pending</option>
                <option value="completed">✅ Completed</option>
                <option value="cancelled">❌ Cancelled</option>
              </select>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => resendEmail(active._id)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    border: "1px solid #d1b76e",
                    background: "#fff",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  📧 Resend email
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
        </div>
      )}
    </div>
  );
}
