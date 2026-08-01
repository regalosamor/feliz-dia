// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages support:
// The deploy workflow sets BASE_PATH="/<repo-name>/" so every asset URL
// (JS, CSS, fonts, images) is emitted with the repository sub-path prefix.
// Locally / on Lovable the variable is unset and the base stays "/".
const basePath = process.env["BASE_PATH"] || "/";
const isStaticExport = process.env["STATIC_EXPORT"] === "true";

export default defineConfig({
  vite: {
    base: basePath,
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(isStaticExport
      ? {
          // Pre-render every page to plain HTML so GitHub Pages can serve it statically.
          prerender: { enabled: true, crawlLinks: true },
          spa: { enabled: true },
        }
      : {}),
  },
  // On GitHub Pages there is no server runtime: emit a static site instead of a worker.
  ...(isStaticExport ? { nitro: { preset: "static" as const } } : {}),
});
