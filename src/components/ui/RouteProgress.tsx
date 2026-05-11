"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function RouteProgress() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");

      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const targetAttr = anchor.getAttribute("target");

      if (!href) return;
      if (targetAttr === "_blank") return;
      if (href.startsWith("#")) return;
      if (href.startsWith("mailto:")) return;
      if (href.startsWith("tel:")) return;
      if (href.startsWith("https://wa.me")) return;
      if (href.startsWith("http") && !href.includes(window.location.host)) return;

      const nextUrl = new URL(href, window.location.origin);

      if (nextUrl.pathname === window.location.pathname && nextUrl.search === window.location.search) {
        return;
      }

      setLoading(true);

      window.setTimeout(() => {
        setLoading(false);
      }, 6000);
    }

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed left-0 top-0 z-[9999] h-1 w-full bg-primary/20">
      <div className="h-full w-2/3 animate-[route-progress_1.2s_ease-in-out_infinite] bg-cta" />

      <style jsx global>{`
        @keyframes route-progress {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(160%);
          }
        }
      `}</style>
    </div>
  );
}
