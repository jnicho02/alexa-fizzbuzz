module.exports = {
  canHandle(handlerInput) {
    const req = handlerInput.requestEnvelope.request
    return req.type === 'IntentRequest'
      && req.intent.name === 'AMAZON.HelpIntent'
  },
  handle(handlerInput) {
    const session = handlerInput.attributesManager.getSessionAttributes()
    var speechText = `This is a number game. Shall we play?`
    var reprompt = `Shall we play?`
    var cardTitle = `Fizz buzz`
    var cardText = speechText

    if (session.number !== undefined){
      speechText = `It is your turn. What is ${session.number}?`
      reprompt = speechText
      cardText = speechText
    }
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(reprompt)
      .withSimpleCard(cardTitle, cardText)
      .getResponse()
  },
}
