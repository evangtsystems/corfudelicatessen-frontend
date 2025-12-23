"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#4c6908ff",
        color: "rgba(245,245,240,0.85)",
        padding: "40px 20px 20px",
      }}
    >
      {/* --- TOP GRID --- */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "40px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Column 1 */}
        <div>
          <img
            src="https://corfudelicatessen.com/wp-content/uploads/2022/03/corfudelicatessenlogo22plus.webp"
            alt="Corfu Delicatessen"
            style={{ width: "160px", marginBottom: "15px" }}
          />

          <p style={{ margin: "6px 0", color: "rgba(245,245,240,0.85)" }}>
            📍{" "}
            <a
              href="https://www.google.com/maps/place/39%C2%B040'51.8%22N+19%C2%B047'50.6%22E"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#ffffff",
                textDecoration: "none",
              }}
            >
              Εθνική Παλαιοκαστρίτσας, Θέση Σγόμπου
            </a>
          </p>

          <p style={{ margin: "6px 0" }}>
            📧{" "}
            <a
              href="mailto:info@corfudelicatessen.com"
              style={{
                color: "#ffffff",
                textDecoration: "none",
              }}
            >
              info@corfudelicatessen.com
            </a>
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h3 style={{ color: "#d1b76e" }}>ΚΑΤΗΓΟΡΙΕΣ</h3>
          <ul style={{ listStyle: "none", padding: 0, marginTop: "10px" }}>
            {[
              { href: "/company", label: "Εταιρεία" },
              { href: "/products", label: "Προϊόντα" },
              { href: "/contact", label: "Επικοινωνία" },
              { href: "/privacy-policy", label: "Πολιτική Απορρήτου" },
            ].map((item) => (
              <li key={item.href} style={{ marginBottom: 6 }}>
                <Link
                  href={item.href}
                  style={{
                    color: "rgba(245,245,240,0.85)",
                    textDecoration: "none",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 style={{ color: "#d1b76e" }}>ΠΡΟΪΟΝΤΑ</h3>
          <ul style={{ listStyle: "none", padding: 0, marginTop: "10px" }}>
            {[
              "Αλλαντικά",
              "Κατεψυγμένα Τρόφιμα",
              "Τρόφιμα",
              "Τυροκομικά",
            ].map((cat) => (
              <li key={cat} style={{ marginBottom: 6 }}>
                <Link
                  href={`/shop?mainCategory=${cat}`}
                  style={{
                    color: "rgba(245,245,240,0.85)",
                    textDecoration: "none",
                  }}
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 style={{ color: "#d1b76e" }}>NEWSLETTER</h3>
          <p style={{ marginTop: "10px", color: "rgba(245,245,240,0.75)" }}>
            Εισάγετε το email σας για να είστε ενημερωμένοι.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{ marginTop: "12px", display: "flex", gap: "8px" }}
          >
            <input
              type="email"
              placeholder="E-mail"
              required
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "6px",
                border: "none",
                outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                background: "#d1b76e",
                color: "#2b1c10",
                border: "none",
                borderRadius: "6px",
                padding: "8px 12px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              ΕΓΓΡΑΦΗ
            </button>
          </form>
        </div>
      </div>

      {/* --- GDPR LEGAL LINKS --- */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "12px",
          marginTop: "35px",
          fontSize: "0.9rem",
          color: "rgba(245,245,240,0.7)",
        }}
      >
        {[
          { href: "/privacy-policy", label: "Πολιτική Απορρήτου" },
          { href: "/cookies", label: "Πολιτική Cookies" },
          { href: "/terms", label: "Όροι & Προϋποθέσεις" },
          { href: "/impresuum", label: "Νομικές Πληροφορίες" },
        ].map((item, i) => (
          <span key={item.href}>
            <Link
              href={item.href}
              style={{
                color: "rgba(245,245,240,0.75)",
                textDecoration: "none",
              }}
            >
              {item.label}
            </Link>
            {i < 3 && <span style={{ margin: "0 8px", opacity: 0.4 }}>|</span>}
          </span>
        ))}
      </div>

      {/* --- COPYRIGHT BAR --- */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.25)",
          marginTop: "25px",
          paddingTop: "18px",
          textAlign: "center",
          fontSize: "0.9rem",
          color: "rgba(245,245,240,0.7)",
        }}
      >
        © {new Date().getFullYear()}{" "}
        <a
          href="https://corfudelicatessen.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#d1b76e", textDecoration: "none" }}
        >
          Corfu Delicatessen
        </a>{" "}
        — Designed & Hosted by{" "}
        <a
          href="https://www.gtsystems.gr"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#d1b76e", textDecoration: "none" }}
        >
          GTSystems
        </a>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          footer {
            text-align: center;
          }
          ul {
            text-align: center;
          }
          form {
            flex-direction: column;
          }
          button {
            width: 100%;
          }
        }
      `}</style>
    </footer>
  );
}
