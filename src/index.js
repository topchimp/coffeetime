/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask coffeetime who's turn it is"
 *  Alexa: "It's Scott's turn."
 */

/**
 * App ID for the skill
 */
var APP_ID =  undefined; //amzn1.echo-sdk-ams.app.amzn1.ask.skill.a411b89a-d4da-480f-8e7d-d123adc27b30; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing coffeetime facts.
 */
var PEOPLE = [
    "Scott",
    "Ed",
    "Pete"
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * coffeetime is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    // Any initial request - e.g. handleWhosRoundRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "WhosRound": function (intent, session, response) {
        handleWhosRoundRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        // WhosRound tell me who is next
        // WhosRound tell me who's next
        // WhosRound who's next
        // WhosRound who is next
        // WhosRound who's turn is it
        // WhosRound list members
        // WhosRound list people
        response.ask("You can say tell me who is next, or, who's turn is it, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleWhosRoundRequest(response) {
    // Get a random coffeetime fact from the coffeetime facts list
    var factIndex = Math.floor(Math.random() * PEOPLE.length);
    var randomFact = PEOPLE[factIndex];

    // Create speech output
    var speechOutput = "It's: " + randomFact + "'s turn.";
    var cardTitle = "Who's round";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the coffeetime skill.
    var fact = new Fact();
    fact.execute(event, context);
};

