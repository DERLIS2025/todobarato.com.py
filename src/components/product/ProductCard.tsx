"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Product } from "@/data/products";
import { formatPrice } from "@/lib/formatPrice";
import { getDiscount } from "@/lib/productUtils";
import { useCartStore } from "@/store/cartStore";
import { useCompareStore } from "@/store/compareStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { QuickViewModal } from "./QuickViewModal";

export function ProductCard({ product, mode = "grid", compact = false }: { product: Product; mode?: "grid" | "list"; compact?: boolean }) {
  const [quick, setQuick] = useState(false);
  const add = useCartStore((s) => s.add);
  const wish = useWishlistStore((s) => s.toggle);
  const comp = useCompareStore((s) => s.toggle);
  const discount = getDiscount(product);

  return (
    <article className={`card group overflow-hidden ${mode === "list" ? "grid gap-4 p-3 sm:grid-cols-[220px_1fr]" : ""}`}>
      {quick && <QuickViewModal product={product} onClose={() => setQuick(false)} />}
      <Link href={`/producto/${product.slug}`} className="relative block overflow-hidden bg-surface">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={420}
          className={`w-full object-cover transition group-hover:scale-105 ${mode === "list" ? "h-56 rounded-xl" : compact ? "h-32 sm:h-40 lg:h-56" : "h-44 sm:h-56"}`}
        />
        <div className="absolute left-2 top-2 flex flex-wrap gap-1 sm:left-3 sm:top-3">
          {product.badges.slice(0, compact ? 2 : 3).map((badge) => (
            <span className="rounded-full bg-promo px-2 py-1 text-[10px] font-black text-primaryDark sm:text-xs" key={badge}>
              {badge}
            </span>
          ))}
        </div>
      </Link>
      <div className={compact ? "p-3" : "p-4"}>
        <p className="truncate text-[10px] font-bold uppercase text-textSecondary sm:text-xs">
          {product.brand} · {product.category}
        </p>
        <Link href={`/producto/${product.slug}`} className="line-clamp-2 mt-1 min-h-9 text-sm font-black leading-tight hover:text-primary sm:min-h-10 sm:text-base">
          {product.name}
        </Link>
        <p className="mt-1 text-xs text-primary sm:text-sm">
          ★★★★★ <span className="text-textSecondary">({product.reviews})</span>
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
          <strong className="text-base text-primary sm:text-xl">{formatPrice(product.price)}</strong>
          {product.oldPrice && <span className="text-[11px] text-textSecondary line-through sm:text-sm">{formatPrice(product.oldPrice)}</span>}
          {discount > 0 && <span className="rounded bg-promo px-1.5 py-0.5 text-[10px] font-black text-primaryDark sm:px-2 sm:py-1 sm:text-xs">-{discount}%</span>}
        </div>
        <div className="mt-3 grid gap-2 sm:mt-4">
          <button className="btn-primary min-h-10 px-2 py-2 text-xs sm:text-sm" onClick={() => add(product)}>
            <span className="sm:hidden">Agregar</span>
            <span className="hidden sm:inline">Agregar al carrito</span>
          </button>
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            <button className="btn-secondary min-h-9 px-2 py-2 text-xs" onClick={() => setQuick(true)} aria-label="Vista rápida">
              👁
            </button>
            <button className="btn-secondary min-h-9 px-2 py-2 text-xs" onClick={() => wish(product.id)} aria-label="Agregar a wishlist">
              ♡
            </button>
            <button className="btn-secondary min-h-9 px-2 py-2 text-xs" onClick={() => comp(product.id)} aria-label="Comparar">
              ⇄
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
