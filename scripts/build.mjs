import { spawn } from "node:child_process";

await import("./clean-build.mjs");

const child = spawn(
  process.execPath,
  [
    "--env-file=.env",
    "./node_modules/gustwind/cli.js",
    "--build",
    "--output",
    "./build",
  ],
  {
    stdio: "inherit",
  },
);

const exitCode = await new Promise((resolve, reject) => {
  child.on("close", resolve);
  child.on("error", reject);
});

process.exit(exitCode ?? 1);
