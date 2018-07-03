module.exports = {
  canHandle() {
    return true
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error}`)

    const speechText = `Sorry, I can\'t understand the command. Please say again.`
    const reprompt = speechText
    const cardTitle = `Error.`
    const cardText = speechText

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(reprompt)
      .getResponse()
  }
}
