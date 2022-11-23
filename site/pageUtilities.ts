import md from "./transforms/markdown.ts";
import routes from "./routes.json" assert { type: "json" };
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

function trim(_: Context, str: string, char: string) {
  // Exception for /
  if (str === char) {
    return str;
  }

  // Adapted from https://www.sitepoint.com/trimming-strings-in-javascript/
  return str.replace(new RegExp("^[" + char + "]+"), "").replace(
    new RegExp("[" + char + "]+$"),
    "",
  );
}

function validateUrl(_: Context, url: string) {
  // Note that this doesn't support nested routes. Probably Gustwind
  // core should expose a helper for this type of check.
  if (Object.keys(routes).includes(url)) {
    return url === "/" ? "/" : `/${url}/`;
  }

  // TODO: This would be a good spot to check the url doesn't 404
  // To keep this fast, some kind of local, time-based cache would
  // be good to have to avoid hitting the urls all the time.
  if (url.startsWith("http")) {
    return url;
  }

  throw new Error(`Failed to find matching url for "${url}"`);
}

export { getDate, getYear, markdown, trim, validateUrl };
