import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import React from "react";
import { Button } from "../ui/button";
import { LuAlignLeft } from "react-icons/lu";
import { DropdownMenuContent } from "../ui/dropdown-menu";
import { links } from "@/utils/links";
import Link from "next/link";

function LinksDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-4 max-w-[100px]">
          <LuAlignLeft className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40" align="center" sideOffset={10}>
        {links.map((link) => {
          return (
            <DropdownMenuItem key={link.href}>
              <Link href={link.href} className="w-full capitalize">
                {link.label}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LinksDropdown;
