import { formatCurrency } from "@/utils/format";
import { Product } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import FavouritesToggleButton from "./FavouritesToggleButton";

function ProductsList({ products }: { products: Product[] }) {
  return (
    <div className="mt-12 grid gap-y-8">
      {products.map((product) => {
        const { name, price, image, company } = product;
        const productId = product.id;
        const dollarsAmount = formatCurrency(price);

        return (
          <article key={productId} className="group relative">
            <Link href={`/products/${productId}`}>
              <Card className="transform transition-shadow group-hover:shadow-xl">
                <CardContent className="p-8 grid md:grid-cols-3 gap-8">
                  <div className="h-64 md:h-48 relative">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      priority
                      className="w-full rounded object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold capitalize">{name}</h2>
                    <h4 className="text-muted-foreground">{company}</h4>
                  </div>
                  <p className="text-lg text-muted-foreground md:ml-auto">
                    {dollarsAmount}
                  </p>
                </CardContent>
              </Card>
            </Link>

            <div className="absolute bottom-3 right-3">
              <FavouritesToggleButton productId={productId} />
            </div>
          </article>
        );
        return "hi";
      })}
    </div>
  );
  return <div>ProductsList</div>;
}

export default ProductsList;
