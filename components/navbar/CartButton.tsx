import { fetchCartItems } from "@/utils/actions";
import { Button } from "../ui/button";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

async function CartButton() {
  const numItems = await fetchCartItems();

  return (
    <Button
      asChild
      className="relative flex items-center justify-center "
      size="icon"
      variant="outline"
    >
      <Link href="/cart">
        <FaShoppingCart />
        <span
          className="absolute -top-3 -right-3 bg-primary rounded-full text-sm text-white h-6 w-6
        flex items-center justify-center"
        >
          {numItems}
        </span>
      </Link>
    </Button>
  );
}

export default CartButton;
