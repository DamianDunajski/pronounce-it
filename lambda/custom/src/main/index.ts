// tslint:disable no-console

import { ErrorHandler, HandlerInput, RequestHandler, SkillBuilders } from "ask-sdk-core";
import { IntentRequest, Response, SessionEndedRequest } from "ask-sdk-model";
// @ts-ignore
import { default as pickRandomWord } from "random-words";

const pronounce = (word: string): string => {
  return `<say-as interpret-as='spell-out'><prosody rate='x-slow'>${word}</prosody></say-as>`;
};

const LaunchRequestHandler: RequestHandler = {
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

const StartIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return handlerInput.requestEnvelope.request.type === "IntentRequest"
      && handlerInput.requestEnvelope.request.intent.name === "AMAZON.YesIntent";
  },
  handle(handlerInput: HandlerInput): Response {
    const randomWord: string = pickRandomWord();

    handlerInput.attributesManager.setSessionAttributes({ randomWord });

    return handlerInput.responseBuilder
      .speak(`Great, here is your first challenge. Please pronounce: ${pronounce(randomWord)}`)
      .reprompt(`Your word is: ${pronounce(randomWord)}. Pronounce it`)
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
    const pronouncedWord: string = request.intent.slots!.word.value;

    const nextRandomWord: string = pickRandomWord();
    handlerInput.attributesManager.setSessionAttributes({ randomWord: nextRandomWord });

    const result = randomWord === pronouncedWord ? `Well done, you pronounced it correctly. Try another one. Pronounce: ${pronounce(nextRandomWord)}` : `Nope. Your word was ${randomWord}. Try again. Pronounce: ${pronounce(nextRandomWord)}`;

    return handlerInput.responseBuilder
      .speak(result)
      .reprompt(`Your next word is: ${pronounce(nextRandomWord)}. Pronounce it`)
      .getResponse();
  },
};

const HelpIntentHandler: RequestHandler = {
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
      .withShouldEndSession(true)
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
