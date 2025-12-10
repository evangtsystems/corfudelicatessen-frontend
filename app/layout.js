import { CartProvider } from "../src/lib/cartContext";
import ClientWrapper from "./client-wrapper";

export const metadata = {
  title: "Corfu Delicatessen",
  icons: {
    icon: "/faviconi.ico",                // browser tab icon
    shortcut: "/faviconi.ico",
    apple: "/faviconi.png",               // optional (iPhone/iPad)
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ width: "100%", height: "100%", margin: 0, padding: 0 }}>
      <body
        style={{
          margin: 0,
          padding: 0,
          width: "100%",
          
         background: "#050e00ff",

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
