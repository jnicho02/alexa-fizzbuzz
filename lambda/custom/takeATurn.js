const slotHelper = require('./slotHelper')
const fizzBuzz = require('./fizzBuzz')

module.exports = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'TakeATurnIntent'
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
    const slots = handlerInput.requestEnvelope.request.intent.slots
    var youLose = false
    var speechText = ``
    var yourGuess = slots.guess.value
    if (yourGuess === undefined) {
      const slotValues = slotHelper.getSlotValues(slots)
      yourGuess = slotValues.fbguess.resolved
    }
    console.log(`player guessed ${yourGuess} for ${sessionAttributes.number}`)

    if (yourGuess === undefined) {
      speechText = `I didn't understand your guess`
    } else {
      if (!(yourGuess.toString().toLowerCase() === fizzBuzz.answer(sessionAttributes.number).toLowerCase())) {
        sessionAttributes.failures++
        if (sessionAttributes.number > 6 && sessionAttributes.failures > 1) {
          youLose = true
        }
        speechText = `${speechText} You said ${yourGuess}. Which is wrong, it should be ${fizzBuzz.answer(sessionAttributes.number)}.`
      }
      if (youLose) {
        speechText = `${speechText} You've made too many mistakes. Goodbye`
      } else {
        // Alexa's go
        sessionAttributes.number++
          speechText = `${speechText} ${fizzBuzz.answer(sessionAttributes.number)}`
        // Prepare for player's go
        sessionAttributes.number++
      }
    }

    const reprompt = `What is your guess? The next number is ${sessionAttributes.number}.`
    const cardTitle = `What is your guess?`
    const cardText = `The next number is ${sessionAttributes.number}.`

    if (youLose) {
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard(cardTitle, cardText)
        .getResponse()
    } else {
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(reprompt)
        .withSimpleCard(cardTitle, cardText)
        .getResponse()
    }
  }
}
