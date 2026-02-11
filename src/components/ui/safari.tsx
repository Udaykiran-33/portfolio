import { cn } from "@/lib/utils";

interface SafariProps {
  url?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Safari({
  url = "folio.dev",
  className,
  children,
}: SafariProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-[var(--gray-3)] bg-[var(--gray-2)]",
        className
      )}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-[var(--gray-3)] px-4 py-3">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[var(--gray-4)]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[var(--gray-4)]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[var(--gray-4)]" />
        </div>
        <div className="mx-auto flex h-6 max-w-[240px] flex-1 items-center justify-center rounded-md bg-[var(--gray-3)] px-3">
          <span className="text-[11px] font-mono text-[var(--gray-7)]">
            {url}
          </span>
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
