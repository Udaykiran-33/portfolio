import { cn } from "@/lib/utils";

interface PlaceholderImageProps {
  width: number;
  height: number;
  label?: string;
  className?: string;
}

export function PlaceholderImage({
  width,
  height,
  label,
  className,
}: PlaceholderImageProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg bg-[var(--gray-2)] border border-[var(--gray-3)]",
        className
      )}
      style={{ width: "100%", aspectRatio: `${width}/${height}` }}
    >
      <span className="select-none text-[12px] font-mono text-[var(--gray-6)]">
        {label ? `${label} — ` : ""}
        {width} x {height}
      </span>
    </div>
  );
}
