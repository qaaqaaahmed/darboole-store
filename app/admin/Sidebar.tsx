"use client";
import { Button } from "@/components/ui/button";
import { adminLinks } from "@/utils/links";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside>
      {adminLinks.map((link) => {
        const isActiveLink = pathname === link.href;
        const variant = isActiveLink ? "default" : "ghost";

        return (
          <Button
            key={link.href}
            asChild
            variant={variant}
            className="w-full mb-2 capitalize font-normal justify-start"
          >
            <Link href={link.href}>{link.label}</Link>
          </Button>
        );
      })}
    </aside>
  );
}

export default Sidebar;
