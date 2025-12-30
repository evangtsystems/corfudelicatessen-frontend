"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getApiBase } from "../../src/lib/apiBase";
import { getToken } from "../../src/lib/auth";
import toast from "react-hot-toast";
import { useCart } from "../../src/lib/cartContext";
import ShopFilterBar from "../../src/components/ShopFilterBar";


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
  const { cartItems, updateCartGlobal } = useCart();

  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    function measureHeader() {
      const el = document.getElementById("global-header");
      if (el) {
        setHeaderHeight(el.offsetHeight);
      }
    }

    // first measurement
    measureHeader();

    // re-measure on resize / orientation change
    window.addEventListener("resize", measureHeader);
    return () => window.removeEventListener("resize", measureHeader);
  }, []);


  // Load categories
  useEffect(() => {
    fetch(`${getApiBase()}/api/categories`)
      .then((r) => r.json())
      .then((d) => setCategories(d))
      .catch(console.error);
  }, []);


  // Load user on first render
useEffect(() => {
  const token = getToken();
  if (!token) return;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log("Payload:", payload);  // ← debug
    setUser({ approved: !!payload.approved, role: payload.role });
  } catch (err) {
    console.error("Token decode failed", err);
  }
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

  // Load cart on first render
useEffect(() => {
  const saved = localStorage.getItem("cart");
  if (saved) {
    setCart(JSON.parse(saved));
  }
}, []);

// Save cart whenever it changes
useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);


const add = async (p) => {
  // Start from context cartItems (always up-to-date)
  let cartNow = [...cartItems];

  // Check if the item already exists
  const existing = cartNow.find((i) => i.productId === p._id);

  if (existing) {
    // Increment quantity
    cartNow = cartNow.map((i) =>
      i.productId === p._id
        ? { ...i, quantity: i.quantity + 1 }
        : i
    );
  } else {
    // Add new item
    cartNow = [
      ...cartNow,
      {
        productId: p._id,
        name: p.name,
        price: p.price,
        quantity: 1,
      },
    ];
  }

  // 🔥 Global cart update (localStorage + DB + context)
  await updateCartGlobal(cartNow);

  // 🔔 Toast
  toast.success(`Added to cart: ${p.name}`, { id: "cart-toast" });
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
     <div
  className="shop-sticky-main"
  style={{
    position: "sticky",
    top: headerHeight,          // ✅ uses real header height
    zIndex: 900,
    background: "#f8f5f0",
    paddingBottom: 12,
    paddingTop: 10,
    marginBottom: 20,
    borderBottom: "1px solid rgba(0,0,0,0.1)",
  }}
>
  <h1 style={{ color: theme.primary, margin: 0 }}>
    {mainCategory || "Shop"}
  </h1>

  <ShopFilterBar categories={categories} />
</div>




      {/* Subcategory buttons */}
      {subCategories.length > 0 && (
  <div
    className="shop-sticky-sub"
    style={{
      position: "sticky",
      top: headerHeight + 60,   // ✅ sits just below main sticky bar
      zIndex: 850,
      background: "#f8f5f0",
      padding: "8px 0",
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      borderBottom: "1px solid rgba(0,0,0,0.05)",
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
                    e.target.src = "/placeholder.png";
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

     <style jsx global>{`
  @media (max-width: 768px) {
    .shop-sticky-main {
      /* just a tiny cushion if needed */
      /* top is already set from headerHeight inline */
    }
    .shop-sticky-sub {
      /* same here */
    }
  }
`}</style>



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
