import matter from "gray-matter";
import indexQuery from "./queries/indexQuery.ts";
import organizersQuery from "./queries/organizersQuery.ts";
import scheduleQuery from "./queries/scheduleQuery.ts";
import speakersQuery from "./queries/speakersQuery.ts";
import workshopsQuery from "./queries/workshopsQuery.ts";
import getTransformMarkdown from "./transforms/markdown.ts";
import type { LoadApi } from "gustwind";

type MarkdownWithFrontmatter = {
  data: {
    slug: string;
    title: string;
    date: Date;
    keywords: string[];
  };
  content: string;
};

const API_URL = process.env.API_URL || "";
const API_TOKEN = process.env.API_TOKEN || "";

if (!API_URL) {
  throw new Error("Missing api url");
}

if (!API_TOKEN) {
  throw new Error("Missing api token");
}

function init({ load }: { load: LoadApi }) {
  const markdown = getTransformMarkdown(load);
  const fetchData = createDataFetcher(API_URL, API_TOKEN);

  function createDataFetcher(apiUrl: string, apiToken: string) {
    return async function fetchData(
      query: string,
      variables: Record<string, unknown>,
    ) {
      try {
        const response = await fetch(apiUrl, {
          body: JSON.stringify({ query, variables }),
          headers: {
            "Content-Type": "application/json",
            TOKEN: apiToken,
          },
          method: "POST",
        });
        const payload = await response.json();

        return payload.data;
      } catch (_error) {
        console.error("Failed to process", apiUrl, query, variables);
      }
    };
  }

  async function queryData(conferenceId: string, queryName: string) {
    const match = {
      index: { query: indexQuery, key: "conference" },
      organizers: { query: organizersQuery, key: "conference.organizers" },
      schedule: { query: scheduleQuery, key: "conference.schedules" },
      speakers: { query: speakersQuery, key: "conference.allSpeakers" },
      workshops: { query: workshopsQuery, key: "conference.workshops" },
    }[queryName];

    if (!match) {
      throw new Error(`queryData - Query "${queryName}" doesn't exist`);
    }

    const data = await fetchData(match.query, { conferenceId });

    return getValue(data, match.key);
  }

  async function indexMarkdown(
    directory: string,
  ) {
    const files = await load.dir({
      path: directory,
      extension: ".md",
      type: "",
    });

    return (await Promise.all(
      files.map(async ({ path }) => ({ ...await parseHeadmatter(path), path })),
    )).toSorted((a, b) => a.data.date < b.data.date ? 1 : -1);
  }

  async function processMarkdown(
    { path }: { path: string },
    o?: { parseHeadmatter: boolean; skipFirstLine: boolean },
  ) {
    if (o?.parseHeadmatter) {
      const headmatter = await parseHeadmatter(path);

      return { ...headmatter, ...(await parseMarkdown(headmatter.content)) };
    }

    return parseMarkdown(await load.textFile(path), o);
  }

  async function parseHeadmatter(
    path: string,
  ): Promise<MarkdownWithFrontmatter> {
    const file = await load.textFile(path);
    const { content, data } = matter(file);

    if (!Object.keys(data).length) {
      throw new Error(`path ${path} did not contain a headmatter`);
    }

    return {
      data: data as MarkdownWithFrontmatter["data"],
      content,
    };
  }

  function parseMarkdown(lines: string, o?: { skipFirstLine: boolean }) {
    return markdown(
      o?.skipFirstLine ? lines.split("\n").slice(1).join("\n") : lines,
    );
  }

  return { indexMarkdown, processMarkdown, queryData };
}

export { init };

function getValue(input: unknown, key: string, defaultValue?: unknown) {
  if (!input || typeof input !== "object") {
    return defaultValue;
  }

  const resolved = key.split(".").reduce<unknown>((value, part) => {
    if (value && typeof value === "object" && part in value) {
      return (value as Record<string, unknown>)[part];
    }

    return undefined;
  }, input);

  return resolved ?? defaultValue;
}
