"use client";

export default function WhatsAppChat() {
  const phone = "+306978485230"; // 👈 REPLACE with your WhatsApp number
  const message = encodeURIComponent(
  "Καλησπέρα σας, θα ήθελα πληροφορίες για χονδρική συνεργασία."
);

  

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: 22,
        right: 22,
        width: 58,
        height: 58,
        borderRadius: "50%",
        background: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        zIndex: 999999,
        cursor: "pointer",
      }}
      aria-label="WhatsApp chat"
    >
      {/* WhatsApp SVG ICON */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="30"
        height="30"
        fill="#fff"
      >
        <path d="M16 0C7.164 0 0 7.163 0 16c0 2.837.74 5.594 2.144 8.02L0 32l8.203-2.113A15.935 15.935 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.09c-2.5 0-4.94-.67-7.058-1.94l-.506-.3-4.87 1.254 1.297-4.74-.33-.49A13.11 13.11 0 1 1 16 29.09zm7.46-9.78c-.41-.2-2.43-1.2-2.81-1.34-.38-.14-.66-.2-.94.2-.28.41-1.08 1.34-1.32 1.62-.24.27-.49.31-.9.1-.41-.2-1.73-.64-3.3-2.04-1.22-1.09-2.04-2.43-2.28-2.84-.24-.41-.03-.63.18-.83.19-.19.41-.49.61-.73.2-.24.27-.41.41-.69.14-.27.07-.51-.03-.73-.1-.2-.94-2.27-1.29-3.11-.34-.83-.69-.72-.94-.73l-.8-.01c-.27 0-.73.1-1.11.51-.38.41-1.46 1.43-1.46 3.49 0 2.05 1.5 4.04 1.71 4.32.2.27 2.96 4.52 7.18 6.34 1 .43 1.78.69 2.39.88 1 .32 1.9.27 2.61.16.8-.12 2.43-.99 2.77-1.94.34-.95.34-1.76.24-1.94-.1-.17-.38-.27-.79-.47z" />
      </svg>
    </a>
  );
}
