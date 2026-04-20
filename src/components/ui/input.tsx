import * as React from "react";
import { cn } from "../../lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-lg border bg-transparent px-2.5 py-1 text-base transition-colors",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
