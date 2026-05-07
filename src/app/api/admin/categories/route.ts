import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getNumber(formData: FormData, key: string) {
  const raw = getString(formData, key);
  const cleaned = raw.replace(/[^\d]/g, "");
  return Number(cleaned || 0);
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

async function createUniqueSlug(baseSlug: string) {
  let slug = baseSlug;
  let counter = 2;

  while (await prisma.category.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

export async function GET() {
  return redirectTo("/admin/categorias");
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = getString(formData, "name");
    const slugInput = getString(formData, "slug");

    if (!name) {
      return redirectTo("/admin/categorias/nueva?error=missing-name");
    }

    const baseSlug = slugify(slugInput || name);
    const slug = await createUniqueSlug(baseSlug);

    await prisma.category.create({
      data: {
        name,
        slug,
        icon: getString(formData, "icon") || null,
        description: getString(formData, "description") || null,
        image: getString(formData, "image") || null,
        order: getNumber(formData, "order"),
        isActive: formData.get("isActive") === "on",
      },
    });

    return redirectTo("/admin/categorias");
  } catch (error) {
    console.error("Error creating category:", error);
    return redirectTo("/admin/categorias/nueva?error=create-failed");
  }
}
