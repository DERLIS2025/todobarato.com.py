import "server-only";

import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "banners");
const PUBLIC_UPLOAD_PATH = "/uploads/banners";

function isFileUpload(value: FormDataEntryValue | null): value is File {
  return (
    typeof value === "object" &&
    value !== null &&
    "arrayBuffer" in value &&
    "name" in value &&
    "size" in value
  );
}

function getExtension(file: File) {
  const fromName = path.extname(file.name || "").toLowerCase();

  if (fromName && /^[.][a-z0-9]+$/.test(fromName)) {
    return fromName;
  }

  if (file.type === "image/png") return ".png";
  if (file.type === "image/webp") return ".webp";
  if (file.type === "image/gif") return ".gif";

  return ".jpg";
}

export async function saveBannerImage(
  value: FormDataEntryValue | null,
  fallback?: string | null
) {
  if (!isFileUpload(value) || value.size === 0) {
    return fallback || null;
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

  if (value.type && !allowedTypes.includes(value.type)) {
    throw new Error("Formato de imagen no permitido.");
  }

  const maxSize = 8 * 1024 * 1024;

  if (value.size > maxSize) {
    throw new Error("La imagen no debe superar 8MB.");
  }

  await mkdir(UPLOAD_DIR, { recursive: true });

  const extension = getExtension(value);
  const fileName = `${Date.now()}-${randomUUID()}${extension}`;
  const filePath = path.join(UPLOAD_DIR, fileName);
  const buffer = Buffer.from(await value.arrayBuffer());

  await writeFile(filePath, buffer);

  return `${PUBLIC_UPLOAD_PATH}/${fileName}`;
}
