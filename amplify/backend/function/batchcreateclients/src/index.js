/* Amplify Params - DO NOT EDIT
	API_REALAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_REALAPP_GRAPHQLAPIIDOUTPUT
	API_REALAPP_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT *//*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["GRAPHQL_API_KEY"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/


import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

import { default as fetch, Request } from "node-fetch";
const aws = require('aws-sdk')

const GRAPHQL_ENDPOINT = process.env.API_REALAPP_GRAPHQLAPIENDPOINTOUTPUT


const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["GRAPHQL_API_KEY"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

const query = /* GraphQL */ `
  mutation createClient($input: CreateClientInput!) {
    createClient(input: $input) {
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
  const variables = { input: { firstName: "HELLO, LAMBDA!" } };

  const options = {
    method: "POST",
    headers: {
      'x-api-key': Parameters.Value
    },
    body: JSON.stringify({ query, variables }),
  };

  const request = new Request(GRAPHQL_ENDPOINT, options);

  let statusCode = 200;
  let body; 
  let response;
  
  try {
    response = await fetch(request);
    body = await response.json()
    if(body.errors) statusCode = 400;
  } catch (error) {
    statusCode = 400;
    body = {
      errors: [
        {
          status: response.status,
          message: error.message,
          stack: error.stack
        }
        ]
    }
  }

  return {
    statusCode,
    body: JSON.stringify(body),
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
  };
};


