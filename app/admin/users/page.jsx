"use client";
import { useEffect, useState } from "react";
import { getApiBase } from "../../../src/lib/apiBase";
import { getToken } from "../../../src/lib/auth";

const theme = { primary: "#1f3b2e", accent: "#d1b76e" };

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState("");
  const [viesResult, setViesResult] = useState(null);
  const token = getToken();

  const loadUsers = async () => {
    try {
      const res = await fetch(`${getApiBase()}/api/auth/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setUsers(data.users);
    } catch {
      setMsg("❌ Failed to load users");
    }
  };

  const approveUser = async (id) => {
    try {
      const res = await fetch(`${getApiBase()}/api/auth/approve/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setMsg("✅ User approved");
        loadUsers();
      } else setMsg("❌ Failed to approve");
    } catch {
      setMsg("❌ Network error");
    }
  };

  const disapproveUser = async (id) => {
    try {
      const res = await fetch(`${getApiBase()}/api/auth/disapprove/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setMsg("❌ User disapproved");
        loadUsers();
      } else setMsg("❌ Failed to disapprove");
    } catch {
      setMsg("❌ Network error");
    }
  };

  const checkVat = async (vat, userId) => {
  setMsg("⏳ Checking VIES…");

  try {
    const res = await fetch(`${getApiBase()}/api/auth/vies-check/EL/${vat}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();

    if (!data.success || !data.valid) {
      setMsg("❌ Το ΑΦΜ δεν βρέθηκε στο VIES.");
      setViesResult(null);
      return;
    }

    setViesResult({
      userId,
      name: data.name,
      address: data.address,
    });

    setMsg("✅ VIES valid");
  } catch {
    setMsg("❌ VIES service error");
  }
};


  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <h1 style={{ color: theme.primary, marginTop: 0 }}>Admin · Users</h1>
      {msg && <p>{msg}</p>}

      

      <div
        style={{
          display: "grid",
          gap: 12,
          background: "#fff",
          padding: 20,
          borderRadius: 12,
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        {users.length === 0 ? (
          <p>No users yet.</p>
        ) : (
          users.map((u) => (
            <div
              key={u._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #eee",
                paddingBottom: 10,
              }}
            >
              <div>

                {/* VIES RESULTS FOR THIS SPECIFIC USER */}
{viesResult && viesResult.userId === u._id && (
  <div
    style={{
      background: "#eef8f1",
      padding: 12,
      borderRadius: 6,
      marginTop: 10,
      border: "1px solid #cde6d3",
    }}
  >
    <strong style={{ color: theme.primary }}>VIES Info</strong>
    <div>Company: {viesResult.name || "(none)"}</div>
    <div>Address: {viesResult.address || "(none)"}</div>
  </div>
)}

                <strong>{u.companyName || u.email}</strong>
                <div style={{ fontSize: "0.9em", color: "#555" }}>{u.email}</div>
                <div style={{ fontSize: "0.9em" }}>VAT: {u.vatNumber}</div>
                <div style={{ fontSize: "0.9em" }}>
                  Role: {u.role} | {u.approved ? "✅ Approved" : "⏳ Pending"}
                </div>
              </div>

              <div style={{ display: "flex", gap: 10 }}>

  {/* Check VAT always available */}
  <button
   onClick={() => checkVat(u.vatNumber, u._id)}

    style={{
      background: "#e7e7e7",
      color: "#333",
      border: "none",
      borderRadius: 8,
      padding: "6px 10px",
    }}
  >
    Check VAT
  </button>

  {/* DO NOT SHOW APPROVE/DISAPPROVE FOR ADMIN */}
  {u.role !== "admin" && (
    <>
      {/* APPROVE appears if NOT approved */}
      {!u.approved && (
        <button
          onClick={() => approveUser(u._id)}
          style={{
            background: theme.accent,
            color: theme.primary,
            border: "none",
            borderRadius: 8,
            padding: "8px 14px",
            fontWeight: "bold",
          }}
        >
          Approve
        </button>
      )}

      {/* DISAPPROVE always appears for non-admin */}
      <button
        onClick={() => disapproveUser(u._id)}
        style={{
          background: "#ffdddd",
          color: "#a30000",
          border: "none",
          borderRadius: 8,
          padding: "8px 14px",
          fontWeight: "bold",
        }}
      >
        Disapprove
      </button>
    </>
  )}

</div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}


