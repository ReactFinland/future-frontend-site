import { GraphQLRequest } from "https://deno.land/x/gql_request@1.0.0-beta.2/mod.ts";
import { get } from "https://deno.land/x/gustwind@v0.32.0/utilities/functional.ts";
import {
  extract,
  test,
} from "https://deno.land/std@0.207.0/front_matter/yaml.ts";
import { parse } from "https://deno.land/std@0.207.0/yaml/parse.ts";
import indexQuery from "./queries/indexQuery.ts";
import organizersQuery from "./queries/organizersQuery.ts";
import scheduleQuery from "./queries/scheduleQuery.ts";
import speakersQuery from "./queries/speakersQuery.ts";
import workshopsQuery from "./queries/workshopsQuery.ts";
import getTransformMarkdown from "./transforms/markdown.ts";
import type { LoadApi } from "https://deno.land/x/gustwind@v0.57.0/types.ts";

type MarkdownWithFrontmatter = {
  data: {
    slug: string;
    title: string;
    date: Date;
    keywords: string[];
  };
  content: string;
};

function init({ load }: { load: LoadApi }) {
  const markdown = getTransformMarkdown(load);
  const fetchData = createDataFetcher("https://api.react-finland.fi/graphql");

  function createDataFetcher(apiUrl: string) {
    return async function fetchData(
      query: string,
      variables: Record<string, unknown>,
    ) {
      const request = new GraphQLRequest(
        apiUrl,
        query,
        { variables },
      );

      return (await fetch(request).then((res) => res.json())).data;
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

    return get(data, match.key);
  }

  async function indexMarkdown(
    directory: string,
  ) {
    const files = await load.dir({
      path: directory,
      extension: ".md",
      type: "",
    });

    const ret = await Promise.all(
      files.map(async ({ path }) => ({ ...await parseHeadmatter(path), path })),
    );

    ret.sort((a, b) => a.data.date < b.data.date ? 1 : -1);

    return ret;
  }

  async function processMarkdown(
    filename: string,
    o?: { parseHeadmatter: boolean; skipFirstLine: boolean },
  ) {
    if (o?.parseHeadmatter) {
      const headmatter = await parseHeadmatter(filename);

      return { ...headmatter, ...(await parseMarkdown(headmatter.content)) };
    }

    // Markdown also parses toc but it's not needed for now
    return parseMarkdown(await load.textFile(filename), o);
  }

  async function parseHeadmatter(
    path: string,
  ): Promise<MarkdownWithFrontmatter> {
    const file = await load.textFile(path);

    if (test(file)) {
      const { frontMatter, body: content } = extract(file);

      return {
        // @ts-expect-error Chck how to type data properly.
        // Maybe some form of runtime check would be good.
        data: parse(frontMatter),
        content,
      };
    }

    throw new Error(`path ${path} did not contain a headmatter`);
  }

  function parseMarkdown(lines: string, o?: { skipFirstLine: boolean }) {
    return markdown(
      o?.skipFirstLine ? lines.split("\n").slice(1).join("\n") : lines,
    );
  }

  return { indexMarkdown, processMarkdown, queryData };
}

export { init };
