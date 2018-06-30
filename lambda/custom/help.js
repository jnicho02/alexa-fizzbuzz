module.exports = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent'
  },
  handle(handlerInput) {
    const speechText = `This is play . Shall we continue?`
    const reprompt = `Shall we continue?`
    const cardTitle = `This is Fizzbuzz play`
    const cardText = reprompt

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(reprompt)
      .withSimpleCard(cardTitle, cardText)
      .getResponse()
  },
}
