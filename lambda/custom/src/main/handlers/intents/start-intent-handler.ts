import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";

import { WordGenerator } from "../../utils/word-generator";
import { pronounce } from "../../utils/speech-utils";

export const StartIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return handlerInput.requestEnvelope.request.type === "IntentRequest"
      && handlerInput.requestEnvelope.request.intent.name === "AMAZON.YesIntent";
  },
  handle(handlerInput: HandlerInput): Response {
    const randomWord: string = WordGenerator.pickWord();

    handlerInput.attributesManager.setSessionAttributes({ randomWord });

    return handlerInput.responseBuilder
      .speak(`Great, here is your first challenge. Please pronounce: ${pronounce(randomWord)}`)
      .reprompt(`Your word is: ${pronounce(randomWord)}. Pronounce it`)
      .getResponse();
  },
};
