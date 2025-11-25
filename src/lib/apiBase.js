export function getApiBase() {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_BACKEND_URL || window.location.origin;
  }
  return process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
}
