import { ProductCard } from "@/components/product/ProductCard";
import { products as fallbackProducts } from "@/data/products";

type StoreProduct = (typeof fallbackProducts)[number];

export function ProductGrid({ products }: { products: StoreProduct[] }) {
  if (!products.length) {
    return (
      <div className="rounded-2xl border border-borderSoft bg-white p-8 text-center shadow-soft">
        <p className="font-bold text-textSecondary">
          No encontramos productos para esta sección.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
