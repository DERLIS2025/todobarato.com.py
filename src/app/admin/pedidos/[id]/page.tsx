import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ updated?: string; error?: string }>;
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
    TRANSFER: "Transferencia bancaria",
    CARD: "Tarjeta / pasarela futura",
    PICKUP_PAYMENT: "Pago al retirar",
    QR: "QR",
    CASH: "Efectivo",
  };

  return value ? labels[value] ?? value : "-";
}

function formatDeliveryMethod(value?: string | null) {
  const labels: Record<string, string> = {
    DELIVERY: "Delivery a domicilio",
    PICKUP: "Retiro en tienda",
  };

  return value ? labels[value] ?? value : "-";
}

export default async function AdminOrderDetailPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const query = searchParams ? await searchParams : {};

  const order = await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      customer: true,
      items: true,
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <AdminLayout>
      <AdminPageShell
        title={`Pedido #${order.orderNumber}`}
        description="Detalle completo del pedido y gestión de estado."
      >
        <div className="mb-4 flex flex-wrap gap-3">
          <Link href="/admin/pedidos" className="btn-secondary">
            ← Volver a pedidos
          </Link>

          <Link href="/" className="btn-secondary">
            Ver tienda
          </Link>
        </div>

        {query.updated && (
          <div className="mb-4 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm font-bold text-green-700">
            Estado del pedido actualizado correctamente.
          </div>
        )}

        {query.error && (
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
            No se pudo actualizar el estado del pedido.
          </div>
        )}

        <div className="grid gap-4 lg:grid-cols-4">
          <div className="rounded-2xl border border-borderSoft bg-white p-5 shadow-soft">
            <p className="text-xs font-black uppercase text-textSecondary">
              Estado actual
            </p>
            <span
              className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-black ${statusClass(
                order.status
              )}`}
            >
              {formatStatus(order.status)}
            </span>
          </div>

          <div className="rounded-2xl border border-borderSoft bg-white p-5 shadow-soft">
            <p className="text-xs font-black uppercase text-textSecondary">
              Total
            </p>
            <strong className="mt-2 block text-2xl font-black text-primary">
              {formatPrice(order.total)}
            </strong>
          </div>

          <div className="rounded-2xl border border-borderSoft bg-white p-5 shadow-soft">
            <p className="text-xs font-black uppercase text-textSecondary">
              Items
            </p>
            <strong className="mt-2 block text-2xl font-black">
              {order.items.length}
            </strong>
          </div>

          <div className="rounded-2xl border border-borderSoft bg-white p-5 shadow-soft">
            <p className="text-xs font-black uppercase text-textSecondary">
              Fecha
            </p>
            <strong className="mt-2 block text-sm font-black">
              {formatDate(order.createdAt)}
            </strong>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
          <section className="rounded-2xl border border-borderSoft bg-white p-6 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-cta">
                  Productos comprados
                </p>
                <h2 className="mt-1 text-xl font-black text-primaryDark">
                  Detalle de items
                </h2>
              </div>
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[760px] text-sm">
                <thead className="bg-surface text-left text-xs uppercase tracking-wide text-textSecondary">
                  <tr>
                    <th className="px-4 py-3 font-black">Producto</th>
                    <th className="px-4 py-3 font-black">SKU</th>
                    <th className="px-4 py-3 font-black">Cantidad</th>
                    <th className="px-4 py-3 font-black">Precio unitario</th>
                    <th className="px-4 py-3 font-black">Total</th>
                  </tr>
                </thead>

                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.id} className="border-t border-borderSoft">
                      <td className="px-4 py-3 font-black text-primaryDark">
                        {item.productName}
                      </td>
                      <td className="px-4 py-3">{item.sku ?? "-"}</td>
                      <td className="px-4 py-3">{item.quantity}</td>
                      <td className="px-4 py-3">
                        {formatPrice(item.unitPrice)}
                      </td>
                      <td className="px-4 py-3 font-black text-primary">
                        {formatPrice(item.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <aside className="grid gap-6">
            <section className="rounded-2xl border border-borderSoft bg-white p-6 shadow-soft">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-cta">
                Gestión
              </p>
              <h2 className="mt-1 text-xl font-black text-primaryDark">
                Cambiar estado
              </h2>

              <form
                action={`/api/admin/orders/${order.id}/status`}
                method="post"
                className="mt-4 grid gap-3"
              >
                <select
                  name="status"
                  className="input"
                  defaultValue={order.status}
                >
                  {ORDER_STATUSES.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>

                <button type="submit" className="btn-primary">
                  Guardar estado
                </button>
              </form>
            </section>

            <section className="rounded-2xl border border-borderSoft bg-white p-6 shadow-soft">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-cta">
                Cliente
              </p>
              <h2 className="mt-1 text-xl font-black text-primaryDark">
                {order.customer?.name ?? "Cliente sin registrar"}
              </h2>

              <div className="mt-4 grid gap-2 text-sm">
                <p>
                  <strong>Teléfono:</strong> {order.customer?.phone ?? "-"}
                </p>
                <p>
                  <strong>Email:</strong> {order.customer?.email ?? "-"}
                </p>
                <p>
                  <strong>Documento / RUC:</strong>{" "}
                  {order.customer?.document ?? "-"}
                </p>
                <p>
                  <strong>Ciudad:</strong> {order.customer?.city ?? "-"}
                </p>
                <p>
                  <strong>Dirección:</strong> {order.customer?.address ?? "-"}
                </p>
              </div>
            </section>

            <section className="rounded-2xl border border-borderSoft bg-white p-6 shadow-soft">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-cta">
                Pago y entrega
              </p>

              <div className="mt-4 grid gap-2 text-sm">
                <p>
                  <strong>Método de pago:</strong>{" "}
                  {formatPaymentMethod(order.paymentMethod)}
                </p>
                <p>
                  <strong>Método de entrega:</strong>{" "}
                  {formatDeliveryMethod(order.deliveryMethod)}
                </p>
                <p>
                  <strong>Subtotal:</strong> {formatPrice(order.subtotal)}
                </p>
                <p>
                  <strong>Envío:</strong> {formatPrice(order.shippingCost)}
                </p>
                <p className="border-t border-borderSoft pt-2 text-base">
                  <strong>Total:</strong>{" "}
                  <span className="font-black text-primary">
                    {formatPrice(order.total)}
                  </span>
                </p>
              </div>
            </section>

            <section className="rounded-2xl border border-borderSoft bg-white p-6 shadow-soft">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-cta">
                Notas
              </p>
              <p className="mt-3 text-sm text-primaryDark/70">
                {order.notes || "Sin observaciones para este pedido."}
              </p>
            </section>
          </aside>
        </div>
      </AdminPageShell>
    </AdminLayout>
  );
}
