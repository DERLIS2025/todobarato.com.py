import type { ReactNode } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";

export default function PanelLayout({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
