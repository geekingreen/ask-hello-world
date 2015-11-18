'use strict';

var store = require('./store');

exports.register = function (eventHandlers) {
    // onSessionStarted is only triggered for one off requests
    eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
        console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId
            + ", sessionId: " + session.sessionId);
        // any initialization logic goes here
    };

    eventHandlers.onLaunch = function (launchRequest, session, response) {
        console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
        store.loadData(session, function(storage) {
          var speechOutput = 'Welcome to Hello World! ';
          var reprompt;

          if (storage.isEmptyList()) {
            speechOutput += 'Let\'s get started by adding some names...';
            reprompt = 'Please tell me a name of a Fed.';
          } else {
            speechOutput += 'You currently have ' + storage.data.names.length + ' names. What would you like to do?';
            reprompt = 'You can say something like, add John, or say hello.';
          }
          response.ask(speechOutput, reprompt);
        });
    };

    eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
        console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId
            + ", sessionId: " + session.sessionId);
        // any cleanup logic goes here
    };
};



