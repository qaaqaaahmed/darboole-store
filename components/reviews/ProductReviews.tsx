import { fetchProductReviews } from "@/utils/actions";
import React from "react";
import SectionTitle from "../global/SectionTitle";
import ReviewCard from "./ReviewCard";
import EmptyList from "../global/EmptyList";

async function ProductReviews({ productId }: { productId: string }) {
  const reviews = await fetchProductReviews(productId);

  return (
    <div className="mt-16">
      <SectionTitle text="product reviews" />
      <div className="grid md:grid-cols-2 gap-8 my-8">
        {!reviews.length && (
          <EmptyList heading="there are no reviews for this product" />
        )}
        {reviews.map((review) => {
          const { rating, comment, authorName, authorImageUrl } = review;
          const reviewInfo = {
            rating,
            comment,
            name: authorName,
            image: authorImageUrl,
          };

          return <ReviewCard key={review.id} reviewInfo={reviewInfo} />;
        })}
      </div>
    </div>
  );
}

export default ProductReviews;
