// Makes the resized WebP copies of the photos in public/images that the pages
// ask for. The hosting's CPU can't run Next's image optimizer, so the sizes
// are made here, at build time, and the server only hands out files.
//
// Writes public/_img/<same path>.<hash>-<width>.webp and the list the loader
// reads (src/lib/image-variants.json). Copies that already exist are kept, so
// a second run only does the photos that changed.
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = join(root, "public", "images");
const outDir = join(root, "public", "_img");
const manifestFile = join(root, "src", "lib", "image-variants.json");

const sizes = JSON.parse(readFileSync(join(root, "src", "lib", "image-sizes.json"), "utf8"));
const WIDTHS = [...sizes.imageSizes, ...sizes.deviceSizes].sort((a, b) => a - b);
const QUALITY = 75;
// Only used inside emails, never on a page.
const SKIP = [/^\/images\/mail\//, /^\/images\/icons\/mail\//];

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)],
  );
}

const manifest = {};
const wanted = new Set();
let made = 0;

const sources = walk(sourceDir)
  .filter((file) => /\.(png|jpe?g|webp)$/i.test(file))
  .sort();

for (const file of sources) {
  const src = "/" + relative(join(root, "public"), file).split("\\").join("/");
  if (SKIP.some((pattern) => pattern.test(src))) continue;

  const buffer = readFileSync(file);
  const hash = createHash("sha1").update(buffer).digest("hex").slice(0, 8);
  const { width } = await sharp(buffer).metadata();
  if (!width) continue;

  // Never larger than the original: the standard widths below it, then the
  // original width itself for the screens that ask for more.
  const widths = [...WIDTHS.filter((w) => w < width), width];
  manifest[src] = [hash, width];

  for (const w of widths) {
    const out = join(outDir, `${src.replace(/\.\w+$/, "")}.${hash}-${w}.webp`);
    wanted.add(out);
    if (existsSync(out)) continue;
    mkdirSync(dirname(out), { recursive: true });
    await sharp(buffer).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: QUALITY }).toFile(out);
    made += 1;
  }
}

// Copies of photos that were replaced or removed.
let removed = 0;
if (existsSync(outDir)) {
  for (const file of walk(outDir)) {
    if (!wanted.has(file)) {
      rmSync(file);
      removed += 1;
    }
  }
}

writeFileSync(manifestFile, JSON.stringify(manifest, null, 1) + "\n");
console.log(
  `image variants: ${Object.keys(manifest).length} photos, ${wanted.size} files (${made} new, ${removed} removed)`,
);
