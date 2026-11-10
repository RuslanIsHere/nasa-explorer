import type { ComponentProps } from "react";

export function Button({ className = "", ...props }: ComponentProps<"button">) {
  return (
    <button
      className={`rounded-md bg-accent px-4 py-2 font-semibold text-ink transition-colors hover:bg-accent-strong ${className}`}
      {...props}
    />
  );
}
