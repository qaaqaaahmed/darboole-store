import db from "./db";
import { redirect } from "next/navigation";

export const fetchFeaturedProducts = async () => {
  const products = await db.product.findMany({
    where: {
      featured: true,
    },
  });

  return products;
};

export const fetchAllProducts = ({ search = "" }: { search: string }) => {
  return db.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ],
    },
    orderBy: {
      created_at: "desc",
    },
  });
};

export const fetchSingleProduct = async (productId: string) => {
  const singleProduct = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!singleProduct) redirect(`/products`);
  return singleProduct;
};
