"use client";
import { useState } from "react";
import { getApiBase } from "../../src/lib/apiBase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(`${getApiBase()}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSent(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#fff",
          borderRadius: "12px",
          padding: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}
      >
        <h1 style={{ marginBottom: "10px", color: "#2c1810" }}>
          Επαναφορά κωδικού
        </h1>

        {sent ? (
          <p style={{ color: "#1f3b2e", marginTop: "20px" }}>
            📧 Αν το email υπάρχει στο σύστημά μας, σας στείλαμε οδηγίες
            επαναφοράς.
          </p>
        ) : (
          <>
            <p style={{ color: "#555", marginBottom: "20px" }}>
              Εισάγετε το email σας για να λάβετε σύνδεσμο επαναφοράς.
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "6px",
                  border: "1px solid #d4a76a",
                  marginBottom: "15px",
                  fontSize: "1rem",
                }}
              />

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#d1b76e",
                  color: "#2c1810",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                {loading ? "Αποστολή..." : "Αποστολή συνδέσμου"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
