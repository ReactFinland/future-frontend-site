import md from "./transforms/markdown.ts";
import type { Context } from "https://deno.land/x/gustwind@v0.30.1/breezewind/types.ts ";

function markdown(_: Context, input: string) {
  return md(input).content;
}

export { markdown };
