var expect = require('chai').expect;
var index = require('../index');

const context = require('aws-lambda-mock-context');
const ctx = context();

describe("Testing a session with the LaunchRequest", function() {
  var speechResponse = null
  var speechError = null

  before(function(done) {
    index.handler({
      "version": "1.0",
      "session": {
        "new": true,
        "sessionId": "amzn1.echo-api.session.70dd74f4-155d-47af-a03c-a6cda7287b8b",
        "application": {
          "applicationId": "amzn1.ask.skill.d9eb0616-7adc-4467-9c08-330303b756a4"
        },
        "user": {
          "userId": "amzn1.ask.account.AG3YMJPPWZ2Y5KTK3YSJICM6ZMGHTJQT5AVLOKFWUMF7BNVAY64XKVUKPWDKNPXFFVIV5BMHPXRABYUHHUWUTJ4CZE3DPGWJG562AZACFHTTAESDIOOB2UN76NBNXSKBBX6J4EAXZPPSY7G4QFSMBJUX2V7UXUONLZAQJR7N4PHWW6ILLUL4CGXCRNPQZD4I3QSCU4REZZP53PI"
        }
      },
      "context": {
        "AudioPlayer": {
          "playerActivity": "IDLE"
        },
        "Display": {},
        "System": {
          "application": {
            "applicationId": "amzn1.ask.skill.d9eb0616-7adc-4467-9c08-330303b756a4"
          },
          "user": {
            "userId": "amzn1.ask.account.AG3YMJPPWZ2Y5KTK3YSJICM6ZMGHTJQT5AVLOKFWUMF7BNVAY64XKVUKPWDKNPXFFVIV5BMHPXRABYUHHUWUTJ4CZE3DPGWJG562AZACFHTTAESDIOOB2UN76NBNXSKBBX6J4EAXZPPSY7G4QFSMBJUX2V7UXUONLZAQJR7N4PHWW6ILLUL4CGXCRNPQZD4I3QSCU4REZZP53PI"
          },
          "device": {
            "deviceId": "amzn1.ask.device.AG3ERSH7Y5ATLJANR7RIN4X2V7PGOYF75DHMHJRRKZ5B2ETCJVOTGGTRK4O4S3FDKMX7CUZ2KFSM6JB4JQ5BMU5GG6DHYE5ND6I6QWOLMQXPYEQJPVQ7EWKNODPBUYFT36QDOGLEAF5QRZOUDZVUBZ7SJFT53JNHZTC7YLNUE26TUFQ3KQYTO",
            "supportedInterfaces": {
              "AudioPlayer": {},
              "Display": {
                "templateVersion": "1.0",
                "markupVersion": "1.0"
              },
              "VideoApp": {}
            }
          },
          "apiEndpoint": "https://api.eu.amazonalexa.com",
          "apiAccessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjEifQ.eyJhdWQiOiJodHRwczovL2FwaS5hbWF6b25hbGV4YS5jb20iLCJpc3MiOiJBbGV4YVNraWxsS2l0Iiwic3ViIjoiYW16bjEuYXNrLnNraWxsLmQ5ZWIwNjE2LTdhZGMtNDQ2Ny05YzA4LTMzMDMwM2I3NTZhNCIsImV4cCI6MTUxNzkxMDUxNiwiaWF0IjoxNTE3OTA2OTE2LCJuYmYiOjE1MTc5MDY5MTYsInByaXZhdGVDbGFpbXMiOnsiY29uc2VudFRva2VuIjpudWxsLCJkZXZpY2VJZCI6ImFtem4xLmFzay5kZXZpY2UuQUczRVJTSDdZNUFUTEpBTlI3UklONFgyVjdQR09ZRjc1REhNSEpSUktaNUIyRVRDSlZPVEdHVFJLNE80UzNGREtNWDdDVVoyS0ZTTTZKQjRKUTVCTVU1R0c2REhZRTVORDZJNlFXT0xNUVhQWUVRSlBWUTdFV0tOT0RQQlVZRlQzNlFET0dMRUFGNVFSWk9VRFpWVUJaN1NKRlQ1M0pOSFpUQzdZTE5VRTI2VFVGUTNLUVlUTyIsInVzZXJJZCI6ImFtem4xLmFzay5hY2NvdW50LkFHM1lNSlBQV1oyWTVLVEszWVNKSUNNNlpNR0hUSlFUNUFWTE9LRldVTUY3Qk5WQVk2NFhLVlVLUFdES05QWEZGVklWNUJNSFBYUkFCWVVISFVXVVRKNENaRTNEUEdXSkc1NjJBWkFDRkhUVEFFU0RJT09CMlVONzZOQk5YU0tCQlg2SjRFQVhaUFBTWTdHNFFGU01CSlVYMlY3VVhVT05MWkFRSlI3TjRQSFdXNklMTFVMNENHWENSTlBRWkQ0STNRU0NVNFJFWlpQNTNQSSJ9fQ.cDtd-FkEZoOnx9gttxOFQdUJfQQl04F1E_rjcFdicrrK3_2-CaawC6yByNKH7C51VP_3wVIBF3ZggFCQCK6a0wCbjUkd9FxLN9e8oaM5-m6LzsqiFa3EwLJX_2H9eSgeBgwHNlKAT3jKs__QClHpBg8T6u0hyinN20zbg1NHdzimRSQ1ficEkSuOGvsqHa5QoD4wiQAj7B_9ZCr4TF6HTKA6c3xpNsHb-2oAkcmVCJ-ZPCfzzUSG-4cXqhazOaH6Vtc3rZ-MOvyiGN0KF1kUHV2dnG944FPPura3D8zs3xiHSj0szCc5SlXg7go-NTKNpaGitP1q0EXGEEg1jl6JZA"
        }
      },
      "request": {
        "type": "LaunchRequest",
        "requestId": "amzn1.echo-api.request.268e4068-2222-4c3b-9834-bf9edd76f053",
        "timestamp": "2018-02-06T08:48:36Z",
        "locale": "en-GB"
      }
    }, ctx)

    ctx.Promise
      .then(resp => {
        speechResponse = resp;
        done();
      })
      .catch(err => {
        speechError = err;
        done();
      })
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

    it("should not end the alexa session", function() {
      expect(speechResponse.response.shouldEndSession).not.to.be.null
      expect(speechResponse.response.shouldEndSession).to.be.false
    })
  })
})
