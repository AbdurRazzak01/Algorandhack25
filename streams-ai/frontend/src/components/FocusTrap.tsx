import { useEffect, useRef } from "react";

/**
 * FocusTrap — Locks focus within children.
 * Used for modals to prevent tabbing outside.
 */
export default function FocusTrap({ children }: { children: React.ReactNode }) {
  const trapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trapRef.current;
    if (!el) return;

    const focusable = el.querySelectorAll<HTMLElement>(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, []);

  return <div ref={trapRef}>{children}</div>;
}
