/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      // 🇬🇷 OLD GREEK WORDPRESS PAGES
      {
        source: "/proionta",
        destination: "/products",
        permanent: true,
      },

      // 🧱 WORDPRESS PRODUCT CATEGORIES
      {
        source: "/product-category/:path*",
        destination: "/products",
        permanent: true,
      },

      // 🧱 GREEK CATEGORY / BRAND SLUGS (encoded)
      {
        source: "/:slug(%CE%.*)",
        destination: "/products",
        permanent: true,
      },

      // 🧱 ANY OLD WP CATEGORY
      {
        source: "/category/:path*",
        destination: "/products",
        permanent: true,
      },

      // 🧱 WP ASSETS & JUNK
      {
        source: "/wp-content/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-admin/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-login.php",
        destination: "/login",
        permanent: true,
      },

      // 🧱 OLD PHP PAGES
      {
        source: "/:slug*(.php)",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
