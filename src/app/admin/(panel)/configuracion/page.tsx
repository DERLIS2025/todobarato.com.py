import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { adminSettings } from "@/data/admin/adminMock";

export default function AdminSettingsPage() {
  return (
    <AdminPageShell title="Configuración" description="Datos generales del ecommerce, contacto, WhatsApp, pagos, envíos y mensaje superior.">
      <form className="grid gap-4 rounded-2xl border border-borderSoft bg-white p-5 shadow-soft md:grid-cols-2">
        <input className="input" defaultValue={adminSettings.storeName} />
        <input className="input" defaultValue={adminSettings.phone} />
        <input className="input" defaultValue={adminSettings.email} />
        <input className="input" defaultValue={adminSettings.address} />
        <input className="input md:col-span-2" defaultValue={adminSettings.topMessage} />
        <input className="input" defaultValue={adminSettings.coupon} />
        <select className="input">
          <option>Pagos: transferencia, QR, efectivo, tarjetas</option>
        </select>
        <button type="button" className="btn-primary w-fit">Guardar configuración</button>
      </form>
    </AdminPageShell>
  );
}
