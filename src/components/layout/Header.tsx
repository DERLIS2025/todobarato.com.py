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
  const count = useCartStore((state) => state.count());
  const wishlistCount = useWishlistStore((state) => state.ids.length);
  const compareCount = useCompareStore((state) => state.ids.length);

  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">
      <MobileMenu open={open} onClose={() => setOpen(false)} />

      <div className="container-page grid gap-3 py-4 lg:grid-cols-[260px_1fr_250px] lg:items-center">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="text-2xl font-black text-primary">
            Todobarato<span className="text-primaryDark">.com.py</span>
          </Link>

          <button
            type="button"
            className="btn-secondary px-3 py-2 lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Abrir categorías"
          >
            ☰
          </button>
        </div>

        <form
          action="/buscar"
          className="flex overflow-hidden rounded-2xl border-2 border-primary bg-white"
        >
          <select
            name="categoria"
            className="hidden border-r px-3 text-sm md:block"
          >
            <option value="">Todo</option>
            {categories.map((category) => (
              <option value={category.slug} key={category.slug}>
                {category.name}
              </option>
            ))}
          </select>

          <input
            name="q"
            className="min-w-0 flex-1 px-4 py-3 outline-none"
            placeholder="Buscar productos, marcas y ofertas..."
          />

          <button className="bg-primary px-5 font-bold text-white">
            Buscar
          </button>
        </form>

        <div className="flex justify-between gap-2 text-sm font-bold lg:justify-end">
          <Link href="/comparar" className="btn-secondary px-3 py-2">
            ⇄ {compareCount}
          </Link>

          <Link href="/wishlist" className="btn-secondary px-3 py-2">
            ♡ {wishlistCount}
          </Link>

          <Link href="/carrito" className="btn-primary px-3 py-2">
            🛒 {count}
          </Link>
        </div>
      </div>
    </header>
  );
}
