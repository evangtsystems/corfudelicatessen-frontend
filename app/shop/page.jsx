"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getApiBase } from "../../src/lib/apiBase";
import { getToken } from "../../src/lib/auth";

const theme = { primary: "#1f3b2e", accent: "#d1b76e" };

// ------------------------------------------------------
// WRAPPED INNER COMPONENT (required for useSearchParams)
// ------------------------------------------------------
function ShopPageInner() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [user, setUser] = useState({ approved: false, role: "client" });
  const [cart, setCart] = useState([]);
  const router = useRouter();

  const searchParams = useSearchParams();
  const query = (searchParams.get("search") || "").toLowerCase();
  const mainCategory = searchParams.get("mainCategory") || "";
  const category = searchParams.get("category") || "";

  // Load categories
  useEffect(() => {
    fetch(`${getApiBase()}/api/categories`)
      .then((r) => r.json())
      .then((d) => setCategories(d))
      .catch(console.error);
  }, []);

  // Fetch products + decode user
  useEffect(() => {
    const params = new URLSearchParams();
    if (mainCategory) params.set("mainCategory", mainCategory);
    if (category) params.set("category", category);

    fetch(`${getApiBase()}/api/products?${params.toString()}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setProducts(d.products);
      });

    const token = getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser({ approved: !!payload.approved, role: payload.role });
      } catch {}
    }
  }, [mainCategory, category]);

  const add = (p) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.productId === p._id);
      if (ex)
        return prev.map((i) =>
          i.productId === p._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      return [
        ...prev,
        { productId: p._id, name: p.name, price: p.price, quantity: 1 },
      ];
    });
  };

  const priceCell = (p) =>
    user.approved ? (
      <div style={{ fontWeight: "bold", color: theme.primary }}>
        {p.price
          ? (
              parseFloat(p.price.replace(/[^\d.,]/g, "").replace(",", ".")) || 0
            ).toFixed(2) + " €"
          : "—"}
      </div>
    ) : (
      <div style={{ fontStyle: "italic", color: "#777" }}>
        Login/approval required
      </div>
    );

  const filtered = products.filter(
    (p) =>
      !query ||
      p.name?.toLowerCase().includes(query) ||
      p.description?.toLowerCase().includes(query) ||
      p.category?.toLowerCase().includes(query)
  );

  const subCategories = categories[mainCategory] || [];

  return (
    <div>
      <h1 style={{ color: theme.primary, marginTop: 0 }}>
        {mainCategory || "Shop"}
      </h1>

      {/* Subcategory buttons */}
      {subCategories.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          {subCategories.map((sub) => (
            <button
              key={sub}
              onClick={() =>
                router.push(
                  `/shop?mainCategory=${encodeURIComponent(
                    mainCategory
                  )}&category=${encodeURIComponent(sub)}`
                )
              }
              style={{
                padding: "8px 14px",
                borderRadius: "6px",
                border:
                  sub === category
                    ? `2px solid ${theme.accent}`
                    : "1px solid #ccc",
                background: sub === category ? theme.accent : "#f9f9f9",
                color: sub === category ? theme.primary : "#333",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <p style={{ color: "#777", fontStyle: "italic" }}>
          Δεν βρέθηκαν προϊόντα
        </p>
      )}

      {/* Product grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))",
          gap: 16,
        }}
      >
        {filtered.map((p) => (
          <div
            key={p._id}
            style={{
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              padding: 12,
            }}
          >
            <div
              style={{
                height: 140,
                background: "#faf8f5",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {p.img || p.image || p.imageUrl ? (
                <img
                  src={p.img || p.image || p.imageUrl}
                  alt={p.name || "Product"}
                  style={{
                    maxHeight: 120,
                    maxWidth: "90%",
                    objectFit: "contain",
                    borderRadius: 8,
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder.jpg";
                  }}
                />
              ) : (
                <span style={{ color: "#999" }}>
                  {p.category || "No Image"}
                </span>
              )}
            </div>

            <h3 style={{ margin: "10px 0 6px 0", color: theme.primary }}>
              {p.name}
            </h3>
            <div style={{ color: "#555", minHeight: 40 }}>
              {p.description || ""}
            </div>

            {priceCell(p)}

            <button
              disabled={!user.approved}
              onClick={() => add(p)}
              style={{
                width: "100%",
                marginTop: 8,
                padding: "10px 12px",
                border: "none",
                borderRadius: 8,
                background: user.approved ? theme.accent : "#ddd",
                color: user.approved ? theme.primary : "#666",
                fontWeight: "bold",
                cursor: user.approved ? "pointer" : "not-allowed",
              }}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ------------------------------------------------------
// PAGE WRAPPED IN <Suspense> (REQUIRED FIX)
// ------------------------------------------------------
export default function ShopPage() {
  return (
    <Suspense fallback={<div>Loading shop…</div>}>
      <ShopPageInner />
    </Suspense>
  );
}
