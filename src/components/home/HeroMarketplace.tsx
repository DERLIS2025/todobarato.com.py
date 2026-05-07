import Link from "next/link";
import { CategorySidebar } from "@/components/layout/CategorySidebar";

type HeroBanner = {
  title: string;
  image: string | null;
  mobileImage: string | null;
  href: string | null;
};

type HeroMarketplaceProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  heroBanner?: HeroBanner | null;
};

export function HeroMarketplace({
  eyebrow = "OFERTAS TODOS LOS DÍAS",
  title = "Todo para tu casa, tus fiestas y tu día a día al mejor precio.",
  subtitle = "Comprá bazar, electrónica, cotillón y productos para el hogar con precios bajos y envío a todo Paraguay.",
  primaryLabel = "Ver ofertas",
  primaryHref = "/ofertas",
  secondaryLabel = "Nuevos ingresos",
  secondaryHref = "/nuevos-productos",
  heroBanner,
}: HeroMarketplaceProps) {
  const hasHeroBanner = Boolean(heroBanner?.image);

  return (
    <section className="container-page mt-6 grid gap-5 lg:grid-cols-[280px_1fr]">
      <div className="hidden lg:block">
        <CategorySidebar />
      </div>

      {hasHeroBanner && heroBanner?.image ? (
        <div className="overflow-hidden rounded-3xl border border-borderSoft bg-white shadow-soft">
          {heroBanner.href ? (
            <Link
              href={heroBanner.href}
              className="block aspect-[600/480] w-full md:aspect-[929/556]"
              aria-label={heroBanner.title}
            >
              <picture>
                <source
                  media="(max-width: 767px)"
                  srcSet={heroBanner.mobileImage || heroBanner.image}
                />
                <img
                  src={heroBanner.image}
                  alt={heroBanner.title}
                  className="h-full w-full object-cover"
                />
              </picture>
            </Link>
          ) : (
            <div className="aspect-[600/480] w-full md:aspect-[929/556]">
              <picture>
                <source
                  media="(max-width: 767px)"
                  srcSet={heroBanner.mobileImage || heroBanner.image}
                />
                <img
                  src={heroBanner.image}
                  alt={heroBanner.title}
                  className="h-full w-full object-cover"
                />
              </picture>
            </div>
          )}
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-primaryDark via-primary to-cta p-8 text-white shadow-soft lg:p-14">
          <p className="font-black uppercase tracking-widest text-promo">
            {eyebrow}
          </p>

          <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight lg:text-6xl">
            {title}
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-white/90">{subtitle}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {primaryLabel && primaryHref && (
              <Link
                href={primaryHref}
                className="rounded-xl bg-cta px-5 py-3 font-black text-white transition hover:bg-orange-600"
              >
                {primaryLabel}
              </Link>
            )}

            {secondaryLabel && secondaryHref && (
              <Link
                href={secondaryHref}
                className="rounded-xl bg-white px-5 py-3 font-black text-primaryDark transition hover:bg-primaryLight"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
