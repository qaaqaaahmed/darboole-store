import React from "react";
import { FaStar } from "react-icons/fa6";

function ProductRating() {
  const rating = 4.2;
  const count = 25;

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
