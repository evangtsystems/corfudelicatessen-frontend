"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getApiBase } from "../lib/apiBase";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Ο κωδικός πρέπει να έχει τουλάχιστον 6 χαρακτήρες.");
      return;
    }

    if (password !== confirm) {
      setError("Οι κωδικοί δεν ταιριάζουν.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${getApiBase()}/api/auth/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, password }),
        }
      );

      if (!res.ok) {
        setError("Ο σύνδεσμος είναι άκυρος ή έχει λήξει.");
      } else {
        setDone(true);
        setTimeout(() => router.push("/login"), 2500);
      }
    } catch (err) {
      console.error(err);
      setError("Σφάλμα διακομιστή.");
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
          Νέος κωδικός
        </h1>

        {done ? (
          <p style={{ color: "#1f3b2e", marginTop: "20px" }}>
            ✅ Ο κωδικός άλλαξε. Μεταφορά στη σύνδεση…
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Νέος κωδικός"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #d4a76a",
                marginBottom: "10px",
                fontSize: "1rem",
              }}
            />

            <input
              type="password"
              placeholder="Επιβεβαίωση κωδικού"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #d4a76a",
                marginBottom: "10px",
                fontSize: "1rem",
              }}
            />

            {error && (
              <p style={{ color: "red", fontSize: "0.9rem" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "10px",
                background: "#d1b76e",
                color: "#2c1810",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {loading ? "Αποθήκευση..." : "Αλλαγή κωδικού"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
