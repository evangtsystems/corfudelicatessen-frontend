"use client";

export default function Home() {
  return (
    <div
      style={{
        padding: "40px 20px",
        textAlign: "center",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        maxWidth: "900px",
        margin: "0 auto",
        animation: "fadeIn 1s ease forwards",
      }}
    >
      {/* TITLE */}
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "700",
          color: "#2c1810",
          marginBottom: "10px",
          opacity: 0,
          animation: "fadeUp 0.8s ease forwards",
          animationDelay: "0.2s",
        }}
      >
        Corfu Deli
      </h1>

      {/* SUBTITLE */}
      <p
        style={{
          fontSize: "1.25rem",
          color: "#5a4633",
          marginBottom: "35px",
          opacity: 0,
          animation: "fadeUp 0.8s ease forwards",
          animationDelay: "0.45s",
        }}
      >
        Premium Mediterranean Products — coming soon 🍷🧀
      </p>

      {/* FLOATING IMAGE */}
      <img
        src="https://images.unsplash.com/photo-1542831371-d531d36971e6"
        alt="Delicatessen"
        style={{
          width: "100%",
          maxWidth: "420px",
          borderRadius: "16px",
          boxShadow: "0 8px 26px rgba(0,0,0,0.2)",
          margin: "0 auto",
          animation: "float 3s ease-in-out infinite",
        }}
      />

      {/* BUTTON */}
      <button
        style={{
          marginTop: "35px",
          padding: "12px 24px",
          background: "#d1b76e",
          color: "#2c1810",
          border: "none",
          borderRadius: "10px",
          fontSize: "1.1rem",
          fontWeight: "600",
          cursor: "pointer",
          transition: "transform 0.2s ease",
          animation: "fadeUp 0.8s ease forwards",
          animationDelay: "0.7s",
        }}
        onMouseEnter={(e) => (e.target.style.transform = "scale(1.07)")}
        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
      >
        Enter Store
      </button>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(22px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
