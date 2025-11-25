"use client";
import { useEffect, useState } from "react";
import { getApiBase } from "../../../src/lib/apiBase";
import { getToken } from "../../../src/lib/auth";

const theme = { primary: "#1f3b2e", accent: "#d1b76e" };

export default function AdminProductsPage() {
  const [hydrated, setHydrated] = useState(false);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    imageUrl: "",
    price: "",
  });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setHydrated(true);
  }, []);

  const token = typeof window !== "undefined" ? getToken() : null;

  const load = async () => {
    const res = await fetch(`${getApiBase()}/api/products`);
    const data = await res.json();
    if (data.success) setProducts(data.products);
  };

  useEffect(() => {
    if (hydrated) load();
  }, [hydrated]);

  const save = async (e) => {
    e.preventDefault();
    const res = await fetch(`${getApiBase()}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...form, price: Number(form.price) || 0 }),
    });
    const data = await res.json();
    setMsg(data.success ? "✅ Product added" : "❌ Failed");
    setForm({ name: "", description: "", category: "", imageUrl: "", price: "" });
    load();
  };

  const update = async (id, patch) => {
    const res = await fetch(`${getApiBase()}/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(patch),
    });
    const data = await res.json();
    if (data.success) load();
  };

  const del = async (id) => {
    await fetch(`${getApiBase()}/api/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    load();
  };

  const input = (name, placeholder, type = "text") => (
    <input
      type={type}
      value={form[name]}
      placeholder={placeholder}
      onChange={(e) => setForm({ ...form, [name]: e.target.value })}
      style={{
        width: "100%",
        padding: "10px 12px",
        border: "1px solid #ccc",
        borderRadius: 8,
      }}
    />
  );

  if (!hydrated) return null; // 🧩 prevent hydration mismatch

  return (
    <div style={{ padding: 20 }}>
      {/* ✅ Admin Navigation Bar */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "25px",
          borderBottom: "2px solid #d1b76e",
          paddingBottom: "10px",
        }}
      >
        <button
          onClick={() => (window.location.href = "/admin/products")}
          style={{
            background: "#d1b76e",
            color: "#1f3b2e",
            border: "none",
            borderRadius: 6,
            padding: "8px 14px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          🛍️ Προϊόντα
        </button>

        <button
          onClick={() => (window.location.href = "/admin/users")}
          style={{
            background: "#1f3b2e",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "8px 14px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          👥 Χρήστες
        </button>
      </div>

      {/* ✅ Header */}
      <h1 style={{ color: theme.primary, marginTop: 0 }}>Admin · Products</h1>

      {/* ✅ Add Product Form */}
      <form
        onSubmit={save}
        style={{
          display: "grid",
          gap: 10,
          background: "#fff",
          padding: 16,
          borderRadius: 12,
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          marginBottom: 16,
        }}
      >
        {input("name", "Name")}
        {input("description", "Description")}
        {input("category", "Category")}
        {input("imageUrl", "Image URL")}
        {input("price", "Price (€)", "number")}
        <button
          type="submit"
          style={{
            padding: "10px 14px",
            border: "none",
            borderRadius: 8,
            background: theme.accent,
            color: theme.primary,
            fontWeight: "bold",
          }}
        >
          Add product
        </button>
        {msg && <p>{msg}</p>}
      </form>

      {/* ✅ Product List */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
          gap: 12,
        }}
      >
        {products.map((p) => (
          <div
            key={p._id}
            style={{
              background: "#fff",
              padding: 12,
              borderRadius: 12,
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                height: 120,
                background: "#faf8f5",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {p.imageUrl ? (
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  style={{ maxHeight: 100, maxWidth: "90%" }}
                />
              ) : (
                <span>{p.category || "Product"}</span>
              )}
            </div>
            <h3 style={{ margin: "10px 0 6px 0", color: theme.primary }}>{p.name}</h3>
            <div style={{ color: "#555", minHeight: 36 }}>{p.description}</div>
            <div style={{ margin: "6px 0" }}>
              <strong>€ {p.price?.toFixed?.(2) || p.price}</strong>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button
                onClick={() =>
                  update(p._id, {
                    price: Number(prompt("New price:", p.price)) || p.price,
                  })
                }
                style={{
                  flex: 1,
                  padding: "8px",
                  border: "none",
                  borderRadius: 8,
                  background: "#e8e1cc",
                  color: theme.primary,
                  fontWeight: "bold",
                }}
              >
                Edit Price
              </button>
              <button
                onClick={() => del(p._id)}
                style={{
                  flex: 1,
                  padding: "8px",
                  border: "none",
                  borderRadius: 8,
                  background: "#c62828",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
