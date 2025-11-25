export default function Home() {
  return (
    <div
      style={{
        padding: "40px 20px",
        textAlign: "center",
        flex: 1, // ✅ allows the main content to expand properly
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // ✅ vertically centers content if page is short
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          color: "#2c1810", // dark chocolate tone
          marginBottom: "15px",
        }}
      >
        Corfu Deli
      </h1>

      <p
        style={{
          fontSize: "1.1rem",
          color: "#5a4633",
        }}
      >
        Welcome to Corfu Delicatessen — coming soon 🍷🧀
      </p>
    </div>
  );
}

