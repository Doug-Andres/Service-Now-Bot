//import restify, botbuilder, and request resources
var restify = require('restify');
var builder = require('botbuilder');
var request = require('request');
var async = require('async');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Bot Framework Credentials
process.env.MICROSOFT_APP_ID = "7b7781a9-0d2c-44ea-b136-a7f97505a4ce";
process.env.MICROSOFT_APP_PASSWORD = "wjqyTDE99!ogtXBXT854~{#";

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

 
var bot = new builder.UniversalBot(connector, [
    function (session) {
        session.send("Welcome to the RobertHalf Amazon Web Services Bot! Note: Values for identifiers are case sensitive.");
        builder.Prompts.text(session, "Enter in your command:");
    } 
]); 
