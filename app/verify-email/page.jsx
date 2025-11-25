"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getApiBase } from "../../src/lib/apiBase";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [msg, setMsg] = useState("Γίνεται επιβεβαίωση...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setMsg("Άκυρος σύνδεσμος.");
      setLoading(false);
      return;
    }

    async function verify() {
      try {
        const res = await fetch(
          `${getApiBase()}/api/auth/verify-email?token=${token}`
        );
        const data = await res.json();
        setMsg(data.message);

        // optional redirect after success
        if (data.success) {
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        }
      } catch (e) {
        setMsg("Σφάλμα κατά την επιβεβαίωση.");
      } finally {
        setLoading(false);
      }
    }

    verify();
  }, [token, router]);

  return (
    <div
      style={{
        padding: 40,
        maxWidth: 480,
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ marginTop: 0 }}>Επιβεβαίωση Email</h1>
      <p>{msg}</p>
      {!loading && (
        <p style={{ fontSize: "0.9em", color: "#666" }}>
          {msg.includes("επιβεβαιώθηκε")
            ? "Θα μεταφερθείτε αυτόματα στη σελίδα σύνδεσης..."
            : ""}
        </p>
      )}
    </div>
  );
}
