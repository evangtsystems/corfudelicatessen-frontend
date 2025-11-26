// src/lib/apiBase.js

const PROD_API_BASE = "https://corfudelicatessen-backend-bhfvafbgh7cabmas.italynorth-01.azurewebsites.net";
const DEV_API_BASE = "http://localhost:5000";

export function getApiBase() {
  if (process.env.NODE_ENV === "production") {
    return PROD_API_BASE;
  }

  // Local development
  return DEV_API_BASE;
}
