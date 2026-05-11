"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { categories } from "@/data/categories";

type HeroBanner = {
  id: string;
  title: string;
  text?: string | null;
  href?: string | null;
  image?: string | null;
  mobileImage?: string | null;
  ctaLabel?: string | null;
};

type HeroMarketplaceProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  heroBanner?: HeroBanner | null;
  heroBanners?: HeroBanner[];
};

export function HeroMarketplace({
  eyebrow,
  title,
  subtitle,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  heroBanner,
  heroBanners = [],
}: HeroMarketplaceProps) {
  const banners = useMemo(() => {
    const list = heroBanners.length ? heroBanners : heroBanner ? [heroBanner] : [];
    return list.filter((banner) => Boolean(banner.image));
  }, [heroBanner, heroBanners]);

  const [activeIndex, setActiveIndex] = useState(0);
  const total = banners.length;

  useEffect(() => {
    if (total <= 1) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % total);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [total]);

  function goTo(index: number) {
    setActiveIndex((index + total) % total);
  }

  return (
    <section className="container-page py-5 md:py-6">
      <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
        <aside className="hidden overflow-hidden rounded-2xl border border-borderSoft bg-white shadow-soft lg:block">
          <div className="bg-primaryDark px-5 py-4 text-sm font-black text-white">
            Todas las categorías
          </div>

          <nav>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categoria/${category.slug}`}
                className="flex items-center justify-between border-b border-borderSoft px-5 py-4 text-sm font-bold text-primaryDark transition hover:bg-surface hover:text-primary"
              >
                <span className="flex items-center gap-3">
                  <span>{category.icon}</span>
                  {category.name}
                </span>
                <span className="text-textSecondary">›</span>
              </Link>
            ))}

          </nav>
        </aside>

        <div className="overflow-hidden rounded-3xl border border-borderSoft bg-white shadow-soft">
          {total > 0 ? (
            <div className="group relative overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {banners.map((banner) => {
                  const desktopImage = banner.image ?? "";
                  const mobileImage = banner.mobileImage || desktopImage;

                  const content = (
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
                      className="aspect-[600/480] w-full shrink-0 md:aspect-[1920/900]"
                    >
                      {banner.href ? (
                        <Link href={banner.href} className="block h-full w-full">
                          {content}
                        </Link>
                      ) : (
                        <div className="h-full w-full">{content}</div>
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
                    {banners.map((banner, index) => (
                      <button
                        key={banner.id}
                        type="button"
                        onClick={() => goTo(index)}
                        className={`h-2.5 rounded-full transition-all ${
                          index === activeIndex
                            ? "w-8 bg-white"
                            : "w-2.5 bg-white/60 hover:bg-white"
                        }`}
                        aria-label={`Ver banner ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex min-h-[360px] items-center bg-gradient-to-br from-primaryDark via-primary to-cta p-8 text-white md:min-h-[430px] md:p-12">
              <div className="max-w-2xl">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-promo">
                  {eyebrow}
                </p>

                <h1 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
                  {title}
                </h1>

                <p className="mt-4 max-w-xl text-white/85">{subtitle}</p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={primaryHref} className="btn-cta">
                    {primaryLabel}
                  </Link>

                  <Link
                    href={secondaryHref}
                    className="rounded-xl bg-white px-5 py-3 text-sm font-black text-primaryDark"
                  >
                    {secondaryLabel}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
