import Header from "../src/components/Header";
import Footer from "../src/components/Footer";

export const metadata = { title: "Corfu Delicatessen" };

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      style={{
        margin: 0,
        padding: 0,
        height: "100%",
        overflowX: "hidden", // ✅ prevents horizontal scrollbar
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
          overflowX: "hidden", // ✅ no side scroll or bottom bar
        }}
      >
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
      </body>
    </html>
  );
}

