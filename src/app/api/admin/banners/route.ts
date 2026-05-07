import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { saveBannerImage } from "@/lib/admin/bannerUploads";
import type { BannerStatus } from "@/generated/prisma/client";

export const runtime = "nodejs";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getNumber(formData: FormData, key: string) {
  const raw = getString(formData, key);
  const cleaned = raw.replace(/[^\d]/g, "");
  return Number(cleaned || 0);
}

function redirectTo(path: string) {
  return new NextResponse(null, {
    status: 303,
    headers: { Location: path },
  });
}

export async function GET() {
  return redirectTo("/admin/banners");
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = getString(formData, "title");

    if (!title) {
      return redirectTo("/admin/banners/nuevo?error=missing-title");
    }

    const image = await saveBannerImage(formData.get("imageFile"));
    const mobileImage = await saveBannerImage(formData.get("mobileImageFile"));

    await prisma.banner.create({
      data: {
        title,
        text: getString(formData, "text") || null,
        href: getString(formData, "href") || null,
        image,
        mobileImage,
        ctaLabel: getString(formData, "ctaLabel") || null,
        location: getString(formData, "location") || "home",
        color: getString(formData, "color") || null,
        order: getNumber(formData, "order"),
        status: (getString(formData, "status") || "ACTIVE") as BannerStatus,
      },
    });

    return redirectTo("/admin/banners");
  } catch (error) {
    console.error("Error creating banner:", error);
    return redirectTo("/admin/banners/nuevo?error=create-failed");
  }
}
