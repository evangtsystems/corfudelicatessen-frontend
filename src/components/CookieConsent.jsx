"use client";

import { useState, useEffect } from "react";
import { loadGA } from "../lib/gtag";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");

    // If already accepted → load GA immediately
    if (consent === "accepted") {
      loadGA();
      return;
    }

    // If no answer → show banner
    if (!consent) setVisible(true);
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);

    // 🔥 Load Google Analytics AFTER acceptance
    loadGA();
  };

  const rejectAll = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "0",
        left: "0",
        right: "0",
        background: "#2c1810",
        color: "white",
        padding: "18px 22px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        borderTop: "3px solid #d1b76e",
        zIndex: 9999999,
      }}
    >
      <div style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
        Χρησιμοποιούμε cookies για να βελτιώσουμε την εμπειρία σας, να αναλύουμε
        την επισκεψιμότητα και να προσφέρουμε προσωποποιημένες υπηρεσίες. Με την
        χρήση της ιστοσελίδας αποδέχεστε την χρήση cookies.
      </div>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <button
          onClick={acceptAll}
          style={{
            padding: "8px 16px",
            background: "#d1b76e",
            color: "#1f3b2e",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Αποδοχή όλων
        </button>

        <button
          onClick={rejectAll}
          style={{
            padding: "8px 16px",
            background: "white",
            color: "#2c1810",
            border: "1px solid #d1b76e",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Απόρριψη
        </button>

        <a
          href="/cookies"
          style={{
            padding: "8px 16px",
            background: "transparent",
            color: "#d1b76e",
            textDecoration: "underline",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Περισσότερες πληροφορίες
        </a>
      </div>
    </div>
  );
}
