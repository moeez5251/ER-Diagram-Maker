import React from "react";
import { cn } from "@/lib/utils";

export const BaseNode = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { selected?: boolean }
>(({ className, selected, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-md border border-neutral-200 bg-white p-5 text-neutral-950 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50",
      className,
      selected ? "border-neutral-500 shadow-lg dark:border-neutral-400" : "",
      "hover:ring-1",
    )}
    tabIndex={0}
    {...props}
  />
));
BaseNode.displayName = "BaseNode";
