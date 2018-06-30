'use strict'

/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core')
const Project = 'alexa-fizzbuzz'
const AwsRegion = 'eu-west-1'

/*
module.exports.handler = (event, context, callback) => {
  console.log(`${JSON.stringify(event)}`)
  const alexa = Alexa.handler(event, context)
  alexa.appId = process.env.APP_ID
  if (process.env.USE_DYNAMO_DB) {
    alexa.dynamoDBTableName = Project
  }
  alexa.registerHandlers(lobby, learn, play)
  alexa.execute()
}

const lobby = {
  'LaunchRequest': function() {
    var speechOutput = `Welcome to fizz buzz. Do you know how to play?`
    var reprompt = `Do you know how to play?`
    var cardTitle = `Welcome to fizz buzz.`
    var cardContent = `This is a number game. Do you know how to play?`
    var imageObj = undefined
    log('lobby:LaunchRequest', speechOutput, reprompt, cardTitle, cardContent, imageObj)
    this.response.speak(speechOutput)
      .listen(reprompt)
      .cardRenderer(cardTitle, cardContent.replaceAll(/<audio.*\/>/, ''), imageObj)
    this.emit(':responseReady')
  },
  'AMAZON.HelpIntent': function() {
    var speechOutput = `This is the fizzbuzz number counting game.
      Do you know how to play?`
    var reprompt = `Do you know how to play?`
    var cardTitle = `This is Fizzbuzz`
    var cardContent = `Do you know how to play?`
    var imageObj = undefined
    log('lobby:Help', speechOutput, reprompt, cardTitle, cardContent, imageObj)
    this.response.speak(speechOutput)
      .listen(reprompt)
      .cardRenderer(cardTitle, cardContent.replaceAll(/<audio.*\/>/, ''), imageObj)
    this.emit(':responseReady')
  },
  'AMAZON.YesIntent': function() {
    console.log(`lobby:Yes`)
    this.handler.state = "PLAY"
    this.emitWithState('Start')
  },
  'AMAZON.NoIntent': function() {
    console.log(`lobby:No`)
    this.handler.state = "LEARN"
    this.emitWithState('Start')
  },
  'AMAZON.CancelIntent': function() {
    this.emit('CompletelyExit')
  },
  'AMAZON.StopIntent': function() {
    this.emit('CompletelyExit')
  },
  'CompletelyExit': function() {
    this.event.session.attributes['location'] = undefined
    var speechOutput = `Goodbye.`
    var reprompt = null
    var cardTitle = `Exit`
    var cardContent = speechOutput
    var imageObj = undefined
    log('CompletelyExit', speechOutput, reprompt, cardTitle, cardContent, imageObj)
    this.response.speak(speechOutput)
      .cardRenderer(cardTitle, cardContent.replaceAll(/<audio.*\/>/, ''), imageObj)
    this.emit(':responseReady')
  },
  'Unhandled': function() {
    var speechOutput = `I did not understand. `
    var reprompt = `Try that again, but maybe in a different way.`
    speechOutput = `${speechOutput} ${reprompt}`
    var cardTitle = speechOutput
    var cardContent = reprompt
    var imageObj = undefined
    log('Unhandled', speechOutput, reprompt, cardTitle, cardContent, imageObj)
    this.response.speak(speechOutput)
      .listen(reprompt)
      .cardRenderer(cardTitle, cardContent.replaceAll(/<audio.*\/>/, ''), imageObj)
    this.emit(':responseReady')
  },
  'SessionEndedRequest': function() {
    // "exit", timeout or error. Cannot send back a response
    console.log(`Session ended: ${this.event.request.reason}`)
  },
}

const learn = Alexa.CreateStateHandler("LEARN", {
  'Start': function() {
    var speechOutput = `Okay, I will explain.
      This is a counting game where we take it in turns to say the next number.
      Each turn, the number goes up by one.
      If the number can be divided by 3 then you say fizz.
      If the number can be divided by 5 then you say buzz.
      If the number can be divided by both 3 and 5 then you say fizz buzz.
      So, if I start, I say one and it is your go next, what should you say?
      `
    var reprompt = `I have said 1 what do you say?`
    this.event.session.attributes['number'] = 2
    speechOutput = `${speechOutput} ${reprompt}`
    var cardTitle = `This is Fizzbuzz learn `
    var cardContent = reprompt
    var imageObj = undefined
    log('learn:Start', speechOutput, reprompt, cardTitle, cardContent, imageObj)
    this.response.speak(speechOutput)
      .listen(reprompt)
      .cardRenderer(cardTitle, cardContent.replaceAll(/<audio.*\/>/, ''), imageObj)
    this.emit(':responseReady')
  },
  'TakeATurnIntent': function() {
    var slotValues = getSlotValues(this.event.request.intent.slots)
    var speechOutput = ``
    var yourGuess = undefined
    if (slotValues.fb) {
      yourGuess = slotValues.fb.resolved
    }
    if (yourGuess === undefined) {
      yourGuess = slotValues.guess.resolved
    }
    if (yourGuess !== undefined) {
      //      speechOutput = `You said ${yourGuess}`
      if (yourGuess.toString().toLowerCase() === fb(this.event.session.attributes['number']).toLowerCase()) {
        //        speechOutput = `${speechOutput}. Which is correct.`
      } else {
        speechOutput = `${speechOutput} You said ${yourGuess}. Which is wrong, it should be ${fb(this.event.session.attributes['number'])}.`
      }
      this.event.session.attributes['number'] = this.event.session.attributes['number'] + 1
      speechOutput = `${speechOutput} ${fb(this.event.session.attributes['number'])}`
      this.event.session.attributes['number'] = this.event.session.attributes['number'] + 1
    } else {
      speechOutput = `I didn't understand your guess`
    }
    var reprompt = `What is your guess?`
    var cardTitle = `What is your guess?`
    var cardContent = `The next number is ${this.event.session.attributes['number']}.`
    var imageObj = undefined
    if (this.event.session.attributes['number'] >= 6) {
      speechOutput = `okay, I think you've got it now. Shall we play properly?`
      reprompt = `Shall we play properly?`
    }
    log('TakeATurnIntent', speechOutput, reprompt, cardTitle, cardContent, imageObj)
    this.response.speak(speechOutput)
      .listen(reprompt)
      .cardRenderer(cardTitle, cardContent.replaceAll(/<audio.*\/>/, ''), imageObj)
    this.emit(':responseReady')
  },
  'AMAZON.YesIntent': function() {
    console.log(`learn:Yes`)
    this.handler.state = "PLAY"
    this.emitWithState('NewSession')
  },
  'Unhandled': function() {
    var speechOutput = `Sorry, what was that? `
    var reprompt = `Try that again.`
    var cardTitle = speechOutput
    var cardContent = reprompt
    var imageObj = undefined
    log('Unhandled', speechOutput, reprompt, cardTitle, cardContent, imageObj)
    this.response.speak(speechOutput)
      .listen(reprompt)
      .cardRenderer(cardTitle, cardContent.replaceAll(/<audio.*\/>/, ''), imageObj)
    this.emit(':responseReady')
  },
})
*/

const skillBuilder = Alexa.SkillBuilders.custom()

exports.handler = skillBuilder
  .addRequestHandlers(
    require('./launch'),
    require('./ready'),
    require('./takeATurn'),
    require('./help'),
    require('./cancelAndStop'),
    require('./endTheSession')
  )
  .addErrorHandlers(require('./handleAnError'))
  .lambda()
