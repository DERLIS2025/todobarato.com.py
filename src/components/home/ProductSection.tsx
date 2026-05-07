import type { Product } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ProductSection({
  title,
  products,
  href,
}: {
  title: string;
  products: Product[];
  href?: string;
}) {
  const visibleProducts = products.slice(0, 4);

  return (
    <section className="container-page mt-8 lg:mt-10">
      <SectionHeader title={title} href={href} />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {visibleProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
}
