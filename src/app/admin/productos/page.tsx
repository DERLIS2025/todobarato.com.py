import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

function formatPrice(value: number) {
  return new Intl.NumberFormat("es-PY", {
    style: "currency",
    currency: "PYG",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatStatus(status: string) {
  const labels: Record<string, string> = {
    ACTIVE: "Activo",
    DRAFT: "Borrador",
    OUT_OF_STOCK: "Agotado",
  };

  return labels[status] ?? status;
}

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
    },
  });

  return (
    <AdminLayout>
      <AdminPageShell
        title="Productos"
        description="Productos reales leídos desde Prisma."
      >
        <div className="mb-4 flex flex-wrap gap-3">
          <input className="input max-w-sm" placeholder="Buscar producto..." />

          <select className="input max-w-xs">
            <option>Todas las categorías</option>
          </select>

          <Link href="/admin/productos/nuevo" className="btn-cta">
            Nuevo producto
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-borderSoft bg-white shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] text-sm">
              <thead className="bg-surface text-left text-xs uppercase tracking-wide text-textSecondary">
                <tr>
                  <th className="px-4 py-3 font-black">Producto</th>
                  <th className="px-4 py-3 font-black">Categoría</th>
                  <th className="px-4 py-3 font-black">Marca</th>
                  <th className="px-4 py-3 font-black">Precio</th>
                  <th className="px-4 py-3 font-black">Stock</th>
                  <th className="px-4 py-3 font-black">Estado</th>
                  <th className="px-4 py-3 font-black">Badges</th>
                  <th className="px-4 py-3 font-black">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t border-borderSoft">
                    <td className="px-4 py-3 font-bold">{product.name}</td>
                    <td className="px-4 py-3">{product.category.name}</td>
                    <td className="px-4 py-3">{product.brand ?? "-"}</td>
                    <td className="px-4 py-3">{formatPrice(product.price)}</td>
                    <td className="px-4 py-3">{product.stock}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={formatStatus(product.status)} />
                    </td>
                    <td className="px-4 py-3">
                      {product.badges.length ? product.badges.join(", ") : "-"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/productos/${product.id}/editar`}
                          className="rounded-lg bg-primary px-3 py-2 text-xs font-black text-white"
                        >
                          Editar
                        </Link>

                        <Link
                          href={`/producto/${product.slug}`}
                          className="rounded-lg border border-borderSoft px-3 py-2 text-xs font-black"
                        >
                          Ver
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AdminPageShell>
    </AdminLayout>
  );
}
