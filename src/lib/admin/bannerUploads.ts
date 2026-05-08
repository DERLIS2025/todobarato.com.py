export async function saveBannerImage(
  file: FormDataEntryValue | null,
  currentImage?: string | null
) {
  if (!(file instanceof File)) {
    return currentImage ?? null;
  }

  if (!file.size) {
    return currentImage ?? null;
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("El archivo debe ser una imagen.");
  }

  const maxSize = 2 * 1024 * 1024;

  if (file.size > maxSize) {
    throw new Error("La imagen no puede superar 2MB.");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString("base64");

  return `data:${file.type};base64,${base64}`;
}
