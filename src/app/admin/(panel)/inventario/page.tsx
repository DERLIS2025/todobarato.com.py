import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminTable } from "@/components/admin/AdminTable";
import { adminProducts } from "@/data/admin/adminMock";

export default function AdminInventoryPage() {
  const inventory = adminProducts.map((product) => ({
    Producto: product.name,
    Categoría: product.category,
    Stock: product.stock,
    Estado: product.stock === 0 ? "Agotado" : product.stock <= 10 ? "Bajo stock" : "Activo",
  }));

  return (
    <AdminPageShell title="Inventario" description="Control rápido de stock, productos agotados y bajo stock.">
      <AdminTable rows={inventory} />
    </AdminPageShell>
  );
}
