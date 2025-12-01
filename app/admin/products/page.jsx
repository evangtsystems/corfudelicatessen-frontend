"use client";
import { useEffect, useState } from "react";
import { getApiBase } from "../../../src/lib/apiBase";
import { getToken } from "../../../src/lib/auth";

const theme = { primary: "#1f3b2e", accent: "#d1b76e" };

export default function AdminProductsPage() {
  const [hydrated, setHydrated] = useState(false);
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    mainCategory: "",
    category: "",
    href: "",
    img: "",
    price: "",
  });

  const [msg, setMsg] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    mainCategory: "",
    category: "",
    href: "",
    img: "",
    imageUrl: "",
    price: "",
  });

  // categories from backend /api/categories
  const [categoriesTree, setCategoriesTree] = useState(null);
  const [categoriesError, setCategoriesError] = useState("");

  useEffect(() => {
    setHydrated(true);
  }, []);

  const token = typeof window !== "undefined" ? getToken() : null;

  const loadProducts = async () => {
    try {
      const res = await fetch(`${getApiBase()}/api/products`);
      const data = await res.json();
      if (data.success) setProducts(data.products);
    } catch (err) {
      console.error("Error loading products:", err);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await fetch(`${getApiBase()}/api/categories`);
      const data = await res.json();
      if (data && typeof data === "object") {
        setCategoriesTree(data);
        setCategoriesError("");
      } else {
        setCategoriesError("Δεν βρέθηκαν κατηγορίες από το backend.");
      }
    } catch (err) {
      console.error("Error loading categories:", err);
      setCategoriesError("Σφάλμα φόρτωσης κατηγοριών.");
    }
  };

  useEffect(() => {
    if (!hydrated) return;
    loadProducts();
    loadCategories();
  }, [hydrated]);

  const save = async (e) => {
    e.preventDefault();
    setMsg("");

    const image = form.img;
    const body = {
      name: form.name,
      description: form.description,
      mainCategory: form.mainCategory,
      category: form.category,
      href: form.href,
      img: image || "",
      imageUrl: image || "", // keep both for compatibility
      price:
        form.price === "" || form.price === null
          ? null
          : Number(form.price) || 0,
    };

    try {
      const res = await fetch(`${getApiBase()}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      setMsg(data.success ? "✅ Product added" : "❌ Failed");
      if (data.success) {
        setForm({
          name: "",
          description: "",
          mainCategory: "",
          category: "",
          href: "",
          img: "",
          price: "",
        });
        loadProducts();
      }
    } catch (err) {
      console.error("Failed to save product:", err);
      setMsg("❌ Failed");
    }
  };

  const update = async (id, patch) => {
  try {
    const res = await fetch(`${getApiBase()}/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(patch),
    });

    const data = await res.json();
    if (!data.success) {
      setMsg("❌ Update failed");
      return;
    }

    // 🔥 INSTANT UI update — smooth, no lag
    setProducts((prev) =>
      prev.map((p) => (p._id === id ? { ...p, ...patch } : p))
    );

    setMsg("✅ Product updated");
    setEditingId(null);

  } catch (err) {
    console.error("Failed to update product:", err);
    setMsg("❌ Update failed");
  }
};


  const del = async (id) => {
    try {
      await fetch(`${getApiBase()}/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      loadProducts();
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  const input = (name, placeholder, type = "text") => (
    <input
      type={type}
      value={form[name]}
      placeholder={placeholder}
      onChange={(e) => setForm({ ...form, [name]: e.target.value })}
      style={{
        width: "100%",
        padding: "10px 12px",
        border: "1px solid #ccc",
        borderRadius: 8,
      }}
    />
  );

  const editInput = (name, placeholder, type = "text") => (
    <input
      type={type}
      value={editForm[name]}
      placeholder={placeholder}
      onChange={(e) => setEditForm({ ...editForm, [name]: e.target.value })}
      style={{
        width: "100%",
        padding: "8px 10px",
        border: "1px solid #ccc",
        borderRadius: 8,
        marginBottom: 6,
      }}
    />
  );

  const startEdit = (p) => {
    setEditingId(p._id);
    setEditForm({
      name: p.name || "",
      description: p.description || "",
      mainCategory: p.mainCategory || "",
      category: p.category || "",
      href: p.href || "",
      img: p.img || "",
      imageUrl: p.imageUrl || "",
      price:
        typeof p.price === "number"
          ? p.price.toString()
          : p.price === null || p.price === undefined
          ? ""
          : String(p.price),
    });
    setMsg("");
  };

  const saveEdit = (id) => {
  const patch = {
    name: editForm.name,
    description: editForm.description,
    mainCategory: editForm.mainCategory,
    category: editForm.category,
    href: editForm.href,
    img: editForm.img,
    imageUrl: editForm.imageUrl,
    price:
      editForm.price === "" || editForm.price === null
        ? null
        : Number(editForm.price) || 0,
  };

  update(id, patch);
};


  const mainCategories = categoriesTree ? Object.keys(categoriesTree) : [];
  const subCategoriesForForm =
    categoriesTree && form.mainCategory
      ? categoriesTree[form.mainCategory] || []
      : [];

  if (!hydrated) return null; // 🧩 prevent hydration mismatch

  const subCategoriesForEdit =
  categoriesTree && editForm.mainCategory
    ? categoriesTree[editForm.mainCategory] || []
    : [];


  return (
    <div style={{ padding: 20 }}>
      {/* Admin Navigation Bar */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "25px",
          borderBottom: "2px solid #d1b76e",
          paddingBottom: "10px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => (window.location.href = "/admin/products")}
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
          🛍️ Προϊόντα
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

      {/* Header */}
      <h1 style={{ color: theme.primary, marginTop: 0 }}>Admin · Products</h1>

      {/* Add Product Form */}
      {editingId === null ? (
  // --- ADD PRODUCT FORM ---
  <form
    onSubmit={save}
    style={{
      display: "grid",
      gap: 10,
      background: "#fff",
      padding: 16,
      borderRadius: 12,
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      marginBottom: 16,
    }}
  >
    {input("name", "Name")}
  {input("description", "Description")}
    {/* MAIN CATEGORY DROPDOWN */}
{mainCategories.length > 0 ? (
  <select
    value={form.mainCategory}
    onChange={(e) =>
      setForm({
        ...form,
        mainCategory: e.target.value,
        category: "", // reset subcategory
      })
    }
    style={{
      width: "100%",
      padding: "10px 12px",
      borderRadius: 8,
      border: "1px solid #ccc",
    }}
  >
    <option value="">-- Select Main Category --</option>
    {mainCategories.map((mc) => (
      <option key={mc} value={mc}>
        {mc}
      </option>
    ))}
  </select>
) : (
  input("mainCategory", "Main Category")
)}

{/* SUBCATEGORY DROPDOWN */}
{mainCategories.length > 0 && form.mainCategory ? (
  <select
    value={form.category}
    onChange={(e) =>
      setForm({
        ...form,
        category: e.target.value,
      })
    }
    style={{
      width: "100%",
      padding: "10px 12px",
      borderRadius: 8,
      border: "1px solid #ccc",
    }}
  >
    <option value="">-- Select Category --</option>
    {subCategoriesForForm.map((sub) => (
      <option key={sub} value={sub}>
        {sub}
      </option>
    ))}
  </select>
) : (
  input("category", "Category")
)}

{input("price", "Price (€)", "number")}
{input("img", "Image URL (img)")}


    <button
      type="submit"
      style={{
        padding: "10px 14px",
        border: "none",
        borderRadius: 8,
        background: theme.accent,
        color: theme.primary,
        fontWeight: "bold",
      }}
    >
      Add product
    </button>
    {msg && <p>{msg}</p>}
  </form>
) : (
  // --- EDIT PRODUCT FORM ---
  <form
   onSubmit={(e) => {
  e.preventDefault();
  saveEdit(editingId);
}}

    style={{
      display: "grid",
      gap: 10,
      background: "#fff",
      padding: 16,
      borderRadius: 12,
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      marginBottom: 16,
    }}
  >
    {editInput("name", "Name")}
    {editInput("description", "Description")}
    {editInput("href", "Product URL (href)")}
   {/* MAIN CATEGORY DROPDOWN */}
{mainCategories.length > 0 ? (
  <select
    value={editForm.mainCategory}
    onChange={(e) =>
      setEditForm({
        ...editForm,
        mainCategory: e.target.value,
        category: "", // reset subcategory
      })
    }
    style={{
      width: "100%",
      padding: "10px 12px",
      borderRadius: 8,
      border: "1px solid #ccc",
    }}
  >
    <option value="">-- Select Main Category --</option>
    {mainCategories.map((mc) => (
      <option key={mc} value={mc}>
        {mc}
      </option>
    ))}
  </select>
) : (
  editInput("mainCategory", "Main Category")
)}

{/* SUBCATEGORY DROPDOWN */}
{mainCategories.length > 0 && editForm.mainCategory ? (
  <select
    value={editForm.category}
    onChange={(e) =>
      setEditForm({
        ...editForm,
        category: e.target.value,
      })
    }
    style={{
      width: "100%",
      padding: "10px 12px",
      borderRadius: 8,
      border: "1px solid #ccc",
    }}
  >
    <option value="">-- Select Category --</option>
    {subCategoriesForEdit.map((sub) => (
      <option key={sub} value={sub}>
        {sub}
      </option>
    ))}
  </select>
) : (
  editInput("category", "Category")
)}

    {editInput("img", "Image URL (img)")}
    {editInput("imageUrl", "Alternative Image URL (imageUrl)")}
    {editInput("price", "Price (€)", "number")}

    <div style={{ display: "flex", gap: 10 }}>
      <button
        type="button"
        onClick={() => saveEdit(editingId)}

        style={{
          flex: 1,
          padding: "10px 14px",
          border: "none",
          borderRadius: 8,
          background: theme.accent,
          color: theme.primary,
          fontWeight: "bold",
        }}
      >
        Save Changes
      </button>

      <button
        type="button"
        onClick={() => setEditingId(null)}
        style={{
          flex: 1,
          padding: "10px 14px",
          border: "none",
          borderRadius: 8,
          background: "#ccc",
          color: "#333",
          fontWeight: "bold",
        }}
      >
        Cancel
      </button>
    </div>
  </form>
)}


      {/* Product List */}
     {/* Product List — hidden entirely while editing */}
{editingId === null && (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
      gap: 12,
    }}
  >
    {products.map((p) => (
      <div
        key={p._id}
        style={{
          background: "#fff",
          padding: 12,
          borderRadius: 12,
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            height: 120,
            background: "#faf8f5",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {p.img || p.imageUrl ? (
            <img
              src={p.img || p.imageUrl}
              alt={p.name}
              style={{ maxHeight: 100, maxWidth: "90%" }}
            />
          ) : (
            <span>{p.category || "Product"}</span>
          )}
        </div>

        <h3
          style={{
            margin: "10px 0 6px 0",
            color: theme.primary,
          }}
        >
          {p.name}
        </h3>

        <div style={{ color: "#555", minHeight: 36 }}>
          {p.description}
        </div>

        <div
          style={{
            fontSize: 12,
            color: "#777",
            marginTop: 4,
          }}
        >
          <strong>{p.mainCategory}</strong>
          {p.category ? ` · ${p.category}` : ""}
        </div>

        <div style={{ margin: "6px 0" }}>
          <strong>
            {p.price != null ? `€ ${Number(p.price).toFixed(2)}` : "—"}
          </strong>
        </div>

        <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
          <button
            onClick={() => {
              window.scrollTo({ top: 0 });
              setTimeout(() => startEdit(p), 1);
            }}
            style={{
              flex: 1,
              padding: "8px",
              border: "none",
              borderRadius: 8,
              background: "#e8e1cc",
              color: theme.primary,
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Edit
          </button>

          <button
            onClick={() => del(p._id)}
            style={{
              flex: 1,
              padding: "8px",
              border: "none",
              borderRadius: 8,
              background: "#c62828",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
)}

    </div>
  );
}
