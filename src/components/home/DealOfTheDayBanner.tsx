"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type DealBanner = {
  id: string;
  title: string;
  image: string | null;
  mobileImage?: string | null;
  href?: string | null;
};

type FeaturedProduct = {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
  price?: number | null;
  oldPrice?: number | null;
  brand?: string | null;
  category?: { name?: string | null } | string | null;
  badges?: string[];
};

function formatPrice(value?: number | null) {
  if (!value) return "Consultar";
  return new Intl.NumberFormat("es-PY", {
    style: "currency",
    currency: "PYG",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

function getCategoryName(category: FeaturedProduct["category"]) {
  if (!category) return "Producto";
  if (typeof category === "string") return category;
  return category.name ?? "Producto";
}

export function DealOfTheDayBanner({
  banners,
  featuredProduct,
}: {
  banners: DealBanner[];
  featuredProduct?: FeaturedProduct | null;
}) {
  const validBanners = useMemo(
    () => banners.filter((banner) => Boolean(banner.image)),
    [banners]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const total = validBanners.length;

  useEffect(() => {
    if (total <= 1) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % total);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [total]);

  if (!total) return null;

  function goTo(index: number) {
    setActiveIndex((index + total) % total);
  }

  return (
    <section className="container-page py-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="overflow-hidden rounded-3xl border border-borderSoft bg-white shadow-soft">
          <div className="relative h-full overflow-hidden">
            <div
              className="flex h-full transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {validBanners.map((banner) => {
                const desktopImage = banner.image ?? "";
                const mobileImage = banner.mobileImage || desktopImage;

                const image = (
                  <picture className="block h-full w-full">
                    <source media="(max-width: 767px)" srcSet={mobileImage} />
                    <img
                      src={desktopImage}
                      alt={banner.title}
                      className="block h-full w-full object-cover"
                    />
                  </picture>
                );

                return (
                  <div
                    key={banner.id}
                    className="aspect-[600/480] w-full shrink-0 md:aspect-[16/7] lg:min-h-[420px]"
                  >
                    {banner.href ? (
                      <Link href={banner.href} className="block h-full w-full">
                        {image}
                      </Link>
                    ) : (
                      <div className="h-full w-full">{image}</div>
                    )}
                  </div>
                );
              })}
            </div>

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => goTo(activeIndex - 1)}
                  className="absolute left-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/90 px-4 py-3 text-xl font-black text-primaryDark shadow-soft transition hover:bg-white md:block"
                  aria-label="Banner anterior"
                >
                  ‹
                </button>

                <button
                  type="button"
                  onClick={() => goTo(activeIndex + 1)}
                  className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/90 px-4 py-3 text-xl font-black text-primaryDark shadow-soft transition hover:bg-white md:block"
                  aria-label="Siguiente banner"
                >
                  ›
                </button>

                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/25 px-3 py-2 backdrop-blur">
                  {validBanners.map((banner, index) => (
                    <button
                      key={banner.id}
                      type="button"
                      onClick={() => goTo(index)}
                      className={`h-2.5 rounded-full transition-all ${
                        index === activeIndex
                          ? "w-8 bg-white"
                          : "w-2.5 bg-white/60 hover:bg-white"
                      }`}
                      aria-label={`Ver oferta ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {featuredProduct && (
          <article className="overflow-hidden rounded-3xl border border-borderSoft bg-white shadow-soft">
            <Link href={`/producto/${featuredProduct.slug}`} className="block">
              {featuredProduct.image ? (
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="aspect-square w-full object-cover"
                />
              ) : (
                <div className="grid aspect-square place-items-center bg-surface text-xs font-bold text-textSecondary">
                  Sin imagen
                </div>
              )}
            </Link>

            <div className="p-5">
              <div className="mb-3 flex flex-wrap gap-2">
                {(featuredProduct.badges ?? []).slice(0, 2).map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full bg-promo px-3 py-1 text-xs font-black text-primaryDark"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <p className="text-xs font-black uppercase text-textSecondary">
                {featuredProduct.brand ?? "Marca"} ·{" "}
                {getCategoryName(featuredProduct.category)}
              </p>

              <Link
                href={`/producto/${featuredProduct.slug}`}
                className="mt-2 line-clamp-2 block min-h-[48px] text-lg font-black text-primaryDark hover:text-primary"
              >
                {featuredProduct.name}
              </Link>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <strong className="text-2xl font-black text-primary">
                  {formatPrice(featuredProduct.price)}
                </strong>

                {featuredProduct.oldPrice && featuredProduct.oldPrice > 0 && (
                  <span className="text-sm text-textSecondary line-through">
                    {formatPrice(featuredProduct.oldPrice)}
                  </span>
                )}
              </div>

              <Link
                href={`/producto/${featuredProduct.slug}`}
                className="mt-5 block rounded-xl bg-primary px-4 py-3 text-center text-sm font-black text-white transition hover:bg-primaryDark"
              >
                Ver producto
              </Link>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
