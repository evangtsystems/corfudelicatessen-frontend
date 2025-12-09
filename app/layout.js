import { CartProvider } from "../src/lib/cartContext";
import ClientWrapper from "./client-wrapper";

export const metadata = {
  title: "Corfu Delicatessen",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ width: "100%", height: "100%", margin: 0, padding: 0 }}>
      <body
        style={{
          margin: 0,
          padding: 0,
          width: "100%",
          height: "100%",     // <-- REQUIRED
         background: "#070815",

          overflowX: "hidden",
        }}
      >
        

        <CartProvider>
          <ClientWrapper>{children}</ClientWrapper>
        </CartProvider>
      </body>
    </html>
  );
}
