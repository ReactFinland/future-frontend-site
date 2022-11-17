import markdown from "./transforms/markdown.ts";

async function readme() {
  return markdown(
    // Drop title from the first line
    // This is not cleanest solution since sometimes you have something else there!
    (await Deno.readTextFile("./README.md")).split("\n").slice(1).join("\n"),
  );
}

export { readme };
