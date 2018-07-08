var expect = require('chai').expect
var index = require('../index')

describe('Launching a session', function() {
  var speechResponse = null
  var speechError = null

  before(function(done) {
    const launchJson = require('./LaunchRequest.json')
    var ctx = {}
    var callback = function callback(error, data) {
      if (error) {
        console.log('error: ' + error)
        speechError = error
        done()
      } else {
//        console.log(`got data: ${JSON.stringify(data)}`)
        speechResponse = data
        done()
      }
    }
    index.handler(launchJson, ctx, callback)
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
