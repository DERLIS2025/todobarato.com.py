import "server-only";

import { prisma } from "@/lib/db/prisma";

export async function getDealBanners() {
  try {
    const banners = await prisma.banner.findMany({
      where: {
        status: "ACTIVE",
        location: "deal-of-day",
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
        image: true,
        mobileImage: true,
        href: true,
      },
    });

    return banners;
  } catch (error) {
    console.error("Error loading deal banners:", error);
    return [];
  }
}
