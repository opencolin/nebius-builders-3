import { cn } from "@/lib/utils";

const palette = [
  "bg-lime text-navy-700",
  "bg-navy-700 text-lime",
  "bg-navy-100 text-navy-700",
  "bg-lime-200 text-navy-700",
];

export function Avatar({
  name,
  handle,
  size = 56,
  className,
}: {
  name: string;
  handle?: string;
  size?: number;
  className?: string;
}) {
  const seed = (handle ?? name).toLowerCase();
  const hash = Array.from(seed).reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const swatch = palette[hash % palette.length];
  const initials = name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold leading-none",
        swatch,
        className,
      )}
      style={{ width: size, height: size, fontSize: Math.max(12, Math.round(size / 2.4)) }}
      aria-hidden
    >
      {initials}
    </span>
  );
}
