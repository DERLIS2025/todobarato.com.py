import { ProductGrid } from "@/components/product/ProductGrid";
import { getPublicProducts } from "@/lib/public/products";

export const revalidate = 60;

export default async function BestSellersPage() {
  const products = await getPublicProducts({
    orderBy: {
      sold: "desc",
    },
  });

  return (
    <main className="container-page py-8">
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-cta">
          Más elegidos
        </p>
        <h1 className="mt-1 text-3xl font-black text-primaryDark">
          Más vendidos
        </h1>
        <p className="mt-2 max-w-2xl text-textSecondary">
          Los productos con mayor movimiento en la tienda.
        </p>
      </div>

      <ProductGrid products={products} />
    </main>
  );
}
