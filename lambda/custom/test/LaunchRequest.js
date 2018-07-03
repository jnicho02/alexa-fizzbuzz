var expect = require('chai').expect;
var index = require('../index');

const context = require('aws-lambda-mock-context');
const ctx = context();
var lambdaCallback = function(data) {
  console.log('got data: '+data);
}

describe("Launching a session", function() {
  var speechResponse = null
  var speechError = null
  const launchJson = require('./LaunchRequest.json')

  before(function(done) {
    index.handler(launchJson, ctx, lambdaCallback)

    ctx.Promise
        .then(() => {
            context.log("succeed() called")
            done()
        })
        .catch(err => {
            context.log("fail() called")
            done()
        });
//    ctx.Promise
//      .then(resp => { speechResponse = resp; done(); })
//      .catch(err => { speechError = err; done(); })
  })

  describe("The response is structurally correct for Alexa Speech Services", function() {
    it('should not have errored', function() {
      expect(speechError).to.be.null
    })

    it('should have a version', function() {
      expect(speechResponse.version).not.to.be.null
    })

    it('should have a speechlet response', function() {
      expect(speechResponse.response).not.to.be.null
    })

    it("should have a spoken response", () => {
      expect(speechResponse.response.outputSpeech).not.to.be.null
    })

    it("should not end the Alexa session", function() {
      expect(speechResponse.response.shouldEndSession).not.to.be.null
      expect(speechResponse.response.shouldEndSession).to.be.false
    })
  })
})
