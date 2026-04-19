import path from "node:path";
import { plugin as htmlispEdgeRendererPlugin } from "gustwind/plugins/htmlisp-edge-renderer";
import type { GlobalUtilities, Plugin } from "gustwind";

type ComponentDirectory = {
  path: string;
};

type ComponentUtilities = {
  init: GlobalUtilities["init"];
};

type HtmlispRendererOptions = {
  components: ComponentDirectory[];
  globalUtilitiesPath: string;
};

const plugin: Plugin<HtmlispRendererOptions> = {
  meta: htmlispEdgeRendererPlugin.meta,
  async init(args) {
    const { cwd, load, options } = args;
    const components: Record<string, string> = {};
    const componentUtilities: Record<string, ComponentUtilities> = {};

    for (const directory of options.components) {
      const componentFiles = await load.dir({
        path: path.join(cwd, directory.path),
        extension: "",
        type: "components",
      });

      for (const file of componentFiles.sort((a, b) => a.path.localeCompare(b.path))) {
        if (file.path.endsWith(".html")) {
          components[getComponentName(file.path)] = await load.textFile(file.path);
          continue;
        }

        if (file.path.endsWith(".server.ts") || file.path.endsWith(".server.js")) {
          const module = await load.module<{
            default?: ComponentUtilities;
            init?: ComponentUtilities["init"];
          }>({
            path: file.path,
            type: "components",
          });
          const exportedUtility = module.default || module;

          if (typeof exportedUtility.init === "function") {
            componentUtilities[getComponentName(file.path)] = exportedUtility;
          }
        }
      }
    }

    const globalUtilitiesModule = await load.module<GlobalUtilities>({
      path: path.join(cwd, options.globalUtilitiesPath),
      type: "globalUtilities",
    });

    const api = await htmlispEdgeRendererPlugin.init({
      ...args,
      options: {
        componentUtilities,
        components,
        globalUtilities: globalUtilitiesModule,
      },
    });

    return {
      ...api,
      async prepareContext(prepareContextArgs) {
        const prepared = api.prepareContext
          ? await api.prepareContext(prepareContextArgs)
          : undefined;

        if (!prepared?.context) {
          return prepared;
        }

        const globalMeta = await prepareContextArgs.send("gustwind-meta-plugin", {
          payload: undefined,
          type: "getMeta",
        });
        const routeMeta = prepared.context.meta;
        const runtimeMeta = {
          built: new Date().toString(),
          ...(args.mode === "development" ? { url: prepareContextArgs.url } : {}),
        };

        return {
          context: {
            ...prepared.context,
            meta: {
              ...runtimeMeta,
              ...(isObject(globalMeta) ? globalMeta : {}),
              ...(isObject(routeMeta) ? routeMeta : {}),
            },
          },
        };
      },
    };
  },
};

function getComponentName(filePath: string) {
  return path.basename(filePath)
    .replace(/\.server\.[^.]+$/, "")
    .replace(/\.[^.]+$/, "");
}

function isObject(input: unknown): input is Record<string, unknown> {
  return !!input && typeof input === "object" && !Array.isArray(input);
}

export { plugin };
