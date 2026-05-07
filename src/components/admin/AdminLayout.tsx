import type { ReactNode } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface text-primaryDark">
      <div className="flex">
        <AdminSidebar />
        <main className="min-w-0 flex-1">
          <AdminHeader />
          <div className="p-4 lg:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
