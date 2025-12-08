"use client";

import { useEffect, useState } from "react";
import { getApiBase } from "../../../../src/lib/apiBase";
import { getToken } from "../../../../src/lib/auth";
import toast from "react-hot-toast";

export default function TrashPage() {
  const [products, setProducts] = useState([]);
  const token = typeof window !== "undefined" ? getToken() : null;

  const loadTrash = async () => {
    const res = await fetch(`${getApiBase()}/api/products/trash`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) setProducts(data.products);
  };

  useEffect(() => {
    loadTrash();
  }, []);

  const restore = async (id) => {
    const res = await fetch(`${getApiBase()}/api/products/restore/${id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) {
      toast.success("Restored");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    }
  };

  const destroy = async (id) => {
    if (!window.confirm("Permanently delete?")) return;

    const res = await fetch(`${getApiBase()}/api/products/hard-delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Permanently deleted");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    }
  };

 return (
  <div style={{ padding: 20 }}>
    <h1>🗑️ Κάδος Προϊόντων</h1>

    {/* 🔙 BACK TO PRODUCTS BUTTON */}
    <button
      onClick={() => (window.location.href = "/admin/products")}
      style={{
        background: "#1f3b2e",
        color: "white",
        border: "none",
        padding: "8px 14px",
        borderRadius: 6,
        fontWeight: "bold",
        cursor: "pointer",
        marginBottom: 20,
      }}
    >
      ← Back to Products
    </button>

    {products.length === 0 && <p>Ο κάδος είναι άδειος.</p>}

    <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
      {products.map((p) => (
        <div
          key={p._id}
          style={{
            background: "#fff",
            padding: 16,
            borderRadius: 10,
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3>{p.name}</h3>
          <p style={{ opacity: 0.7 }}>
            {p.mainCategory} · {p.category}
          </p>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => restore(p._id)}
              style={{
                padding: "6px 12px",
                background: "#4caf50",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Restore
            </button>

            <button
              onClick={() => destroy(p._id)}
              style={{
                padding: "6px 12px",
                background: "#c62828",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Delete Forever
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}