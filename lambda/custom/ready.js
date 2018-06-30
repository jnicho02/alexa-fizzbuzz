module.exports = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent'
  },
  handle(handlerInput) {
    const speechText = `Let's roll then! You start, say one`
    const reprompt = `Go on. Say one`
    const cardTitle = `Fizz buzz`
    const cardText = speechText

    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
    sessionAttributes.number = 1

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(reprompt)
      .withSimpleCard(cardTitle, cardText)
      .getResponse()
  }
}
