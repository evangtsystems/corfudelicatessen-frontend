"use client";

import RippleGrid from "../src/components/RippleGrid"


export default function HomePage() {
  const theme = {
    bg: "#070815",
    primary: "#f5f5f5",
    accent: "#d1b76e",
    muted: "#b0a59a",
    card: "rgba(7, 8, 21, 0.92)",
  };

  return (
    <div
      style={{
        position: "relative",
        Height: "100vh",
        width: "100%",
        
        background: theme.bg,
        color: theme.primary,
        fontFamily:
          "-apple-system, BlinkMacSystemFont, system-ui, -system-ui, 'Segoe UI', sans-serif",
      }}
    >
      {/* Animated background */}
   <RippleGrid
  enableRainbow={false}
  gridColor="#d1b76e"
  rippleIntensity={0.08}
  gridSize={9.0}
  gridThickness={16.0}
  fadeDistance={1.7}
  vignetteStrength={2.4}
  glowIntensity={0.12}
  opacity={0.9}
  gridRotation={18}
  mouseInteraction={true}
  mouseInteractionRadius={1.2}
/>




      {/* Dark overlay to keep text readable */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at center, rgba(0,0,0,0.1), rgba(0,0,0,0.4))",

          zIndex: 2,
        }}
      />

      {/* PAGE CONTENT */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "18px 18px 40px",
          boxSizing: "border-box",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* TOP BAR */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 24,
          }}
        >
          {/* Logo / Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                border: "2px solid " + theme.accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 18,
                background:
                  "radial-gradient(circle at 30% 20%, #fff8e1, #3b2a20)",
                boxShadow: "0 0 14px rgba(209,183,110,0.6)",
              }}
            >
              CD
            </div>
            <div>
              <div
                style={{
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  fontSize: 18,
                }}
              >
                Corfu Delicatessen
              </div>
              <div style={{ fontSize: 11, color: theme.muted }}>
                Εξειδικευμένη τροφοδοσία HORECA · από το 2002
              </div>
            </div>
          </div>

          {/* Right side buttons */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexShrink: 0,
            }}
          >
            <button
              onClick={() => {
                window.location.href = "/shop";
              }}
              style={{
                padding: "8px 14px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.3)",
                background: "transparent",
                color: theme.primary,
                fontSize: 13,
                cursor: "pointer",
                backdropFilter: "blur(8px)",
              }}
            >
              Προβολή καταλόγου
            </button>

            <button
              onClick={() => {
                window.location.href = "/admin/login";
              }}
              style={{
                padding: "8px 16px",
                borderRadius: 999,
                border: "none",
                background:
                  "linear-gradient(135deg, #d1b76e, #f1df9b, #c09b4a)",
                color: "#281a11",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 0 18px rgba(209,183,110,0.7)",
              }}
            >
              Είσοδος B2B
            </button>
          </div>
        </header>

        {/* HERO SECTION */}
        <main
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            gap: 32,
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 10,
            paddingBottom: 40,
          }}
        >
          {/* LEFT: TEXT */}
          <section
            style={{
              flex: 1.1,
              minWidth: 0,
            }}
          >
            <h1
              style={{
                fontSize: "clamp(28px, 4vw, 40px)",
                lineHeight: 1.15,
                margin: 0,
                color: "#fffdf5",
                textShadow: "0 10px 25px rgba(0,0,0,0.7)",
              }}
            >
              Πρώτες ύλες{" "}
              <span
                style={{
                  color: theme.accent,
                  filter: "drop-shadow(0 0 12px rgba(209,183,110,0.85))",
                }}
              >
                κορυφαίας ποιότητας
              </span>{" "}
              για επαγγελματίες στην Κέρκυρα.
            </h1>

            <p
              style={{
                marginTop: 14,
                marginBottom: 20,
                fontSize: 14.5,
                lineHeight: 1.6,
                maxWidth: 520,
                color: theme.muted,
              }}
            >
              Από το 2002 τροφοδοτούμε καθημερινά ξενοδοχεία, εστιατόρια,
              ταβέρνες, καφέ &amp; snack bars σε όλη την Κέρκυρα με επιλεγμένα
              τρόφιμα, όσπρια, θαλασσινά, ζυμαρικά, μπαχαρικά και γαλακτοκομικά.
            </p>

            {/* CTA buttons */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                marginBottom: 18,
              }}
            >
              <button
                onClick={() => {
                  window.location.href = "/shop";
                }}
                style={{
                  padding: "11px 22px",
                  borderRadius: 999,
                  border: "none",
                  background:
                    "linear-gradient(135deg, #d1b76e, #f1df9b, #c09b4a)",
                  color: "#2b1c10",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 0 20px rgba(209,183,110,0.8)",
                }}
              >
                Δείτε τον κατάλογο προϊόντων
              </button>

              <button
                onClick={() => {
                  window.location.href = "/contact";
                }}
                style={{
                  padding: "11px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.35)",
                  background: "rgba(7,8,21,0.7)",
                  color: "#f5f5f5",
                  fontSize: 14,
                  cursor: "pointer",
                  backdropFilter: "blur(10px)",
                }}
              >
                Ζητήστε προσφορά &amp; διανομή
              </button>
            </div>

            {/* QUICK STATS */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 14,
                marginTop: 10,
              }}
            >
              {[
                {
                  label: "Χρόνια εμπειρίας",
                  value: "20+",
                },
                {
                  label: "Επαγγελματικοί πελάτες",
                  value: "300+",
                },
                {
                  label: "Καθημερινές διανομές",
                  value: "Νησί Κέρκυρας",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(0,0,0,0.38)",
                    minWidth: 120,
                  }}
                >
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: theme.accent,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: theme.muted,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* RIGHT: CATEGORY CARD */}
          <section
            style={{
              flex: 0.9,
              minWidth: 260,
              maxWidth: 380,
            }}
          >
            <div
              style={{
                borderRadius: 22,
                padding: 18,
                background: theme.card,
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow:
                  "0 18px 50px rgba(0,0,0,0.85), 0 0 40px rgba(209,183,110,0.18)",
                backdropFilter: "blur(14px)",
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  textTransform: "uppercase",
                  letterSpacing: 1.3,
                  color: theme.muted,
                  marginBottom: 8,
                }}
              >
                Ενδεικτικές κατηγορίες
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0,1fr))",
                  gap: 10,
                  marginTop: 6,
                }}
              >
                {[
                  "Αλλαντικά & Τυριά",
                  "Κατεψυγμένα θαλασσινά",
                  "Ζυμαρικά & Όσπρια",
                  "Μπαχαρικά & Βότανα",
                  "Ελαιόλαδο & Ντελικάτες",
                  "Γαλακτοκομικά HORECA",
                ].map((cat) => (
                  <div
                    key={cat}
                    style={{
                      padding: "10px 10px",
                      borderRadius: 12,
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(0,0,0,0.65))",
                      border: "1px solid rgba(255,255,255,0.05)",
                      fontSize: 12,
                      color: "#f7f5f0",
                    }}
                  >
                    {cat}
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: 16,
                  fontSize: 12,
                  color: theme.muted,
                  lineHeight: 1.5,
                }}
              >
                Διανομή με ιδιόκτητα φορτηγά-ψυγεία, με συνέπεια και συνέπεια σε
                ξενοδοχεία, ταβέρνες, εστιατόρια, super market &amp; mini
                market σε όλη την Κέρκυρα.
              </div>

              <button
                onClick={() => {
                  window.location.href = "/shop";
                }}
                style={{
                  marginTop: 14,
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: 999,
                  border: "none",
                  background:
                    "linear-gradient(135deg, #d1b76e, #f3e4aa, #c09b4a)",
                  color: "#25180d",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Άνοιγμα πλήρους καταλόγου
              </button>
            </div>
          </section>
        </main>

        {/* FOOTER LINE */}
        <footer
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 10,
            marginTop: "auto",
            fontSize: 11,
            color: theme.muted,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <span>© {new Date().getFullYear()} Corfu Delicatessen · Κέρκυρα</span>
          <span>Τηλ. παραγγελιών &amp; πληροφορίες διαθέσιμα κατόπιν επικοινωνίας</span>
        </footer>
      </div>

      {/* SIMPLE MOBILE TWEAKS */}
      <style jsx global>{`
        @media (max-width: 768px) {
          main {
            flex-direction: column !important;
          }
        }
      `}</style>
    </div>
  );
}
