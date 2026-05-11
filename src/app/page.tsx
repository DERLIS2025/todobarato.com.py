import { DealOfTheDayBanner } from "@/components/home/DealOfTheDayBanner";
import { HeroMarketplace } from "@/components/home/HeroMarketplace";
import { Newsletter } from "@/components/home/Newsletter";
import { ProductSection } from "@/components/home/ProductSection";
import { TrustBadges } from "@/components/home/TrustBadges";
import { getHomeSettings, isEnabled } from "@/lib/admin/homeSettings";
import { getHeroBanners } from "@/lib/public/heroBanner";
import { getDealBanners } from "@/lib/public/dealBanners";
import { getHomeProductSections } from "@/lib/public/homeProducts";

export const metadata = {
  title: "Home | Todopromo.com.py",
  description:
    "Tienda online Todopromo.com.py con ofertas, productos para el hogar, bazar, electrónica y sección mayorista.",
};

export const revalidate = 300;

export default async function Home() {
  const [settings, heroBanners, productSections, dealBanners] = await Promise.all([
    getHomeSettings(),
    getHeroBanners(),
    getHomeProductSections(),
    getDealBanners(),
  ]);

  return (
    <>
      <HeroMarketplace
        eyebrow={settings.heroEyebrow}
        title={settings.heroTitle}
        subtitle={settings.heroSubtitle}
        primaryLabel={settings.heroPrimaryLabel}
        primaryHref={settings.heroPrimaryHref}
        secondaryLabel={settings.heroSecondaryLabel}
        secondaryHref={settings.heroSecondaryHref}
        heroBanners={heroBanners}
      />

      {isEnabled(settings.showTrustBadges) && <TrustBadges />}

      {isEnabled(settings.showDealOfDay) && dealBanners.length > 0 && (
        <DealOfTheDayBanner
          banners={dealBanners}
          featuredProduct={
            productSections.bestSellers[0] ??
            productSections.featuredProducts[0] ??
            productSections.newProducts[0] ??
            null
          }
        />
      )}

      {isEnabled(settings.showNewProducts) &&
        productSections.newProducts.length > 0 && (
          <ProductSection
            title="Nuevos ingresos"
            href="/nuevos-productos"
            products={productSections.newProducts}
          />
        )}

      {isEnabled(settings.showBestSellers) &&
        productSections.bestSellers.length > 0 && (
          <ProductSection
            title="Más vendidos"
            href="/mas-vendidos"
            products={productSections.bestSellers}
          />
        )}

      {isEnabled(settings.showFeaturedProducts) &&
        productSections.featuredProducts.length > 0 && (
          <ProductSection
            title="Productos destacados"
            products={productSections.featuredProducts}
          />
        )}

      {isEnabled(settings.showNewsletter) && <Newsletter />}
    </>
  );
}
