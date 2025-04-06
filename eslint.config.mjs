import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        L: "readonly",
      },
    },
    extends: ["eslint:recommended", "plugin:prettier/recommended"],
    plugins: ["prettier"],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
    },
  },
]);
