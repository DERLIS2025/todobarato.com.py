"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type WholesaleBanner = {
  id: string;
  title: string;
  image: string | null;
  mobileImage?: string | null;
  href?: string | null;
};

export function WholesaleHeroSlider({
  banners,
}: {
  banners: WholesaleBanner[];
}) {
  const validBanners = banners.filter((banner) => Boolean(banner.image));
  const [activeIndex, setActiveIndex] = useState(0);

  const total = validBanners.length;

  useEffect(() => {
    if (total <= 1) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % total);
    }, 6500);

    return () => window.clearInterval(interval);
  }, [total]);

  if (!total) {
    return (
      <section className="overflow-hidden rounded-3xl border border-borderSoft bg-primaryDark p-8 text-white shadow-soft">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-promo">
          Sección mayorista
        </p>
        <h1 className="mt-3 text-4xl font-black leading-tight lg:text-5xl">
          Precios mayoristas desde 3 unidades
        </h1>
        <p className="mt-4 max-w-2xl text-white/80">
          Todavía no hay banners mayoristas activos con imagen.
        </p>
      </section>
    );
  }

  function goTo(index: number) {
    setActiveIndex((index + total) % total);
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-borderSoft bg-white shadow-soft">
      <div className="group relative overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {validBanners.map((banner) => {
            const desktopImage = banner.image ?? "";
            const mobileImage = banner.mobileImage || desktopImage;

            const image = (
              <picture>
                <source media="(max-width: 767px)" srcSet={mobileImage} />
                <img
                  src={desktopImage}
                  alt={banner.title}
                  className="h-full w-full object-cover"
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
              className="absolute left-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/85 px-4 py-3 text-lg font-black text-primaryDark shadow-soft transition hover:bg-white md:block"
              aria-label="Banner anterior"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/85 px-4 py-3 text-lg font-black text-primaryDark shadow-soft transition hover:bg-white md:block"
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
                      : "w-2.5 bg-white/55 hover:bg-white"
                  }`}
                  aria-label={`Ver banner mayorista ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
