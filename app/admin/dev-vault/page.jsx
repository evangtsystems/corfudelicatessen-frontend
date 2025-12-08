"use client";

import { useEffect, useState } from "react";
import { getApiBase } from "../../../src/lib/apiBase";
import { getToken } from "../../../src/lib/auth";
import toast, { Toaster } from "react-hot-toast";

const theme = { primary: "#1f3b2e", accent: "#d1b76e" };

export default function DevArchivePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [restoringId, setRestoringId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const token = typeof window !== "undefined" ? getToken() : null;

  const loadArchive = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${getApiBase()}/api/products/dev-archive`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setItems(data.items || []);
      } else {
        toast.error("Failed to load dev vault");
      }
    } catch (err) {
      console.error("Dev archive load error:", err);
      toast.error("Failed to load dev vault");
    }
  };

  useEffect(() => {
    loadArchive();
  }, [token]);

  const handleRestore = async (archiveId) => {
    if (!window.confirm("Restore this product back to the shop?")) return;

    setRestoringId(archiveId);
    try {
      const res = await fetch(
        `${getApiBase()}/api/products/dev-archive/restore/${archiveId}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setRestoringId(null);

      if (!data.success) {
        toast.error(data.message || "Restore failed");
        return;
      }

      toast.success("Product restored to active list");
      // you can also auto-remove from archive UI if you want:
      // setItems(prev => prev.filter(i => i._id !== archiveId));
    } catch (err) {
      console.error("Dev restore error:", err);
      setRestoringId(null);
      toast.error("Restore failed");
    }
  };

  const handleDeleteArchive = async (archiveId) => {
    if (
      !window.confirm(
        "Delete this archive snapshot? (Product itself will NOT be touched.)"
      )
    )
      return;

    setDeletingId(archiveId);
    try {
      const res = await fetch(
        `${getApiBase()}/api/products/dev-archive/${archiveId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setDeletingId(null);

      if (!data.success) {
        toast.error("Failed to delete archive entry");
        return;
      }

      setItems((prev) => prev.filter((i) => i._id !== archiveId));
      toast.success("Archive entry deleted");
    } catch (err) {
      console.error("Dev archive delete error:", err);
      setDeletingId(null);
      toast.error("Delete failed");
    }
  };

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#fff",
            color: "#222",
            borderRadius: 12,
            boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
          },
        }}
      />

      <div
        style={{
          padding: 20,
          paddingBottom: 80,
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        {/* Simple nav back to products */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: 20,
            borderBottom: "2px solid #d1b76e",
            paddingBottom: 10,
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => (window.location.href = "/admin/products")}
            style={{
              background: "#1f3b2e",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "8px 14px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            ← Back to Products
          </button>
        </div>

        <h1 style={{ color: theme.primary, marginTop: 0 }}>
          🛡 Developer Vault (Second Bin)
        </h1>
        <p style={{ opacity: 0.7, marginBottom: 16 }}>
          Only you should play here. These are snapshots of products that were
          deleted from the main catalog.
        </p>

        <button
          onClick={loadArchive}
          style={{
            marginBottom: 16,
            padding: "8px 14px",
            borderRadius: 8,
            border: "none",
            background: theme.accent,
            color: theme.primary,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Reload Vault
        </button>

        <div
          style={{
            display: "grid",
            gap: 12,
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            alignItems: "stretch",
          }}
        >
          {items.map((entry) => {
            const p = entry.snapshot || {};
            const img = p.imageUrl || p.img || "";

            return (
              <div
                key={entry._id}
                style={{
                  background: "#fff",
                  borderRadius: 10,
                  padding: 12,
                  boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {/* IMAGE */}
                <div
                  style={{
                    width: "100%",
                    height: 140,
                    background: "#f4f4f4",
                    borderRadius: 8,
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {img ? (
                    <img
                      src={img}
                      alt={p.name}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <span style={{ color: "#999" }}>No Image</span>
                  )}
                </div>

                <div style={{ fontSize: 14, fontWeight: "bold" }}>
                  {p.name || "(no name)"}
                </div>

                <div style={{ fontSize: 12, color: "#555" }}>
                  <strong>{p.mainCategory || "Uncategorized"}</strong>
                  {p.category ? ` · ${p.category}` : ""}
                </div>

                <div style={{ fontSize: 12, color: "#444" }}>
                  {p.description && p.description.length > 60
                    ? p.description.slice(0, 60) + "..."
                    : p.description}
                </div>

                <div style={{ fontSize: 13, color: "#777" }}>
                  Archived at:{" "}
                  {entry.archivedAt
                    ? new Date(entry.archivedAt).toLocaleString("el-GR")
                    : "-"}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    marginTop: "auto",
                  }}
                >
                  <button
                    onClick={() => handleRestore(entry._id)}
                    disabled={restoringId === entry._id}
                    style={{
                      flex: 1,
                      padding: "8px 10px",
                      borderRadius: 6,
                      border: "none",
                      background:
                        restoringId === entry._id ? "#c5b891" : theme.accent,
                      color: theme.primary,
                      fontWeight: "bold",
                      cursor:
                        restoringId === entry._id ? "not-allowed" : "pointer",
                    }}
                  >
                    {restoringId === entry._id ? "Restoring..." : "Restore"}
                  </button>

                  <button
                    onClick={() => handleDeleteArchive(entry._id)}
                    disabled={deletingId === entry._id}
                    style={{
                      flex: 1,
                      padding: "8px 10px",
                      borderRadius: 6,
                      border: "none",
                      background:
                        deletingId === entry._id ? "#999" : "#444",
                      color: "#fff",
                      fontWeight: "bold",
                      cursor:
                        deletingId === entry._id ? "not-allowed" : "pointer",
                    }}
                  >
                    {deletingId === entry._id ? "Deleting..." : "Delete entry"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {items.length === 0 && (
          <p style={{ marginTop: 20, opacity: 0.7 }}>
            Vault is empty. Once products are deleted, snapshots will appear
            here automatically.
          </p>
        )}
      </div>
    </>
  );
}
