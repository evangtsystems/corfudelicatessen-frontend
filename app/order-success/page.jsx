export default function OrderSuccess({ searchParams }) {
  const orderId = searchParams?.orderId;

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "80px auto",
        background: "#fff",
        padding: 30,
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "#1f3b2e" }}>✅ Order placed successfully</h1>

      {orderId && (
        <p style={{ marginTop: 10 }}>
          <strong>Order ID:</strong> {orderId}
        </p>
      )}

      <p style={{ marginTop: 16 }}>
        Thank you for your order. We will process it shortly.
      </p>

      <div style={{ marginTop: 30 }}>
        <a
          href="/shop"
          style={{
            padding: "10px 16px",
            background: "#d1b76e",
            color: "#1f3b2e",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Continue shopping
        </a>
      </div>
    </div>
  );
}
