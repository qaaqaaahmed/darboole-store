import LoadingContainer from "@/components/global/LoadingContainer";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";
import { Separator } from "@radix-ui/react-separator";
import { Suspense } from "react";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Separator />
      {/* <LoadingContainer /> */}
      <Suspense fallback={<LoadingContainer />}>
        <FeaturedProducts />
      </Suspense>
    </>
  );
};
export default HomePage;
