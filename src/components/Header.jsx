"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showProducts, setShowProducts] = useState(false);

  const isActive = (path) =>
    pathname === path
      ? { color: "#2c1810", background: "#d4a76a", borderRadius: "6px", padding: "6px 10px" }
      : {};

  // ✅ Debounced search
  useEffect(() => {
    const timeout = setTimeout(() => {
      const trimmed = search.trim();
      const params = new URLSearchParams(window.location.search);
      if (trimmed.length >= 2) {
        params.set("search", trimmed);
        const newUrl = `/shop?${params.toString()}`;
        pathname === "/shop" ? router.replace(newUrl) : router.push(newUrl);
      } else if (pathname === "/shop" && !trimmed) {
        params.delete("search");
        router.replace(`/shop${params.toString() ? "?" + params.toString() : ""}`);
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [search, pathname, router]);

  const [categories, setCategories] = useState({});

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("http://localhost:5000/api/categories");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Category load error:", err);
      }
    }
    loadCategories();
  }, []);

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 1000 }}>
      {/* ✅ MAIN HEADER */}
      <header
        style={{
          width: "100%",
          background: "linear-gradient(to right, white 0%, white 50%, #b1dd12ff 100%)",
          color: "white",
          padding: "12px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <img src="/assets/logo.webp" alt="Corfu Delicatessen" style={{ height: "50px", objectFit: "contain" }} />
        </Link>

        <nav
          style={{
            display: "flex",
            gap: "18px",
            alignItems: "center",
            flexWrap: "wrap",
            overflow: "hidden",
          }}
          className="desktop-nav"
        >
          <Link href="/shop" style={{ color: "white", textDecoration: "none", ...isActive("/shop") }}>
            Shop
          </Link>
          <Link href="/login" style={{ color: "white", textDecoration: "none", ...isActive("/login") }}>
            Login
          </Link>
          <Link
            href="/cart"
            style={{
              color: "white",
              textDecoration: "none",
              ...isActive("/cart"),
              display: "flex",
              alignItems: "center",
            }}
          >
            🛒 <span style={{ marginLeft: "5px" }}>Cart</span>
          </Link>
          <span
  onClick={() => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "/admin/products";
    } else {
      alert("⚠️ Πρέπει πρώτα να συνδεθείτε ως διαχειριστής.");
      window.location.href = "/login";
    }
  }}
  style={{
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    cursor: "pointer",
    ...isActive("/admin/products"),
  }}
>
  Admin
</span>

        </nav>

        <div onClick={() => setMenuOpen(!menuOpen)} style={{ fontSize: "1.5rem", cursor: "pointer", display: "none" }} className="mobile-toggle">
          ☰
        </div>

        {menuOpen && (
          <div
            style={{
              position: "absolute",
              top: "60px",
              right: "20px",
              background: "#2c1810",
              border: "1px solid #d4a76a",
              borderRadius: "8px",
              padding: "10px 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "160px",
            }}
          >
            {["shop", "login", "cart", "admin/products"].map((p) => (
              <Link
                key={p}
                href={`/${p}`}
                style={{ color: "white", textDecoration: "none", width: "100%", padding: "10px 20px" }}
                onClick={() => setMenuOpen(false)}
              >
                {p === "cart" ? "🛒 Cart" : p === "admin/products" ? "Admin" : p.charAt(0).toUpperCase() + p.slice(1)}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* ✅ SECONDARY HEADER */}
      <div
        style={{
          width: "100%",
          background: "#2c1810",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          flexWrap: "wrap",
          gap: "12px",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        {/* Left */}
        <div style={{ display: "flex", alignItems: "center", gap: "25px", flexWrap: "wrap", position: "relative" }}>
          <Link href="/" style={{ color: "#fff", textDecoration: "none", fontWeight: pathname === "/" ? "bold" : "normal" }}>
            Αρχική
          </Link>
          <Link href="/company" style={{ color: "#fff", textDecoration: "none", fontWeight: pathname === "/company" ? "bold" : "normal" }}>
            Η Εταιρεία
          </Link>

          {/* ✅ PRODUCTS dropdown */}
          <div style={{ position: "relative", zIndex: 10000 }}>
  <span
  style={{
    color: "#fff",
    fontWeight: pathname === "/products" ? "bold" : "normal",
    cursor: "pointer",
    position: "relative",
    zIndex: 10001,
    display: "inline-block",
    lineHeight: "1.2",
    paddingTop: "2px",   // ✅ tiny lift to align text
    paddingBottom: "2px" // ✅ keeps balanced spacing
  }}
  onClick={() => setShowProducts(!showProducts)}
>
  Προϊόντα ▾
</span>
            {/* ✅ Improved mobile-friendly dropdown */}
            <div
              style={{
                position: "fixed",
                top: "calc(100px + 6px)",
                left: 0,
                right: 0,
                background: "#fff",
                color: "#2c1810",
                display: showProducts ? "flex" : "none",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: "30px",
                padding: "25px 35px",
                boxShadow: "0 6px 25px rgba(0,0,0,0.2)",
                zIndex: 9999,
                overflowY: "auto",
                overflowX: "hidden",
                maxHeight: "85vh",
                borderTop: "3px solid #d4a76a",
                transition: "opacity 0.35s ease, transform 0.35s ease",
              }}
            >
              {Object.entries(categories).map(([mainCat, subs]) => (
                <div
                  key={mainCat}
                  style={{
                    flex: "1 1 220px",
                    minWidth: "200px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    marginBottom: "20px",
                  }}
                >
                  <Link
                    href={`/shop?mainCategory=${encodeURIComponent(mainCat)}`}
                    style={{
                      display: "block",
                      marginBottom: "10px",
                      color: "#b8860b",
                      fontSize: "1rem",
                      borderBottom: "2px solid #e0c080",
                      width: "100%",
                      paddingBottom: "5px",
                      textTransform: "capitalize",
                      textDecoration: "none",
                    }}
                    onClick={() => setShowProducts(false)}
                  >
                    {mainCat}
                  </Link>

                  {subs?.length > 0 ? (
                    subs.map((sub) => (
                      <Link
                        key={sub}
                        href={`/shop?category=${encodeURIComponent(sub)}`}
                        style={{
                          display: "block",
                          color: "#2c1810",
                          textDecoration: "none",
                          marginBottom: "6px",
                          fontSize: "0.92rem",
                        }}
                        onClick={() => setShowProducts(false)}
                      >
                        {sub}
                      </Link>
                    ))
                  ) : (
                    <span style={{ color: "#999", fontSize: "0.85rem", fontStyle: "italic" }}>
                      (Δεν υπάρχουν υποκατηγορίες)
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Link href="/contact" style={{ color: "#fff", textDecoration: "none", fontWeight: pathname === "/contact" ? "bold" : "normal" }}>
            Επικοινωνία
          </Link>
        </div>

        {/* Center Search */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <input
            type="text"
            placeholder="Αναζήτηση προϊόντων..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              maxWidth: "280px",
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #d4a76a",
              fontSize: "0.95rem",
              outline: "none",
              color: "#2c1810",
            }}
          />
        </div>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#fff", fontWeight: "bold", whiteSpace: "nowrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "1.1rem" }}>📞</span>
            <a href="tel:+302661012345" style={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}>
              +30 26610 12345
            </a>
          </div>
          <span style={{ color: "#aaa" }}>|</span>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "1.1rem" }}>💬</span>
            <a
              href="viber://chat?number=%2B302661012345"
              onClick={(e) => {
                setTimeout(() => {
                  window.location.href = "https://www.viber.com/download/";
                }, 5000);
              }}
              style={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}
            >
              Viber
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
          div[style*='background: #2c1810'] {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 8px !important;
          }
          div[style*='position: fixed'][style*='background: #fff'] {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 15px !important;
            padding: 15px !important;
            overflow-y: auto !important;
            height: 85vh !important;
          }
          input {
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
