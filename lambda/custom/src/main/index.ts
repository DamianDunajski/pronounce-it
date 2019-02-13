// tslint:disable no-console

import { ErrorHandler, HandlerInput, RequestHandler, SkillBuilders } from "ask-sdk-core";
import { IntentRequest, Response, SessionEndedRequest } from "ask-sdk-model";

const pronounce = (word: string): string => {
  return `Pronounce<break strength='strong'/><say-as interpret-as='spell-out'><prosody rate='slow'>${word}</prosody></say-as>`;
};

const LaunchRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  handle(handlerInput: HandlerInput): Response {
    const speechText = 'Welcome to Pronounce It, you can say "let’s begin" to start!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

const StartIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return handlerInput.requestEnvelope.request.type === "IntentRequest"
      && handlerInput.requestEnvelope.request.intent.name === "StartIntent";
  },
  handle(handlerInput: HandlerInput): Response {
    const randomWord = "home";

    handlerInput.attributesManager.setSessionAttributes({ randomWord });

    return handlerInput.responseBuilder
      .speak(pronounce(randomWord))
      .reprompt(pronounce(randomWord))
      .getResponse();
  },
};

const AnswerIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return handlerInput.requestEnvelope.request.type === "IntentRequest"
      && handlerInput.requestEnvelope.request.intent.name === "AnswerIntent";
  },
  handle(handlerInput: HandlerInput): Response {
    const request = handlerInput.requestEnvelope.request as IntentRequest;

    const { randomWord } = handlerInput.attributesManager.getSessionAttributes();
    const pronouncedWord: string | undefined = request.intent.slots!.word.value;

    const result = randomWord === pronouncedWord ? "Well done, you pronounced it correctly" : `Nope, your word was ${randomWord}`;

    return handlerInput.responseBuilder
      .speak(result)
      .withShouldEndSession(true)
      .getResponse();
  },
};

const HelpIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return handlerInput.requestEnvelope.request.type === "IntentRequest"
      && handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent";
  },
  handle(handlerInput: HandlerInput): Response {
    const speechText = "You can say let me pronounce!";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return handlerInput.requestEnvelope.request.type === "IntentRequest"
      && (handlerInput.requestEnvelope.request.intent.name === "AMAZON.CancelIntent"
        || handlerInput.requestEnvelope.request.intent.name === "AMAZON.StopIntent");
  },
  handle(handlerInput: HandlerInput): Response {
    const speechText = "Goodbye!";

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return handlerInput.requestEnvelope.request.type === "SessionEndedRequest";
  },
  handle(handlerInput: HandlerInput): Response {
    const request: SessionEndedRequest = handlerInput.requestEnvelope.request as SessionEndedRequest;
    console.log(`Session ended with reason: ${request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler: ErrorHandler = {
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

export const handler = SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    StartIntentHandler,
    AnswerIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
