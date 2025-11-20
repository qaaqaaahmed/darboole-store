"use server";
import { auth, currentUser, getAuth } from "@clerk/nextjs/server";
import db from "./db";
import { redirect } from "next/navigation";
import {
  imageSchema,
  productSchema,
  reviewsSchema,
  validateWithZodSchema,
} from "./schemas";
import { deleteImage, uploadImage } from "./supabase";
import { revalidatePath } from "next/cache";
import { Cart } from "@prisma/client";

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) redirect("/");
  return user;
};

const getAdmin = async () => {
  const user = await getAuthUser();
  if (user.id !== process.env.ADMIN_USER_ID) redirect("/");
  return user;
};

const renderError = (error: unknown): { message: string } => {
  return {
    message: error instanceof Error ? error.message : "There was an error..",
  };
};

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

export const createProductAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const file = formData.get("image") as File;
    const validatedFields = validateWithZodSchema(productSchema, rawData);
    const validatedFile = validateWithZodSchema(imageSchema, {
      image: file,
    });
    const fullPath = await uploadImage(validatedFile.image);

    await db.product.create({
      data: {
        ...validatedFields,
        image: fullPath,
        clerkId: user.id,
      },
    });
  } catch (error) {
    return renderError(error);
  }

  redirect("/admin/products");
};

export const fetchAdminProducts = async () => {
  await getAdmin();
  const products = await db.product.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

  return products;
};

export const deleteProductAction = async (prevState: {
  productId: string;
}): Promise<{ message: string }> => {
  const { productId } = prevState;

  await getAdmin();

  try {
    const product = await db.product.delete({
      where: {
        id: productId,
      },
    });

    await deleteImage(product.image);
    revalidatePath("/admin/products");
    return { message: "product removed" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchAdminProductDetails = async (productId: string) => {
  await getAdmin();

  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) redirect(`/admin/products`);
  return product;
};

export const updateProductAction = async (
  prevState: any,
  formData: FormData
) => {
  await getAdmin();
  const productId = formData.get("id") as string;
  const rawData = Object.fromEntries(formData);
  const validatedFields = validateWithZodSchema(productSchema, rawData);
  try {
    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        ...validatedFields,
      },
    });
    revalidatePath(`/admin/products/${productId}/edit`);
    return { message: "Product updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};
export const updateProductImageAction = async (
  prevState: any,
  formData: FormData
) => {
  await getAdmin();
  try {
    const newImageUrl = formData.get("image") as File;
    const oldImageUrl = formData.get("url") as string;
    const productId = formData.get("id") as string;

    // validate new file
    const validateFile = validateWithZodSchema(imageSchema, {
      image: newImageUrl,
    });

    // uplaod image to supabase bucket
    const fullPath = await uploadImage(validateFile.image);
    // delete old image
    await deleteImage(oldImageUrl);
    // update the image in supabase db
    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        image: fullPath,
      },
    });

    revalidatePath(`/admin/products/${productId}/edit`);
    return { message: "image updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const getFavoriteId = async ({ productId }: { productId: string }) => {
  const user = await getAuthUser();
  const favorite = await db.favorite.findFirst({
    where: {
      productId,
      clerkId: user.id,
    },
    select: {
      id: true,
    },
  });

  return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
  productId: string;
  favoriteId: string | null;
  pathname: string;
}) => {
  const user = await getAuthUser();
  try {
    const { productId, favoriteId, pathname } = prevState;

    // if there is a favorite id then we remove the favorite from the db
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await db.favorite.create({
        data: {
          productId: productId,
          clerkId: user.id,
        },
      });
    }
    revalidatePath(pathname);

    return { message: favoriteId ? "removed from faves" : "added to faves" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchUserFavorites = async () => {
  const user = await getAuthUser();

  const favorites = await db.favorite.findMany({
    where: {
      clerkId: user.id,
    },
    include: {
      product: true,
    },
  });

  return favorites;
};

export const createReviewAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(reviewsSchema, rawData);

    await db.review.create({
      data: {
        ...validatedFields,
        clerkId: user.id,
      },
    });

    revalidatePath(`/products/${validatedFields.productId}`);

    return { message: "review submitted successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchProductRating = async (productId: string) => {
  const reviews = await db.review.groupBy({
    by: ["productId"],
    _count: {
      rating: true,
    },
    _avg: {
      rating: true,
    },
  });

  return {
    rating: reviews[0]?._avg.rating?.toFixed(1) ?? 0,
    count: reviews[0]?._count.rating ?? 0,
  };
};

export const fetchProductReviews = async (productId: string) => {
  const reviews = await db.review.findMany({
    where: {
      productId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return reviews;
};
export const fetchProductReviewByUser = async () => {
  const user = await getAuthUser();

  const reviews = await db.review.findMany({
    where: {
      clerkId: user.id,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      product: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  });
  return reviews;
};
export const deleteProductReviewAction = async (prevState: {
  reviewId: string;
}) => {
  const { reviewId } = prevState;
  const user = await getAuthUser();
  try {
    await db.review.delete({
      where: {
        id: reviewId,
        clerkId: user.id,
      },
    });
    revalidatePath("/reviews");
    return { message: "Review deleted successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const findExistingReview = async (userId: string, productId: string) => {
  return db.review.findFirst({
    where: {
      clerkId: userId,
      productId,
    },
  });
};

export const fetchCartItems = async () => {
  const { userId } = auth();
  const cart = await db.cart.findFirst({
    where: {
      clerkId: userId ?? "",
    },
    select: {
      numItemsInCart: true,
    },
  });

  return cart?.numItemsInCart || 0;
};

const fetchProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("could not find product");
  }
  return product;
};

const includeProductClause = {
  cartItems: {
    include: {
      product: true,
    },
  },
};
export const fetchOrCreateCart = async ({
  userId,
  errorOnFailure = false,
}: {
  userId: string;
  errorOnFailure?: boolean;
}) => {
  // you find the cart based on user id
  // include the cart items as well as product
  // if there is no cart and we want error to be thrown(to be used in update and delet cart) then throw error
  // otherwise if there is no cart, create a new cart and just include the includedProductClause ot ts will cry there is no cart items
  // fyi if you include the incoudeproductclause, prisma returns an empty cartitems which makes ts shut the f up
  let cart = await db.cart.findFirst({
    where: {
      clerkId: userId,
    },
    include: includeProductClause,
  });

  if (!cart && errorOnFailure) {
    throw new Error("Cart does not exist");
  }

  if (!cart) {
    cart = await db.cart.create({
      data: {
        clerkId: userId,
      },
      include: includeProductClause,
    });
  }

  return cart;
};

export const updateOrCreateCartItem = async ({
  productId,
  amount,
  cartId,
}: {
  productId: string;
  amount: number;
  cartId: string;
}) => {
  // basically we check if there is a cartitem [productid: "milk", cartid: "1", amount : 2]
  // we look for milk (using product id of milk and cart id where its at)
  // then if it exists we update it with the new quantity.
  // if it doesnt exists we create a new cart item with the product id referencing milk and cart id  and the amount
  let cartItem = await db.cartItem.findFirst({
    where: {
      productId,
      cartId,
    },
  });

  if (cartItem) {
    cartItem = await db.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        amount: cartItem.amount + amount,
      },
    });
  } else {
    cartItem = await db.cartItem.create({
      data: {
        amount,
        productId,
        cartId,
      },
    });
  }
};

export const updateCart = async (cart: Cart) => {
  // get all the cart items in a particular cart - cart item contains all boxes for users (milk, orange)...
  // so when querying the cart items, we fetch by a particular cart id
  const cartItems = await db.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
    include: {
      product: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  let numItemsInCart = 0;
  let cartTotal = 0;

  for (const item of cartItems) {
    numItemsInCart += item.amount;
    cartTotal += item.amount * item.product.price;
  }

  const tax = cart.taxRate * cartTotal;
  const shipping = cartTotal ? cart.shipping : 0;
  const orderTotal = cartTotal + tax + shipping;

  const currentCart = await db.cart.update({
    where: {
      id: cart.id,
    },
    data: { numItemsInCart, cartTotal, tax, orderTotal },
    include: includeProductClause,
  });

  return { currentCart, cartItems };
};

export const addToCartAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser();

  try {
    // get the form data - must
    const productId = formData.get("productId") as string;
    const amount = Number(formData.get("amount"));

    // check if the product exists using the fetchProduct
    await fetchProduct(productId);

    // we need to create or fetch a cart, if he has a cart we return the cart otherwise we create a new cart
    const cart = await fetchOrCreateCart({ userId: user.id });

    // now we have a cart but we need to either create a new cartitem or update an existing cart item
    await updateOrCreateCartItem({ productId, amount, cartId: cart.id });
    // lets update the cart / get total calculatiom
    await updateCart(cart);
  } catch (error) {
    return renderError(error);
  }
  redirect("/cart");
};

export const removeCartItemAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getAuthUser();

  try {
    const cartId = formData.get("id") as string;

    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });

    await db.cartItem.delete({
      where: {
        id: cartId,
        cartId: cart.id,
      },
    });

    // recalulcate cart
    await updateCart(cart);
    revalidatePath("/cart");
    return { message: "item removed from cart" };
  } catch (error) {
    return renderError(error);
  }
};

export const updateCartItemAction = async ({
  amount,
  cartItemId,
}: {
  amount: number;
  cartItemId: string;
}) => {
  const user = await getAuthUser();

  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });

    await db.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        amount,
      },
    });

    await updateCart(cart);
    revalidatePath("/cart");
  } catch (error) {
    return renderError(error);
  }
};

export const createOrderAction = async ({
  prevState,
  formData,
}: {
  prevState: any;
  formData: FormData;
}) => {
  const user = await getAuthUser();

  let orderId: null | string = null;
  let cartId: null | string = null;

  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    }); // you cant create an order without a cart, so throw error if no cart but also we need cart data to create order

    cartId = cart.id;

    // lets delete any order that user hasnt paid for, because we create order based on cart, and if user went back
    // and updated the cart after clicking the "place order" action, we wil have order 1 created, then now order has the
    // contents of order 1 + extra order 2 so they overpay, so this line is like a critical checker
    await db.order.deleteMany({
      where: {
        clerkId: user.id,
        isPaid: false,
      },
    });

    // notice we create order based on cart, very important to notice why we have the line of code above
    const order = await db.order.create({
      data: {
        clerkId: user.id,
        shipping: cart.shipping,
        tax: cart.tax,
        orderTotal: cart.orderTotal,
        products: cart.numItemsInCart,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    // once we have the order we get rid of the cart
    // await db.cart.delete({
    //   where: {
    //     id: cart.id,
    //   },
    // });
    orderId = order.id;
  } catch (error) {
    return renderError(error);
  }
  redirect(`/checkout?cartId=${cartId}&orderId=${orderId}`);
};

export const fetchUserOrders = async () => {
  const user = await getAuthUser();

  const userOrders = await db.order.findMany({
    where: {
      clerkId: user.id,
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return userOrders;
};

export const fetchAdminOrders = async () => {
  const user = await getAdmin();

  const adminOrders = await db.order.findMany({
    where: {
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return adminOrders;
};
