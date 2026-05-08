import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { prisma } from "@/lib/db/prisma";
import { ProductStatus } from "@/generated/prisma/client";

type ProductImportRow = Record<string, unknown>;

function normalizeText(value: unknown) {
  return String(value ?? "").trim();
}

function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function parseNumber(value: unknown, fallback = 0) {
  const normalized = String(value ?? "")
    .replace(/\./g, "")
    .replace(/,/g, ".")
    .trim();

  const number = Number(normalized);

  return Number.isFinite(number) ? Math.round(number) : fallback;
}

function parseBoolean(value: unknown) {
  const text = normalizeText(value).toLowerCase();

  return ["true", "1", "sí", "si", "yes", "activo"].includes(text);
}

function parseList(value: unknown) {
  return normalizeText(value)
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeStatus(value: unknown): ProductStatus {
  const status = normalizeText(value).toUpperCase();

  if (status === "ACTIVE") {
    return ProductStatus.ACTIVE;
  }

  if (status === "DRAFT") {
    return ProductStatus.DRAFT;
  }

  if (status === "OUT_OF_STOCK") {
    return ProductStatus.OUT_OF_STOCK;
  }

  if (["ACTIVO", "PUBLICADO"].includes(status)) {
    return ProductStatus.ACTIVE;
  }

  if (["BORRADOR"].includes(status)) {
    return ProductStatus.DRAFT;
  }

  if (["AGOTADO", "SIN STOCK"].includes(status)) {
    return ProductStatus.OUT_OF_STOCK;
  }

  return ProductStatus.ACTIVE;
}

async function readRows(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const firstSheetName = workbook.SheetNames[0];

  if (!firstSheetName) {
    return [];
  }

  const sheet = workbook.Sheets[firstSheetName];

  return XLSX.utils.sheet_to_json<ProductImportRow>(sheet, {
    defval: "",
  });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No se recibió ningún archivo." },
        { status: 400 }
      );
    }

    const rows = await readRows(file);

    if (!rows.length) {
      return NextResponse.json(
        { error: "El archivo no contiene filas para importar." },
        { status: 400 }
      );
    }

    let created = 0;
    let updated = 0;
    let skipped = 0;

    const errors: string[] = [];

    for (const [index, row] of rows.entries()) {
      const rowNumber = index + 2;

      const name = normalizeText(row.name);
      const categorySlug = normalizeSlug(normalizeText(row.categorySlug));
      const price = parseNumber(row.price);
      const sku = normalizeText(row.sku);
      const providedSlug = normalizeText(row.slug);
      const slug = providedSlug ? normalizeSlug(providedSlug) : normalizeSlug(name);

      if (!name || !categorySlug || price <= 0) {
        skipped++;
        errors.push(
          `Fila ${rowNumber}: name, categorySlug y price son obligatorios.`
        );
        continue;
      }

      const category = await prisma.category.findUnique({
        where: {
          slug: categorySlug,
        },
      });

      if (!category) {
        skipped++;
        errors.push(`Fila ${rowNumber}: categoría no encontrada: ${categorySlug}`);
        continue;
      }

      const image = normalizeText(row.image);
      const gallery = parseList(row.gallery);

      const productData = {
        name,
        slug,
        brand: normalizeText(row.brand) || null,
        sku: sku || null,
        categoryId: category.id,
        description: normalizeText(row.description) || null,
        longDescription: normalizeText(row.longDescription) || null,
        image: image || null,
        gallery,
        price,
        oldPrice: parseNumber(row.oldPrice, 0) || null,
        stock: parseNumber(row.stock, 0),
        status: normalizeStatus(row.status),
        badges: parseList(row.badges),
        variants: parseList(row.variants),
        colors: parseList(row.colors),
        isNew: parseBoolean(row.isNew),
        featured: parseBoolean(row.featured),
      };

      const existingProduct = sku
        ? await prisma.product.findFirst({
            where: {
              OR: [{ sku }, { slug }],
            },
          })
        : await prisma.product.findUnique({
            where: {
              slug,
            },
          });

      if (existingProduct) {
        await prisma.product.update({
          where: {
            id: existingProduct.id,
          },
          data: productData,
        });

        updated++;
      } else {
        await prisma.product.create({
          data: productData,
        });

        created++;
      }
    }

    const redirectUrl = new URL("/admin/productos/importar", request.url);
    redirectUrl.searchParams.set("created", String(created));
    redirectUrl.searchParams.set("updated", String(updated));
    redirectUrl.searchParams.set("skipped", String(skipped));

    if (errors.length) {
      redirectUrl.searchParams.set("errors", errors.slice(0, 5).join(" | "));
    }

    return NextResponse.redirect(redirectUrl, { status: 303 });
  } catch (error) {
    console.error("Error importing products:", error);

    return NextResponse.json(
      { error: "No se pudo importar el archivo." },
      { status: 500 }
    );
  }
}
