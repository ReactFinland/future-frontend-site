import { rm } from "node:fs/promises";
import path from "node:path";

const buildPath = path.join(process.cwd(), "build");

await rm(buildPath, { force: true, recursive: true });
