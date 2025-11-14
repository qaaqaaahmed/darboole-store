import { cn } from "@/lib/utils";

function EmptyList({
  heading = "no items found...",
  className,
}: {
  heading?: string;
  className?: string;
}) {
  return <h3 className={cn("text-xl", className)}>{heading}</h3>;
}

export default EmptyList;
