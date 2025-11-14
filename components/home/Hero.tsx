import React from "react";
import HeroCarousel from "./HeroCarousel";
import { Button } from "../ui/button";
import Link from "next/link";

function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div>
        <h1 className="text-4xl sm:text-6xl font-bold max-w-2xl">
          List of things Darboole would shoplift
        </h1>

        <p className="mt-8 max-w-xl text-muted-foreground text-lg leading-7 tracking-tight">
          In this application we have meticulously listed items that Darboole
          would shoplift. We aim to conter Darbooleeees attemps at shopflifting
        </p>

        <Button asChild size="lg" className="mt-10">
          <Link href={`/products`}>See Items Darboole would shoplift</Link>
        </Button>
      </div>
      <HeroCarousel />
    </section>
  );
}

export default Hero;
