import { urlJoin } from "https://bundle.deno.dev/https://deno.land/x/url_join@1.0.0/mod.ts";
import * as path from "https://deno.land/std@0.167.0/path/mod.ts";
import type { Routes } from "https://deno.land/x/gustwind@v0.36.0/types.ts";

function init({ routes }: { routes: Routes }) {
  function invert(b: boolean) {
    return !b;
  }

  function getDate(d: string) {
    const date = new Date(d);

    return `${date.getDate()}.${date.getMonth() + 1}`;
  }

  function getYear(d: string) {
    return new Date(d).getFullYear();
  }

  function getDatetime(d: string) {
    const date = new Date(d);

    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  function getFullDate(d: string) {
    const date = new Date(d);

    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  }

  function validateUrl(url: string) {
    if (!url) {
      return;
    }

    // TODO: Validate that url is a string
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

  function pluralize(items: unknown[]) {
    return items.length > 1 ? "s" : "";
  }

  let foundIds: Record<string, number> = {};
  function getUniqueAnchorId(anchor: string) {
    // @ts-expect-error This is fine.
    const { pathname } = this.context;

    if (!anchor || Array.isArray(anchor) || isObject(anchor)) {
      return;
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

  // deno-lint-ignore no-explicit-any
  const isObject = (a: any) =>
    a !== null && !Array.isArray(a) && typeof a === "object";

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

  function offsetByTimezone(time: string) {
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

  function getProperty(
    o: Record<string, unknown>,
    property: string,
    defaultValue: unknown,
  ) {
    return o[property] || defaultValue;
  }

  function equals(a: unknown, b: unknown) {
    return a === b;
  }

  function greaterThan(a: number, b: number) {
    return a > b;
  }

  function lessThan(a: number, b: number) {
    return a < b;
  }

  // Use this to calculate time zone offset in a user friendly way
  /*
function timezoneOffset() {
  const tzOffset = -(new Date().getTimezoneOffset() / 60);
  const prefix = tzOffset >= 0 ? "+" : "-";

  return "GMT" + prefix + tzOffset;
}
  */

  // The idea of this helper is to copy images from a remote api to
  // the assets directory so that they can be served directly through
  // Cloudflare
  async function rewriteImageSource(source: string) {
    const assetPath = "assets/img";
    const imageName = path.basename(source);
    const outputPath = path.join(Deno.cwd(), assetPath, imageName);

    try {
      await Deno.stat(outputPath);
    } catch (_error) {
      // https://stackoverflow.com/a/62019831/228885
      const res = await fetch(source);
      const imageBytes = new Uint8Array(await res.arrayBuffer());
      await Deno.writeFile(outputPath, imageBytes);
    }

    return `/img/${imageName}`;
  }

  return {
    _onRenderStart,
    equals,
    greaterThan,
    lessThan,
    getProperty,
    getDate,
    getDatetime,
    getFullDate,
    getUniqueAnchorId,
    getYear,
    invert,
    offsetByTimezone,
    pluralize,
    urlJoin,
    rewriteImageSource,
    validateUrl,
  };
}

export { init };
