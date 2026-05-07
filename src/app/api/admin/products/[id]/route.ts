import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import type { ProductStatus } from "@/generated/prisma/client";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getNumber(formData: FormData, key: string) {
  const raw = getString(formData, key);
  const cleaned = raw.replace(/[^\d]/g, "");
  return Number(cleaned || 0);
}

function getArray(formData: FormData, key: string) {
  return getString(formData, key)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function redirectTo(path: string) {
  return new NextResponse(null, {
    status: 303,
    headers: {
      Location: path,
    },
  });
}

async function createUniqueSlug(baseSlug: string, currentProductId: string) {
  let slug = baseSlug;
  let counter = 2;

  while (true) {
    const existing = await prisma.product.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!existing || existing.id === currentProductId) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const formData = await request.formData();

    const name = getString(formData, "name");
    const slugInput = getString(formData, "slug");
    const categoryId = getString(formData, "categoryId");

    if (!name || !categoryId) {
      return redirectTo(`/admin/productos/${id}/editar?error=missing-fields`);
    }

    const baseSlug = slugify(slugInput || name);
    const slug = await createUniqueSlug(baseSlug, id);
    const status = (getString(formData, "status") || "ACTIVE") as ProductStatus;

    await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        brand: getString(formData, "brand") || null,
        sku: getString(formData, "sku") || null,
        description: getString(formData, "description") || null,
        longDescription: getString(formData, "longDescription") || null,
        price: getNumber(formData, "price"),
        oldPrice: getNumber(formData, "oldPrice") || null,
        stock: getNumber(formData, "stock"),
        image: getString(formData, "image") || null,
        badges: getArray(formData, "badges"),
        variants: getArray(formData, "variants"),
        colors: getArray(formData, "colors"),
        isNew: formData.get("isNew") === "on",
        featured: formData.get("featured") === "on",
        status,
        seoTitle: getString(formData, "seoTitle") || null,
        seoDescription: getString(formData, "seoDescription") || null,
        categoryId,
      },
    });

    return redirectTo("/admin/productos");
  } catch (error) {
    console.error("Error updating product:", error);
    return redirectTo("/admin/productos?error=update-failed");
  }
}
