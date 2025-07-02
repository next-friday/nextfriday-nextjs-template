import eslintConfigAirbnbExtended from "eslint-config-airbnb-extended";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintJs from "@eslint/js";
import eslintPluginImportX from "eslint-plugin-import-x";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginSonarjs from "eslint-plugin-sonarjs";
import typescriptEslint from "typescript-eslint";

const createJavaScriptConfig = () => [
  {
    name: "js/config",
    ...eslintJs.configs.recommended,
  },
  eslintConfigAirbnbExtended.plugins.stylistic,
  eslintConfigAirbnbExtended.plugins.importX,
  ...eslintConfigAirbnbExtended.configs.base.recommended,
];

const createTypeScriptConfig = () => [
  {
    name: "typescript-eslint/plugin",
    plugins: {
      "@typescript-eslint": typescriptEslint.plugin,
    },
  },
  ...eslintConfigAirbnbExtended.configs.base.typescript,
  ...eslintConfigAirbnbExtended.configs.react.typescript,
  ...typescriptEslint.configs.recommended,
];

const createImportConfig = () => [
  {
    name: "import-x/order/rules",
    plugins: {
      import: eslintPluginImportX,
    },
    rules: {
      "import-x/order": [
        "warn",
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
    },
  },
];

const createReactConfig = () => [
  eslintConfigAirbnbExtended.plugins.react,
  eslintConfigAirbnbExtended.plugins.reactHooks,
  eslintConfigAirbnbExtended.plugins.reactA11y,
  ...eslintConfigAirbnbExtended.configs.react.recommended,
  {
    name: "react/custom-rules",
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-filename-extension": [
        "error",
        {
          extensions: [".tsx"],
        },
      ],
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
      "jsx-a11y/anchor-is-valid": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];

const createSonarJSConfig = () => [
  {
    name: "sonarjs/config",
    plugins: {
      sonarjs: eslintPluginSonarjs,
    },
    rules: {
      ...eslintPluginSonarjs.configs.recommended.rules,
    },
  },
];

const createPrettierConfig = () => [
  {
    name: "prettier/plugin/config",
    plugins: {
      prettier: eslintPluginPrettier,
    },
  },
  {
    name: "prettier/rules",
    rules: {
      ...eslintConfigPrettier.rules,
      "prettier/prettier": "error",
    },
  },
];

export default [
  ...createJavaScriptConfig(),
  ...createTypeScriptConfig(),
  ...createImportConfig(),
  ...createReactConfig(),
  ...createSonarJSConfig(),
  ...createPrettierConfig(),
];
