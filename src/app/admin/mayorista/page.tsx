import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function AdminWholesalePage() {
  const [wholesaleProducts, wholesaleOrders, wholesaleBanners] = await Promise.all([
    prisma.product.count({ where: { isWholesale: true } }),
    prisma.order.count({ where: { orderType: "WHOLESALE" } }),
    prisma.banner.count({ where: { location: "mayorista-hero" } }),
  ]);

  return (
    <AdminLayout>
      <AdminPageShell
        title="Mayorista"
        description="Administrá banners, productos y pedidos de la sección mayorista."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/admin/mayorista/banners" className="rounded-2xl border border-borderSoft bg-white p-6 shadow-soft transition hover:-translate-y-0.5">
            <p className="text-xs font-black uppercase text-cta">Banners</p>
            <strong className="mt-2 block text-3xl font-black">{wholesaleBanners}</strong>
            <p className="mt-2 text-sm text-textSecondary">Banners para /mayorista</p>
          </Link>

          <Link href="/admin/mayorista/productos" className="rounded-2xl border border-borderSoft bg-white p-6 shadow-soft transition hover:-translate-y-0.5">
            <p className="text-xs font-black uppercase text-cta">Productos mayoristas</p>
            <strong className="mt-2 block text-3xl font-black">{wholesaleProducts}</strong>
            <p className="mt-2 text-sm text-textSecondary">Precio y cantidad mínima</p>
          </Link>

          <Link href="/admin/mayorista/pedidos" className="rounded-2xl border border-borderSoft bg-white p-6 shadow-soft transition hover:-translate-y-0.5">
            <p className="text-xs font-black uppercase text-cta">Pedidos mayoristas</p>
            <strong className="mt-2 block text-3xl font-black">{wholesaleOrders}</strong>
            <p className="mt-2 text-sm text-textSecondary">Pedidos tipo WHOLESALE</p>
          </Link>
        </div>
      </AdminPageShell>
    </AdminLayout>
  );
}
