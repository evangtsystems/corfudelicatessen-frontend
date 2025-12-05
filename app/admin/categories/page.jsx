"use client";

import { useEffect, useState } from "react";
import { getApiBase } from "../../../src/lib/apiBase";
import { getToken } from "../../../src/lib/auth";
import toast, { Toaster } from "react-hot-toast";

const theme = { primary: "#1f3b2e", accent: "#d1b76e" };

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
  main: "",
  subs: "",
  order: 0,
});


  const [editingId, setEditingId] = useState(null);

  const token = typeof window !== "undefined" ? getToken() : null;

 const loadCategories = async () => {
  try {
    const res = await fetch(`${getApiBase()}/api/categories/admin`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    if (data.success) {
      setCategories(
  (data.categories || []).map(cat => ({
    ...cat,
    main: cat.main ?? "",
    subs: Array.isArray(cat.subs) ? cat.subs : [],
    order: cat.order ?? 0,
  }))
);

    } else {
      toast.error("Failed to load categories");
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to load categories");
  }
};


  useEffect(() => {
    if (!token) return;
    loadCategories();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.main.trim()) {
      toast.error("Main category is required");
      return;
    }

    setLoading(true);

    const body = {
  main: form.main,
  subs: form.subs.split(",").map(s => s.trim()).filter(Boolean),
  order: form.order,
};



    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `${getApiBase()}/api/categories/admin/${editingId}`
      : `${getApiBase()}/api/categories/admin`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      setLoading(false);

      if (!data.success) {
        toast.error(data.message || "Save failed");
        return;
      }

      toast.success(editingId ? "Category updated" : "Category created");

      setForm({ main: "", subs: "", order: 0 });


      setEditingId(null);
  setCategories(prev =>
  prev.map(cat =>
    cat._id === editingId
      ? {
          ...cat,
          main: form.main,
          subs: form.subs
            .split(",")
            .map(s => s.trim())
            .filter(Boolean),
          order: form.order,
        }
      : cat
  )
);
;

    } catch (err) {
      console.error("Save category error:", err);
      setLoading(false);
      toast.error("Save failed");
    }
  };

  const startEdit = (cat) => {
  setEditingId(cat._id);
  setForm({
    main: cat.main,
    subs: cat.subs.join(", "),
    order: cat.order ?? 0,
  });
};



  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      const res = await fetch(`${getApiBase()}/api/categories/admin/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!data.success) {
        toast.error(data.message || "Delete failed");
        return;
      }

      toast.success("Category deleted");
      setCategories((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Delete category error:", err);
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
        {/* Admin Nav (same style as products) */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "20px",
            borderBottom: "2px solid #d1b76e",
            paddingBottom: "10px",
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
            🛍️ Προϊόντα
          </button>

          <button
            onClick={() => (window.location.href = "/admin/categories")}
            style={{
              background: "#d1b76e",
              color: "#1f3b2e",
              border: "none",
              borderRadius: 6,
              padding: "8px 14px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            🗂 Κατηγορίες
          </button>

          <button
            onClick={() => (window.location.href = "/admin/users")}
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
            👥 Χρήστες
          </button>
        </div>

        <h1 style={{ color: theme.primary, marginTop: 0 }}>
          Admin · Categories
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gap: 10,
            background: "#fff",
            padding: 16,
            borderRadius: 12,
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            marginBottom: 20,
          }}
        >
          <input
            type="text"
            value={form.main}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, main: e.target.value }))
            }
            placeholder="Main category (π.χ. Τρόφιμα)"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid #ccc",
            }}
          />

          <textarea
            value={form.subs}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, subs: e.target.value }))
            }
            placeholder="Subcategories, comma-separated (π.χ. Όσπρια, Σούπες & Ζωμοί)"
            rows={3}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid #ccc",
              resize: "vertical",
            }}
          />

          <input
            type="number"
            value={form.order}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, order: Number(e.target.value) }))
            }
            placeholder="Order (0, 1, 2...)"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid #ccc",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "10px 14px",
              border: "none",
              borderRadius: 8,
              background: loading ? "#c5b891" : theme.accent,
              color: theme.primary,
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading
              ? editingId
                ? "Saving..."
                : "Creating..."
              : editingId
              ? "Save Changes"
              : "Add Category"}
          </button>
        </form>

        {/* List */}
        <div
          style={{
            display: "grid",
            gap: 10,
          }}
        >
          {categories.map((cat) => (
            <div
              key={cat._id}
              style={{
                background: "#fff",
                borderRadius: 10,
                padding: 12,
                boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 8,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div
                    style={{
                      fontWeight: "bold",
                      color: theme.primary,
                      fontSize: 16,
                    }}
                  >
                    {cat.main
}
                  </div>
                  <div style={{ fontSize: 12, color: "#555" }}>
                    Order: {cat.order ?? 0}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => startEdit(cat)}
                    style={{
                      padding: "6px 10px",
                      borderRadius: 6,
                      border: "none",
                      background: "#e8e1cc",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    style={{
                      padding: "6px 10px",
                      borderRadius: 6,
                      border: "none",
                      background: "#c62828",
                      color: "#fff",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div style={{ fontSize: 13, color: "#444" }}>
                {cat.subs && cat.subs.length > 0 ? (
  <>
    <strong>Subcategories:</strong> {cat.subs.join(", ")}
  </>
) : (
  <em>No subcategories</em>
)}

              </div>
            </div>
          ))}

          {categories.length === 0 && (
            <p style={{ color: "#777", fontStyle: "italic" }}>
              No categories yet. Add the first one above.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
