import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import pluginQuery from "@tanstack/eslint-plugin-query";
import pluginReact from "eslint-plugin-react";
import tseslint from "typescript-eslint";

export default defineConfig([
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
    rules: {
      "no-undef": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "no-extra-boolean-cast": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error"],
    },
  },

  ...pluginQuery.configs["flat/recommended"],
]);
