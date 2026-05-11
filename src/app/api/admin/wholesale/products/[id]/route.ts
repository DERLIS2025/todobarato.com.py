import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

function getNumber(value: FormDataEntryValue | null, fallback = 0) {
  const number = Number(String(value ?? "").replace(/\./g, "").replace(",", "."));
  return Number.isFinite(number) ? Math.round(number) : fallback;
}

function getRedirectUrl(request: Request) {
  const referer = request.headers.get("referer");
  const origin = request.headers.get("origin");
  return new URL("/admin/mayorista/productos?updated=1", referer || origin || request.url);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const formData = await request.formData();

  const isWholesale = formData.get("isWholesale") === "on";
  const wholesalePrice = getNumber(formData.get("wholesalePrice"), 0);
  const wholesaleMinQty = Math.max(1, getNumber(formData.get("wholesaleMinQty"), 3));

  await prisma.product.update({
    where: { id },
    data: {
      isWholesale,
      wholesalePrice: wholesalePrice > 0 ? wholesalePrice : null,
      wholesaleMinQty,
    },
  });

  return NextResponse.redirect(getRedirectUrl(request), { status: 303 });
}
