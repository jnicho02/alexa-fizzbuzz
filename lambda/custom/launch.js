module.exports = {
  canHandle(handlerInput) {
    const req = handlerInput.requestEnvelope.request
    return req.type === 'LaunchRequest'
  },
  handle(handlerInput) {
    const session = handlerInput.attributesManager.getSessionAttributes()
    var speechText = `Welcome to fizz buzz. Shall we start?`
    var reprompt = `Shall we start?`
    var cardTitle = `Welcome to fizz buzz.`
    var cardText = `This is a number game. Shall we start?`

    session.state = `ready`

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(reprompt)
      .withSimpleCard(cardTitle, cardText)
      .getResponse()
  },
}
