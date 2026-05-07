import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminTable } from "@/components/admin/AdminTable";
import { adminPromotions } from "@/data/admin/adminMock";

export default function AdminCouponsPage() {
  const coupons = adminPromotions.filter((promo) => promo.type === "Cupón");

  return (
    <AdminPageShell title="Cupones" description="Gestioná códigos promocionales y condiciones de uso." actionLabel="Nuevo cupón">
      <AdminTable rows={coupons} />
    </AdminPageShell>
  );
}
