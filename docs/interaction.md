# Interaction model

## Invocation

User: Open “pronounce it”

## Start intent

Alexa’s speech: Welcome to Pronounce It, the game where you’ll have to pronounce word I spelt for you. You can stop the game any time. Ready to start?

Alexa’s prompt: Say ‘yes’ to start the game or ‘no’ to drop out

## Game intent

Alexa’s initial speech: Great, here is your first challenge. Please pronounce: ${p:word}

Alexa’s speech after correct answer: Well done, you pronounced it correctly. Try another one. Pronounce: ${p:word}

Alexa’s speech after incorrect answer: Nope. Your word was ${word}. Try again. Pronounce: ${p:word}

Alexa’s prompt: Your (next) word is: ${p:word}. Pronounce it

## Help intent

Alexa’s speech: An objective goal of the game is to pronounce correctly random word I spelt for you. If you’re not sure I’ll spell the same word again. If you wanna quit say ‘Stop’ or ‘I’m done’. Ready to start the game?

## Cancel / Stop intent

Alexa’s speech: Goodbye!
