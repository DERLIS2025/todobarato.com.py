import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: {
      order: "asc",
    },
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
  });

  return (
    <AdminLayout>
      <AdminPageShell
        title="Categorías"
        description="Gestioná categorías reales desde Prisma."
      >
        <div className="mb-4 flex flex-wrap justify-between gap-3">
          <input className="input max-w-sm" placeholder="Buscar categoría..." />

          <Link href="/admin/categorias/nueva" className="btn-cta">
            Nueva categoría
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-borderSoft bg-white shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead className="bg-surface text-left text-xs uppercase tracking-wide text-textSecondary">
                <tr>
                  <th className="px-4 py-3 font-black">Categoría</th>
                  <th className="px-4 py-3 font-black">Slug</th>
                  <th className="px-4 py-3 font-black">Productos</th>
                  <th className="px-4 py-3 font-black">Orden</th>
                  <th className="px-4 py-3 font-black">Estado</th>
                  <th className="px-4 py-3 font-black">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="border-t border-borderSoft">
                    <td className="px-4 py-3 font-bold">
                      {category.icon ? `${category.icon} ` : ""}
                      {category.name}
                    </td>
                    <td className="px-4 py-3">{category.slug}</td>
                    <td className="px-4 py-3">{category._count.products}</td>
                    <td className="px-4 py-3">{category.order}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={category.isActive ? "Activa" : "Inactiva"} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/categorias/${category.id}/editar`}
                          className="rounded-lg bg-primary px-3 py-2 text-xs font-black text-white"
                        >
                          Editar
                        </Link>

                        <Link
                          href={`/categoria/${category.slug}`}
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
