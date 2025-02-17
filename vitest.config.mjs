/// <reference types="vitest" />
import { defineConfig } from "vite";

// biome-ignore lint/style/noDefaultExport: configuration
export default defineConfig({
  test: {
    watch: false,
    environment: "node",
    testTimeout: 100000,
  },
});
