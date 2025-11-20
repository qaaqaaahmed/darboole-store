import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function loading() {
  return (
    <section className="grid md:grid-cols-2 gap-8 mt-4">
      <ReviewLoadingCard />
      <ReviewLoadingCard />
    </section>
  );
}

function ReviewLoadingCard() {
  return (
    <div className="flex items-center">
      <Skeleton className="h-12 w-12 rounded-full " />
      <div className="ml-4">
        <Skeleton className="mb-2 h-4 w-[150px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    </div>
  );
}

export default loading;
