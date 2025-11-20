import { IconButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import SectionTitle from "@/components/global/SectionTitle";
import ReviewCard from "@/components/reviews/ReviewCard";
import { Button } from "@/components/ui/button";
import {
  deleteProductReviewAction,
  fetchProductReviewByUser,
} from "@/utils/actions";

async function ReviewsPage() {
  const reviews = await fetchProductReviewByUser();

  if (reviews.length === 0) {
    return <SectionTitle text="You have no reviews yet." />;
  }

  return (
    <section>
      {/* <h2 className="text-2xl font-bold capitalize mb-8">Your reviews</h2> */}
      <SectionTitle text="your reviews" />
      <div className="grid md:grid-cols-2 gap-8">
        {reviews.map((review) => {
          const { id, rating, comment } = review;
          const { name, image } = review.product;
          const reviewInfo = { rating, comment, name, image };
          return (
            <ReviewCard key={id} reviewInfo={reviewInfo}>
              <DeleteProductReview reviewId={id} />
            </ReviewCard>
          );
        })}
      </div>
    </section>
  );
  return "hi";
}

function DeleteProductReview({ reviewId }: { reviewId: string }) {
  const deleteProductReview = deleteProductReviewAction.bind(null, {
    reviewId,
  });

  return (
    <FormContainer action={deleteProductReview}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
}

export default ReviewsPage;
