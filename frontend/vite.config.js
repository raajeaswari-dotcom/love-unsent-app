import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync, existsSync } from "fs";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "copy-redirects",
      closeBundle() {
        // Copy _redirects file to dist/ after build
        if (existsSync("public/_redirects")) {
          copyFileSync("public/_redirects", "dist/_redirects");
          console.log("✅ Copied _redirects to dist/");
        } else {
          console.warn("⚠️ No _redirects file found in public/");
        }
      },
    },
  ],
  build: {
    outDir: "dist",
  },
});
