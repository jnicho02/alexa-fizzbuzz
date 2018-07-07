'use strict'

/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core')

exports.handler = Alexa.SkillBuilders.custom()
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
