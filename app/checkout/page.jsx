"use client";
import { useEffect, useState } from "react";
import { getApiBase } from "../../src/lib/apiBase";
import { getToken } from "../../src/lib/auth";

export default function CheckoutPage({ searchParams }) {
  const [items, setItems] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    try {
      const raw = searchParams?.data ? JSON.parse(decodeURIComponent(searchParams.data)) : [];
      setItems(Array.isArray(raw) ? raw : []);
    } catch { setItems([]); }
  }, [searchParams]);

  const placeOrder = async () => {
    const token = getToken();
    if (!token) {
      setMsg("Please login first.");
      return;
    }
    const res = await fetch(`${getApiBase()}/api/orders`, {
      method:"POST",
      headers:{ "Content-Type":"application/json", Authorization:`Bearer ${token}` },
      body: JSON.stringify({ items }),
    });
    const data = await res.json();
    setMsg(data.success ? "✅ Order placed!" : "❌ Failed to place order");
  };

  const total = items.reduce((s,i)=>s+i.price*i.quantity,0);

  return (
    <div style={{ background:"#fff", padding:20, borderRadius:12, boxShadow:"0 2px 6px rgba(0,0,0,0.1)" }}>
      <h1 style={{ color:"#1f3b2e", marginTop:0 }}>Checkout</h1>
      {items.length===0 ? <p>No items.</p> : (
        <>
          {items.map(i=>(
            <div key={i.productId} style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
              <div>{i.name} × {i.quantity}</div>
              <div>{(i.price*i.quantity).toFixed(2)} €</div>
            </div>
          ))}
          <div style={{ borderTop:"1px solid #eee", marginTop:8, paddingTop:8, display:"flex", justifyContent:"space-between" }}>
            <strong>Total</strong><strong>{total.toFixed(2)} €</strong>
          </div>
          <button onClick={placeOrder} style={{ marginTop:12, padding:"10px 14px", border:"none", borderRadius:8, background:"#d1b76e", color:"#1f3b2e", fontWeight:"bold" }}>
            Place order
          </button>
          {msg && <p style={{ marginTop:10 }}>{msg}</p>}
        </>
      )}
    </div>
  );
}
