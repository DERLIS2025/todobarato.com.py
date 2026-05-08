import "server-only";

import { prisma } from "@/lib/db/prisma";

export async function getHeroBanners() {
  try {
    const banners = await prisma.banner.findMany({
      where: {
        status: "ACTIVE",
        location: {
          in: ["hero", "home-hero"],
        },
        image: {
          not: null,
        },
      },
      orderBy: {
        order: "asc",
      },
    });

    return banners.map((banner) => ({
      id: banner.id,
      title: banner.title,
      image: banner.image,
      mobileImage: banner.mobileImage,
      href: banner.href,
    }));
  } catch (error) {
    console.error("Error loading hero banners:", error);
    return [];
  }
}

export async function getHeroBanner() {
  const banners = await getHeroBanners();
  return banners[0] ?? null;
}
