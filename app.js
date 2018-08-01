var restify = require('restify');
var builder = require('botbuilder');
var request = require('request');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

/*
// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: 'c43d6db8-fe06-4f37-8f5a-575a0897629f',
    appPassword: '*K]))-.Agxl(VSni'
});
*/


// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});


// Listen for messages from users 
server.post('/api/messages', connector.listen());


// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, [
    function (session) {
        session.send("Hello!");
        builder.Prompts.text(session, " Are you happy? Yes or no?");
    },
    function (session, results) {
        var userResponse = results.response;
        userResponse = userResponse.toLowerCase();
        console.log("TEST: ", userResponse);

        if (userResponse == "yes") {
            session.send("Your answer 1: " + userResponse);
        } else if (userResponse == 'no') {
            session.send("Your answer 2: " + userResponse);
        } else {
            session.send("You didn't answer the question right.")
        }

    }
]);

/*

// Create your bot with a function to receive messages from the user
// Create bot and default message handler
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("Welcome to the RobertHalf project assistant!");
    session.send("type: 'help' to get started");
});

// ServiceNow
bot.dialog('servicenow', function (session) {
    var msg = new builder.Message(session);
    msg.attachmentLayout(builder.AttachmentLayout.carousel)
    msg.attachments([
        new builder.HeroCard(session)
            .title("ServiceNow")
            .subtitle("Pull all sorts of useful project data from ServiceNow.")
            .text("You can pull project specific data like the changes and tasks that you are assigned to.")
            .images([builder.CardImage.create(session, 'https://prdimpblob.blob.core.windows.net/partners/RES/solutions/images/servicenow.png')])
            .buttons([
                builder.CardAction.imBack(session, "Find my tasks", "Tasks"),
                builder.CardAction.imBack(session, "Find my changes", "Changes"),
            ]),
        new builder.HeroCard(session)
            .title("Planview")
            .subtitle("Pull all sorts of useful project data from Planview.")
            .text("You can pull project specific data like budget metrics and time information.")
            .images([builder.CardImage.create(session, 'https://www.planview.com/wp-content/themes/planview-wp-theme/img/planview-logo-social-media-400x400.jpg')])
            .buttons([
                builder.CardAction.imBack(session, "Find my budget metrics", "Budget Metrics"),
                builder.CardAction.imBack(session, "Find my time information", "Time"),
            ]),
        new builder.HeroCard(session)
            .title("Project Online")
            .subtitle("Pull all sorts of useful project data from Project Online.")
            .text("You can pull project specific data like ...")
            .images([builder.CardImage.create(session, 'https://tvt.gallerycdn.vsassets.io/extensions/tvt/tvt-pjo/1.1.10/1486158998669/img/logo.png')])
            .buttons([
                builder.CardAction.imBack(session, "Find my project online info", "Project Online"),
            ]),
        new builder.HeroCard(session)
            .title("SharePoint")
            .subtitle("Pull all sorts of useful project data from SharePoint.")
            .text("You can pull project specific data like ...")
            .images([builder.CardImage.create(session, 'https://tigerware.lsu.edu/image/506741ef-e6b9-4f42-83b4-198ccc24d94f.png?preset=Full')])
            .buttons([
                builder.CardAction.imBack(session, "Find my SharePoint info", "SharePoint"),
            ])

    ]);
    session.send(msg).endDialog();
}).triggerAction({ matches: /^(help|list)/i });

// ServiceNow 'Task' button click function
bot.dialog('taskButtonClick', [
    function (session, args, next) {
        console.log("TASK BUTTON");
        session.send("TASK BUTTON").endDialog();
    }   
]).triggerAction({ matches: /(Tasks|list)/i });

// ServiceNow 'Change' button click function
bot.dialog('changeButtonClick', [
    function (session, args, next) {
        console.log("CHANGE BUTTON");
        session.send("CHANGE BUTTON").endDialog();
    }   
]).triggerAction({ matches: /(Change|list)/i });

// Planview 'Budget' button click function
bot.dialog('budgetButtonClick', [
    function (session, args, next) {
        console.log("BUDGET BUTTON");
        session.send("BUDGET BUTTON").endDialog()
    }   
]).triggerAction({ matches: /(Budget|list)/i });

// Planview 'Time' button click function
bot.dialog('timeButtonClick', [
    function (session, args, next) {
        console.log("TIME BUTTON");
        session.send("TIME BUTTON").endDialog()
    }   
]).triggerAction({ matches: /(Time|list)/i });

// Project Online button click function
bot.dialog('projectButtonClick', [
    function (session, args, next) {
        console.log("PROJECT ONLINE BUTTON");
        session.send("PROJECT ONLINE BUTTON").endDialog()
    }   
]).triggerAction({ matches: /(Project|list)/i });

// SharePoint button click function
bot.dialog('sharepointButtonClick', [
    function (session, args, next) {
        console.log("SHAREPOINT BUTTON");
        session.send("SHAREPOINT BUTTON").endDialog()
    }   
]).triggerAction({ matches: /(Sharepoint|list)/i });

*/
