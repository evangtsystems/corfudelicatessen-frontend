import { CartProvider } from "../src/lib/cartContext";
import ClientWrapper from "./client-wrapper";

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
          <ClientWrapper>
            {children}
          </ClientWrapper>
        </CartProvider>
      </body>
    </html>
  );
}
