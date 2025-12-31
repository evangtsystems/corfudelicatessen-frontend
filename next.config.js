/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      // 🔴 OLD WORDPRESS ASSETS & PATHS
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

      // 🔴 OLD PRODUCT / CATEGORY URLS
      {
        source: "/product/:path*",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/category/:path*",
        destination: "/products",
        permanent: true,
      },

      // 🔴 OLD PHP PAGES
      {
        source: "/:slug*(.php)",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
