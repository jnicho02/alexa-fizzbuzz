const slotHelper = require('./slotHelper')
const fizzBuzz = require('./fizzBuzz')

module.exports = {
  canHandle(handlerInput) {
    const req = handlerInput.requestEnvelope.request
    const session = handlerInput.attributesManager.getSessionAttributes()
    return session.state === `play`
      && req.type === 'IntentRequest'
      && req.intent.name === 'TakeATurnIntent'
  },
  handle(handlerInput) {
    const session = handlerInput.attributesManager.getSessionAttributes()
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

    console.log(`player guessed ${yourGuess} for ${session.number}`)

    if (yourGuess === undefined) {
      speechText += `I didn't understand your guess. `
    } else {
      if (yourGuess.toString().toLowerCase() === fizzBuzz.answer(session.number).toLowerCase()) {
        cardTitle = `Yes. That's right. `
      } else {
        session.failures++
        if (session.failures > 1) {
          session.state = `lose`
          speechText += `No, ${session.number} should be ${fizzBuzz.answer(session.number)}. `
          speechText += `You've made too many mistakes. It's game over. Goodbye. `
          cardTitle = `Game over! `
          cardText = speechText
        } else {
          speechText += `You said ${yourGuess}. Which is wrong, it should be ${fizzBuzz.answer(session.number)}. `
          cardTitle = `That isn't right `
          cardText = speechText
        }
      }
      if (session.state === `play`) {
        // Alexa's go
        session.number++
        speechText += `${fizzBuzz.answer(session.number)}. `
        // Prepare for player's go
        session.number++
        reprompt = `What is your guess? The next number is ${session.number}. `
        cardText = reprompt
      }
    }

    if (cardText === '') {
      cardTitle = `What is your guess? `
      speechText += `The next number is ${session.number}. `
      cardText = `The next number is ${session.number}. `
    }

    if (session.state === `lose`) {
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
