import React from "react";
import { cn } from "@/lib/utils";

export const BaseNode = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { selected?: boolean }
>(({ className, selected, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      className,
      // selected ? "border-neutral-500 shadow-lg dark:border-neutral-40" : "",
      // "hover:ring-1",
    )}
    tabIndex={0}
    {...props}
  />
));
BaseNode.displayName = "BaseNode";
