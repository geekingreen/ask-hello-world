'use strict';
var AlexaSkill = require('./AlexaSkill'),
    eventHandlers = require('./eventHandlers'),
    intentHandlers = require('./intentHandlers');

var APP_ID = 'amzn1.echo-sdk-ams.app.4a9bef06-b813-47ea-8a9e-50ca0a3cfbfd';//replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

var HelloWorld = function () {
    AlexaSkill.call(this, APP_ID);
};


// Extend AlexaSkill
HelloWorld.prototype = Object.create(AlexaSkill.prototype);
HelloWorld.prototype.constructor = HelloWorld;

eventHandlers.register(HelloWorld.prototype.eventHandlers);
intentHandlers.register(HelloWorld.prototype.intentHandlers);

module.exports = HelloWorld;

