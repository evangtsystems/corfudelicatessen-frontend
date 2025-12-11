export function loadGA() {
  if (typeof window === "undefined") return;

  // Prevent double-loading
  if (window.__gaLoaded) return;
  window.__gaLoaded = true;

  const ID = "G-K1C3JVGLEY";

  // Load external GA script
  const s1 = document.createElement("script");
  s1.async = true;
  s1.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`;
  document.head.appendChild(s1);

  // Load config
  const s2 = document.createElement("script");
  s2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${ID}');
  `;
  document.head.appendChild(s2);

  console.log("🔥 Google Analytics loaded (with consent)");
}
