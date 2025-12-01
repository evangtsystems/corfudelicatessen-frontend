"use client";
import { useState } from "react";
import { getApiBase } from "../../src/lib/apiBase";
import { setToken } from "../../src/lib/auth";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(null); // <-- added

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${getApiBase()}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setToken(data.token);
        setMsg("✅ Success! Redirecting...");
        setError(null);

        setTimeout(() => {
          if (data.user.role === "admin") {
            window.location.href = "/admin/products";
          } else {
            window.location.href = "/shop";
          }
        }, 400);
      } else {
        setMsg(data.message || "❌ Login failed");
        setError(data); // <-- store backend error
      }
    } catch (err) {
      console.error("Login error:", err);
      setMsg("❌ Something went wrong");
    }
  };

  async function resendVerification(email) {
    try {
      const res = await fetch(`${getApiBase()}/api/auth/resend-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMsg(data.message);
    } catch {
      setMsg("❌ Σφάλμα αποστολής νέου συνδέσμου.");
    }
  }

  return (
    <div
      style={{
        background: "#fff",
        padding: 20,
        borderRadius: 12,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        maxWidth: 400,
        margin: "60px auto",
      }}
    >
      <h1 style={{ marginTop: 0, color: "#1f3b2e" }}>Σύνδεση</h1>

      <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={{
            padding: 10,
            border: "1px solid #ccc",
            borderRadius: 8,
          }}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={{
            padding: 10,
            border: "1px solid #ccc",
            borderRadius: 8,
          }}
          required
        />

        <button
          type="submit"
          style={{
            padding: "10px 14px",
            border: "none",
            borderRadius: 8,
            background: "#d1b76e",
            color: "#1f3b2e",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>

      {msg && <p style={{ marginTop: 12, textAlign: "center" }}>{msg}</p>}

      {error?.unverified && (
        <div style={{ textAlign: "center", marginTop: 12 }}>
          <button
            onClick={() => resendVerification(error.email)}
            style={{
              padding: "10px 14px",
              border: "none",
              borderRadius: 8,
              background: "#1f3b2e",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Στείλε νέο σύνδεσμο επιβεβαίωσης
          </button>
        </div>
      )}

      <p style={{ marginTop: 8, textAlign: "center" }}>
        <a href="/register" style={{ color: "#1f3b2e" }}>
          Create an account
        </a>
      </p>
    </div>
  );
}
