import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "../src/lib/cartContext";   // ✅ ADD THIS

export const metadata = { title: "Corfu Delicatessen" };

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      style={{
        margin: 0,
        padding: 0,
        height: "100%",
        overflowX: "hidden",
      }}
    >
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          margin: 0,
          padding: 0,
          fontFamily: "Arial, sans-serif",
          background: "#f8f5f0",
          overflowX: "hidden",
        }}
      >
        {/* 🔥 Wrap EVERYTHING in CartProvider */}
        <CartProvider>
          <Toaster position="bottom-center" />

          <Header />

          <main
            style={{
              flex: 1,
              padding: "20px",
            }}
          >
            {children}
          </main>

          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
