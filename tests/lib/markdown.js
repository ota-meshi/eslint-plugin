"use strict";

const assert = require("assert");
const Module = require("module");
const { loadESLint } = require("eslint");
const { buildMd } = require("../../lib/config-builder/+md.js");

describe("Markdown config", () => {
  async function withoutModules(names, callback) {
    const resolveFilename = Module._resolveFilename;
    Module._resolveFilename = function (id) {
      if (names.some((name) => id === name || id.startsWith(`${name}/`))) {
        const error = new Error(`Cannot find module '${id}'`);
        error.code = "MODULE_NOT_FOUND";
        throw error;
      }
      return resolveFilename.apply(this, arguments);
    };
    try {
      return await callback();
    } finally {
      // eslint-disable-next-line require-atomic-updates -- Tests run sequentially.
      Module._resolveFilename = resolveFilename;
    }
  }

  async function lintMarkdown(configs) {
    const FlatESLint = await loadESLint({ useFlatConfig: true });
    const engine = new FlatESLint({
      overrideConfigFile: true,
      overrideConfig: [
        ...configs,
        { files: ["**/*.js"], rules: { "no-debugger": "error" } },
      ],
    });
    const [result] = await engine.lintText("```js\ndebugger;\n```\n", {
      filePath: "README.md",
    });
    return result.messages;
  }

  async function assertMarkdownPlugin(expectedPlugin) {
    const configs = buildMd();
    const resolvedConfigs = await Promise.all(configs);
    assert.strictEqual(
      resolvedConfigs.find((config) => config.plugins?.markdown).plugins
        .markdown,
      expectedPlugin,
    );
    const messages = await lintMarkdown(configs);
    assert.deepStrictEqual(
      messages.map(({ ruleId, line }) => ({ ruleId, line })),
      [{ ruleId: "no-debugger", line: 2 }],
    );
  }

  async function assertMissingMarkdownPlugin() {
    const configs = buildMd();
    assert.deepStrictEqual(
      configs[0].rules["@ota-meshi/missing-module-for-config"],
      ["error", ["@eslint/markdown"]],
    );
    const messages = await lintMarkdown(configs);
    assert.deepStrictEqual(
      messages.map(({ ruleId }) => ruleId),
      ["@ota-meshi/missing-module-for-config"],
    );
    assert.match(messages[0].message, /Missing module of @eslint\/markdown/u);
  }

  it("uses @eslint/markdown without eslint-plugin-markdown", async () => {
    await withoutModules(["eslint-plugin-markdown"], async () => {
      const markdown = await import("@eslint/markdown");
      await assertMarkdownPlugin(markdown.default);
    });
  });

  it("prefers @eslint/markdown when both plugins are installed", async () => {
    const markdown = await import("@eslint/markdown");
    assert.ok(require.resolve("eslint-plugin-markdown"));
    await assertMarkdownPlugin(markdown.default);
  });

  it("falls back to eslint-plugin-markdown", async () => {
    await withoutModules(["@eslint/markdown"], async () => {
      await assertMarkdownPlugin(require("eslint-plugin-markdown"));
    });
  });

  it("requests @eslint/markdown when neither plugin is installed", async () => {
    await withoutModules(
      ["@eslint/markdown", "eslint-plugin-markdown"],
      assertMissingMarkdownPlugin,
    );
  });

  it("does not use unsupported eslint-plugin-markdown versions", async () => {
    const packagePath = require.resolve("eslint-plugin-markdown/package.json");
    const load = Module._load;
    Module._load = function (id) {
      const loaded = load.apply(this, arguments);
      return id === packagePath ? { ...loaded, version: "3.0.0" } : loaded;
    };
    try {
      await withoutModules(["@eslint/markdown"], assertMissingMarkdownPlugin);
    } finally {
      // eslint-disable-next-line require-atomic-updates -- Tests run sequentially.
      Module._load = load;
    }
  });
});
