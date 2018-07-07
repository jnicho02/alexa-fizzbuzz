const slotHelper = require('./slotHelper')
const fizzBuzz = require('./fizzBuzz')

module.exports = {
  canHandle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
    return sessionAttributes.state === `play`
      && handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'TakeATurnIntent'
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
    const slots = handlerInput.requestEnvelope.request.intent.slots
    var speechText = ``
    var reprompt = ``
    var cardTitle = ``
    var cardText = ``

    // get player's number guess
    var yourGuess = slots.guess.value

    // or their fizz/buzz/fizzbuzz guess
    if (yourGuess === undefined) {
      const slotValues = slotHelper.getSlotValues(slots)
      if (slotValues.fbguess.isValidated) {
        yourGuess = slotValues.fbguess.resolved
      }
    }

    console.log(`player guessed ${yourGuess} for ${sessionAttributes.number}`)

    if (yourGuess === undefined) {
      speechText += `I didn't understand your guess. `
    } else {
      if (yourGuess.toString().toLowerCase() === fizzBuzz.answer(sessionAttributes.number).toLowerCase()) {
        cardTitle = `Yes. That's right. `
      } else {
        sessionAttributes.failures++
        if (sessionAttributes.failures > 1) {
          sessionAttributes.state = `lose`
          speechText += `No, ${sessionAttributes.number} should be ${fizzBuzz.answer(sessionAttributes.number)}. `
          speechText += `You've made too many mistakes. It's game over. Goodbye. `
          cardTitle = `Game over! `
          cardText = speechText
        } else {
          speechText += `You said ${yourGuess}. Which is wrong, it should be ${fizzBuzz.answer(sessionAttributes.number)}. `
          cardTitle = `That isn't right `
          cardText = speechText
        }
      }
      if (sessionAttributes.state === `play`) {
        // Alexa's go
        sessionAttributes.number++
        speechText += `${fizzBuzz.answer(sessionAttributes.number)}. `
        // Prepare for player's go
        sessionAttributes.number++
        reprompt = `What is your guess? The next number is ${sessionAttributes.number}. `
        cardText = reprompt
      }
    }

    if (cardText === '') {
      cardTitle = `What is your guess? `
      speechText += `The next number is ${sessionAttributes.number}. `
      cardText = `The next number is ${sessionAttributes.number}. `
    }

    if (sessionAttributes.state === `lose`) {
      // no reprompt means end the game
      return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(cardTitle, cardText)
      .getResponse()
    }

    return handlerInput.responseBuilder
    .speak(speechText)
    .reprompt(reprompt)
    .withSimpleCard(cardTitle, cardText)
    .getResponse()
  }
}
