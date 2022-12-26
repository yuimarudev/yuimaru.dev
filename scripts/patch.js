import fs from "node:fs/promises";
const path = "node_modules/@popperjs/core/package.json";
const packageJson = JSON.parse(await fs.readFile(path));
packageJson.type = "module";
await fs.writeFile(path, JSON.stringify(packageJson, null, 2));
