import { GraphQLRequest } from "https://deno.land/x/gql_request@1.0.0-beta.2/mod.ts";
import { get } from "https://deno.land/x/gustwind@v0.32.0/utilities/functional.ts";
import { parse } from "https://deno.land/x/frontmatter@v0.1.4/mod.ts";
import { dir } from "https://deno.land/x/gustwind@v0.39.1/utilities/fs.ts";
import indexQuery from "./queries/indexQuery.ts";
import organizersQuery from "./queries/organizersQuery.ts";
import scheduleQuery from "./queries/scheduleQuery.ts";
import speakersQuery from "./queries/speakersQuery.ts";
import workshopsQuery from "./queries/workshopsQuery.ts";

type MarkdownWithFrontmatter = {
  data: {
    slug: string;
    title: string;
    date: Date;
    keywords: string[];
  };
  content: string;
};

const CONFERENCE = "future-frontend-2023";
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

async function queryData(queryName: string) {
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

  const data = await fetchData(match.query, { conferenceId: CONFERENCE });

  return get(data, match.key);
}

function readFile(filename: string) {
  return Deno.readTextFile(filename);
}

async function indexMarkdown(directory: string) {
  const files = await dir({ path: directory, extension: ".md" });

  return Promise.all(
    files.map(({ path }) =>
      Deno.readTextFile(path).then((d) => parse(d) as MarkdownWithFrontmatter)
    ),
  );
}

export { indexMarkdown, queryData, readFile };
