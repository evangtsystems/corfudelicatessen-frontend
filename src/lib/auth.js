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

export function getTokenPayload() {
  const t = getToken();
  if (!t) return null;
  try {
    return JSON.parse(atob(t.split(".")[1]));
  } catch {
    return null;
  }
}

