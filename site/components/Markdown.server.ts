import getMarkdown from "../transforms/markdown.ts";
import type { LoadApi } from "https://deno.land/x/gustwind@v0.57.0/types.ts";

function init({ load }: { load: LoadApi }) {
  const markdown = getMarkdown(load);

  return {
    processMarkdown: async (input: string) => (await markdown(input)).content,
  };
}

export { init };
