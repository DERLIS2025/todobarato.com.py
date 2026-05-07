import { DealOfTheDay } from "@/components/home/DealOfTheDay";
import { HeroMarketplace } from "@/components/home/HeroMarketplace";
import { Newsletter } from "@/components/home/Newsletter";
import { ProductSection } from "@/components/home/ProductSection";
import { PromoBanners } from "@/components/home/PromoBanners";
import { TrustBadges } from "@/components/home/TrustBadges";
import { products } from "@/data/products";
import { getHomeSettings, isEnabled } from "@/lib/admin/homeSettings";

export const dynamic = "force-dynamic";

export default async function Home() {
  const settings = await getHomeSettings();

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
      />

      {isEnabled(settings.showPromoBanners) && <PromoBanners />}

      {isEnabled(settings.showTrustBadges) && <TrustBadges />}

      {isEnabled(settings.showDealOfDay) && <DealOfTheDay />}

      {isEnabled(settings.showNewProducts) && (
        <ProductSection
          title="Nuevos ingresos"
          href="/nuevos-productos"
          products={products.filter((product) => product.isNew).slice(0, 4)}
        />
      )}

      {isEnabled(settings.showBestSellers) && (
        <ProductSection
          title="Más vendidos"
          href="/mas-vendidos"
          products={[...products].sort((a, b) => b.sold - a.sold).slice(0, 4)}
        />
      )}

      {isEnabled(settings.showFeaturedProducts) && (
        <ProductSection
          title="Productos destacados"
          products={products.filter((product) => product.featured).slice(0, 4)}
        />
      )}

      {isEnabled(settings.showNewsletter) && <Newsletter />}
    </>
  );
}
