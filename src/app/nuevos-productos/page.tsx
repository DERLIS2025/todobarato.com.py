import { ProductGrid } from "@/components/product/ProductGrid";
import { getPublicProducts } from "@/lib/public/products";

export const dynamic = "force-dynamic";

export default async function NewProductsPage() {
  const products = await getPublicProducts({
    where: {
      isNew: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="container-page py-8">
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-cta">
          Novedades
        </p>
        <h1 className="mt-1 text-3xl font-black text-primaryDark">
          Nuevos productos
        </h1>
        <p className="mt-2 max-w-2xl text-textSecondary">
          Productos recientemente cargados en Todopromo.com.py.
        </p>
      </div>

      <ProductGrid products={products} />
    </main>
  );
}
