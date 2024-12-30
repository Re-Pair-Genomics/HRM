import { APIGatewayProxyEvent } from "aws-lambda";
import { signupInteractor } from "./signupInteractor";
import { DynamoSignupDataAccess } from "./signupDataAccess";
import { SignupInputData } from "./signupInputData";

export const handler = async(event: APIGatewayProxyEvent) => {
  try {
    // Check if request body is missing
    if (!event.body) {
      return {
        statusCode: 404,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ message: "Missing request body" }),
      };
    }

    const body = JSON.parse(event.body);
    
    // Invoke interactor
    const input: SignupInputData = {
      username: body.username,
      email: body.email,
      password: body.password,
    };
    const dataAccess = new DynamoSignupDataAccess();
    const result = await signupInteractor(input, dataAccess);

    // Return server response from interactor
    return {
      statusCode: result.statusCode,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: result.body,
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ message: error.message }),
    };
  }
};