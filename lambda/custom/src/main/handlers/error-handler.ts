// tslint:disable no-console

import { ErrorHandler as IErrorHandler, HandlerInput } from "ask-sdk-core";
import { Response } from "ask-sdk-model";

export const ErrorHandler: IErrorHandler = {
  canHandle(): boolean {
    return true;
  },
  handle(handlerInput: HandlerInput, error: Error): Response {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak("Sorry, I can't understand the command. Please say again.")
      .reprompt("Sorry, I can't understand the command. Please say again.")
      .getResponse();
  },
};
