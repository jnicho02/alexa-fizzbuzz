module.exports = {
  canHandle(handlerInput) {
    const req = handlerInput.requestEnvelope.request
    return req.type === 'IntentRequest'
      && (req.intent.name === 'AMAZON.CancelIntent'
        || req.intent.name === 'AMAZON.StopIntent')
  },
  handle(handlerInput) {
    var speechText = 'Goodbye! '
    var cardTitle = 'Cancel and stop'
    var cardText = speechText

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(cardTitle, cardText)
      .getResponse()
  },
}
