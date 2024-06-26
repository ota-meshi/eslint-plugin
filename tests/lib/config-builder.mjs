import assert from "assert";
import myPlugin from "../../lib/index.js";

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

describe("Integration with @ota-meshi/eslint-plugin", () => {
  it("should files as yaml for yaml config", () => {
    const yaml = myPlugin.config({ yaml: true });

    const files = [...new Set(yaml.flatMap((r) => r.files).flat())]
      .filter(Boolean)
      .sort();
    const others = files.filter(
      (file) =>
        file &&
        !file.endsWith(".yaml") &&
        !file.endsWith(".yml") &&
        !file.endsWith(".js") &&
        !file.endsWith(".cjs") &&
        !file.endsWith(".mjs") &&
        !file.endsWith(".ts") &&
        !file.endsWith(".cts") &&
        !file.endsWith(".mts"),
    );
    assert.deepStrictEqual(others, []);
  });
});
