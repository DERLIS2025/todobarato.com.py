"use client";

import Link from "next/link";
import { useState } from "react";
import { categories } from "@/data/categories";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCompareStore } from "@/store/compareStore";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [open, setOpen] = useState(false);
  const count = useCartStore((s) => s.count());
  const wishlistCount = useWishlistStore((s) => s.ids.length);
  const compareCount = useCompareStore((s) => s.ids.length);

  return (
    <header className="sticky top-0 z-40 border-b border-primaryDark bg-primaryDark text-white shadow-soft">
      <MobileMenu open={open} onClose={() => setOpen(false)} />
      <div className="container-page py-3 lg:grid lg:grid-cols-[270px_1fr_250px] lg:items-center lg:gap-4 lg:py-4">
        <div className="flex items-center justify-between gap-2">
          <button
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/10 text-lg lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Abrir categorías"
          >
            ☰
          </button>
          <Link href="/" className="min-w-0 text-xl font-black text-white sm:text-2xl">
            Todobarato<span className="text-cta">.com.py</span>
          </Link>
          <Link href="/carrito" className="relative grid h-10 min-w-10 place-items-center rounded-xl bg-primary px-3 text-sm font-black lg:hidden">
            🛒 {count}
          </Link>
        </div>

        <form action="/buscar" className="mt-3 flex h-11 overflow-hidden rounded-2xl border-2 border-primary bg-white text-primaryDark lg:mt-0 lg:h-12">
          <select name="categoria" className="hidden border-r border-border bg-surface px-3 text-sm font-semibold md:block">
            <option value="">Todo</option>
            {categories.map((category) => (
              <option value={category.slug} key={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            name="q"
            className="min-w-0 flex-1 px-3 text-sm outline-none sm:px-4"
            placeholder="Buscar productos, marcas y ofertas..."
          />
          <button className="bg-cta px-4 text-sm font-black text-white transition hover:bg-primary lg:px-5">Buscar</button>
        </form>

        <div className="hidden justify-end gap-2 text-sm font-bold lg:flex">
          <Link href="/comparar" className="rounded-xl border border-white/15 bg-white/10 px-3 py-3 hover:bg-white/20">
            ⇄ {compareCount}
          </Link>
          <Link href="/wishlist" className="rounded-xl border border-white/15 bg-white/10 px-3 py-3 hover:bg-white/20">
            ♡ {wishlistCount}
          </Link>
          <Link href="/carrito" className="rounded-xl bg-primary px-4 py-3 font-black text-white hover:bg-cta">
            🛒 {count}
          </Link>
        </div>
      </div>
    </header>
  );
}
