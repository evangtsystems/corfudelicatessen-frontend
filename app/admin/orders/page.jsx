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
      .then(r => r.json())
      .then(d => setOrders(d.orders || []));
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
    setOrders(o => o.map(x => x._id === id ? { ...x, status } : x));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📦 Παραγγελίες</h1>

      {orders.map(o => (
        <div
          key={o._id}
          onClick={() => setActive(o)}
          style={{
            padding: 14,
            marginBottom: 10,
            borderRadius: 8,
            background: "#fff",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <strong>{o.customer?.companyName || o.customer?.email || "Unknown customer"}</strong>
<div>{o.customer?.email || "—"}</div>

          <div>Σύνολο: {o.total.toFixed(2)} €</div>
          <div>Κατάσταση: <b>{o.status}</b></div>
        </div>
      ))}

      {/* 🔥 MODAL */}
      {active && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
          onClick={() => setActive(null)}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "#fff",
              padding: 20,
              borderRadius: 10,
              width: "90%",
              maxWidth: 600,
            }}
          >
            <h2>Order details</h2>

            {active.items.map(i => (
              <div key={i.productId}>
                {i.name} × {i.quantity} — {i.price} €
              </div>
            ))}

            <hr />

            <select
              value={active.status}
              onChange={e => updateStatus(active._id, e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <button
              style={{ marginLeft: 10 }}
              onClick={() =>
                fetch(`${getApiBase()}/api/orders/${active._id}/resend`, {
                  method: "POST",
                  headers: { Authorization: `Bearer ${getToken()}` },
                })
              }
            >
              📧 Resend email
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
