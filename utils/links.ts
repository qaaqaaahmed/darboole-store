type Navlink = {
  href: string;
  label: string;
};

export const links: Navlink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "about" },
  { href: "/products", label: "products" },
  { href: "/favourites", label: "favourites" },
  { href: "/cart", label: "cart" },
  { href: "/orders", label: "orders" },
];
