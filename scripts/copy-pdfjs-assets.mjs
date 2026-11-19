// Copies the PDF.js files the PDF signer loads at runtime (image decoders and
// fallback fonts) from node_modules into public/pdfjs. They are committed so
// the deploy never depends on a build step. Run this after upgrading
// pdfjs-dist:  node scripts/copy-pdfjs-assets.mjs
import { cpSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "node_modules", "pdfjs-dist");
const dest = join(root, "public", "pdfjs");

rmSync(dest, { recursive: true, force: true });

for (const dir of ["wasm", "standard_fonts", "iccs"]) {
  mkdirSync(join(dest, dir), { recursive: true });
  for (const file of readdirSync(join(src, dir))) {
    // QuickJS only runs PDF form scripts, which the signer never enables.
    if (file.toLowerCase().includes("quickjs")) continue;
    cpSync(join(src, dir, file), join(dest, dir, file));
  }
}

console.log(`Copied PDF.js assets to ${dest}`);
