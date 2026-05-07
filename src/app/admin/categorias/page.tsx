import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminTable } from "@/components/admin/AdminTable";
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

  const rows = categories.map((category) => ({
    Categoría: `${category.icon ?? ""} ${category.name}`,
    Slug: category.slug,
    Productos: category._count.products,
    Estado: category.isActive ? "Activa" : "Inactiva",
    Orden: category.order,
  }));

  return (
    <AdminLayout>
      <AdminPageShell
        title="Categorías"
        description="Categorías reales leídas desde Prisma."
        actionLabel="Nueva categoría"
      >
        <AdminTable rows={rows} />
      </AdminPageShell>
    </AdminLayout>
  );
}
