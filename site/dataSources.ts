import { GraphQLRequest } from "https://deno.land/x/gql_request@1.0.0-beta.2/mod.ts";
import indexQuery from "./queries/index.ts";

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

function index() {
  return fetchData(indexQuery, { conferenceId: CONFERENCE });
}

function intro() {
  return Deno.readTextFile("./content/intro.md");
}

function contact() {
  return Deno.readTextFile("./content/contact.md");
}

function privacyPolicy() {
  return Deno.readTextFile("./content/privacy-policy.md");
}

export { contact, index, intro, privacyPolicy };
