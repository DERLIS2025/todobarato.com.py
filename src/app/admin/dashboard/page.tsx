import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPageShell } from "@/components/admin/AdminPageShell";

export const dynamic = "force-dynamic";

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <AdminPageShell
        title="Dashboard"
        description="Panel administrativo de Todobarato.com.py conectado a la estructura real del ecommerce."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="card p-5">
            <p className="text-sm font-bold text-textSecondary">Estado</p>
            <strong className="mt-2 block text-2xl font-black">Admin activo</strong>
            <p className="mt-2 text-xs font-bold text-primary">Fase 2 en desarrollo</p>
          </div>

          <div className="card p-5">
            <p className="text-sm font-bold text-textSecondary">Base de datos</p>
            <strong className="mt-2 block text-2xl font-black">Prisma</strong>
            <p className="mt-2 text-xs font-bold text-primary">Conexión local</p>
          </div>
        </div>
      </AdminPageShell>
    </AdminLayout>
  );
}
