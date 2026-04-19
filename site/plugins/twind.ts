import path from "node:path";
import { extract, install } from "@twind/core";
import type { Plugin } from "gustwind";

type TwindPluginOptions = {
  setupPath?: string;
  twindSetup?: Record<string, unknown>;
};

const plugin: Plugin<TwindPluginOptions> = {
  meta: {
    name: "gustwind-twind-plugin",
    description:
      "Implements Twind styling integration for Gustwind-rendered pages.",
    dependsOn: [],
  },
  init({ cwd, options }) {
    async function prepareStylesheet() {
      let twindSetup = {};

      if (options.twindSetup) {
        twindSetup = options.twindSetup;
      }

      if (options.setupPath) {
        const modulePath = path.join(cwd, options.setupPath);
        twindSetup = await import("file://" + modulePath).then((module) => module.default);
      }

      // Hashing breaks the markdown transform's direct tw() output.
      install({ ...twindSetup, hash: false });
    }

    return {
      prepareBuild: prepareStylesheet,
      prepareContext: prepareStylesheet,
      afterEachRender({ markup, url }) {
        if (url.endsWith(".xml")) {
          return { markup };
        }

        const { css, html } = extract(markup);

        return {
          markup: html.replace("</head>", `<style data-twind>${css}</style></head>`),
        };
      },
      onMessage({ message }) {
        if (message.type === "getStyleSetupPath" && options.setupPath) {
          return { result: path.join(cwd, options.setupPath) };
        }
      },
    };
  },
};

export { plugin };
