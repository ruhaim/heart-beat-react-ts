/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { ViteUserConfig, defineConfig, configDefaults } from 'vitest/config';
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  base: "",
  plugins: [tsconfigPaths(), react()] as ViteUserConfig["plugins"],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/__test__/setup.tsx',
    include: ['**/*.{test,spec}.{js,jsx,ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
    exclude: [...configDefaults.exclude, 'e2e/**'],

  },
});
