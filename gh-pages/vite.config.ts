// Standalone Vite config for the static GitHub Pages build.
// It intentionally bypasses the TanStack Start server pipeline (GitHub Pages
// only serves static files) and produces a plain client-side SPA in dist-pages/.
// The Lovable app itself keeps using vite.config.ts — nothing here affects it.
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  // Set by the deploy workflow to "/<repo-name>/" so every asset URL works
  // under the GitHub Pages sub-path.
  base: process.env["BASE_PATH"] || "/",
  root: path.resolve(import.meta.dirname, "."),
  publicDir: path.resolve(import.meta.dirname, "../public"),
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "../src"),
    },
  },
  build: {
    outDir: path.resolve(import.meta.dirname, "../dist-pages"),
    emptyOutDir: true,
  },
});
