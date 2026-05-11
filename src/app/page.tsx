import { DealOfTheDay } from "@/components/home/DealOfTheDay";
import { HeroMarketplace } from "@/components/home/HeroMarketplace";
import { Newsletter } from "@/components/home/Newsletter";
import { ProductSection } from "@/components/home/ProductSection";
import { PromoBanners } from "@/components/home/PromoBanners";
import { TrustBadges } from "@/components/home/TrustBadges";
import { getHomeSettings, isEnabled } from "@/lib/admin/homeSettings";
import { getHeroBanners } from "@/lib/public/heroBanner";
import { getHomeProductSections } from "@/lib/public/homeProducts";

export const revalidate = 300;



export default async function Home() {
  const [settings, heroBanners, productSections] = await Promise.all([
    getHomeSettings(),
    getHeroBanners(),
    getHomeProductSections(),
  ]);

  return (
    <>
      <HeroMarketplace heroBanners={heroBanners} />

      {isEnabled(settings.showPromoBanners) && <PromoBanners />}

      {isEnabled(settings.showTrustBadges) && <TrustBadges />}

      {isEnabled(settings.showDealOfDay) && <DealOfTheDay />}

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
