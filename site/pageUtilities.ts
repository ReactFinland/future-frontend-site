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
  if (!url) {
    return;
  }

  // Note that this doesn't support nested routes. Probably Gustwind
  // core should expose a helper for this type of check. Even the currently
  // exposed flattenRoutes might be just enough.
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

function pluralize(_: Context, items: unknown[]) {
  return items.length > 1 ? "s" : "";
}

let foundIds: Record<string, number> = {};
function getUniqueAnchorId({ pathname }: Context, anchor: string) {
  if (!anchor) {
    throw new Error(`Missing string`);
  }

  let id = slugify(anchor);

  // Make sure ids are unique per page
  const cacheId = `${pathname}-${id}`;

  // Check for a duplicate id
  if (foundIds[cacheId]) {
    foundIds[cacheId]++;

    id += `-${foundIds[cacheId]}`;
  } else {
    foundIds[cacheId] = 1;
  }

  return id;
}

function slugify(idBase: string) {
  return idBase
    .toLowerCase()
    .replace(/`/g, "")
    .replace(/[^\w]+/g, "-");
}

function _onRenderStart() {
  // To avoid having stale id cache, erase it when page rendering begins.
  foundIds = {};
}

export {
  _onRenderStart,
  getDate,
  getUniqueAnchorId,
  getYear,
  markdown,
  pluralize,
  trim,
  validateUrl,
};
