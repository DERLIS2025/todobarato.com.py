import { AdminLayout } from "@/components/admin/AdminLayout";
import { PageLoading } from "@/components/ui/PageLoading";

export default function AdminLoading() {
  return (
    <AdminLayout>
      <PageLoading title="Cargando panel administrativo..." />
    </AdminLayout>
  );
}
