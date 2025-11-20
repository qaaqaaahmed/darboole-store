"use client";
import { toggleFavoriteAction } from "@/utils/actions";
import { usePathname } from "next/navigation";
import FormContainer from "../form/FormContainer";
import { CardSubmitButton } from "../form/Buttons";

function FavouriteToggleForm({
  productId,
  favoriteId,
}: {
  productId: string;
  favoriteId: string | null;
}) {
  const pathname = usePathname();

  const toggleAction = toggleFavoriteAction.bind(null, {
    productId,
    favoriteId,
    pathname,
  });
  return (
    <FormContainer action={toggleAction}>
      <CardSubmitButton isFavorite={favoriteId ? true : false} />
    </FormContainer>
  );
}

export default FavouriteToggleForm;
