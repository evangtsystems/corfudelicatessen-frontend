"use client";
import React from "react";

export default function DeleteModal({ product, onCancel, onConfirm }) {
  if (!product) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "24px",
          borderRadius: 12,
          width: "90%",
          maxWidth: 380,
          textAlign: "center",
          boxShadow: "0 4px 18px rgba(0,0,0,0.2)",
        }}
      >
        <h3 style={{ marginBottom: 10 }}>Delete Product</h3>
        <p style={{ fontSize: 14, marginBottom: 20 }}>
          Είστε σίγουρος ότι θέλετε να διαγράψατε αυτό το προιόν;<br />
          <strong>{product.name}</strong>?
        </p>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1,
              padding: "10px",
              background: "#ccc",
              borderRadius: 8,
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm(product._id)}
            style={{
              flex: 1,
              padding: "10px",
              background: "#c62828",
              color: "#fff",
              borderRadius: 8,
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
