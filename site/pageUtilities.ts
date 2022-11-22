import md from "./transforms/markdown.ts";
import type { Context } from "https://deno.land/x/gustwind@v0.30.1/breezewind/types.ts ";

function getDate(_: Context, d: string) {
  const date = new Date(d);

  return `${date.getDate()}.${date.getMonth() + 1}`;
}

function getYear(_: Context, d: string) {
  return new Date(d).getFullYear();
}

function markdown(_: Context, input: string) {
  return md(input).content;
}

export { getDate, getYear, markdown };
