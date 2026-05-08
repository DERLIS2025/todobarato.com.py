import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

function formatDate(value?: Date) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("es-PY", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(value);
}

export default async function AdminCustomersPage() {
  const customers = await prisma.customer.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          orders: true,
        },
      },
      orders: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
        select: {
          createdAt: true,
          total: true,
          status: true,
        },
      },
    },
  });

  return (
    <AdminLayout>
      <AdminPageShell
        title="Clientes"
        description="Base de clientes generada a partir de pedidos y compras."
      >
        <div className="mb-4 grid gap-3 md:grid-cols-4">
          <div className="rounded-2xl border border-borderSoft bg-white p-5 shadow-soft">
            <p className="text-xs font-black uppercase text-textSecondary">
              Total clientes
            </p>
            <strong className="mt-2 block text-2xl font-black">
              {customers.length}
            </strong>
          </div>

          <div className="rounded-2xl border border-borderSoft bg-white p-5 shadow-soft">
            <p className="text-xs font-black uppercase text-textSecondary">
              Con pedidos
            </p>
            <strong className="mt-2 block text-2xl font-black">
              {customers.filter((customer) => customer._count.orders > 0).length}
            </strong>
          </div>

          <div className="rounded-2xl border border-borderSoft bg-white p-5 shadow-soft">
            <p className="text-xs font-black uppercase text-textSecondary">
              Activos
            </p>
            <strong className="mt-2 block text-2xl font-black">
              {customers.filter((customer) => customer.isActive).length}
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
                  <th className="px-4 py-3 font-black">Cliente</th>
                  <th className="px-4 py-3 font-black">Teléfono</th>
                  <th className="px-4 py-3 font-black">Email</th>
                  <th className="px-4 py-3 font-black">Documento / RUC</th>
                  <th className="px-4 py-3 font-black">Ciudad</th>
                  <th className="px-4 py-3 font-black">Pedidos</th>
                  <th className="px-4 py-3 font-black">Último pedido</th>
                  <th className="px-4 py-3 font-black">Estado</th>
                </tr>
              </thead>

              <tbody>
                {customers.map((customer) => {
                  const lastOrder = customer.orders[0];

                  return (
                    <tr key={customer.id} className="border-t border-borderSoft">
                      <td className="px-4 py-3 font-black text-primaryDark">
                        {customer.name}
                      </td>

                      <td className="px-4 py-3">{customer.phone ?? "-"}</td>
                      <td className="px-4 py-3">{customer.email ?? "-"}</td>
                      <td className="px-4 py-3">{customer.document ?? "-"}</td>
                      <td className="px-4 py-3">{customer.city ?? "-"}</td>

                      <td className="px-4 py-3 font-black">
                        {customer._count.orders}
                      </td>

                      <td className="px-4 py-3 text-xs font-bold text-textSecondary">
                        {formatDate(lastOrder?.createdAt)}
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-black ${
                            customer.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-surface text-textSecondary"
                          }`}
                        >
                          {customer.isActive ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                    </tr>
                  );
                })}

                {!customers.length && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-12 text-center text-sm font-bold text-textSecondary"
                    >
                      Todavía no hay clientes registrados. Los clientes se van a
                      generar cuando conectemos el checkout y entren pedidos.
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
