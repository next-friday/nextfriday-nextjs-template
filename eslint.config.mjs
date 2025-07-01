import eslintPluginImportX from "eslint-plugin-import-x";
import eslintPluginNext from "@next/eslint-plugin-next";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginSonarjs from "eslint-plugin-sonarjs";
import typescriptEslint from "typescript-eslint";
import { configs as eslintConfigAirbnbExtended } from "eslint-config-airbnb-extended/legacy";
import { rules as eslintConfigPrettier } from "eslint-config-prettier";

const allJsTsFiles = "**/*.{js,jsx,ts,tsx,mjs}";

const plugins = {
  import: eslintPluginImportX,
  "import-x": eslintPluginImportX,
  react: eslintPluginReact,
  "react-hooks": eslintPluginReactHooks,
  "@next/next": eslintPluginNext,
  sonarjs: eslintPluginSonarjs,
  prettier: eslintPluginPrettier,
};

const importOrderConfig = {
  "import/order": [
    "error",
    {
      groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
      pathGroups: [
        {
          pattern: "src/**",
          group: "internal",
          position: "before",
        },
        {
          pattern: "~/**",
          group: "external",
          position: "after",
        },
      ],
      "newlines-between": "always",
    },
  ],
};

const reactRules = {
  ...eslintPluginNext.configs.recommended.rules,
  ...eslintPluginNext.configs["core-web-vitals"].rules,
};

const jsxTsxRules = {
  "func-style": ["error", "expression", { allowArrowFunctions: true }],
  "prefer-arrow-callback": ["error", { allowNamedFunctions: false }],
};

const codeQualityRules = {
  ...eslintPluginSonarjs.configs.recommended.rules,
};

const prettierRules = {
  ...eslintPluginPrettier.configs.recommended.rules,
  "prettier/prettier": "error",
  ...eslintConfigPrettier,
};

const settings = {
  react: {
    version: "detect",
  },
  "import/resolver": {
    typescript: true,
    node: true,
  },
};

export default [
  {
    ignores: [".next/**", "out/**", "build/**", "dist/**", "node_modules/**", ".git/**"],
  },
  ...typescriptEslint.configs.recommended,
  ...eslintConfigAirbnbExtended.base.typescript,
  ...eslintConfigAirbnbExtended.react.typescript,
  {
    files: [allJsTsFiles],
    plugins: {
      import: plugins.import,
      "import-x": plugins["import-x"],
      react: plugins.react,
      "react-hooks": plugins["react-hooks"],
      "@next/next": plugins["@next/next"],
    },
    rules: {
      ...reactRules,
      ...importOrderConfig,
    },
    settings,
  },
  {
    files: ["**/*.{jsx,tsx}"],
    rules: jsxTsxRules,
  },
  {
    files: [allJsTsFiles],
    plugins: {
      sonarjs: plugins.sonarjs,
    },
    rules: codeQualityRules,
  },
  {
    files: [allJsTsFiles],
    plugins: {
      prettier: plugins.prettier,
    },
    rules: prettierRules,
  },
];
