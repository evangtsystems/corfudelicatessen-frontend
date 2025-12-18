"use client";

import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import CookieConsent from "../src/components/CookieConsent";

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      <Header />

      {!isAdmin && <Toaster position="bottom-center" />}

      {/* ✅ NORMAL DOCUMENT FLOW */}
      <main style={{ padding: 20 }}>
        {children}
      </main>

      <Footer />
      <CookieConsent />
    </>
  );
}
