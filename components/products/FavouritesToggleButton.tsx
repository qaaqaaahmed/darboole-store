import { CiHeart } from "react-icons/ci";
import { Button } from "../ui/button";

function FavouritesToggleButton({ productId }: { productId: string }) {
  return (
    <Button size="icon" variant="outline" className="p-2 cursor-pointer">
      <CiHeart />
    </Button>
  );
}

export default FavouritesToggleButton;
