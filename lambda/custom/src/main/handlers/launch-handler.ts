import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";

export const LaunchHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  handle(handlerInput: HandlerInput): Response {
    return handlerInput.responseBuilder
      .speak("Welcome to Pronounce It, the game where you’ll have to pronounce word I spelt for you. You can stop the game any time. Ready to start?")
      .reprompt("Say ‘yes’ to start the game or ‘no’ to drop out")
      .getResponse();
  },
};
