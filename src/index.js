'use strict';

var HelloWorld = require('./HelloWorld');

// handler is the execution point of the Lambda function
exports.handler = function (event, context) {
    var helloWorld = new HelloWorld();
    helloWorld.execute(event, context);
};
