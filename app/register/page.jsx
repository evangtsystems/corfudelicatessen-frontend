"use client";
import { useState } from "react";
import { getApiBase } from "../../src/lib/apiBase";

export default function RegisterPage() {
  const [form, setForm] = useState({
    vatNumber: "",
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    const res = await fetch(`${getApiBase()}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMsg(data.message);
  };

  const input = (name, placeholder, type = "text") => (
    <input
      type={type}
      placeholder={placeholder}
      value={form[name]}
      onChange={(e) => setForm({ ...form, [name]: e.target.value })}
      style={{
        width: "100%",
        padding: "10px 12px",
        border: "1px solid #ccc",
        borderRadius: 8,
      }}
    />
  );

  return (
    <div
      style={{
        background: "#fff",
        padding: 20,
        borderRadius: 12,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        maxWidth: 450,
        margin: "0 auto",
      }}
    >
      <h1 style={{ marginTop: 0, color: "#1f3b2e" }}>Εγγραφή Πελάτη</h1>

      <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
        {input("vatNumber", "ΑΦΜ")}
        {input("email", "Email", "email")}
        {input("password", "Κωδικός", "password")}

        <button
          type="submit"
          style={{
            padding: "10px 14px",
            background: "#d1b76e",
            color: "#1f3b2e",
            fontWeight: "bold",
            border: "none",
            borderRadius: 8,
          }}
        >
          Εγγραφή
        </button>
      </form>

      {msg && (
        <p style={{ marginTop: 12, whiteSpace: "pre-wrap" }}>
          {msg}
        </p>
      )}
    </div>
  );
}
