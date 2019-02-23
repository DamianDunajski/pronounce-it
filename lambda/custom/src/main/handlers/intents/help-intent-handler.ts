import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";

export const HelpIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return handlerInput.requestEnvelope.request.type === "IntentRequest"
      && handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent";
  },
  handle(handlerInput: HandlerInput): Response {
    return handlerInput.responseBuilder
      .speak("An objective goal of the game is to pronounce correctly random word I spelt for you. If you’re not sure I’ll spell the same word again. If you wanna quit say ‘Stop’ or ‘I’m done’. Ready to start the game?")
      .reprompt("Ready to start the game?")
      .getResponse();
  },
};
