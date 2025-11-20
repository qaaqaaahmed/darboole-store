"use client";
import React, { useState } from "react";
import { Button } from "@/components//ui/button";
import { Card } from "@/components/ui/card";
import { SubmitButton } from "@/components/form/Buttons";
import RatingInput from "./RatingInput";
import FormContainer from "../form/FormContainer";
import { createReviewAction } from "@/utils/actions";
import { useUser } from "@clerk/nextjs";
import TextareaInput from "../form/TextareaInput";

function SubmitReview({ productId }: { productId: string }) {
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const { user } = useUser();
  return (
    <div>
      <Button
        size="lg"
        className="capitalize"
        onClick={() => setIsReviewFormVisible((prev) => !prev)}
      >
        Leave Review
      </Button>

      {isReviewFormVisible && (
        <Card className="p-8 mt-8">
          <FormContainer action={createReviewAction}>
            <input type="hidden" name="productId" value={productId} />
            <input
              type="hidden"
              name="authorName"
              value={user?.firstName || "user"}
            />

            <input type="hidden" name="authorImageUrl" value={user?.imageUrl} />
            <RatingInput name="rating" />
            <TextareaInput
              name="comment"
              defaultValue="outstanding product"
              labelText="feedback"
            />
            <SubmitButton text="submit review" className="mt-4" />
          </FormContainer>
        </Card>
      )}
    </div>
  );
}

export default SubmitReview;
