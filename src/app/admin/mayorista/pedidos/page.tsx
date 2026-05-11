import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

function formatPrice(value: number) {
  return new Intl.NumberFormat("es-PY", {
    style: "currency",
    currency: "PYG",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function AdminWholesaleOrdersPage() {
  const orders = await prisma.order.findMany({
    where: { orderType: "WHOLESALE" },
    orderBy: { createdAt: "desc" },
    include: {
      customer: true,
      _count: { select: { items: true } },
    },
  });

  return (
    <AdminLayout>
      <AdminPageShell
        title="Pedidos mayoristas"
        description="Pedidos generados desde la sección mayorista."
      >
        <div className="mb-4 flex flex-wrap gap-3">
          <Link href="/admin/mayorista" className="btn-secondary">
            ← Volver a Mayorista
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-borderSoft bg-white shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-sm">
              <thead className="bg-surface text-left text-xs uppercase tracking-wide text-textSecondary">
                <tr>
                  <th className="px-4 py-3 font-black">Pedido</th>
                  <th className="px-4 py-3 font-black">Cliente</th>
                  <th className="px-4 py-3 font-black">Teléfono</th>
                  <th className="px-4 py-3 font-black">Items</th>
                  <th className="px-4 py-3 font-black">Total</th>
                  <th className="px-4 py-3 font-black">Estado</th>
                  <th className="px-4 py-3 font-black">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t border-borderSoft">
                    <td className="px-4 py-3 font-black">#{order.orderNumber}</td>
                    <td className="px-4 py-3">{order.customer?.name ?? "-"}</td>
                    <td className="px-4 py-3">{order.customer?.phone ?? "-"}</td>
                    <td className="px-4 py-3">{order._count.items}</td>
                    <td className="px-4 py-3 font-black text-primary">{formatPrice(order.total)}</td>
                    <td className="px-4 py-3">{order.status}</td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/pedidos/${order.id}`} className="rounded-lg bg-primary px-3 py-2 text-xs font-black text-white">
                        Ver detalle
                      </Link>
                    </td>
                  </tr>
                ))}

                {!orders.length && (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center font-bold text-textSecondary">
                      Todavía no hay pedidos mayoristas.
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
