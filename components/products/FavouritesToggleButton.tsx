import { CiHeart } from "react-icons/ci";
import { Button } from "../ui/button";
import { auth } from "@clerk/nextjs/server";
import { CardSignInButton } from "../form/Buttons";
import { getFavoriteId } from "@/utils/actions";
import FavouriteToggleForm from "./FavouriteToggleForm";

async function FavouritesToggleButton({ productId }: { productId: string }) {
  const { userId } = auth();

  if (!userId) return <CardSignInButton />;

  const favoriteId = await getFavoriteId({ productId });

  return <FavouriteToggleForm productId={productId} favoriteId={favoriteId} />;
}

export default FavouritesToggleButton;
