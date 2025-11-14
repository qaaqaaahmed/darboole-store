import ProductsContainer from "@/components/products/ProductsContainer";
import React from "react";

function ProductsPage({
  searchParams,
}: {
  searchParams: { layout?: string; search?: string };
}) {
  const layout = searchParams.layout || "grid";
  const search = searchParams.search || "";

  return <ProductsContainer search={search} layout={layout} />;
  console.log(searchParams);
  return <div>ProductsPage</div>;
}

export default ProductsPage;
