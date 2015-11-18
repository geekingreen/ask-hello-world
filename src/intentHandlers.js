'use strict';

var AlexaSkill = require('./AlexaSkill');
var store = require('./store');

exports.register = function (intentHandlers) {

    intentHandlers.AddNameIntent = function (intent, session, response) {
      var name = intent.slots.Name.value;
      store.loadData(session, function(storage) {
        var speechOutput, reprompt;
        if (storage.data.names.some(function(n) { return n === name; })) {
          speechOutput = name + ' has already been added. Would you like to add someone else?';
          response.ask(speechOutput);
          return;
        }
        speechOutput = name + ' has been added. You can say I\'m finished or add another name.';
        reprompt = 'Would you like to add anyone else?';
        storage.data.names.push(name);
        storage.save(function() {
          response.ask(speechOutput, reprompt);
        });
      });
    };

    intentHandlers.SayHelloIntent = function(intent, session, response) {
      store.loadData(session, function(storage) {
        var speechOutput = 'Hello ' + storage.data.names.join(', ');
        response.tell(speechOutput);
      });
    };

    intentHandlers.ResetIntent = function(intent, session, response) {
      store.newStore(session).save(function() {
        response.ask('All names have been removed, who would you like to add now?');
      });
    };

    intentHandlers.PlayMusicIntent = function(intent, session, response) {
        response.tell({
            type: AlexaSkill.speechOutputType.SSML,
            speech: '<speak>Here\'s a song for you: <audio src="https://s3-us-west-2.amazonaws.com/marissakg/jeopardy.mp3" /></speak>'
        });
    };

    intentHandlers['AMAZON.HelpIntent'] = function (intent, session, response) {
        response.ask("You can ask me to add a name, or say hello.");
    };

    intentHandlers['AMAZON.CancelIntent'] = function (intent, session, response) {
      response.tell('Okay. Whenever you\'re ready, you can ask me to say hello.');
    };

    intentHandlers['AMAZON.StopIntent'] = function (intent, session, response) {
      response.tell('Okay. Whenever you\'re ready, you can ask me to say hello.');
    };
};
