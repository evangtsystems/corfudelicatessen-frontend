import { CartProvider } from "../src/lib/cartContext";
import { IntroProvider } from "../src/lib/IntroContext";
import ClientWrapper from "./client-wrapper";

export const metadata = {
  title: "Corfu Delicatessen",
  description: "Χονδρική τροφοδοσία Κέρκυρας από το 2002",
  icons: {
    icon: "/faviconi.ico",
    shortcut: "/faviconi.ico",
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <IntroProvider>
          <CartProvider>
            <ClientWrapper>{children}</ClientWrapper>
          </CartProvider>
        </IntroProvider>
      </body>
    </html>
  );
}

