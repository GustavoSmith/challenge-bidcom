import { Button as BaseButton } from "@base-ui/react/button";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/classnames";

type ButtonVariant = "primary" | "secondary" | "category";

type ButtonStyleOptions = {
  className?: string;
  variant?: ButtonVariant;
};

const baseButtonStyles =
  "inline-flex items-center justify-center font-bold transition focus:outline-none focus:ring-4 focus:ring-bidcom-blue-soft disabled:cursor-not-allowed disabled:opacity-70";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "min-h-12 rounded-full bg-bidcom-blue px-6 text-sm text-surface shadow-sm hover:bg-bidcom-blue-ink active:translate-y-px",
  secondary:
    "rounded-full border border-border-soft bg-surface px-4 py-2 text-sm text-bidcom-blue hover:border-bidcom-blue",
  category:
    "rounded-full border border-border-soft bg-bidcom-blue-soft px-4 py-2 text-sm text-bidcom-blue-ink hover:border-bidcom-blue hover:bg-surface",
};

export function buttonStyles({
  className,
  variant = "primary",
}: ButtonStyleOptions = {}): string {
  return cn(baseButtonStyles, buttonVariants[variant], className);
}

type ButtonProps = Omit<
  ComponentPropsWithoutRef<typeof BaseButton>,
  "className"
> &
  ButtonStyleOptions;

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <BaseButton className={buttonStyles({ className, variant })} {...props} />
  );
}
