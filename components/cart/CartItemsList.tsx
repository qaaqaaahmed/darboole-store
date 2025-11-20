"use client";
import { CartItemWithProducts } from "@/utils/types";
import { Card } from "../ui/card";
import { FirstColumn, FourthColumn, SecondColumn } from "./CartItemsColumns";
import ThirdColumn from "./ThirdColumn";

function CartItemsList({ cartItems }: { cartItems: CartItemWithProducts[] }) {
  return (
    <div>
      {cartItems.map((cartItem) => {
        const { id, amount } = cartItem;
        const { name, image, price, company, id: productId } = cartItem.product;
        return (
          <Card
            key={id}
            className="p-6 mb-4 flex flex-col md:flex-row flex-wrap gap-4"
          >
            <FirstColumn name={name} image={image} />
            <SecondColumn name={name} company={company} productId={productId} />
            <ThirdColumn quantity={amount} id={id} />
            <FourthColumn price={price} />
          </Card>
        );
      })}
    </div>
  );
  return <div>CartItemsList</div>;
}

export default CartItemsList;
