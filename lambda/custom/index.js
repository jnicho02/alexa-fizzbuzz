'use strict'

/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core')
const Project = 'alexa-fizzbuzz'
const AwsRegion = 'eu-west-1'

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
