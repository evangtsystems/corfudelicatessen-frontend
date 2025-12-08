"use client";
import { useEffect, useState,useRef } from "react";
import { getApiBase } from "../../../src/lib/apiBase";
import { getToken } from "../../../src/lib/auth";
import { VariableSizeList as List } from "react-window";
import DeleteModal from "../../../src/components/DeleteModal";
import toast, { Toaster } from "react-hot-toast";
import AdminProductFilters from "../../../src/components/AdminProductFilters";






const theme = { primary: "#1f3b2e", accent: "#d1b76e" };


export default function AdminProductsPage() {

  
  const [hydrated, setHydrated] = useState(false);
  const [products, setProducts] = useState([]);
  const heightCache = useRef({});
const listRef = useRef();
const setRowHeight = (index, size) => {
  if (heightCache.current[index] !== size) {
    heightCache.current[index] = size;
    if (listRef.current) {
      listRef.current.resetAfterIndex(index);
    }
  }
};

const [loading, setLoading] = useState(false);
const [selectedProducts, setSelectedProducts] = useState([]);
const [filterMain, setFilterMain] = useState("");
const [filterCategory, setFilterCategory] = useState("");
const [filteredProducts, setFilteredProducts] = useState([]);






  const [form, setForm] = useState({
    name: "",
    description: "",
    mainCategory: "",
    category: "",
    href: "",
    price: "",
    imageFile: null,
});
const [visibleCount, setVisibleCount] = useState(60); // show 60 items first

const [deleteTarget, setDeleteTarget] = useState(null);



  const [msg, setMsg] = useState("");
  const [editingId, setEditingId] = useState(null);
  // Prevent UI freeze by delaying heavy grid rendering
const [ready, setReady] = useState(false);

useEffect(() => {
  // Remove any additional default toast containers created by React Hot Toast
  const extra = document.querySelectorAll('#__react-hot-toast');
  extra.forEach((el, i) => {
    if (i > 0) el.remove();  // keep first instance only
  });

  // Remove toasts from previous prerendering/caching
  toast.remove();
}, []);

useEffect(() => {
  let list = products;

  if (filterMain) {
    list = list.filter((p) => p.mainCategory === filterMain);
  }

  if (filterCategory) {
    list = list.filter((p) => p.category === filterCategory);
  }

  setFilteredProducts(list);
}, [filterMain, filterCategory, products]);



useEffect(() => {
  setTimeout(() => setReady(true), 50);
}, []);

  

  
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    mainCategory: "",
    category: "",
    href: "",
    imageUrl: "",
    price: "",
    imageFile: null,
});
 const ProductRow = ({ index, style, data }) => {
  const p = data[index];
  const rowRef = useRef(null);
  const imageSrc = p.imageUrl || p.img || null;

 useEffect(() => {
  if (rowRef.current) {
    const height = rowRef.current.getBoundingClientRect().height;
    setRowHeight(index, height);
  }
}, [index, data]);


  return (
    <div ref={rowRef} style={{ ...style, padding: "12px 10px" }}>
      <div
  key={p._id}
  style={{
    background: "#fff",
    padding: 16,
    borderRadius: 12,
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    minHeight: 280,   // ✅ NEW: consistent card height
    boxSizing: "border-box",
  }}
>

        {/* IMAGE */}
        {/* IMAGE */}
<div
  style={{
    width: "100%",
    height: 120,
    background: "#f4f4f4",
    borderRadius: 10,
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  {p.imageUrl || p.img ? (
    <img
      src={p.imageUrl || p.img}
      alt={p.name}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  ) : (
    <span style={{ color: "#999" }}>No Image</span>
  )}
</div>


        {/* TITLE */}
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: "600" }}>
          {p.name}
        </h3>

        {/* CATEGORY */}
        <div style={{ fontSize: 14, color: "#666" }}>
          <strong>{p.mainCategory}</strong>
          {p.category ? ` · ${p.category}` : ""}
        </div>

        {/* DESCRIPTION */}
        <div style={{ fontSize: 14, color: "#444" }}>{p.description}</div>

        {/* PRICE */}
        <div style={{ fontWeight: "bold", fontSize: 16 }}>
          {p.price ? `€ ${Number(p.price).toFixed(2)}` : "—"}
        </div>

        {/* BUTTONS */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 6,
          }}
        >
          <button
            onClick={() => {
              window.scrollTo({ top: 0 });
              setTimeout(() => startEdit(p), 1);
            }}
            style={{
              flex: 1,
              padding: "10px",
              background: "#e8e1cc",
              borderRadius: 8,
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
            }}
          >
            Edit
          </button>

          <button
            onClick={() => del(p._id)}
            style={{
              flex: 1,
              padding: "10px",
              background: "#c62828",
              borderRadius: 8,
              fontWeight: "bold",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};



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
if (data.success) setProducts(data.products || []);

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

  // When categoriesTree becomes available, re-apply the correct mainCategory/category
useEffect(() => {
  if (editingId && products.length > 0) {
    const p = products.find(p => p._id === editingId);
    if (p) {
      setEditForm({
        name: p.name || "",
        description: p.description || "",
        mainCategory: p.mainCategory || "",
        category: p.category || "",
        href: p.href || "",
        price: p.price || "",
        imageUrl: p.imageUrl || p.img || "",
        imageFile: null,
      });
    }
  }
}, [editingId, products]);


const save = async (e) => {
  e.preventDefault();
  setMsg("");
  setLoading(true); // spinner ON

  const f = new FormData();
  f.append("name", form.name);
  f.append("description", form.description || "");
  f.append("mainCategory", form.mainCategory || "");
  f.append("category", form.category || "");
  f.append("href", form.href || "");
  f.append("price", form.price || "");

  if (form.imageFile) f.append("image", form.imageFile);

  const res = await fetch(`${getApiBase()}/api/products`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: f,
  });

  const data = await res.json();

  if (!data.success) {
    setLoading(false);
    toast.error("❌ Failed to add product");
    return;
  }

  // ⏳ Spinner stays visible for EXACTLY 2 seconds
  setTimeout(() => {
    setLoading(false); // spinner OFF

    // 🎉 Show toast AFTER spinner disappears
    toast.success("✅ Product added successfully!", {
      duration: 6000,
    });

    // Reset form
    setForm({
      name: "",
      description: "",
      mainCategory: "",
      category: "",
      href: "",
      price: "",
      imageFile: null,
    });

    // Add product visually
    setProducts((prev) => [data.product, ...prev]);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

  }, 2000);
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
    const res = await fetch(`${getApiBase()}/api/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    if (!data.success) {
      toast.error("Delete failed");
      return;
    }

    toast.success("Moved to trash");

    setProducts((prev) => prev.filter((p) => p._id !== id));
  } catch (err) {
    console.error("Failed to delete product:", err);
    toast.error("Delete error");
  }
};


  const bulkDelete = async () => {
  if (selectedProducts.length === 0) return;

  const confirmed = window.confirm(
    `Are you sure you want to move ${selectedProducts.length} products to trash?`
  );
  if (!confirmed) return;

  try {
    const res = await fetch(`${getApiBase()}/api/products/bulk-delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ids: selectedProducts }),
    });

    const data = await res.json();
    if (!data.success) {
      toast.error("Failed");
      return;
    }

    // Remove visually
    setProducts((prev) =>
      prev.filter((p) => !selectedProducts.includes(p._id))
    );

    setSelectedProducts([]);
    toast.success("Moved to trash");
  } catch (err) {
    console.error(err);
    toast.error("Server error");
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
      imageUrl: p.imageUrl || "",
imageFile: null,

      price:
        typeof p.price === "number"
          ? p.price.toString()
          : p.price === null || p.price === undefined
          ? ""
          : String(p.price),
    });
    setMsg("");
  };
const saveEdit = async (id) => {
  setLoading(true);   // start spinner
  setMsg("");

  const f = new FormData();
  f.append("name", editForm.name);
  f.append("description", editForm.description || "");
  f.append("href", editForm.href || "");
  f.append("price", editForm.price || "");
  f.append("mainCategory", editForm.mainCategory || "");
  f.append("category", editForm.category || "");

  if (editForm.imageFile) {
    f.append("image", editForm.imageFile);
  }

  const res = await fetch(`${getApiBase()}/api/products/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: f,
  });

  const data = await res.json();

  // keep spinner for 2 seconds for smoother experience
  setTimeout(() => {
    setLoading(false);

    if (!data.success) {
      toast.error("❌ Update failed");
      return;
    }

    toast.success("✅ Product updated!", {
      duration: 6000,
    });

    setEditingId(null);

    setProducts((prev) =>
      prev.map((p) => (p._id === id ? { ...p, ...data.product } : p))
    );
  }, 2000);
};







  const mainCategories = categoriesTree ? Object.keys(categoriesTree) : [];
  const subCategoriesForForm =
    categoriesTree && form.mainCategory
      ? categoriesTree[form.mainCategory] || []
      : [];

      useEffect(() => {
  if (products.length > 0) {
    console.log("PRODUCT SAMPLE:", products[0]);
  }
}, [products]);

useEffect(() => {
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
      setVisibleCount((prev) => prev + 60); // load 60 more each time
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  if (!hydrated) return null; // 🧩 prevent hydration mismatch
  

  const subCategoriesForEdit =
  categoriesTree && editForm.mainCategory
    ? categoriesTree[editForm.mainCategory] || []
    : [];



  return (
  <>
    <Toaster
  position="top-center"
  containerClassName="custom-toast-container"
  toastOptions={{
    className: "custom-toast",
    duration: 5000,
  }}
/>







    <div className="admin-products-page"
  style={{
    padding: 20,
    paddingBottom: 120,
    boxSizing: "border-box",
    width: "100%",
  }}
>




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
  onClick={() => (window.location.href = "/admin/products/trash")}
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
  🗑️ Κάδος
</button>


        <button
    onClick={() => (window.location.href = "/admin/categories")}
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

                {/* 🔐 Developer-only vault (second bin) */}
        {typeof window !== "undefined" &&
 localStorage.getItem("devMode") === "true" && (
  <button
    onClick={() => (window.location.href = "/admin/products/dev-vault")}
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
    🛡️ Dev Vault
  </button>
)}




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
      category: "", // reset category
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
<input
  type="file"
  accept="image/*"
  onChange={(e) =>
    setForm({ ...form, imageFile: e.target.files[0] })
  }
  style={{
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #ccc",
    borderRadius: 8,
  }}
/>

{/* preview image (optional) */}
{form.imageFile && (
  <img
    src={URL.createObjectURL(form.imageFile)}
    style={{ width: 120, marginTop: 10, borderRadius: 8 }}
  />
)}



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
    opacity: loading ? 0.7 : 1,
    cursor: loading ? "not-allowed" : "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  }}
>
  {loading ? (
    <div
      style={{
        width: 16,
        height: 16,
        border: "3px solid #fff",
        borderTop: "3px solid transparent",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }}
    ></div>
  ) : null}
  {loading ? "Uploading..." : "Add Product"}
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

    {/* FILE UPLOAD + PREVIEW (FULL WORKING VERSION) */}
<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>

  {/* EXISTING IMAGE THUMBNAIL */}
  {editForm.imageUrl && !editForm.imageFile && (
    <img
      src={editForm.imageUrl}
      alt="Current"
      style={{
        width: 140,
        borderRadius: 8,
        border: "1px solid #ddd",
        objectFit: "contain",
        padding: 4,
        background: "#fff",
      }}
    />
  )}

  {/* NEW IMAGE PREVIEW */}
  {editForm.imageFile && (
    <img
      src={URL.createObjectURL(editForm.imageFile)}
      alt="Preview"
      style={{
        width: 140,
        borderRadius: 8,
        border: "1px solid #ddd",
        objectFit: "contain",
        padding: 4,
        background: "#fff",
      }}
    />
  )}

  {/* CUSTOM FILENAME LABEL */}
  <div
    style={{
      fontSize: 13,
      color: "#444",
      fontStyle: "italic",
      marginBottom: -4,
      marginTop: 6,
    }}
  >
    {editForm.imageFile
      ? `Selected: ${editForm.imageFile.name}`
      : editForm.imageUrl
      ? `Current: ${editForm.imageUrl.split("/").pop()}`
      : "No image uploaded"}
  </div>

  {/* ACTUAL FILE INPUT */}
  <input
    type="file"
    accept="image/*"
    onChange={(e) =>
      setEditForm({
        ...editForm,
        imageFile: e.target.files[0],
      })
    }
    style={{
      width: "100%",
      padding: "10px 12px",
      border: "1px solid #ccc",
      borderRadius: 8,
    }}
  />
</div>


    {editInput("price", "Price (€)", "number")}

    <div style={{ display: "flex", gap: 10 }}>
      <button
  type="submit"
  disabled={loading}
  style={{
    flex: 1,
    padding: "10px 14px",
    border: "none",
    borderRadius: 8,
    background: loading ? "#c5b891" : theme.accent,
    color: theme.primary,
    fontWeight: "bold",
    opacity: loading ? 0.7 : 1,
    cursor: loading ? "not-allowed" : "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  }}
>
  {loading && (
    <div
      style={{
        width: 16,
        height: 16,
        border: "3px solid #fff",
        borderTop: "3px solid transparent",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }}
    />
  )}

  {loading ? "Saving..." : "Save Changes"}
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


  {/* Product List — hidden entirely while editing */}
{editingId === null && ready && (
  <>

    {/* SELECT ALL */}
    <div style={{ marginBottom: 15, display: "flex", alignItems: "center", gap: 10 }}>
      <input
        type="checkbox"
        checked={selectedProducts.length === products.length && products.length > 0}
        onChange={(e) => {
          if (e.target.checked) {
            setSelectedProducts(products.map((p) => p._id));
          } else {
            setSelectedProducts([]);
          }
        }}
        style={{ width: 18, height: 18 }}
      />
      <span>Select All Products</span>
    </div>


    <AdminProductFilters
  mainCategories={mainCategories}
  categoriesTree={categoriesTree}
  filterMain={filterMain}
  filterCategory={filterCategory}
  setFilterMain={setFilterMain}
  setFilterCategory={setFilterCategory}
/>


    {/* PRODUCT GRID */}
   <div
  id="product-grid"
  style={{
    marginTop: 20,
    paddingBottom: 20,
    width: "100%",
    boxSizing: "border-box",
  }}
>
  {/* EMPTY RESULT MESSAGE */}
  {filteredProducts.length === 0 && (
    <p style={{ opacity: 0.6, marginTop: 20 }}>
      No products found for this category.
    </p>
  )}

  {/* ALWAYS USE filteredProducts */}
  {filteredProducts
    .slice(0, visibleCount)
    .map((p) => (


        <div key={p._id} style={{ position: "relative" }}>

          {/* SELECT CHECKBOX */}
          <input
            type="checkbox"
            checked={selectedProducts.includes(p._id)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedProducts((prev) => [...prev, p._id]);
              } else {
                setSelectedProducts((prev) =>
                  prev.filter((id) => id !== p._id)
                );
              }
            }}
            style={{
              position: "absolute",
              top: 8,
              left: 8,
              width: 18,
              height: 18,
              zIndex: 10,
            }}
          />

          {/* ORIGINAL CARD WRAPPER */}
          <div
            style={{
              background: "#fff",
              padding: 12,
              borderRadius: 12,
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              minHeight: 330,
            }}
          >
            {/* IMAGE */}
            <div
              style={{
                width: "100%",
                height: 160,
                background: "#f4f4f4",
                borderRadius: 10,
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {ready ? (
                p.imageUrl || p.img ? (
                  <img
                    src={p.imageUrl || p.img}
                    alt={p.name}
                    loading="lazy"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      display: "block",
                      margin: "0 auto",
                      padding: 8,
                    }}
                  />
                ) : (
                  <span style={{ color: "#999" }}>No Image</span>
                )
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "#eee",
                  }}
                />
              )}
            </div>

            <h3
              style={{
                margin: 0,
                fontSize: 14,
                fontWeight: "600",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {p.name}
            </h3>

            <div style={{ fontSize: 12, color: "#666" }}>
              <strong>{p.mainCategory}</strong>
              {p.category ? ` · ${p.category}` : ""}
            </div>

            <div style={{ fontSize: 12, color: "#444" }}>
              {p.description && p.description.length > 40
                ? p.description.slice(0, 40) + "..."
                : p.description}
            </div>

            <div style={{ fontWeight: "bold", fontSize: 14 }}>
              {p.price ? `€ ${Number(p.price).toFixed(2)}` : "—"}
            </div>

            {/* BUTTONS */}
            <div
              style={{
                display: "flex",
                gap: 6,
                marginTop: "auto",
              }}
            >
              <button
                onClick={() => {
                  window.scrollTo({ top: 0 });
                  setTimeout(() => startEdit(p), 1);
                }}
                style={{
                  flex: 1,
                  padding: "6px",
                  background: "#e8e1cc",
                  borderRadius: 6,
                  fontWeight: "bold",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12,
                }}
              >
                Edit
              </button>

              <button
                onClick={() => setDeleteTarget(p)}
                style={{
                  flex: 1,
                  padding: "6px",
                  background: "#c62828",
                  borderRadius: 6,
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: 12,
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </>
)}
 {/* ✅ Fully closes the conditional block */}



<DeleteModal
  product={deleteTarget}
  onCancel={() => setDeleteTarget(null)}
  onConfirm={(id) => {
    del(id);
    setDeleteTarget(null);
  }}
/>

{selectedProducts.length > 0 && (
  <div
    style={{
      position: "fixed",
      bottom: 20,
      left: "50%",
      transform: "translateX(-50%)",
      background: "#c62828",
      color: "#fff",
      padding: "12px 22px",
      borderRadius: 14,
      boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
      display: "flex",
      gap: 20,
      alignItems: "center",
      zIndex: 9999,
      fontSize: 16,
      fontWeight: "600",
    }}
  >
    <span>{selectedProducts.length} selected</span>

    <button
      onClick={bulkDelete}
      style={{
        background: "#fff",
        color: "#c62828",
        padding: "8px 18px",
        borderRadius: 10,
        fontWeight: "bold",
        border: "none",
        cursor: "pointer",
        fontSize: 15,
      }}
    >
      Delete Selected
    </button>
  </div>
)}





</div>

<style jsx>{`
  #product-grid {
    display: grid;
    gap: 16px;
    padding-bottom: 60px;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    align-items: start;
  }
`}</style>   {/* ✅ NOW VALID LOCATION */}

<style jsx global>{`
  /* Center the toast container */
  .custom-toast-container {
    position: fixed !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    z-index: 999999 !important;
    pointer-events: none !important;
  }

  /* Style the toast itself */
  .custom-toast {
    background: white !important;
    color: #222 !important;
    padding: 16px 24px !important;
    border-radius: 12px !important;
    font-size: 16px !important;
    box-shadow: 0 6px 20px rgba(0,0,0,0.3) !important;
    pointer-events: all !important;
  }
`}</style>


</>
);
}
