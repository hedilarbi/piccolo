import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

const MAX_IMAGE_SIZE = 8 * 1024 * 1024;
const formats = {
  "image/jpeg": { extension: "jpg", signatures: [[0xff, 0xd8, 0xff]] },
  "image/png": { extension: "png", signatures: [[0x89, 0x50, 0x4e, 0x47]] },
  "image/webp": { extension: "webp", signatures: [[0x52, 0x49, 0x46, 0x46]] },
} as const;
type Folder = "events" | "spectacles" | "articles";

export async function requestPayload(request: Request) {
  const type = request.headers.get("content-type") || "";
  if (type.includes("multipart/form-data")) {
    const form = await request.formData();
    return { body: Object.fromEntries([...form.entries()].filter((entry): entry is [string, string] => typeof entry[1] === "string")), form };
  }
  return { body: await request.json() as unknown, form: null };
}

export async function saveImage(file: FormDataEntryValue | null, folder: Folder) {
  if (!(file instanceof File) || file.size === 0) return null;
  if (file.size > MAX_IMAGE_SIZE) throw new Error("L’image dépasse la limite de 8 Mo.");
  const format = formats[file.type as keyof typeof formats];
  if (!format) throw new Error("Format non accepté. Utilisez JPG, PNG ou WebP.");
  const bytes = new Uint8Array(await file.arrayBuffer());
  const valid = format.signatures.some(signature => signature.every((byte, index) => bytes[index] === byte));
  if (!valid || (file.type === "image/webp" && String.fromCharCode(...bytes.slice(8, 12)) !== "WEBP")) throw new Error("Le contenu du fichier ne correspond pas à une image valide.");
  const directory = path.join(process.cwd(), "public", "img", folder);
  await mkdir(directory, { recursive: true });
  const filename = `${Date.now()}-${randomUUID()}.${format.extension}`;
  await writeFile(path.join(directory, filename), bytes, { flag: "wx" });
  return `/img/${folder}/${filename}`;
}

export async function deleteStoredImage(url: string | null | undefined, folder: Folder) {
  if (!url || !url.startsWith(`/img/${folder}/`) || url.includes("..")) return;
  const filename = path.basename(url);
  const target = path.join(process.cwd(), "public", "img", folder, filename);
  try { await unlink(target); } catch (error) { if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error; }
}

export async function cleanupImages(urls: (string | null | undefined)[], folder: Folder) {
  await Promise.all(urls.map(url => deleteStoredImage(url, folder)));
}
