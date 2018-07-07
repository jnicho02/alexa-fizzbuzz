module.exports = {
  canHandle() {
    return true
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error}`)

    var speechText = `Sorry, I can\'t understand the command. Please say again. `
    var reprompt = speechText
    var cardTitle = `Error.`
    var cardText = speechText

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(reprompt)
      .withSimpleCard(cardTitle, cardText)
      .getResponse()
  },
}
