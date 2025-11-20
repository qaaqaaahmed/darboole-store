import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import Rating from "./Rating";
import Comment from "./Comment";

type ReviewCardProps = {
  reviewInfo: {
    rating: number;
    comment: string;
    name: string;
    image: string;
  };
  children?: React.ReactNode;
};
function ReviewCard({ children, reviewInfo }: ReviewCardProps) {
  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex items-center gap-x-1">
          <Image
            src={reviewInfo.image}
            alt={reviewInfo.name}
            width={28}
            height={28}
            className="rounded-full object-cover h-12 w-12"
          />

          <div className="ml-4">
            <h3 className="mb-1 text-sm font-bold capitalize ">
              {reviewInfo.name}
            </h3>
            <Rating rating={reviewInfo.rating} />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Comment comment={reviewInfo.comment} />
      </CardContent>
      <div className="absolute top-3 right-3">{children}</div>
    </Card>
  );
}

export default ReviewCard;
