import { fetchAllProducts } from "@/utils/actions";
import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";
import { LuLayoutGrid, LuLayoutList } from "react-icons/lu";
import { Button } from "../ui/button";
import Link from "next/link";
import { Separator } from "../ui/separator";

async function ProductsContainer({
  layout,
  search,
}: {
  layout: string;
  search: string;
}) {
  const products = await fetchAllProducts({ search });
  const totalProducts = products.length;
  const searchTerm = search ? `&search=${search}` : "";

  return (
    <>
      {/* Header */}
      <section className="mb-4">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-medium">
            {totalProducts} product
            {totalProducts > 1 && "s"}
          </h4>

          <div className="flex gap-x-4">
            <Button
              asChild
              size="icon"
              variant={layout === "grid" ? `default` : `ghost`}
            >
              <Link href={`/products?layout=grid${searchTerm}`}>
                <LuLayoutGrid />
              </Link>
            </Button>

            <Button
              asChild
              size="icon"
              variant={layout === "list" ? `default` : `ghost`}
            >
              <Link href={`/products?layout=list${searchTerm}`}>
                <LuLayoutList />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Separator />
      {/* Products */}
      <div>
        {totalProducts === 0 ? (
          <h5 className="text-2xl mt-16">Your search yielded no results</h5>
        ) : layout === "grid" ? (
          <ProductsGrid products={products} />
        ) : (
          <ProductsList products={products} />
        )}
      </div>
    </>
  );
}

export default ProductsContainer;
