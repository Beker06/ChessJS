import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  base: "/",
  publicDir: "../public",
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  plugins: [],
});