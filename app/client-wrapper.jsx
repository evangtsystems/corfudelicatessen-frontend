"use client";

import { Toaster } from "react-hot-toast";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { usePathname } from "next/navigation";

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {/* Toaster ONLY outside admin */}
      {!isAdmin && <Toaster position="bottom-center" />}

      {!isAdmin && <Header />}

      <main style={{ flex: 1, padding: 20 }}>
        {children}
      </main>

      {!isAdmin && <Footer />}
    </>
  );
}
