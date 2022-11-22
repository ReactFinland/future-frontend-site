import { GraphQLRequest } from "https://deno.land/x/gql_request@1.0.0-beta.2/mod.ts";
import markdown from "./transforms/markdown.ts";
import indexQuery from "./queries/index.ts";

const fetchData = createDataFetcher("https://api.react-finland.fi/graphql");

function createDataFetcher(apiUrl: string) {
  return function fetchData(query: string, variables: Record<string, unknown>) {
    const request = new GraphQLRequest(
      apiUrl,
      query,
      { variables },
    );

    return fetch(request).then((res) => res.json());
  };
}

function index() {
  return fetchData(indexQuery, { conferenceId: "future-frontend-2023" });
}

async function readme() {
  return markdown(
    // Drop title from the first line
    // This is not cleanest solution since sometimes you have something else there!
    (await Deno.readTextFile("./README.md")).split("\n").slice(1).join("\n"),
  );
}

console.log(await index());

export { readme };
