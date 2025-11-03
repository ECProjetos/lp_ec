// components/ui/typography.tsx
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function H1({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={`text-3xl md:text-5xl font-semibold tracking-tight text-brand-primary ${className}`}
    >
      {children}
    </h1>
  );
}

export function H2({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-2xl md:text-4xl font-semibold tracking-tight text-brand-primary ${className}`}
    >
      {children}
    </h2>
  );
}

export function Muted({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-base md:text-lg text-brand-textMuted ${className}`}>
      {children}
    </p>
  );
}
export function P({
  className,
  children,
  ...props
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) {
  return (
    <p
      className={cn(
        "text-base leading-relaxed text-gray-700 dark:text-gray-300",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
