"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ShopFilterBar({ categories }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedMain = searchParams.get("mainCategory") || "";
  const selectedSub = searchParams.get("category") || "";

  const mainCategories = categories ? Object.keys(categories) : [];
  const subCategories =
    selectedMain && categories[selectedMain]
      ? categories[selectedMain]
      : [];

  // Change Main Category
  const changeMain = (main) => {
    const params = new URLSearchParams(searchParams.toString());
    if (main) {
      params.set("mainCategory", main);
      params.delete("category"); // reset subcategory
    } else {
      params.delete("mainCategory");
      params.delete("category");
    }
    router.push(`/shop?${params.toString()}`);
  };

  // Change Sub Category
  const changeSub = (sub) => {
    const params = new URLSearchParams(searchParams.toString());
    if (sub) params.set("category", sub);
    else params.delete("category");
    router.push(`/shop?${params.toString()}`);
  };

  // Reset All Filters
  const resetFilters = () => {
    router.push("/shop");
  };

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        flexWrap: "wrap",
        background: "#fff",
        padding: 12,
        borderRadius: 12,
        marginBottom: 20,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      {/* MAIN CATEGORY DROPDOWN */}
      <select
        value={selectedMain}
        onChange={(e) => changeMain(e.target.value)}
        style={{
          padding: "10px 12px",
          borderRadius: 8,
          border: "1px solid #ccc",
          minWidth: 200,
        }}
      >
        <option value="">All Main Categories</option>
        {mainCategories.map((mc) => (
          <option key={mc} value={mc}>
            {mc}
          </option>
        ))}
      </select>

      {/* SUBCATEGORY DROPDOWN */}
      <select
        value={selectedSub}
        onChange={(e) => changeSub(e.target.value)}
        style={{
          padding: "10px 12px",
          borderRadius: 8,
          border: "1px solid #ccc",
          minWidth: 200,
        }}
        disabled={!selectedMain}
      >
        <option value="">All Subcategories</option>
        {subCategories.map((sub) => (
          <option key={sub} value={sub}>
            {sub}
          </option>
        ))}
      </select>

      {/* RESET BUTTON */}
      <button
        onClick={resetFilters}
        style={{
          padding: "10px 16px",
          border: "none",
          borderRadius: 8,
          background: "#c62828",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Reset
      </button>
    </div>
  );
}
