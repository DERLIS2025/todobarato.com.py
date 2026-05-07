import "server-only";
import { prisma } from "@/lib/db/prisma";

export const HOME_SETTINGS_DEFAULTS = {
  heroEyebrow: "OFERTAS TODOS LOS DÍAS",
  heroTitle: "Todo para tu casa, tus fiestas y tu día a día al mejor precio.",
  heroSubtitle:
    "Comprá bazar, electrónica, cotillón y productos para el hogar con precios bajos y envío a todo Paraguay.",
  heroPrimaryLabel: "Ver ofertas",
  heroPrimaryHref: "/ofertas",
  heroSecondaryLabel: "Nuevos ingresos",
  heroSecondaryHref: "/nuevos-productos",

  showPromoBanners: "true",
  showTrustBadges: "true",
  showDealOfDay: "true",
  showNewProducts: "true",
  showBestSellers: "true",
  showFeaturedProducts: "true",
  showNewsletter: "true",
};

export type HomeSettings = typeof HOME_SETTINGS_DEFAULTS;

export async function getHomeSettings(): Promise<HomeSettings> {
  try {
    const settings = await prisma.siteSetting.findMany({
      where: {
        key: {
          in: Object.keys(HOME_SETTINGS_DEFAULTS),
        },
      },
    });

    const savedSettings = Object.fromEntries(
      settings.map((setting) => [setting.key, setting.value])
    );

    return {
      ...HOME_SETTINGS_DEFAULTS,
      ...savedSettings,
    };
  } catch (error) {
    console.error("Error loading home settings:", error);
    return HOME_SETTINGS_DEFAULTS;
  }
}

export function isEnabled(value: string | undefined) {
  return value !== "false";
}
