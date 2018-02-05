'use strict';

const Alexa = require('alexa-sdk');
const Project = 'alexa-fizzbuzz';
const AwsRegion = 'eu-west-1';

module.exports.handler = (event, context, callback) => {
  const alexa = Alexa.handler(event, context);
  alexa.appId = process.env.APP_ID;
  if (process.env.USE_DYNAMO_DB) {
    alexa.dynamoDBTableName = Project;
  }
  alexa.registerHandlers(lobbyMode, playMode);
  alexa.execute();
};

const lobbyMode = {
  'LaunchRequest': function() {
    var speechOutput = ``;
      speechOutput = `Welcome to fizzbuzz.
      `;
    }
    var reprompt = `Shall we play?`;
    speechOutput = `${speechOutput} ${reprompt}`;
    var cardTitle = `Welcome to fizzbuzz.`;
    var cardContent = `This is a number game.
    `;
    var imageObj = undefined;
    log('LaunchRequest', speechOutput, reprompt, cardTitle, cardContent, imageObj);
    this.response.speak(speechOutput)
      .listen(reprompt)
      .cardRenderer(cardTitle, cardContent.replaceAll(/<audio.*\/>/,''), imageObj);
    this.emit(':responseReady');
  },
  'AMAZON.HelpIntent': function() {
    var speechOutput = `This is the Fizzbuzz.`;
    var reprompt = `Shall we play?`;
    speechOutput = `${speechOutput} ${reprompt}`;
    var cardTitle = `This is Fizzbuzz`;
    var cardContent = reprompt;
    var imageObj = undefined;
    log('HelpIntent', speechOutput, reprompt, cardTitle, cardContent, imageObj);
    this.response.speak(speechOutput)
      .listen(reprompt)
      .cardRenderer(cardTitle, cardContent.replaceAll(/<audio.*\/>/,''), imageObj);
    this.emit(':responseReady');
  },
  'AMAZON.CancelIntent': function() {
    this.emit('CompletelyExit');
  },
  'AMAZON.StopIntent': function() {
    this.emit('CompletelyExit');
  },
  'CompletelyExit': function() {
    this.event.session.attributes['location'] = undefined;
    var speechOutput = `Goodbye.`;
    var reprompt = null;
    var cardTitle = `Exit`;
    var cardContent = speechOutput;
    var imageObj = undefined;
    log('CompletelyExit', speechOutput, reprompt, cardTitle, cardContent, imageObj);
    this.response.speak(speechOutput)
      .cardRenderer(cardTitle, cardContent.replaceAll(/<audio.*\/>/,''), imageObj);
    this.emit(':responseReady');
  },
  'Unhandled': function() {
    var speechOutput = `I did not understand. `;
    var reprompt = `Try that again, but maybe in a different way.`;
    speechOutput = `${speechOutput} ${reprompt}`;
    var cardTitle = `Unhandled`;
    var cardContent = speechOutput;
    var imageObj = undefined;
    log('Unhandled', speechOutput, reprompt, cardTitle, cardContent, imageObj);
    this.response.speak(speechOutput)
      .listen(reprompt)
      .cardRenderer(cardTitle, cardContent.replaceAll(/<audio.*\/>/,''), imageObj);
    this.emit(':responseReady');
  },
  'SessionEndedRequest': function() {
    // "exit", timeout or error. Cannot send back a response
    console.log(`Session ended: ${this.event.request.reason}`);
  },
};

const playMode = {
  'AMAZON.HelpIntent': function() {
    var speechOutput = `This is the Fizzbuzz.`;
    var reprompt = `Shall we play?`;
    speechOutput = `${speechOutput} ${reprompt}`;
    var cardTitle = `This is Fizzbuzz`;
    var cardContent = reprompt;
    var imageObj = undefined;
    log('HelpIntent', speechOutput, reprompt, cardTitle, cardContent, imageObj);
    this.response.speak(speechOutput)
      .listen(reprompt)
      .cardRenderer(cardTitle, cardContent.replaceAll(/<audio.*\/>/,''), imageObj);
    this.emit(':responseReady');
  },
  'AMAZON.CancelIntent': function() {
    this.emit('CompletelyExit');
  },
  'AMAZON.StopIntent': function() {
    this.emit('CompletelyExit');
  },
  'CompletelyExit': function() {
    this.event.session.attributes['location'] = undefined;
    var speechOutput = `Goodbye.`;
    var reprompt = null;
    var cardTitle = `Exit`;
    var cardContent = speechOutput;
    var imageObj = undefined;
    log('CompletelyExit', speechOutput, reprompt, cardTitle, cardContent, imageObj);
    this.response.speak(speechOutput)
      .cardRenderer(cardTitle, cardContent.replaceAll(/<audio.*\/>/,''), imageObj);
    this.emit(':responseReady');
  },
  'Unhandled': function() {
    var speechOutput = `I did not understand. `;
    var reprompt = `Try that again, but maybe in a different way.`;
    speechOutput = `${speechOutput} ${reprompt}`;
    var cardTitle = `Unhandled`;
    var cardContent = speechOutput;
    var imageObj = undefined;
    log('Unhandled', speechOutput, reprompt, cardTitle, cardContent, imageObj);
    this.response.speak(speechOutput)
      .listen(reprompt)
      .cardRenderer(cardTitle, cardContent.replaceAll(/<audio.*\/>/,''), imageObj);
    this.emit(':responseReady');
  },
  'SessionEndedRequest': function() {
    // "exit", timeout or error. Cannot send back a response
    console.log(`Session ended: ${this.event.request.reason}`);
  },
};


function log(intent, speechOutput, reprompt, cardTitle, cardContent, imageObj) {
  console.log(`${intent}: ${JSON.stringify({
    "speak": speechOutput,
    "listen": reprompt,
    "card" : {
      "title": cardTitle,
      "content": cardContent,
      "imageObj": imageObj
    }
  })}`);
};

function mp3(name) {
  return `<audio src='https://s3-${AwsRegion}.amazonaws.com/${Project}/${name.replaceAll(" ","-")}.mp3'/>`;
};

String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};

function random(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

function oneOfThe(arrayOfThings) {
  return arrayOfThings[random(arrayOfThings.length)];
};

function getSlotValues(filledSlots) {
  //given event.request.intent.slots, a slots values object so you have
  //what synonym the person said - .synonym
  //what that resolved to - .resolved
  //and if it's a word that is in your slot values - .isValidated
  let slotValues = {};

  console.log('The filled slots: ' + JSON.stringify(filledSlots));
  Object.keys(filledSlots).forEach(function(item) {
    //console.log("item in filledSlots: "+JSON.stringify(filledSlots[item]));
    var name = filledSlots[item].name;
    //console.log("name: "+name);
    if (filledSlots[item] &&
      filledSlots[item].resolutions &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0] &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0].status &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {

      switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
        case "ER_SUCCESS_MATCH":
          slotValues[name] = {
            "synonym": filledSlots[item].value,
            "resolved": filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name,
            "isValidated": true
          };
          break;
        case "ER_SUCCESS_NO_MATCH":
          slotValues[name] = {
            "synonym": filledSlots[item].value,
            "resolved": filledSlots[item].value,
            "isValidated": false
          };
          break;
      }
    } else {
      slotValues[name] = {
        "synonym": filledSlots[item].value,
        "resolved": filledSlots[item].value,
        "isValidated": false
      };
    }
  }, this);
  //console.log("slot values: " + JSON.stringify(slotValues));
  return slotValues;
};
