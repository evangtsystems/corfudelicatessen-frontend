"use client";

import { useState,useEffect } from "react";

import RippleGrid from "../src/components/RippleGrid";
import HeroSlider from "../src/components/HeroSlider";
import LogoIntroStrip from "../src/components/LogoIntroStrip";
import CinematicIntro from "../src/components/CinematicIntro";
import { useIntro } from "../src/lib/IntroContext";
import { useRef } from "react";
import WhatsAppChat from "../src/components/WhatsAppChat";




export default function HomePage() {
  const theme = {
    bg: "#070815",
    primary: "#f5f5f5",
    accent: "#d1b76e",
    muted: "#b0a59a",
    card: "rgba(7, 8, 21, 0.92)",
  };


const [headerOffset, setHeaderOffset] = useState(0);

useEffect(() => {
  const measure = () => {
    const header = document.getElementById("global-header");
    setHeaderOffset(header ? header.getBoundingClientRect().height : 0);
  };

  measure();
  window.addEventListener("resize", measure);
  return () => window.removeEventListener("resize", measure);
}, []);




  const { introDone, setIntroDone } = useIntro();

  const [logoDone, setLogoDone] = useState(false);
  
  
  const handleLogoFinish = () => setLogoDone(true);

  const isMobile =
  typeof window !== "undefined" && window.innerWidth < 900;

const cinematicActive = logoDone && !introDone;

  const heroCinematicStyle = cinematicActive
  ? {
      position: "fixed",
      inset: 0,
      zIndex: 9999, // below cart/menu, above content
      background: theme.bg,

      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",

      // 🔥 THIS IS THE KEY FIX
      paddingTop: `calc(${headerOffset}px + 6vh)`,
      paddingBottom: "14vh",
      paddingLeft: 18,
      paddingRight: 18,

      overflowY: "auto",
      WebkitOverflowScrolling: "touch",
    }
  : {
      position: "relative",
      zIndex: 10,
    };









  // 🎬 TRUE when cinematic is running (after logo, before introDone)
 

  // Hide everything NON-cinematic while cinematic runs
 const hideNonCinematicStyle = {
  opacity: cinematicActive ? 0 : 1,
  transition: "opacity 0.6s ease",
  pointerEvents: cinematicActive ? "none" : "auto",
};



 





 
  // 🧱 Block initial render until intro pipeline starts
















  // ⛔ DO NOT RENDER PAGE UNTIL LOGO IS DONE
if (!logoDone) {
  return <LogoIntroStrip onFinish={handleLogoFinish} />;
}



return (
  <div
    style={{
      position: "relative",
      width: "100%",
      minHeight: "100vh",
      overflow: "hidden",
      background: theme.bg,
      color: theme.primary,
      fontFamily:
        "-apple-system, BlinkMacSystemFont, system-ui, -system-ui, 'Segoe UI', sans-serif",
    }}
  >

      
      

    {logoDone && !introDone && (
  <CinematicIntro onFinish={() => setIntroDone(true)} />
)}




      {/* ================= BACKGROUND EFFECT ================= */}
     
       <div
  style={{
    opacity: introDone ? 1 : 0,
    transition: "opacity 0.8s ease",
    pointerEvents: "none",
  }}
>
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
</div>



       
        <section
  
  style={{
    ...hideNonCinematicStyle,
    
    position: "relative",
    zIndex: 1,
    padding: "28px 0 12px",
    background: "linear-gradient(180deg, #0b0e1b, #070815)",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  }}
>

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 18px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
    display: "flex",
    flexDirection: "row",
    gap: cinematicActive ? 0 : 32,
    alignItems: "center",
    justifyContent: cinematicActive ? "center" : "space-between",
    paddingTop: 10,
    paddingBottom: 22,
  }}
>
          
            <div style={{ fontWeight: 900, fontSize: 16, color: "#fffdf5" }}>
              Συνεργαζόμαστε με κορυφαίους παραγωγούς
            </div>
            <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.55)" }}>
              Brands που εμπιστεύονται οι επαγγελματίες
            </div>
          </div>

          <div
            style={{
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "transparent",
              padding: "0",
              overflow: "hidden",
            }}
          >
           
  <HeroSlider />


          </div>
        </div>
      </section>

      {/* ================= HERO CONTENT ================= */}
     <section style={heroCinematicStyle}>
  <div
    style={{
      width: "100%",
      maxWidth: 1200,
      margin: "0 auto",
      padding: "0 18px",

      



      transition: "transform 0.6s ease",
    }}
  >



        <main
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 32,
             alignItems: "flex-start",
    justifyContent: cinematicActive ? "flex-start" : "space-between",
            // ✅ padding belongs HERE
     width: "100%",
    maxWidth: 1200,
    margin: "0 auto",
          }}
        >
          {/* LEFT */}
          {/* LEFT */}
<div
  style={{
  flex: 1.15,
  minWidth: 0,
  maxWidth: 720,

  marginLeft: cinematicActive ? "auto" : 0,
  marginRight: cinematicActive ? "auto" : 0,

  
}}

>

            {/* ✅ hide this pill during cinematic */}
            <div
              style={{
                ...hideNonCinematicStyle,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 12px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(0,0,0,0.25)",
                fontSize: 12,
                color: "rgba(245,245,245,0.92)",
                marginBottom: 12,
              }}
            >
              <span style={{ color: theme.accent, fontWeight: 800 }}>HORECA</span>
              <span style={{ color: "rgba(255,255,255,0.6)" }}>·</span>
              <span>Χονδρική τροφοδοσία Κέρκυρας</span>
              <span style={{ color: "rgba(255,255,255,0.6)" }}>·</span>
              <span>από το 2002</span>
            </div>

            {/* 🎬 CINEMATIC ELEMENTS (stay visible, controlled by CinematicIntro JS) */}
            <h1
              data-focus="headline"
              style={{
                
                fontSize: "clamp(30px, 4.2vw, 44px)",
                lineHeight: 1.12,
                margin: 0,
                marginBottom: cinematicActive ? 28 : 12, // 👈 MORE SPACE
                color: "#fffdf5",
                textShadow: "0 12px 28px rgba(0,0,0,0.65)",
                position: "relative",
                zIndex: 20,

                
                transition: "none",
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
              data-focus="paragraph"
              style={{
               
                marginTop: 12,
                marginBottom: cinematicActive ? 32 : 14, // 👈 MORE AIR
                fontSize: 15,
                lineHeight: 1.7,
                maxWidth: 560,
                color: theme.muted,
                position: "relative",
                zIndex: 20,

               
                transition: "none",
              }}
            >
              Από το 2002 τροφοδοτούμε καθημερινά ξενοδοχεία, εστιατόρια,
              ταβέρνες, καφέ &amp; snack bars σε όλη την Κέρκυρα με επιλεγμένα
              τρόφιμα, όσπρια, θαλασσινά, ζυμαρικά, μπαχαρικά και γαλακτοκομικά.
            </p>

            <div
  data-focus="logistics"
  style={{
    display: "inline-flex",
    alignItems: "center",
    gap: 18,
    padding: "14px 22px",
    borderRadius: 16,
    border: "1px solid rgba(209,183,110,0.35)",
    background:
      "linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.25))",
    boxShadow:
      "0 18px 46px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(209,183,110,0.08)",
  }}
>
  {/* ICON */}
  <div
    style={{
      fontSize: 22,
      lineHeight: 1,
      opacity: 0,
      animation: "fadeUp 0.4s ease forwards",
    }}
  >
    🚚
  </div>

  {/* TEXT */}
  <div style={{ display: "flex", flexDirection: "column" }}>
    <span
      style={{
        fontSize: 13,
        fontWeight: 600,
        color: "rgba(245,245,245,0.75)",
        letterSpacing: 0.4,
        opacity: 0,
        animation: "fadeUp 0.4s ease forwards",
        animationDelay: "0.1s",
      }}
    >
      Παραγγέλνεις σήμερα.
    </span>

    <span
      style={{
        fontSize: 20,
        fontWeight: 900,
        color: theme.accent,
        letterSpacing: 0.8,
        lineHeight: 1.05,
        marginTop: 4,
        opacity: 0,
        animation: "accentIn 0.5s ease forwards",
        animationDelay: "0.25s",
        textShadow:
          "0 0 26px rgba(209,183,110,0.85), 0 8px 28px rgba(0,0,0,0.6)",
      }}
    >
      Το έχεις σήμερα.
    </span>

    <span
      style={{
        fontSize: 12.5,
        marginTop: 4,
        color: "rgba(245,245,245,0.6)",
        opacity: 0,
        animation: "fadeUp 0.4s ease forwards",
        animationDelay: "0.45s",
      }}
    >
      Σε όλη την Κέρκυρα.
    </span>
  </div>
</div>




            {/* ✅ hide CTAs during cinematic */}
            <div
              style={{
                ...hideNonCinematicStyle,
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                marginBottom: 18,
              }}
            >
              <button
                onClick={() => (window.location.href = "/shop")}
                style={{
                  padding: "12px 22px",
                  borderRadius: 999,
                  border: "none",
                  background:
                    "linear-gradient(135deg, #d1b76e, #f1df9b, #c09b4a)",
                  color: "#2b1c10",
                  fontSize: 14,
                  fontWeight: 800,
                  cursor: "pointer",
                  boxShadow: "0 0 22px rgba(209,183,110,0.75)",
                }}
              >
                Δείτε τον κατάλογο προϊόντων
              </button>

              <button
                onClick={() => (window.location.href = "/login")}
                style={{
                  padding: "12px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.28)",
                  background: "rgba(7,8,21,0.55)",
                  color: "#f5f5f5",
                  fontSize: 14,
                  fontWeight: 800,
                  cursor: "pointer",
                  backdropFilter: "blur(10px)",
                }}
              >
                Είσοδος B2B
              </button>

              <button
                onClick={() => (window.location.href = "/contact")}
                style={{
                  padding: "12px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(0,0,0,0.25)",
                  color: "#f5f5f5",
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Επικοινωνία
              </button>
            </div>

            {/* ✅ hide stats during cinematic */}
            <div
              style={{
                ...hideNonCinematicStyle,
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                marginTop: 6,
              }}
            >
              {[
                { label: "Χρόνια εμπειρίας", value: "20+" },
                { label: "Επαγγελματικοί πελάτες", value: "300+" },
                { label: "Διανομές", value: "Καθημερινά" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 14,
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(0,0,0,0.36)",
                    minWidth: 128,
                  }}
                >
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 900,
                      color: theme.accent,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 11.5, color: theme.muted }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT CARD (hide during cinematic) */}
         {!cinematicActive &&  (
  <div style={{ flex: 0.9, minWidth: 260, maxWidth: 390 }}>
    <div
      style={{
        borderRadius: 22,
        padding: 18,
        background: theme.card,
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow:
          "0 18px 52px rgba(0,0,0,0.85), 0 0 40px rgba(209,183,110,0.18)",
        backdropFilter: "blur(14px)",
      }}
    >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    textTransform: "uppercase",
                    letterSpacing: 1.3,
                    color: theme.muted,
                  }}
                >
                  Ενδεικτικές κατηγορίες
                </div>

                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 900,
                    color: theme.accent,
                    padding: "6px 10px",
                    borderRadius: 999,
                    border: "1px solid rgba(209,183,110,0.22)",
                    background: "rgba(0,0,0,0.28)",
                  }}
                >
                  Όλα διαθέσιμα άμεσα
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0,1fr))",
                  gap: 10,
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
                        "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(0,0,0,0.7))",
                      border: "1px solid rgba(255,255,255,0.05)",
                      fontSize: 12.2,
                      color: "#f7f5f0",
                    }}
                  >
                    {cat}
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: 14,
                  fontSize: 12.5,
                  color: theme.muted,
                  lineHeight: 1.55,
                }}
              >
                Διανομή με ιδιόκτητα φορτηγά-ψυγεία, με συνέπεια και ευελιξία σε
                ξενοδοχεία, ταβέρνες, εστιατόρια, super market &amp; mini market
                σε όλη την Κέρκυρα.
              </div>

              <button
                onClick={() => (window.location.href = "/shop")}
                style={{
                  marginTop: 14,
                  width: "100%",
                  padding: "11px 14px",
                  borderRadius: 999,
                  border: "none",
                  background:
                    "linear-gradient(135deg, #d1b76e, #f3e4aa, #c09b4a)",
                  color: "#25180d",
                  fontSize: 13.5,
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                Άνοιγμα πλήρους καταλόγου
              </button>
            </div>
          </div>
          )}
        </main>

        {/* TRUST STRIP (hide during cinematic) */}
        <div
          style={{
            ...hideNonCinematicStyle,
            marginTop: 6,
            padding: "14px 14px",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(0,0,0,0.28)",
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {[
            { icon: "🚚", text: "Καθημερινές διανομές" },
            { icon: "🧊", text: "Ιδιόκτητα φορτηγά-ψυγεία" },
            { icon: "🏨", text: "HORECA πελάτες σε όλη την Κέρκυρα" },
            { icon: "📞", text: "Άμεση επικοινωνία" },
           
          ].map((x) => (
            <div
              key={x.text}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                color: "rgba(245,245,245,0.92)",
                fontSize: 13,
                fontWeight: 700,
                padding: "8px 10px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(0,0,0,0.22)",
                flex: "1 1 210px",
              }}
            >
              <span style={{ fontSize: 16 }}>{x.icon}</span>
              <span>{x.text}</span>
            </div>
          ))}
        </div>
{!cinematicActive && <WhatsAppChat />}
        {/* FOOTER LINE (hide during cinematic) */}
        <div
          style={{
            ...hideNonCinematicStyle,
            marginTop: 16,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 10,
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
        </div>
        </div>
      </section>

      {/* ================= BRAND SLIDER SECTION ================= */}
    

      {/* MOBILE tweaks */}
      <style jsx global>{`
        @media (max-width: 900px) {
          main {
            flex-direction: column !important;
            align-items: stretch !important;
          }
        }
      `}</style>
      <style jsx>{`
      @keyframes fadeUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes accentIn {
    from {
      opacity: 0;
      transform: translateY(4px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  @keyframes logiIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`}</style>
    </div>
  );
}
