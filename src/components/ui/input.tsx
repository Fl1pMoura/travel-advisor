import { cn } from "@/lib/utils";
import * as React from "react";

const Input = ({
  className,
  type,
  ref,
  ...props
}: React.ComponentProps<"input">) => {
  return (
    <input
      type={type}
      placeholder="Search"
      ref={ref}
      className={cn(
        "flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-base shadow-sm transition-all placeholder:text-zinc-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
};

Input.displayName = "Input";

export { Input };
