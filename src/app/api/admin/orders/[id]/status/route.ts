import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

const ALLOWED_STATUSES = [
  "NEW",
  "PREPARING",
  "READY",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

function getRedirectUrl(request: Request, orderId: string) {
  const referer = request.headers.get("referer");
  const origin = request.headers.get("origin");

  const baseUrl = referer || origin || request.url;
  const url = new URL(`/admin/pedidos/${orderId}`, baseUrl);

  return url;
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const formData = await request.formData();
  const status = String(formData.get("status") ?? "");

  const redirectUrl = getRedirectUrl(request, id);

  if (!ALLOWED_STATUSES.includes(status)) {
    redirectUrl.searchParams.set("error", "invalid-status");
    return NextResponse.redirect(redirectUrl, { status: 303 });
  }

  await prisma.order.update({
    where: { id },
    data: { status },
  });

  redirectUrl.searchParams.set("updated", "1");

  return NextResponse.redirect(redirectUrl, { status: 303 });
}
