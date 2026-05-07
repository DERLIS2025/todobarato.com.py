import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { HOME_SETTINGS_DEFAULTS } from "@/lib/admin/homeSettings";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function redirectTo(path: string) {
  return new NextResponse(null, {
    status: 303,
    headers: {
      Location: path,
    },
  });
}

const checkboxKeys = [
  "showPromoBanners",
  "showTrustBadges",
  "showDealOfDay",
  "showNewProducts",
  "showBestSellers",
  "showFeaturedProducts",
  "showNewsletter",
];

export async function GET() {
  return redirectTo("/admin/home");
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const payload: Record<string, string> = {
      heroEyebrow: getString(formData, "heroEyebrow") || HOME_SETTINGS_DEFAULTS.heroEyebrow,
      heroTitle: getString(formData, "heroTitle") || HOME_SETTINGS_DEFAULTS.heroTitle,
      heroSubtitle:
        getString(formData, "heroSubtitle") || HOME_SETTINGS_DEFAULTS.heroSubtitle,
      heroPrimaryLabel:
        getString(formData, "heroPrimaryLabel") ||
        HOME_SETTINGS_DEFAULTS.heroPrimaryLabel,
      heroPrimaryHref:
        getString(formData, "heroPrimaryHref") ||
        HOME_SETTINGS_DEFAULTS.heroPrimaryHref,
      heroSecondaryLabel:
        getString(formData, "heroSecondaryLabel") ||
        HOME_SETTINGS_DEFAULTS.heroSecondaryLabel,
      heroSecondaryHref:
        getString(formData, "heroSecondaryHref") ||
        HOME_SETTINGS_DEFAULTS.heroSecondaryHref,
    };

    for (const key of checkboxKeys) {
      payload[key] = formData.get(key) === "on" ? "true" : "false";
    }

    await Promise.all(
      Object.entries(payload).map(([key, value]) =>
        prisma.siteSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        })
      )
    );

    return redirectTo("/admin/home?saved=true");
  } catch (error) {
    console.error("Error saving home settings:", error);
    return redirectTo("/admin/home?error=save-failed");
  }
}
