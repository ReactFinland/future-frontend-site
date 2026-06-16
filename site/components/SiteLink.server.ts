import type { GlobalUtilities } from "gustwind";

const init: GlobalUtilities["init"] = function init({ matchRoute }) {
  /*
  function validateUrl(url: string) {
    if (!url) {
      return;
    }

    const [urlRoot, anchor] = url.split("#");

    if (Object.keys(routes).includes(urlRoot)) {
      return urlRoot === "/"
        ? url
        : `/${urlRoot}${anchor ? "#" + anchor : "/"}`;
    }

    // TODO: This would be a good spot to check the url doesn't 404
    // To keep this fast, some kind of local, time-based cache would
    // be good to have to avoid hitting the urls all the time.
    if (url.startsWith("http")) {
      return url;
    }

    throw new Error(`Failed to find matching url for "${url}"`);
  }
  */

  async function validateUrl(
    this: { context?: { url?: string } },
    url: string,
  ) {
    if (!url) {
      return;
    }

    // TODO: This would be a good spot to check the url doesn't 404
    // To keep this fast, some kind of local, time-based cache would
    // be good to have to avoid hitting the urls all the time.
    if (url.startsWith("http")) {
      return url;
    }

    const [urlRoot, anchor] = url.split("#");

    if (await hasRoute(urlRoot)) {
      return urlRoot === "/"
        ? url
        : `/${urlRoot}${anchor ? "#" + anchor : "/"}`;
    }

    const archiveRoot = this.context?.url?.match(/^\/?(20\d{2})(?:\/|$)/)?.[1];
    const archiveUrl = archiveRoot && !urlRoot.includes("/")
      ? `${archiveRoot}/${urlRoot}`
      : undefined;

    if (archiveUrl && await hasRoute(archiveUrl)) {
      return `/${archiveUrl}${anchor ? "#" + anchor : "/"}`;
    }

    throw new Error(
      `Failed to find matching url for "${url}"`,
    );
  }

  async function hasRoute(url: string) {
    try {
      return Boolean(await matchRoute(url));
    } catch {
      return false;
    }
  }

  return { validateUrl };
};

export { init };
