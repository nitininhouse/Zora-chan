import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));

test("package.json defines the core scripts", () => {
  for (const name of ["dev", "build", "start", "lint", "test"]) {
    assert.equal(typeof pkg.scripts[name], "string", `missing script: ${name}`);
  }
});

test("package.json declares the main runtime dependencies", () => {
  for (const name of ["next", "react", "react-dom", "viem", "wagmi"]) {
    assert.ok(pkg.dependencies[name], `missing dependency: ${name}`);
  }
});

test("core project files exist", () => {
  for (const file of ["README.md", "tsconfig.json", "next.config.ts"]) {
    assert.ok(existsSync(path.join(root, file)), `missing file: ${file}`);
  }
});

test("CI workflows exist", () => {
  for (const file of [".github/workflows/ci.yml", ".github/workflows/release.yml"]) {
    assert.ok(existsSync(path.join(root, file)), `missing workflow: ${file}`);
  }
});
