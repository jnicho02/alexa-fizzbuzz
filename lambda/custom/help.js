module.exports = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent'
  },
  handle(handlerInput) {
    var speechText = `This is a number game. Shall we play?`
    const reprompt = `Shall we play?`
    const cardTitle = `Fizz buzz`
    const cardText = speechText

    const number = handlerInput.attributesManager.getSessionAttributes().number
    if (number !== undefined){
      speechText = `It is your turn. What is ${number}?`
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
