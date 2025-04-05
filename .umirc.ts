import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/products", component: "products" },
  ],
  npmClient: "npm",
  tailwindcss: {},
  plugins: ["@umijs/plugins/dist/tailwindcss"],
});
