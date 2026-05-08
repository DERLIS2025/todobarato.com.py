import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams?: Promise<{
    q?: string;
    status?: string;
    date?: string;
    updated?: string;
    error?: string;
  }>;
};

const ORDER_STATUSES = [
  { value: "NEW", label: "Nuevo" },
  { value: "PREPARING", label: "En preparación" },
  { value: "READY", label: "Listo para retirar" },
  { value: "SHIPPED", label: "Enviado" },
  { value: "DELIVERED", label: "Entregado" },
  { value: "CANCELLED", label: "Cancelado" },
];

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
  return ORDER_STATUSES.find((item) => item.value === status)?.label ?? status;
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

function formatPaymentMethod(value?: string | null) {
  const labels: Record<string, string> = {
    TRANSFER: "Transferencia",
    CARD: "Tarjeta",
    PICKUP_PAYMENT: "Pago al retirar",
    QR: "QR",
    CASH: "Efectivo",
  };

  return value ? labels[value] ?? value : "-";
}

function formatDeliveryMethod(value?: string | null) {
  const labels: Record<string, string> = {
    DELIVERY: "Delivery",
    PICKUP: "Retiro",
  };

  return value ? labels[value] ?? value : "-";
}

function getDateFilter(dateFilter: string) {
  const now = new Date();

  if (dateFilter === "today") {
    const start = new Date(now);
    start.setHours(0, 0, 0, 0);
    return start;
  }

  if (dateFilter === "7d") {
    return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  }

  if (dateFilter === "30d") {
    return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  }

  return null;
}

export default async function AdminOrdersPage({ searchParams }: PageProps) {
  const params = searchParams ? await searchParams : {};

  const query = params.q?.trim() ?? "";
  const selectedStatus = params.status ?? "";
  const selectedDate = params.date ?? "";

  const where: any = {};

  if (query) {
    where.OR = [
      {
        orderNumber: {
          contains: query,
          mode: "insensitive",
        },
      },
      {
        customer: {
          is: {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
        },
      },
      {
        customer: {
          is: {
            phone: {
              contains: query,
              mode: "insensitive",
            },
          },
        },
      },
      {
        customer: {
          is: {
            email: {
              contains: query,
              mode: "insensitive",
            },
          },
        },
      },
    ];
  }

  if (selectedStatus) {
    where.status = selectedStatus;
  }

  const dateFrom = getDateFilter(selectedDate);

  if (dateFrom) {
    where.createdAt = {
      gte: dateFrom,
    };
  }

  const activeParams = new URLSearchParams();

  if (query) activeParams.set("q", query);
  if (selectedStatus) activeParams.set("status", selectedStatus);
  if (selectedDate) activeParams.set("date", selectedDate);

  const returnTo = `/admin/pedidos${
    activeParams.toString() ? `?${activeParams.toString()}` : ""
  }`;

  const orders = await prisma.order.findMany({
    where,
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

  const hasFilters = Boolean(query || selectedStatus || selectedDate);

  return (
    <AdminLayout>
      <AdminPageShell
        title="Pedidos"
        description="Gestioná los pedidos recibidos desde la tienda."
      >
        {params.updated && (
          <div className="mb-4 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm font-bold text-green-700">
            Estado del pedido actualizado correctamente.
          </div>
        )}

        {params.error && (
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
            No se pudo actualizar el estado del pedido.
          </div>
        )}

        <div className="mb-4 grid gap-3 md:grid-cols-4">
          <div className="rounded-2xl border border-borderSoft bg-white p-5 shadow-soft">
            <p className="text-xs font-black uppercase text-textSecondary">
              Pedidos visibles
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
              En proceso
            </p>
            <strong className="mt-2 block text-2xl font-black">
              {
                orders.filter((order) =>
                  ["PREPARING", "READY", "SHIPPED"].includes(order.status)
                ).length
              }
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
        </div>

        <form className="mb-4 grid gap-3 lg:grid-cols-[1.4fr_0.9fr_0.9fr_auto_auto]">
          <input
            name="q"
            className="input"
            placeholder="Buscar por pedido, cliente, teléfono o email..."
            defaultValue={query}
          />

          <select name="status" className="input" defaultValue={selectedStatus}>
            <option value="">Todos los estados</option>
            {ORDER_STATUSES.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>

          <select name="date" className="input" defaultValue={selectedDate}>
            <option value="">Todas las fechas</option>
            <option value="today">Hoy</option>
            <option value="7d">Últimos 7 días</option>
            <option value="30d">Últimos 30 días</option>
          </select>

          <button type="submit" className="btn-primary">
            Filtrar
          </button>

          <Link href="/admin/pedidos" className="btn-secondary text-center">
            Limpiar
          </Link>
        </form>

        {hasFilters && (
          <div className="mb-4 rounded-2xl border border-borderSoft bg-white p-4 text-sm font-bold text-textSecondary">
            Resultado filtrado: {orders.length} pedido(s) encontrado(s).
          </div>
        )}

        <div className="overflow-hidden rounded-2xl border border-borderSoft bg-white shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1320px] text-sm">
              <thead className="bg-surface text-left text-xs uppercase tracking-wide text-textSecondary">
                <tr>
                  <th className="px-4 py-3 font-black">Pedido</th>
                  <th className="px-4 py-3 font-black">Cliente</th>
                  <th className="px-4 py-3 font-black">Teléfono</th>
                  <th className="px-4 py-3 font-black">Entrega</th>
                  <th className="px-4 py-3 font-black">Pago</th>
                  <th className="px-4 py-3 font-black">Items</th>
                  <th className="px-4 py-3 font-black">Total</th>
                  <th className="px-4 py-3 font-black">Estado</th>
                  <th className="px-4 py-3 font-black">Fecha</th>
                  <th className="sticky right-0 bg-surface px-4 py-3 font-black shadow-[-8px_0_16px_-14px_rgba(15,23,42,0.35)]">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className={`border-t border-borderSoft transition hover:bg-surface/70 ${
                      order.status === "NEW" ? "bg-blue-50/40" : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-black text-primaryDark">
                          #{order.orderNumber}
                        </p>
                        {order.status === "NEW" && (
                          <p className="mt-1 text-[10px] font-black uppercase text-blue-700">
                            Pedido nuevo
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      {order.customer?.name ?? "Cliente sin registrar"}
                    </td>

                    <td className="px-4 py-3">{order.customer?.phone ?? "-"}</td>

                    <td className="px-4 py-3">
                      {formatDeliveryMethod(order.deliveryMethod)}
                    </td>

                    <td className="px-4 py-3">
                      {formatPaymentMethod(order.paymentMethod)}
                    </td>

                    <td className="px-4 py-3">{order._count.items}</td>

                    <td className="px-4 py-3 font-black text-primary">
                      {formatPrice(order.total)}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black ${statusClass(
                          order.status
                        )}`}
                      >
                        {formatStatus(order.status)}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-xs font-bold text-textSecondary">
                      {formatDate(order.createdAt)}
                    </td>

                    <td className="sticky right-0 bg-white px-4 py-3 shadow-[-8px_0_16px_-14px_rgba(15,23,42,0.25)]">
                      <div className="flex min-w-[300px] items-center gap-2">
                        <Link
                          href={`/admin/pedidos/${order.id}`}
                          className="rounded-lg bg-primary px-3 py-2 text-xs font-black text-white"
                        >
                          Ver detalle
                        </Link>

                        <form
                          action={`/api/admin/orders/${order.id}/status`}
                          method="post"
                          className="flex items-center gap-2"
                        >
                          <input type="hidden" name="returnTo" value={returnTo} />

                          <select
                            name="status"
                            className="rounded-lg border border-borderSoft bg-white px-2 py-2 text-xs font-bold"
                            defaultValue={order.status}
                          >
                            {ORDER_STATUSES.map((status) => (
                              <option key={status.value} value={status.value}>
                                {status.label}
                              </option>
                            ))}
                          </select>

                          <button
                            type="submit"
                            className="rounded-lg border border-borderSoft px-3 py-2 text-xs font-black"
                          >
                            Actualizar
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}

                {!orders.length && (
                  <tr>
                    <td
                      colSpan={10}
                      className="px-4 py-12 text-center text-sm font-bold text-textSecondary"
                    >
                      No se encontraron pedidos con los filtros aplicados.
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
