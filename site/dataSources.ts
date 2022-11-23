import { GraphQLRequest } from "https://deno.land/x/gql_request@1.0.0-beta.2/mod.ts";
import { get } from "https://deno.land/x/gustwind@v0.32.0/utilities/functional.ts";
import indexQuery from "./queries/indexQuery.ts";
import organizersQuery from "./queries/organizersQuery.ts";
import speakersQuery from "./queries/speakersQuery.ts";

// const CONFERENCE = "future-frontend-2023";
const CONFERENCE = "react-finland-2022";

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
    speakers: { query: speakersQuery, key: "conference.allSpeakers" },
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

export { queryData, readFile };
