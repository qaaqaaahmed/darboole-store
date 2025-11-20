type Navlink = {
  href: string;
  label: string;
};

export const links: Navlink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "about" },
  { href: "/products", label: "products" },
  { href: "/favourites", label: "favourites" },
  { href: "/reviews", label: "reviews" },
  { href: "/cart", label: "cart" },
  { href: "/orders", label: "orders" },
  { href: "/admin/sales", label: "Dashboard" },
];

export const adminLinks: Navlink[] = [
  { href: "/admin/sales", label: "sales" },
  { href: "/admin/products", label: "products" },
  { href: "/admin/products/create", label: "Create Product" },
];
