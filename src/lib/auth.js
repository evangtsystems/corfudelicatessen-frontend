// src/lib/auth.js

// Convert Base64URL → Base64 safely
function base64UrlToBase64(str) {
  return str.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - str.length % 4) % 4);
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("deli_token");
}

export function setToken(t) {
  if (typeof window === "undefined") return;
  localStorage.setItem("deli_token", t);
}

export function clearToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("deli_token");
}

// SAFE JWT DECODER (never crashes)
export function getTokenPayload() {
  const token = getToken();
  if (!token) return null;

  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;

    const base64 = base64UrlToBase64(base64Url);
    const json = atob(base64);
    const payload = JSON.parse(json);

    // ✔ check token expiration on frontend
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      console.warn("Token expired — clearing");
      clearToken();
      return null;
    }

    return payload;
  } catch (err) {
    console.error("Invalid token, clearing:", err);
    clearToken();
    return null;
  }
}

