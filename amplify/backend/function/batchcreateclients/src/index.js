/* Amplify Params - DO NOT EDIT
	API_REALAPP_GRAPHQLAPIENDPOINTOUTPUT>>
	API_REALAPP_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { default as fetch, Request } from "node-fetch";

const query = /* GraphQL */ `
  mutation createClient($input: CreateClientInput!) {
    createClient(input: $input) {
      id
      firstName
    }
  }
`;
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  /** @type {import('node-fetch').RequestInit} */

  //   const username = event.identity.claims.username;
  const variables = { input: { firstName: "HELLO, LAMBDA! " } };

  const options = {
    method: "POST",
    body: JSON.stringify({ query, variables }),
  };

  const request = new Request(API_REALAPP_GRAPHQLAPIENDPOINTOUTPUT, options);

  let response;
  try {
    response = await fetch(request);
    console.log(response);
  } catch (err) {
    console.log(error);
  }

  return {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
    body: JSON.stringify(response),
  };
};
