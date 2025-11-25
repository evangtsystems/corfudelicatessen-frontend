"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#fff",
        color: "#1f1b1bff",
        padding: "40px 20px 20px",
        marginTop: "60px",
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
        {/* --- Column 1: Logo + Contact --- */}
        <div>
          <img
            src="https://corfudelicatessen.com/wp-content/uploads/2022/03/corfudelicatessenlogo22plus.webp"
            alt="Corfu Delicatessen"
            style={{ width: "160px", marginBottom: "15px" }}
          />

          <p style={{ margin: "6px 0" }}>
            📍{" "}
            <a
              href="https://www.google.com/maps/place/39%C2%B040'51.8%22N+19%C2%B047'50.6%22E"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0e0c0cff", textDecoration: "none" }}
            >
              Εθνική Παλαιοκαστρίτσας, Θέση Σγόμπου
            </a>
          </p>

          <p style={{ margin: "6px 0" }}>
            📧{" "}
            <a
              href="mailto:info@corfudelicatessen.com"
              style={{ color: "#0f0e0eff", textDecoration: "none" }}
            >
              info@corfudelicatessen.com
            </a>
          </p>
        </div>

        {/* --- Column 2: Κατηγορίες --- */}
        <div>
          <h3 style={{ color: "#d1b76e" }}>ΚΑΤΗΓΟΡΙΕΣ</h3>
          <ul style={{ listStyle: "none", padding: 0, marginTop: "10px" }}>
            <li>
              <Link href="/company" style={{ color: "#0a0a0aff", textDecoration: "none" }}>
                Εταιρεία
              </Link>
            </li>
            <li>
              <Link href="/products" style={{ color: "#0f0f0fff", textDecoration: "none" }}>
                Προϊόντα
              </Link>
            </li>
            <li>
              <Link href="/contact" style={{ color: "#080808ff", textDecoration: "none" }}>
                Επικοινωνία
              </Link>
            </li>
            <li>
              <Link href="/privacy" style={{ color: "#0c0c0cff", textDecoration: "none" }}>
                Πολιτική Απορρήτου
              </Link>
            </li>
          </ul>
        </div>

        {/* --- Column 3: Προϊόντα --- */}
<div>
  <h3 style={{ color: "#d1b76e" }}>ΠΡΟΪΟΝΤΑ</h3>
  <ul style={{ listStyle: "none", padding: 0, marginTop: "10px" }}>
    <li>
      <Link
        href="/shop?mainCategory=Αλλαντικά"
        style={{ color: "#0c0c0c", textDecoration: "none" }}
      >
        Αλλαντικά
      </Link>
    </li>
    <li>
      <Link
        href="/shop?mainCategory=Κατεψυγμένα Τρόφιμα"
        style={{ color: "#0e0d0d", textDecoration: "none" }}
      >
        Κατεψυγμένα Τρόφιμα
      </Link>
    </li>
    <li>
      <Link
        href="/shop?mainCategory=Τρόφιμα"
        style={{ color: "#0a0a0a", textDecoration: "none" }}
      >
        Τρόφιμα
      </Link>
    </li>
    <li>
      <Link
        href="/shop?mainCategory=Τυροκομικά"
        style={{ color: "#0e0d0d", textDecoration: "none" }}
      >
        Τυροκομικά
      </Link>
    </li>
  </ul>
</div>


        {/* --- Column 4: Newsletter --- */}
        <div>
          <h3 style={{ color: "#d1b76e" }}>NEWSLETTER</h3>
          <p style={{ marginTop: "10px" }}>
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
                color: "#1f3b2e",
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

      {/* --- BOTTOM COPYRIGHT BAR --- */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.2)",
          marginTop: "40px",
          paddingTop: "20px",
          textAlign: "center",
          fontSize: "0.9rem",
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
          GT Systems
        </a>
      </div>

      {/* --- Responsive --- */}
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
