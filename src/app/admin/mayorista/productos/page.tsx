import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

function formatPrice(value?: number | null) {
  if (!value) return "-";
  return new Intl.NumberFormat("es-PY", {
    style: "currency",
    currency: "PYG",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function AdminWholesaleProductsPage({
  searchParams,
}: {
  searchParams?: Promise<{ updated?: string }>;
}) {
  const params = searchParams ? await searchParams : {};

  const products = await prisma.product.findMany({
    orderBy: [{ isWholesale: "desc" }, { createdAt: "desc" }],
    include: { category: true },
  });

  return (
    <AdminLayout>
      <AdminPageShell
        title="Productos mayoristas"
        description="Activá productos para venta mayorista, definí precio especial y cantidad mínima."
      >
        {params.updated && (
          <div className="mb-4 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm font-bold text-green-700">
            Producto mayorista actualizado correctamente.
          </div>
        )}

        <div className="mb-4 flex flex-wrap gap-3">
          <Link href="/admin/mayorista" className="btn-secondary">
            ← Volver a Mayorista
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-borderSoft bg-white shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1180px] text-sm">
              <thead className="bg-surface text-left text-xs uppercase tracking-wide text-textSecondary">
                <tr>
                  <th className="px-4 py-3 font-black">Producto</th>
                  <th className="px-4 py-3 font-black">Categoría</th>
                  <th className="px-4 py-3 font-black">Minorista</th>
                  <th className="px-4 py-3 font-black">Mayorista</th>
                  <th className="px-4 py-3 font-black">Mínimo</th>
                  <th className="px-4 py-3 font-black">Activo mayorista</th>
                  <th className="px-4 py-3 font-black">Acción</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t border-borderSoft">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="h-12 w-14 rounded-xl object-cover" />
                        ) : (
                          <div className="grid h-12 w-14 place-items-center rounded-xl bg-surface text-[10px] font-bold text-textSecondary">
                            Sin imagen
                          </div>
                        )}

                        <div>
                          <p className="font-black text-primaryDark">{product.name}</p>
                          <p className="text-xs font-bold text-textSecondary">SKU: {product.sku || "-"}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">{product.category.name}</td>
                    <td className="px-4 py-3 font-black text-primary">{formatPrice(product.price)}</td>

                    <td className="px-4 py-3">
                      <form
                        id={`wholesale-${product.id}`}
                        action={`/api/admin/wholesale/products/${product.id}`}
                        method="post"
                        className="grid gap-2"
                      >
                        <input
                          name="wholesalePrice"
                          className="input w-36"
                          defaultValue={product.wholesalePrice ?? ""}
                          placeholder="Precio"
                        />
                      </form>
                    </td>

                    <td className="px-4 py-3">
                      <input
                        form={`wholesale-${product.id}`}
                        name="wholesaleMinQty"
                        className="input w-24"
                        defaultValue={product.wholesaleMinQty}
                        placeholder="3"
                      />
                    </td>

                    <td className="px-4 py-3">
                      <label className="flex items-center gap-2 font-bold">
                        <input
                          form={`wholesale-${product.id}`}
                          type="checkbox"
                          name="isWholesale"
                          defaultChecked={product.isWholesale}
                        />
                        Sí
                      </label>
                    </td>

                    <td className="px-4 py-3">
                      <button form={`wholesale-${product.id}`} type="submit" className="btn-primary py-2 text-xs">
                        Guardar
                      </button>
                    </td>
                  </tr>
                ))}

                {!products.length && (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center font-bold text-textSecondary">
                      No hay productos cargados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </AdminPageShell>
    </AdminLayout>
  );
}
