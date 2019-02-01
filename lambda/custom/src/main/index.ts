import { SkillBuilders, RequestHandler, ErrorHandler, HandlerInput } from 'ask-sdk-core'
import { Response, SessionEndedRequest } from 'ask-sdk-model'

const LaunchRequestHandler: RequestHandler = {
  canHandle (handlerInput: HandlerInput): boolean {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
  },
  handle (handlerInput: HandlerInput): Response {
    const speechText = 'Welcome to Pronounce It, you can say "let’s begin" to start!'

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse()
  },
}

const PronounceItIntentHandler: RequestHandler = {
  canHandle (handlerInput: HandlerInput): boolean {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'PronounceItIntent'
  },
  handle (handlerInput: HandlerInput): Response {
    const speechText = 'Pronounce. H. O. M. E.'

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse()
  },
}

const HelpIntentHandler: RequestHandler = {
  canHandle (handlerInput: HandlerInput): boolean {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent'
  },
  handle (handlerInput: HandlerInput): Response {
    const speechText = 'You can say let me pronounce!'

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse()
  },
}

const CancelAndStopIntentHandler: RequestHandler = {
  canHandle (handlerInput: HandlerInput): boolean {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent')
  },
  handle (handlerInput: HandlerInput): Response {
    const speechText = 'Goodbye!'

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse()
  },
}

const SessionEndedRequestHandler: RequestHandler = {
  canHandle (handlerInput: HandlerInput): boolean {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest'
  },
  handle (handlerInput: HandlerInput): Response {
    let request: SessionEndedRequest = handlerInput.requestEnvelope.request as SessionEndedRequest
    console.log(`Session ended with reason: ${request.reason}`)

    return handlerInput.responseBuilder.getResponse()
  },
}

const ErrorHandler: ErrorHandler = {
  canHandle (): boolean {
    return true
  },
  handle (handlerInput: HandlerInput, error: Error): Response {
    console.log(`Error handled: ${error.message}`)

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse()
  },
}

export const handler = SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    PronounceItIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda()
