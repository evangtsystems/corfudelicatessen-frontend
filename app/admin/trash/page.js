"use client";
import { useEffect, useState } from "react";
import { getApiBase } from "../../../src/lib/apiBase";
import { getToken } from "../../../src/lib/auth";
import toast from "react-hot-toast";

export default function TrashPage() {
  const [list, setList] = useState([]);

  const load = async () => {
    const res = await fetch(`${getApiBase()}/api/products/trash`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = await res.json();
    setList(data.products || []);
  };

  useEffect(() => {
    load();
  }, []);

  const restore = async (id) => {
    await fetch(`${getApiBase()}/api/products/restore/${id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    toast.success("✔ Το προϊόν επανήλθε!");
    load();
  };

  const hardDelete = async (id) => {
    if (!confirm("Οριστική διαγραφή;")) return;

    await fetch(`${getApiBase()}/api/products/hard-delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    toast.success("❌ Οριστικά διαγράφηκε!");
    load();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🗑 Κάδος Προϊόντων</h1>

      {list.length === 0 && (
        <p style={{ opacity: 0.7 }}>Ο κάδος είναι άδειος.</p>
      )}

      {list.map((p) => (
        <div
          key={p._id}
          style={{
            background: "#fff",
            padding: 16,
            borderRadius: 10,
            marginBottom: 12,
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ margin: 0 }}>{p.name}</h3>
          <small>
            {p.mainCategory} → {p.category}
          </small>

          <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
            <button
              onClick={() => restore(p._id)}
              style={{
                padding: "6px 10px",
                background: "#d1b76e",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
              }}
            >
              ♻ Επαναφορά
            </button>

            <button
              onClick={() => hardDelete(p._id)}
              style={{
                padding: "6px 10px",
                background: "#c62828",
                color: "#fff",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
              }}
            >
              ❌ Οριστική διαγραφή
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
