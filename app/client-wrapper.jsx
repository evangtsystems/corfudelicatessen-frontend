"use client";

import { usePathname } from "next/navigation";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { Toaster } from "react-hot-toast";
import CookieConsent from "../src/components/CookieConsent"; // ✅ ADD THIS

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {/* HEADER ALWAYS VISIBLE */}
      <Header />

      {/* Toaster ONLY for public pages (bottom) */}
      {!isAdmin && <Toaster position="bottom-center" />}

      <main style={{ flex: 1, padding: 20 }}>
        {children}
      </main>

      {/* FOOTER ALWAYS VISIBLE */}
      <Footer />

      {/* ✅ COOKIE CONSENT POPUP ALWAYS VISIBLE */}
      <CookieConsent />
    </>
  );
}

