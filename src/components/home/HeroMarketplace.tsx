import Link from "next/link";

type HeroBanner = {
  id: string;
  title: string;
  image: string | null;
  mobileImage?: string | null;
  href?: string | null;
};

type HeroMarketplaceProps = {
  heroBanner?: HeroBanner | null;
};

export function HeroMarketplace({ heroBanner }: HeroMarketplaceProps) {
  if (!heroBanner?.image) {
    return null;
  }

  const desktopImage = heroBanner.image;
  const mobileImage = heroBanner.mobileImage || heroBanner.image;

  const bannerImage = (
    <picture>
      <source media="(max-width: 767px)" srcSet={mobileImage} />
      <img
        src={desktopImage}
        alt={heroBanner.title}
        className="h-full w-full rounded-3xl object-cover shadow-soft"
      />
    </picture>
  );

  return (
    <section className="container-page mt-6">
      <div className="overflow-hidden rounded-3xl">
        {heroBanner.href ? (
          <Link href={heroBanner.href} className="block aspect-[16/7] md:aspect-[929/556]">
            {bannerImage}
          </Link>
        ) : (
          <div className="aspect-[16/7] md:aspect-[929/556]">{bannerImage}</div>
        )}
      </div>
    </section>
  );
}
