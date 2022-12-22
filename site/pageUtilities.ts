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
  if (!input) {
    return "";
  }

  return md(input).content;
}

function trim(_: Context, str: string, char: string) {
  if (!str) {
    throw new Error("No string to trim!");
  }

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

function offsetByTimezone(_: Context, time: string) {
  // Fixed to Finnish Summer time
  // const tzOffset = new Date().getTimezoneOffset() / 60;
  const tzOffset = -3;
  const parts = time.split(":");
  const hours = parseInt(parts[0], 10);
  const minutes = parts[1];
  const hoursWithOffset = (hours - tzOffset) % 24;

  if (hours - tzOffset > 24) {
    return addLeadingZero(hoursWithOffset) + ":" + minutes + " (+1 day)";
  }

  if (hours - tzOffset < 0) {
    return addLeadingZero(24 + hoursWithOffset) + ":" + minutes + " (-1 day)";
  }

  return addLeadingZero(hoursWithOffset) + ":" + minutes;
}

function addLeadingZero(input: number) {
  if (input.toString().length === 1) {
    return "0" + input;
  }

  return input.toString();
}

// Use this to calculate time zone offset in a user friendly way
/*
function timezoneOffset() {
  const tzOffset = -(new Date().getTimezoneOffset() / 60);
  const prefix = tzOffset >= 0 ? "+" : "-";

  return "GMT" + prefix + tzOffset;
}
*/

export {
  _onRenderStart,
  getDate,
  getUniqueAnchorId,
  getYear,
  markdown,
  offsetByTimezone,
  pluralize,
  trim,
  validateUrl,
};
