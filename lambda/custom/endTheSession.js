module.exports = {
  canHandle(handlerInput) {
    const req = handlerInput.requestEnvelope.request
    return req.type === 'SessionEndedRequest'
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse()
  },
}
