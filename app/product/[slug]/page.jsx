import { notFound } from "next/navigation";
import { getApiBase } from "../../../src/lib/apiBase";

// ⛔️ IMPORTANT
// This file is a SERVER COMPONENT by default (no "use client")

async function getProduct(slug) {
  const res = await fetch(
    `${getApiBase()}/api/products/slug/${encodeURIComponent(slug)}`,
    {
      cache: "no-store", // always fresh (change later if needed)
    }
  );

  if (!res.ok) return null;

  const data = await res.json();

  if (!data?.success || !data?.product) return null;

  return data.product;
}

// ✅ SEO METADATA (dynamic per product)
export async function generateMetadata({ params }) {
  const product = await getProduct(params.slug);

  if (!product) {
    return {
      title: "Product not found",
    };
  }

  const description =
    product.description
      ?.replace(/<[^>]*>/g, " ")
      .slice(0, 160) || "View product details";

  return {
    title: `${product.name} | Corfu Delicatessen`,
    description,
    alternates: {
      canonical: `/product/${product.slug}`,
    },
    openGraph: {
      title: product.name,
      description,
      images: product.imageUrl ? [product.imageUrl] : [],
      type: "website",

    },
  };
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.slug);

  if (!product || product.deleted) {
    notFound();
  }

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: 20,
      }}
    >
      <h1>{product.name}</h1>

      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{
            maxWidth: 320,
            marginBottom: 20,
            display: "block",
          }}
        />
      )}

      {product.description && (
        <p style={{ whiteSpace: "pre-line" }}>
          {product.description}
        </p>
      )}

      <p
        style={{
          fontWeight: "bold",
          fontSize: 18,
          marginTop: 14,
        }}
      >
        {typeof product.price === "number"
          ? product.price.toFixed(2) + " €"
          : "—"}
      </p>
    </div>
  );
}
