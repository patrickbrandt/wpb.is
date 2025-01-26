import globals from "globals";
import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
      languageOptions: {
        ecmaVersion: 2024,
        sourceType: 'module',
        globals: {
            ...globals.node
        }
      },
      rules: {},
      ignores: [
        'node_modules/**',
        'dist/**'
      ]
    }
  ];