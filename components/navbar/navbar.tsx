import React, { Suspense } from "react";
import Container from "../global/Container";
import Logo from "./Logo";
import NavSearch from "./NavSearch";
import CartButton from "./CartButton";
import DarkMode from "./DarkMode";
import LinksDropdown from "./LinksDropdown";

function Navbar() {
  return (
    <nav className="border-b">
      <Container className="flex flex-col sm:justify-between sm:items-center sm:flex-row gap-4 py-8 flex-wrap">
        <Logo />
        <Suspense>
          <NavSearch />
        </Suspense>

        <div className="flex gap-x-4">
          <CartButton />
          <DarkMode />
          <LinksDropdown />
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
