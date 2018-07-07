module.exports = {
  canHandle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
    return sessionAttributes.state === `ready`
      && handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent'
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
    sessionAttributes.state = `play`
    sessionAttributes.number = 1
    sessionAttributes.failures = 0

    const speechText = `Let's roll then! You start, say "one".`
    const reprompt = `Go on. Say "one".`
    const cardTitle = `Fizz buzz`
    const cardText = speechText

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(reprompt)
      .withSimpleCard(cardTitle, cardText)
      .getResponse()
  }
}
