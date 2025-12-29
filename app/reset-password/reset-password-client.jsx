"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { getApiBase } from "../../src/lib/apiBase";

export default function ResetPasswordClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      const res = await fetch(`${getApiBase()}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      setMsg(data.message || "Done");
    } catch {
      setMsg("❌ Κάτι πήγε στραβά");
    }
  }

  if (!token) {
    return <p style={{ textAlign: "center" }}>❌ Invalid or missing token</p>;
  }

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "60px auto",
        background: "#fff",
        padding: 20,
        borderRadius: 12,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ color: "#1f3b2e" }}>Επαναφορά Κωδικού</h1>

      <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
        <input
          type="password"
          placeholder="Νέος κωδικός"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: 10,
            border: "1px solid #ccc",
            borderRadius: 8,
          }}
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
          Αλλαγή Κωδικού
        </button>
      </form>

      {msg && <p style={{ marginTop: 12, textAlign: "center" }}>{msg}</p>}
    </div>
  );
}
