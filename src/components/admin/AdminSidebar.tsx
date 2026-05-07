import Link from "next/link";
import { adminNavigation } from "@/lib/admin/adminNavigation";

export function AdminSidebar() {
  return (
    <aside className="hidden min-h-screen w-72 border-r border-borderSoft bg-primaryDark text-white lg:block">
      <div className="border-b border-white/10 p-6">
        <Link href="/admin/dashboard" className="text-2xl font-black">
          Todobarato Admin
        </Link>
        <p className="mt-1 text-xs text-white/60">Back Office Ecommerce</p>
      </div>

      <nav className="grid gap-1 p-4">
        {adminNavigation.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className="rounded-xl px-4 py-3 text-sm font-bold text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
