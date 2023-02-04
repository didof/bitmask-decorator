import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      clean: true,
      reporter: ["text", "html", "lcov"],
    },
  },
});
