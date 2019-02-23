import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { IntentRequest, Response } from "ask-sdk-model";

import { WordGenerator } from "../../utils/word-generator";
import { pronounce } from "../../utils/speech-utils";

export const AnswerIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return handlerInput.requestEnvelope.request.type === "IntentRequest"
      && handlerInput.requestEnvelope.request.intent.name === "AnswerIntent";
  },
  handle(handlerInput: HandlerInput): Response {
    const request = handlerInput.requestEnvelope.request as IntentRequest;

    const { randomWord } = handlerInput.attributesManager.getSessionAttributes();
    const pronouncedWord: string = request.intent.slots!.word.value;

    const nextRandomWord: string = WordGenerator.pickWord();
    handlerInput.attributesManager.setSessionAttributes({ randomWord: nextRandomWord });

    const result = randomWord === pronouncedWord ? `Well done, you pronounced it correctly. Try another one. Pronounce: ${pronounce(nextRandomWord)}` : `Nope. Your word was ${randomWord}. Try again. Pronounce: ${pronounce(nextRandomWord)}`;

    return handlerInput.responseBuilder
      .speak(result)
      .reprompt(`Your next word is: ${pronounce(nextRandomWord)}. Pronounce it`)
      .getResponse();
  },
};
