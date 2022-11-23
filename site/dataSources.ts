import { GraphQLRequest } from "https://deno.land/x/gql_request@1.0.0-beta.2/mod.ts";
import indexQ from "./queries/index.ts";
import organizersQ from "./queries/organizers.ts";

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

// TODO: Abstract out as a fetcher + pass query name as a parameter
async function indexQuery() {
  const data = await fetchData(indexQ, { conferenceId: CONFERENCE });

  return data.conference;
}

async function organizersQuery() {
  const data = await fetchData(organizersQ, { conferenceId: CONFERENCE });

  return data.conference.organizers;
}

// TODO: Abstract out as a file reader + pass filename as a parameter
function intro() {
  return Deno.readTextFile("./content/intro.md");
}

function contact() {
  return Deno.readTextFile("./content/contact.md");
}

function privacyPolicy() {
  return Deno.readTextFile("./content/privacy-policy.md");
}

export { contact, indexQuery, intro, organizersQuery, privacyPolicy };
