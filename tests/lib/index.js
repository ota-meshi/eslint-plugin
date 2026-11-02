"use strict";

const path = require("path");
const assert = require("assert");
const { loadESLint } = require("eslint");
const Module = require("module");

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const FLAT_CONFIG_TEST_CWD = path.join(__dirname, "../fixtures/config-test");
const LEGACY_CONFIG_TEST_CWD = path.join(
  __dirname,
  "../fixtures/legacy-config-test",
);
const LEGACY_PLUGINS = new Map([
  [
    "eslint-plugin-json-schema-validator",
    "eslint-plugin-json-schema-validator-legacy",
  ],
  ["eslint-plugin-jsonc", "eslint-plugin-jsonc-legacy"],
  ["eslint-plugin-regexp", "eslint-plugin-regexp-legacy"],
  ["eslint-plugin-yml", "eslint-plugin-yml-legacy"],
]);

describe("Integration with @ota-meshi/eslint-plugin", () => {
  const resolveFilename = Module._resolveFilename;
  let useLegacyPlugins = false;
  before(() => {
    Module._resolveFilename = function (id, ...args) {
      if (id === "@ota-meshi/eslint-plugin") {
        return require.resolve("../..");
      }
      return resolveFilename.call(
        this,
        useLegacyPlugins ? (LEGACY_PLUGINS.get(id) ?? id) : id,
        ...args,
      );
    };
  });

  after(() => {
    Module._resolveFilename = resolveFilename;
  });

  it("should lint without errors", async () => {
    const FlatESLint = await loadESLint?.({ useFlatConfig: true });
    if (!FlatESLint) return;
    const engine = new FlatESLint({
      cwd: FLAT_CONFIG_TEST_CWD,
      fix: true,
    });
    const results = await engine.lintFiles([FLAT_CONFIG_TEST_CWD]);
    await FlatESLint.outputFixes(results);
    try {
      assert.deepStrictEqual(
        results.flatMap((r) =>
          r.messages.map((m) => ({ ...m, filePath: r.filePath })),
        ),
        [],
      );
    } catch (e) {
      console.log(results.flatMap((r) => r.messages));
      throw e;
    }
  });

  it("should lint without errors (for legacy config)", async () => {
    useLegacyPlugins = true;
    // eslint-disable-next-line no-process-env -- Testing environment
    process.env.ESLINT_USE_FLAT_CONFIG = "false";
    try {
      const LegacyESLint = await loadESLint?.({ useFlatConfig: false });
      const engine = new LegacyESLint({
        cwd: LEGACY_CONFIG_TEST_CWD,
        fix: true,
      });
      const results = await engine.lintFiles([LEGACY_CONFIG_TEST_CWD]);
      await LegacyESLint.outputFixes(results);
      try {
        assert.deepStrictEqual(
          results.flatMap((r) =>
            r.messages.map((m) => ({ ...m, filePath: r.filePath })),
          ),
          [],
        );
      } catch (e) {
        console.log(results.flatMap((r) => r.messages));
        throw e;
      }
    } finally {
      useLegacyPlugins = false;
      // eslint-disable-next-line no-process-env -- Testing environment
      delete process.env.ESLINT_USE_FLAT_CONFIG;
    }
  });
});
