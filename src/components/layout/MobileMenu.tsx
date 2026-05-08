"use client";

import { useEffect } from "react";
import Link from "next/link";
import { categories } from "@/data/categories";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[90] lg:hidden" aria-modal="true" role="dialog">
      <button
        type="button"
        aria-label="Cerrar menú de categorías"
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <aside className="relative z-[100] flex h-dvh w-[88vw] max-w-[340px] flex-col overflow-hidden bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-borderSoft bg-white px-5 py-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-cta">
              Menú
            </p>
            <h3 className="mt-1 text-xl font-black text-primaryDark">
              Todas las categorías
            </h3>
          </div>

          <button
            type="button"
            className="rounded-full border border-borderSoft bg-white px-3 py-2 text-xs font-black text-primaryDark shadow-sm"
            onClick={onClose}
          >
            ✕ Cerrar
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto bg-surface px-4 py-4">
          <div className="grid gap-2">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categoria/${category.slug}`}
                onClick={onClose}
                className="flex items-center justify-between rounded-2xl border border-borderSoft bg-white px-4 py-3 text-sm font-black text-primaryDark shadow-sm transition hover:border-primary hover:text-primary"
              >
                <span className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-surface text-base">
                    {category.icon}
                  </span>
                  {category.name}
                </span>

                <span className="text-textSecondary">›</span>
              </Link>
            ))}

            <Link
              href="/ofertas"
              onClick={onClose}
              className="flex items-center justify-between rounded-2xl border border-borderSoft bg-white px-4 py-3 text-sm font-black text-primaryDark shadow-sm transition hover:border-primary hover:text-primary"
            >
              <span className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-surface text-base">
                  🔥
                </span>
                Ofertas
              </span>

              <span className="text-textSecondary">›</span>
            </Link>

            <Link
              href="/nuevos-productos"
              onClick={onClose}
              className="flex items-center justify-between rounded-2xl border border-borderSoft bg-white px-4 py-3 text-sm font-black text-primaryDark shadow-sm transition hover:border-primary hover:text-primary"
            >
              <span className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-surface text-base">
                  🌟
                </span>
                Temporada
              </span>

              <span className="text-textSecondary">›</span>
            </Link>
          </div>
        </nav>
      </aside>
    </div>
  );
}
