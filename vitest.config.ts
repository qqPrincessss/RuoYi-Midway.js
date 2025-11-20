import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
export default defineConfig({
  test: {
    projects: [
      {
        test: {
          globals: true,
          name: "utils",
          include: ["packages/utils/__test__/**/*.{test,spec}.{ts,js,tsx,jsx}"],
          environment: "node"
        }
      },
      {
        plugins: [vue()],
        test: {
          globals: true,
          name: "ui",
          include: ["packages/components/__test__/**/*.{test,spec}.{ts,js,tsx,jsx}"],
          browser: {
            enabled: true,
            instances: [{ browser: "chromium" }]
          }
        }
      }
    ]
  }
});
