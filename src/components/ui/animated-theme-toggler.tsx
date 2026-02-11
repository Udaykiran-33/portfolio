"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";

interface AnimatedThemeTogglerProps
  extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
}

export function AnimatedThemeToggler({
  className,
  duration = 500,
  ...props
}: AnimatedThemeTogglerProps) {
  const [isDark, setIsDark] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const update = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return;

    const toggle = () => {
      flushSync(() => {
        const newDark = !isDark;
        setIsDark(newDark);
        document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", newDark ? "dark" : "light");
      });
    };

    // View Transition API — circular reveal from button position
    if (document.startViewTransition) {
      const transition = document.startViewTransition(toggle);

      try {
        await transition.ready;

        const { top, left, width, height } =
          buttonRef.current.getBoundingClientRect();
        const x = left + width / 2;
        const y = top + height / 2;
        const maxRadius = Math.hypot(
          Math.max(left, window.innerWidth - left),
          Math.max(top, window.innerHeight - top),
        );

        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration,
            easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      } catch {
        // View transition failed, theme still toggled
      }
    } else {
      toggle();
    }
  }, [isDark, duration]);

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-full border border-[var(--gray-4)] bg-[var(--gray-2)] transition-all duration-200 hover:border-[var(--gray-5)] hover:bg-[var(--gray-3)]",
        className,
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      {...props}
    >
      {/* Abstract shape: ring (dark) ↔ filled circle (light) */}
      <span
        className={cn(
          "block rounded-full transition-all duration-300",
          isDark
            ? "h-4 w-4 scale-100 border-[2px] border-[var(--gray-10)] bg-transparent"
            : "h-3.5 w-3.5 scale-[0.9] border-0 bg-[var(--gray-11)]",
        )}
      />
    </button>
  );
}
