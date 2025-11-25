"use client";
import { useEffect, useState } from "react";
import { getApiBase } from "../../src/lib/apiBase";

const theme = { primary: "#1f3b2e", accent: "#d1b76e" };

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainCategories, setMainCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedMain, setSelectedMain] = useState("");
  const [selectedSub, setSelectedSub] = useState("");

  useEffect(() => {
    fetch(`${getApiBase()}/api/products`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success && Array.isArray(d.products)) {
          setProducts(d.products);

          // Extract unique main categories
          const mains = [
            ...new Set(
              d.products
                .map((p) => p.mainCategory)
                .filter((c) => c && c.trim() !== "")
            ),
          ].sort((a, b) => a.localeCompare(b, "el"));
          setMainCategories(mains);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Update subcategories when main category changes
  useEffect(() => {
    if (selectedMain) {
      const subs = [
        ...new Set(
          products
            .filter((p) => p.mainCategory === selectedMain)
            .map((p) => p.category)
            .filter((s) => s && s.trim() !== "")
        ),
      ].sort((a, b) => a.localeCompare(b, "el"));
      setSubcategories(subs);
      setSelectedSub("");
    } else {
      setSubcategories([]);
      setSelectedSub("");
    }
  }, [selectedMain, products]);

  // Filtered list based on selected categories
  const filteredProducts = products.filter((p) => {
    if (!selectedMain) return true;
    if (!selectedSub)
      return p.mainCategory === selectedMain;
    return (
      p.mainCategory === selectedMain && p.category === selectedSub
    );
  });

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        padding: "20px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
      }}
    >
      <h1
        style={{
          color: theme.primary,
          borderBottom: "2px solid " + theme.accent,
          paddingBottom: "10px",
          textAlign: "center",
        }}
      >
        Προϊόντα
      </h1>

      {/* Dropdown filters */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        <select
          value={selectedMain}
          onChange={(e) => setSelectedMain(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            minWidth: "200px",
          }}
        >
          <option value="">Όλες οι κύριες κατηγορίες</option>
          {mainCategories.map((main) => (
            <option key={main} value={main}>
              {main}
            </option>
          ))}
        </select>

        {subcategories.length > 0 && (
          <select
            value={selectedSub}
            onChange={(e) => setSelectedSub(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "1rem",
              minWidth: "200px",
            }}
          >
            <option value="">Όλες οι υποκατηγορίες</option>
            {subcategories.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        )}
      </div>

      {loading ? (
        <p style={{ textAlign: "center", color: "#555" }}>Φόρτωση προϊόντων...</p>
      ) : filteredProducts.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>
          Δεν υπάρχουν διαθέσιμα προϊόντα.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          {filteredProducts.map((p) => (
            <div
              key={p._id}
              style={{
                background: "#fafafa",
                borderRadius: "10px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                padding: "12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "160px",
                  background: "#fff",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {p.img || p.image || p.imageUrl ? (
                  <img
                    src={p.img || p.image || p.imageUrl}
                    alt={p.name || "Product"}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder.jpg";
                    }}
                  />
                ) : (
                  <span style={{ color: "#999" }}>No Image</span>
                )}
              </div>

              <h3
                style={{
                  color: theme.primary,
                  marginTop: "10px",
                  textAlign: "center",
                }}
              >
                {p.name}
              </h3>

              <div
                style={{
                  fontWeight: "bold",
                  color: theme.accent,
                  marginTop: "6px",
                }}
              >
                {p.price
                  ? (parseFloat(
                      p.price.replace(/[^\d.,]/g, "").replace(",", ".")
                    ) || 0).toFixed(2) + " €"
                  : "—"}
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          div {
            margin: 20px 10px !important;
            padding: 16px !important;
          }
          h1 {
            font-size: 1.8rem !important;
          }
        }
      `}</style>
    </div>
  );
}
