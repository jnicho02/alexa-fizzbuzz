module.exports = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
  },
  handle(handlerInput) {
    const speechText = `Welcome to fizz buzz. Shall we start?`
    const reprompt = `Shall we start?`
    const cardTitle = `Welcome to fizz buzz.`
    const cardText = `This is a number game. Shall we start?`

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(reprompt)
      .withSimpleCard(cardTitle, cardText)
      .getResponse()
  },
}
