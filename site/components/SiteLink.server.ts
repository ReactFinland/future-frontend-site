import type { GlobalUtilities } from "https://deno.land/x/gustwind@v0.81.4/types.ts";

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

  async function validateUrl(url: string) {
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

    if (await matchRoute(urlRoot)) {
      return urlRoot === "/"
        ? url
        : `/${urlRoot}${anchor ? "#" + anchor : "/"}`;
    }

    throw new Error(
      `Failed to find matching url for "${url}"`,
    );
  }

  return { validateUrl };
};

export { init };
