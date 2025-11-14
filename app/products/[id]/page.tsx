import FavouritesToggleButton from "@/components/products/FavouritesToggleButton";
import AddToCart from "@/components/single-product/AddToCart";
import Breadcrumbs from "@/components/single-product/Breadcrumbs";
import ProductRating from "@/components/single-product/ProductRating";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { fetchSingleProduct } from "@/utils/actions";
import { formatCurrency } from "@/utils/format";
import Image from "next/image";

async function page({ params }: { params: { id: string } }) {
  const singleProduct = await fetchSingleProduct(params.id);
  const { name, image, price, company, description } = singleProduct;
  const dollarsAmount = formatCurrency(price);

  return (
    <section>
      <Breadcrumbs name={name}></Breadcrumbs>
      <div className="grid gap-y-8 lg:grid-cols-2 lg:gap-x-16 mt-6">
        {/* image */}
        <div>
          <div className="relative h-full mt-2">
            <Image
              src={image}
              alt={name}
              sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
              priority
              fill
              className="object-cover rounded w-full"
            />
          </div>
        </div>
        {/* product info */}
        <div>
          <div className="flex gap-x-8 items-center">
            <h1 className="text-3xl font-bold capitalize">{name}</h1>
            <FavouritesToggleButton productId={params.id} />
          </div>
          <ProductRating />
          <h4 className="text-xl mt-2">{company}</h4>
          <p className="bg-muted p-2 rounded text-lg inline-block mt-2">
            {dollarsAmount}
          </p>
          <p className="text-muted-foreground mt-4 leading-8">{description}</p>
          <AddToCart productId={params.id} />
        </div>
      </div>
    </section>
  );
}

export default page;
