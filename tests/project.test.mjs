import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (file) => JSON.parse(readFileSync(path.join(root, file), "utf8"));

test("package.json defines the core scripts", () => {
  const { scripts } = readJson("package.json");
  for (const name of ["dev", "build", "start", "lint", "test"]) {
    assert.ok(scripts[name], `missing "${name}" script`);
  }
});

test("tsconfig.json is valid and strict", () => {
  const { compilerOptions } = readJson("tsconfig.json");
  assert.equal(compilerOptions.strict, true);
});

test("CI workflow runs tests and build", () => {
  const file = path.join(root, ".github", "workflows", "ci.yml");
  assert.ok(existsSync(file), "ci.yml not found");
  const content = readFileSync(file, "utf8");
  assert.match(content, /npm test/);
  assert.match(content, /npm run build/);
});

test("release workflow exists", () => {
  assert.ok(existsSync(path.join(root, ".github", "workflows", "release.yml")));
});
