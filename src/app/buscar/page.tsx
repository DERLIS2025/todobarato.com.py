import { ProductGrid } from "@/components/product/ProductGrid";
import { searchPublicProducts } from "@/lib/public/products";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; query?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || params.query || "";
  const products = await searchPublicProducts(query);

  return (
    <main className="container-page py-8">
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-cta">
          Búsqueda
        </p>
        <h1 className="mt-1 text-3xl font-black text-primaryDark">
          Resultados de búsqueda
        </h1>
        <p className="mt-2 max-w-2xl text-textSecondary">
          {query
            ? `Resultados para: ${query}`
            : "Escribí un producto, marca o categoría para buscar."}
        </p>
      </div>

      <ProductGrid products={products} />
    </main>
  );
}
