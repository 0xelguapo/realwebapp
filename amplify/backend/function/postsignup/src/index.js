/* Amplify Params - DO NOT EDIT
	API_REALAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_REALAPP_GRAPHQLAPIIDOUTPUT
	API_REALAPP_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */


const createClient = /* GraphQL */ `
  mutation createClient($input: CreateClientInput!) {
    createClient(input: $input) {
      id
    }
  }
`;

const createReminder = /* GraphQL */ `
  mutation createReminder($input: CreateReminderInput!) {
    createClient(input: $input) {
      id
    }
  }
`;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

exports.handler = async (event) => {
  /** @type {import('node-fetch').RequestInit} */

  let userId;
  if (event.callerContext) {
    userId = event.callerContext.clientId;
  } else {
    userId = "2612aa2f-e76d-4c3d-a077-2da27797313b";
  }

  console.log(`EVENT: ${JSON.stringify(event)}`);
  return {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
    body: JSON.stringify("Hello from Lambda!"),
  };
};
