"use client";

import Link from "next/link";
import { categories } from "@/data/categories";
import { mainNav } from "@/data/navigation";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div className={`${open ? "fixed" : "hidden"} inset-0 z-50 bg-primaryDark/60 lg:hidden`} onClick={onClose}>
      <aside className="h-full w-80 max-w-[86vw] overflow-y-auto bg-white p-4 shadow-soft" onClick={(event) => event.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-black text-primaryDark">Todobarato.com.py</h3>
          <button className="grid h-10 w-10 place-items-center rounded-xl bg-surface font-black" onClick={onClose} aria-label="Cerrar menú">
            ✕
          </button>
        </div>
        <p className="mb-3 rounded-2xl bg-primaryLight p-3 text-sm font-bold text-primaryDark">Navegá rápido por categorías y ofertas.</p>
        <nav className="grid gap-2">
          {categories.map((category) => (
            <Link onClick={onClose} className="flex items-center justify-between rounded-xl border border-border p-3 text-sm font-bold" href={`/categoria/${category.slug}`} key={category.slug}>
              <span>{category.icon} {category.name}</span>
              <span>›</span>
            </Link>
          ))}
        </nav>
        <div className="mt-5 grid gap-2 border-t border-border pt-4">
          {mainNav.map((item) => (
            <Link onClick={onClose} className="rounded-xl bg-surface px-3 py-3 text-sm font-black" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
}
