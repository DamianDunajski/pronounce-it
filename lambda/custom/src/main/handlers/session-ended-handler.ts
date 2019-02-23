// tslint:disable no-console

import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response, SessionEndedRequest } from "ask-sdk-model";

export const SessionEndedHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return handlerInput.requestEnvelope.request.type === "SessionEndedRequest";
  },
  handle(handlerInput: HandlerInput): Response {
    const request: SessionEndedRequest = handlerInput.requestEnvelope.request as SessionEndedRequest;
    console.log(`Session ended with reason: ${request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};
