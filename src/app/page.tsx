import { DealOfTheDay } from "@/components/home/DealOfTheDay";
import { HeroMarketplace } from "@/components/home/HeroMarketplace";
import { Newsletter } from "@/components/home/Newsletter";
import { ProductSection } from "@/components/home/ProductSection";
import { PromoBanners } from "@/components/home/PromoBanners";
import { TrustBadges } from "@/components/home/TrustBadges";
import { products } from "@/data/products";

export default function Home() {
  const newProducts = products.filter((product) => product.isNew).slice(0, 4);
  const bestSellers = [...products]
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 4);
  const featuredProducts = products
    .filter((product) => product.featured)
    .slice(0, 4);

  return (
    <>
      <HeroMarketplace />
      <PromoBanners />
      <TrustBadges />

      <ProductSection
        title="Nuevos ingresos"
        href="/nuevos-productos"
        products={newProducts}
      />

      <DealOfTheDay />

      <ProductSection
        title="Más vendidos"
        href="/mas-vendidos"
        products={bestSellers}
      />

      <ProductSection
        title="Productos destacados"
        products={featuredProducts}
      />

      <Newsletter />
    </>
  );
}
