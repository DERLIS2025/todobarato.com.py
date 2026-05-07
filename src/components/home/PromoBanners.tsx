import Link from "next/link";

export const dynamic = "force-dynamic";

async function getActiveBanners() {
  if (!process.env.DATABASE_URL) {
    return [];
  }

  try {
    const { prisma } = await import("@/lib/db/prisma");

    return prisma.banner.findMany({
      where: {
        status: "ACTIVE",
        location: "home",
      },
      orderBy: {
        order: "asc",
      },
    });
  } catch (error) {
    console.error("Error loading home banners:", error);
    return [];
  }
}

export async function PromoBanners() {
  const banners = await getActiveBanners();

  if (!banners.length) {
    return null;
  }

  return (
    <section className="container-page mt-5">
      <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-2 lg:overflow-visible">
        {banners.map((banner) => {
          const image = banner.image;
          const mobileImage = banner.mobileImage || banner.image;

          if (!image) {
            return null;
          }

          const content = (
            <picture>
              {mobileImage && (
                <source media="(max-width: 767px)" srcSet={mobileImage} />
              )}
              <img
                src={image}
                alt={banner.title}
                className="h-full w-full object-cover transition duration-300 hover:scale-[1.02]"
              />
            </picture>
          );

          return (
            <div
              key={banner.id}
              className="min-w-[85%] snap-start overflow-hidden rounded-2xl border border-borderSoft bg-white shadow-soft sm:min-w-[70%] lg:min-w-0"
            >
              {banner.href ? (
                <Link href={banner.href} className="block aspect-[16/7]">
                  {content}
                </Link>
              ) : (
                <div className="aspect-[16/7]">{content}</div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
