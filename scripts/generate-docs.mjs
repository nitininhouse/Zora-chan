import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const readme = readFileSync(join(root, "README.md"), "utf8");

const outDir = join(root, "docs");
mkdirSync(outDir, { recursive: true });

const body = `# ${pkg.name} — generated docs

Generated: ${new Date().toISOString()}

## Scripts

| Script | Command |
|--------|---------|
| dev | \`npm run dev\` |
| build | \`npm run build\` |
| lint | \`npm run lint\` |
| test | \`npm run test\` |
| docs | \`npm run docs:generate\` |

## CI/CD

Copy \`docs/ci-workflow.yml\` to \`.github/workflows/ci.yml\` and
\`docs/deploy-workflow.yml\` to \`.github/workflows/deploy.yml\`.

Pull requests then run lint, unit tests, production build, and docs generation via GitHub Actions.

## README excerpt

${readme.slice(0, 1200)}
`;

writeFileSync(join(outDir, "DEVELOPER.md"), body, "utf8");
console.log("Wrote docs/DEVELOPER.md");
