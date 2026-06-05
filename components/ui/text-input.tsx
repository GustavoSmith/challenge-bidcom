import { Input as BaseInput } from "@base-ui/react/input";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/classnames";

type TextInputProps = Omit<
  ComponentPropsWithoutRef<typeof BaseInput>,
  "className"
> & {
  className?: string;
};

export function TextInput({ className, ...props }: TextInputProps) {
  return (
    <BaseInput
      className={cn(
        "min-h-12 w-full rounded-full border border-border-soft bg-surface px-4 py-3 text-sm font-medium text-foreground shadow-sm outline-none transition placeholder:text-zinc-500 focus:border-bidcom-blue focus:ring-4 focus:ring-bidcom-blue-soft disabled:cursor-not-allowed disabled:opacity-70",
        className,
      )}
      {...props}
    />
  );
}
