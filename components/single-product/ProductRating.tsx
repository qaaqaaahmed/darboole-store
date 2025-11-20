import { fetchProductRating } from "@/utils/actions";
import React from "react";
import { FaStar } from "react-icons/fa6";

async function ProductRating({ productId }: { productId: string }) {
  const { count, rating } = await fetchProductRating(productId);

  const className = `flex gap-1 items-center mt-1 mb-4`;
  const countValue = `(${count}) reviews`;

  return (
    <span className={className}>
      <FaStar />
      {rating} {countValue}
    </span>
  );
}

export default ProductRating;
