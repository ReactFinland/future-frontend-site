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

  if (Array.isArray(input)) {
    return input.map(normalizeMarkdownInput).join("");
  }

  if (
    input &&
    typeof input === "object" &&
    "content" in input &&
    typeof input.content === "string"
  ) {
    return input.content;
  }

  if (isRawHtml(input)) {
    return input.value;
  }

  if (
    input &&
    typeof input === "object" &&
    "value" in input
  ) {
    return normalizeMarkdownInput(input.value);
  }

  if (
    input &&
    typeof input === "object" &&
    "items" in input &&
    Array.isArray(input.items)
  ) {
    return input.items.map(normalizeMarkdownInput).join("");
  }

  return "";
}

function isRawHtml(input: unknown): input is { __htmlispRaw: true; value: string } {
  return !!input && typeof input === "object" &&
    "__htmlispRaw" in input && input.__htmlispRaw === true &&
    "value" in input && typeof input.value === "string";
}

export { init };
