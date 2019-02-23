import { SkillBuilders } from "ask-sdk-core";

import { LaunchHandler } from "./handlers/launch-handler";
import { SessionEndedHandler } from "./handlers/session-ended-handler";
import { ErrorHandler } from "./handlers/error-handler";

import { StartIntentHandler } from "./handlers/intents/start-intent-handler";
import { AnswerIntentHandler } from "./handlers/intents/answer-intent-handler";
import { HelpIntentHandler } from "./handlers/intents/help-intent-handler";
import { CancelAndStopIntentHandler } from "./handlers/intents/cancel-and-stop-intent-handler";

export const handler = SkillBuilders.custom()
  .addRequestHandlers(
    LaunchHandler,
    StartIntentHandler,
    AnswerIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
