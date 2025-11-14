import { Button } from "../ui/button";

function AddToCart({ productId }: { productId: string }) {
  return (
    <Button className="mt-6 capitalize" size="lg">
      add to cart
    </Button>
  );
}

export default AddToCart;
