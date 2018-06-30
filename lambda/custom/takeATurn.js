const slotHelper = require('./slotHelper')
const fizzBuzz = require('./fizzBuzz')

module.exports = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'TakeATurnIntent'
  },
  handle(handlerInput) {
    var speechText = ``
    var yourGuess = handlerInput.requestEnvelope.request.intent.slots.guess.value
//    var yourGuess = slotValues['fb']['resolved']
    if (yourGuess === undefined) {
      const slotValues = slotHelper.getSlotValues(handlerInput.requestEnvelope.request.intent.slots)
      yourGuess = slotValues.fbguess.resolved
    }
    console.log(`your guess ${yourGuess}`)

    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()

    if (yourGuess === undefined) {
      speechText = `I didn't understand your guess`
    } else {
      if (!(yourGuess.toString().toLowerCase() === fizzBuzz.fb(sessionAttributes.number).toLowerCase())) {
        speechText = `${speechText} You said ${yourGuess}. Which is wrong, it should be ${fizzBuzz.fb(sessionAttributes.number)}.`
      }
      // Alexa's go
      sessionAttributes.number++
      speechText = `${speechText} ${fizzBuzz.fb(sessionAttributes.number)}`

      // Prepare for player's go
      sessionAttributes.number++
    }

    const reprompt = `What is your guess?
      The next number is ${sessionAttributes.number}.`
    const cardTitle = `What is your guess?`
    const cardText = `The next number is ${sessionAttributes.number}.`

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(reprompt)
      .withSimpleCard(cardTitle, cardText)
      .getResponse()
  }
}
