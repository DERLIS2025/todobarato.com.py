import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminTable } from "@/components/admin/AdminTable";
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

  const rows = products.map((product) => ({
    Producto: product.name,
    Categoría: product.category.name,
    Marca: product.brand ?? "-",
    Precio: formatPrice(product.price),
    Stock: product.stock,
    Estado: formatStatus(product.status),
    Badges: product.badges.length ? product.badges.join(", ") : "-",
  }));

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

        <AdminTable rows={rows} />
      </AdminPageShell>
    </AdminLayout>
  );
}
