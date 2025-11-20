import SectionTitle from "@/components/global/SectionTitle";
import ProductsGrid from "@/components/products/ProductsGrid";
import { fetchUserFavorites } from "@/utils/actions";
import React from "react";

async function FavouritesPage() {
  const favorites = await fetchUserFavorites();

  if (favorites.length === 0)
    return (
      <SectionTitle text="You have no faves, like some product then come to this page" />
    );

  return (
    <ProductsGrid products={favorites.map((favorite) => favorite.product)} />
  );
}

export default FavouritesPage;
