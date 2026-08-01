// Client-only entry used exclusively for the static GitHub Pages build.
// It mounts the exact same routes as the Lovable app, without any server runtime.
import { QueryClient } from "@tanstack/react-query";
import { RouterProvider, createRouter, createHashHistory } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { routeTree } from "../src/routeTree.gen";
import "../src/styles.css";

// Hash history keeps deep links working on GitHub Pages, which has no SPA rewrite rules.
const router = createRouter({
  routeTree,
  history: createHashHistory(),
  context: { queryClient: new QueryClient() },
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
