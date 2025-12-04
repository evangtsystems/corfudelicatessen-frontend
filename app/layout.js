import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { CartProvider } from "../src/lib/cartContext";
import ClientWrapper from "./client-wrapper"; // ⭐ NEW


export const metadata = {
  title: "Corfu Delicatessen",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          minHeight: "100vh",
          background: "#f8f5f0",
          overflowX: "hidden",
        }}
      >
        <CartProvider>
          {/* All client-side logic is handled inside ClientWrapper */}
          <ClientWrapper>
            {children}
          </ClientWrapper>
        </CartProvider>
      </body>
    </html>
  );
}
