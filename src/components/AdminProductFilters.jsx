"use client";

export default function AdminProductFilters({
  mainCategories,
  categoriesTree,
  filterMain,
  filterCategory,
  setFilterMain,
  setFilterCategory,
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        marginBottom: 20,
        flexWrap: "wrap",
        background: "#fff",
        padding: 12,
        borderRadius: 10,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      {/* MAIN CATEGORY FILTER */}
      <select
        value={filterMain}
        onChange={(e) => {
          setFilterMain(e.target.value);
          setFilterCategory(""); // reset subcategory when main changes
        }}
        style={{
          padding: "8px 12px",
          borderRadius: 8,
          border: "1px solid #ccc",
          minWidth: 160,
        }}
      >
        <option value="">All Main Categories</option>
        {mainCategories.map((mc) => (
          <option key={mc} value={mc}>
            {mc}
          </option>
        ))}
      </select>

      {/* CATEGORY FILTER */}
      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        disabled={!filterMain}
        style={{
          padding: "8px 12px",
          borderRadius: 8,
          border: "1px solid #ccc",
          minWidth: 160,
          background: !filterMain ? "#eee" : "white",
        }}
      >
        <option value="">All Categories</option>

        {filterMain &&
          categoriesTree?.[filterMain]?.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
      </select>

      {/* RESET BUTTON */}
      <button
        onClick={() => {
          setFilterMain("");
          setFilterCategory("");
        }}
        style={{
          padding: "8px 12px",
          borderRadius: 8,
          border: "none",
          background: "#d1b76e",
          color: "#1f3b2e",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Reset
      </button>
    </div>
  );
}
