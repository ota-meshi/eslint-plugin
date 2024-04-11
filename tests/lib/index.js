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

describe("Integration with @ota-meshi/eslint-plugin", () => {
  const resolveFilename = Module._resolveFilename;
  before(() => {
    Module._resolveFilename = function (id) {
      if (id === "@ota-meshi/eslint-plugin") {
        return require.resolve("../..");
      }
      return resolveFilename.apply(this, arguments);
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
  });
});
