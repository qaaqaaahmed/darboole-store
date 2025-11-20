import { formatCurrency } from "@/utils/format";
import { Product } from "@prisma/client";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import FavouritesToggleButton from "./FavouritesToggleButton";

async function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
      {products.map((product) => {
        const { name, price, image } = product;
        const productId = product.id;
        const dollarsAmount = formatCurrency(price);

        return (
          <article key={product.id} className="group relative">
            <Link href={`/products/${productId}`}>
              <Card className="transform transition-shadow group-hover:shadow-xl duration-500">
                <CardContent className="p-4">
                  <div className="h-64 md:h-48 relative overflow-hidden">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="rounded w-full group-hover:scale-110 duration-500 transition-transform object-cover"
                    />
                  </div>

                  <div className="mt-8 text-center">
                    <h2 className="text-lg capitalize">{name}</h2>
                    <p className="text-base text-muted-foreground">
                      {dollarsAmount}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <div className="absolute top-7 right-7">
              <FavouritesToggleButton productId={productId} />
            </div>
          </article>
        );
      })}
    </div>
  );
  //   return (
  //     <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  //       {products.map((product) => {
  //         const { name, price, image } = product;
  //         const productId = product.id;
  //         const dollarsAmount = formatCurrency(price);
  //         return (
  //           <article key={product.id} className="group relative">
  //             <Link href={`/products/${productId}`}>
  //               <Card className="transform group-hover:shadow-xl transition-shadow duration-500">
  //                 <CardContent className="p-4">
  //                   <div className="relative h-64 md:h-48 rounded overflow-hidden">
  //                     <Image
  //                       src={image}
  //                       alt={name}
  //                       fill
  //                       sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
  //                       priority
  //                       className="rounded  w-full group-hover:scale-110 transform transition-transform object-cover duration-500"
  //                     />
  //                   </div>
  //                   <div className="pt-4 text-center">
  //                     <h2 className="text-lg capitalize">{name}</h2>
  //                     <p className="text-muted-foreground mt-2">
  //                       {dollarsAmount}
  //                     </p>
  //                   </div>
  //                 </CardContent>
  //               </Card>
  //             </Link>
  //             <div className="absolute top-5 right-5">
  //               <FavouritesToggleButton productId={productId} />
  //             </div>
  //           </article>
  //         );
  //       })}
  //     </div>
  //   );
}

export default ProductsGrid;
