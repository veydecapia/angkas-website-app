const typescriptEslintPlugin = require('@typescript-eslint/eslint-plugin');
const importPlugin = require('eslint-plugin-import');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');
const typescriptParser = require('@typescript-eslint/parser');

module.exports = [
  {
    files: ['**/*.{ts,tsx,js,jsx}'], // Specify file extensions to lint
    ignores: ['eslint.config.js'], // Exclude this config file from linting
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      ...typescriptEslintPlugin.configs.recommended.rules,
      ...importPlugin.configs.typescript.rules,
      ...prettierConfig.rules,
    },
  },
];
