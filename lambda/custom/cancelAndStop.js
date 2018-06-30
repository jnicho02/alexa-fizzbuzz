module.exports = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent')
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!'
    const cardTitle = 'Cancel and stop'
    const cardText = speechText

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(cardTitle, cardText)
      .getResponse()
  },
}
