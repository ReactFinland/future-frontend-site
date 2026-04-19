import getMarkdown from "../transforms/markdown.ts";
import type { LoadApi } from "gustwind";

function init({ load }: { load: LoadApi }) {
  const markdown = getMarkdown(load);

  return {
    processMarkdown: async (input: unknown) =>
      (await markdown(normalizeMarkdownInput(input))).content,
  };
}

function normalizeMarkdownInput(input: unknown) {
  if (typeof input === "string") {
    return input;
  }

  if (
    input &&
    typeof input === "object" &&
    "content" in input &&
    typeof input.content === "string"
  ) {
    return input.content;
  }

  return "";
}

export { init };
