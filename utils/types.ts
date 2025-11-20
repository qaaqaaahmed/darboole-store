import { Prisma } from "@prisma/client";

export type actionFunction = (
  prevState: any,
  formData: FormData
) => Promise<{ message: string }>;

// basically returns cartitem with products for the cartitemlist components to iterate
export type CartItemWithProducts = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;
// export type CartItem = {
//   productId: string;
//   image: string;
//   title: string;
//   price: string;
//   amount: number;
//   company: string;
// };

// export type CartState = {
//   cartItems: CartItem[];
//   numItemsInCart: number;
//   cartTotal: number;
//   shipping: number;
//   tax: number;
//   orderTotal: number;
// };
