module.exports = {
  canHandle(handlerInput) {
    const req = handlerInput.requestEnvelope.request
    const session = handlerInput.attributesManager.getSessionAttributes()
    return session.state === `ready`
      && req.type === 'IntentRequest'
      && req.intent.name === 'AMAZON.YesIntent'
  },
  handle(handlerInput) {
    const session = handlerInput.attributesManager.getSessionAttributes()
    session.state = `play`
    session.number = 1
    session.failures = 0

    var speechText = `Let's roll then! You start, say "one". `
    var reprompt = `Go on. Say "one". `
    var cardTitle = `Fizz buzz`
    var cardText = speechText

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(reprompt)
      .withSimpleCard(cardTitle, cardText)
      .getResponse()
  }
}
