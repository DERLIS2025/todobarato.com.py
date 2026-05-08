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

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("es-PY", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(value);
}

function formatStatus(status: string) {
  const labels: Record<string, string> = {
    NEW: "Nuevo",
    PREPARING: "En preparación",
    READY: "Listo para retirar",
    SHIPPED: "Enviado",
    DELIVERED: "Entregado",
    CANCELLED: "Cancelado",
  };

  return labels[status] ?? status;
}

function statusClass(status: string) {
  const classes: Record<string, string> = {
    NEW: "bg-blue-100 text-blue-700",
    PREPARING: "bg-yellow-100 text-yellow-800",
    READY: "bg-purple-100 text-purple-700",
    SHIPPED: "bg-indigo-100 text-indigo-700",
    DELIVERED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  return classes[status] ?? "bg-surface text-textSecondary";
}

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      customer: true,
      _count: {
        select: {
          items: true,
        },
      },
    },
  });

  return (
    <AdminLayout>
      <AdminPageShell
        title="Pedidos"
        description="Gestioná los pedidos recibidos desde la tienda."
      >
        <div className="mb-4 grid gap-3 md:grid-cols-4">
          <div className="rounded-2xl border border-borderSoft bg-white p-5 shadow-soft">
            <p className="text-xs font-black uppercase text-textSecondary">
              Total pedidos
            </p>
            <strong className="mt-2 block text-2xl font-black">
              {orders.length}
            </strong>
          </div>

          <div className="rounded-2xl border border-borderSoft bg-white p-5 shadow-soft">
            <p className="text-xs font-black uppercase text-textSecondary">
              Nuevos
            </p>
            <strong className="mt-2 block text-2xl font-black">
              {orders.filter((order) => order.status === "NEW").length}
            </strong>
          </div>

          <div className="rounded-2xl border border-borderSoft bg-white p-5 shadow-soft">
            <p className="text-xs font-black uppercase text-textSecondary">
              Entregados
            </p>
            <strong className="mt-2 block text-2xl font-black">
              {orders.filter((order) => order.status === "DELIVERED").length}
            </strong>
          </div>

          <div className="rounded-2xl border border-borderSoft bg-white p-5 shadow-soft">
            <p className="text-xs font-black uppercase text-textSecondary">
              Módulo
            </p>
            <strong className="mt-2 block text-xl font-black">
              Base preparada
            </strong>
          </div>
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
                  <th className="px-4 py-3 font-black">Fecha</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t border-borderSoft">
                    <td className="px-4 py-3 font-black text-primaryDark">
                      #{order.orderNumber}
                    </td>

                    <td className="px-4 py-3">
                      {order.customer?.name ?? "Cliente sin registrar"}
                    </td>

                    <td className="px-4 py-3">
                      {order.customer?.phone ?? "-"}
                    </td>

                    <td className="px-4 py-3">
                      {order._count.items}
                    </td>

                    <td className="px-4 py-3 font-black text-primary">
                      {formatPrice(order.total)}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black ${statusClass(order.status)}`}
                      >
                        {formatStatus(order.status)}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-xs font-bold text-textSecondary">
                      {formatDate(order.createdAt)}
                    </td>
                  </tr>
                ))}

                {!orders.length && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-12 text-center text-sm font-bold text-textSecondary"
                    >
                      Todavía no hay pedidos registrados. El siguiente paso será
                      conectar el checkout para guardar pedidos reales.
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
