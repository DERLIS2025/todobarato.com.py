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
      select: {
        id: true,
        title: true,
        text: true,
        href: true,
        image: true,
        mobileImage: true,
        ctaLabel: true,
      },
    });

    return banners;
  } catch (error) {
    console.error("Error loading hero banners:", error);
    return [];
  }
}

export async function getHeroBanner() {
  const banners = await getHeroBanners();
  return banners[0] ?? null;
}
