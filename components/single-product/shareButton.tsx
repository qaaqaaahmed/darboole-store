"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { LuShare2 } from "react-icons/lu";
import {
  TwitterShareButton,
  EmailShareButton,
  LinkedinShareButton,
  TwitterIcon,
  EmailIcon,
  LinkedinIcon,
} from "react-share";

function ShareButton({ productId, name }: { productId: string; name: string }) {
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const shareLink = `url/products/${productId}`;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="p-2" size="icon">
          <LuShare2 />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        side="top"
        sideOffset={10}
        align="start"
        className="flex items-center gap-x-2 justify-center w-full"
      >
        <TwitterShareButton url={shareLink} title={name}>
          <TwitterIcon round size={32} />
        </TwitterShareButton>

        <LinkedinShareButton url={shareLink} title={name}>
          <LinkedinIcon round size={32} />
        </LinkedinShareButton>

        <EmailShareButton url={shareLink} title={name}>
          <EmailIcon round size={32} />
        </EmailShareButton>
      </PopoverContent>
    </Popover>
  );
}

export default ShareButton;
