import "server-only";

import { prisma } from "@/lib/db/prisma";

export async function getHeroBanner() {
  try {
    const banner = await prisma.banner.findFirst({
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

    return banner;
  } catch (error) {
    console.error("Error loading hero banner:", error);
    return null;
  }
}
