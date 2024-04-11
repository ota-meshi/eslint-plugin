const plugin = require("../../..");
const config = plugin.config({
  node: true,
  ts: true,
  eslintPlugin: true,
  vue2: true,
  vue3: true,
  json: true,
  yaml: true,
  toml: true,
  md: true,
  svelte: true,
  prettier: true,
});
module.exports = [
  ...config,
  {
    languageOptions: {
      parserOptions: {
        project: require.resolve("../../../tsconfig.test.json"),
      },
    },
  },
];
